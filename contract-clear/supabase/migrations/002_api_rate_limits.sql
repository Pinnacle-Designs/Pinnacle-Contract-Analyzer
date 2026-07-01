-- API rate limiting (run in Supabase SQL editor if not using full schema.sql)

create table if not exists public.api_rate_limits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null,
  created_at timestamptz default now()
);

create index if not exists api_rate_limits_user_endpoint_created_idx
  on public.api_rate_limits (user_id, endpoint, created_at desc);

alter table public.api_rate_limits enable row level security;
