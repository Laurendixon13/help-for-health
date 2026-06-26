-- Public submissions from the Joy Visits page: requests, guest suggestions,
-- guest applications, and sponsorship interest. Anyone can submit; admins
-- (see public.is_admin from 0005_admin.sql) can read and triage.

create table if not exists public.joy_visit_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  role text not null check (
    role in ('student', 'parent', 'hospital_staff', 'donor', 'guest', 'other')
  ),
  request_type text not null check (
    request_type in ('request', 'suggest_guest', 'become_guest', 'donate_sponsor')
  ),
  guest_info text,
  hospital_or_city text,
  message text,
  status text not null default 'new' check (
    status in ('new', 'in_review', 'closed')
  ),
  created_at timestamptz not null default now()
);

create index if not exists joy_visit_requests_status_idx
  on public.joy_visit_requests (status, created_at desc);

alter table public.joy_visit_requests enable row level security;

create policy "anyone can submit a joy visit request"
  on public.joy_visit_requests for insert
  with check (true);

create policy "admins can read joy visit requests"
  on public.joy_visit_requests for select
  using (public.is_admin());

create policy "admins can update joy visit requests"
  on public.joy_visit_requests for update
  using (public.is_admin())
  with check (public.is_admin());
