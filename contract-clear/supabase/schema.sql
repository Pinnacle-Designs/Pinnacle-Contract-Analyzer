-- Profiles table extends Supabase auth.users
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  plan text default 'free',
  credits integer default 1,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now()
);

-- One free analysis per email (survives re-signup with a new account)
create table public.free_analysis_claims (
  email text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  claimed_at timestamptz default now()
);

alter table public.free_analysis_claims enable row level security;

-- Atomic credit debit (prevents parallel requests from spending the same credit twice)
create or replace function public.use_analysis_credit(p_user_id uuid)
returns table (is_pro boolean, plan text, credits_remaining integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_plan text;
  v_credits integer;
begin
  select p.plan, p.credits
  into v_plan, v_credits
  from public.profiles p
  where p.id = p_user_id
  for update;

  if not found then
    raise exception 'PROFILE_NOT_FOUND';
  end if;

  if v_plan = 'pro' then
    return query select true, v_plan, v_credits;
    return;
  end if;

  if v_credits <= 0 then
    raise exception 'NO_CREDITS';
  end if;

  update public.profiles
  set credits = credits - 1
  where id = p_user_id;

  return query select false, v_plan, v_credits - 1;
end;
$$;

create or replace function public.restore_analysis_credit(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set credits = credits + 1
  where id = p_user_id
    and plan is distinct from 'pro';
end;
$$;

-- Auto-create a profile row whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
declare
  v_credits integer := 1;
begin
  if new.email is not null and exists (
    select 1 from public.free_analysis_claims
    where email = lower(trim(new.email))
  ) then
    v_credits := 0;
  end if;

  insert into public.profiles (id, email, credits)
  values (new.id, new.email, v_credits);

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Analyses table
create table public.analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  contract_text text not null,
  result jsonb not null,
  created_at timestamptz default now()
);

-- RLS policies
alter table public.profiles enable row level security;
alter table public.analyses enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can view own analyses"
  on public.analyses for select using (auth.uid() = user_id);

create policy "Users can insert own analyses"
  on public.analyses for insert with check (auth.uid() = user_id);

-- API rate limiting (abuse protection for expensive routes)
create table public.api_rate_limits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null,
  created_at timestamptz default now()
);

create index api_rate_limits_user_endpoint_created_idx
  on public.api_rate_limits (user_id, endpoint, created_at desc);

alter table public.api_rate_limits enable row level security;
