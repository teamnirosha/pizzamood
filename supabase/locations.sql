-- Run once in the Supabase SQL editor. Only the server's service-role key can read or write.
create table public.locations (
  id text primary key,
  slug text not null unique,
  data jsonb not null,
  created_at timestamptz not null default now()
);
alter table public.locations enable row level security;
