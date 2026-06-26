-- Run this in the Supabase SQL editor if your project was created before free-tier enforcement.

-- One free analysis per email (survives account deletion / re-signup)
create table if not exists public.free_analysis_claims (
  email text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  claimed_at timestamptz default now()
);

alter table public.free_analysis_claims enable row level security;

-- Atomic credit debit (avoids double-spend from parallel requests)
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

-- New signups: no welcome credit if this email already used the free analysis
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
