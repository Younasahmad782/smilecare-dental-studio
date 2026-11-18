-- Run in Supabase SQL editor. Contains contact details only, no medical data.
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('appointment','contact')),
  name text not null,
  mobile text,
  email text,
  service text,
  dentist text,
  preferred_date date,
  preferred_time text,
  message text
);
-- RLS on with NO policies: anon/public keys can do nothing. Only the server's service-role key can insert.
alter table public.enquiries enable row level security;
