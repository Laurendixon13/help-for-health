-- Hours logged by student volunteers.
create table if not exists public.hours_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  hours numeric(5, 2) not null check (hours > 0 and hours <= 24),
  activity text not null,
  occurred_on date not null,
  location text,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists hours_entries_user_id_idx on public.hours_entries (user_id, occurred_on desc);

alter table public.hours_entries enable row level security;

-- A volunteer can read and insert their own entries. Status changes
-- (approvals/rejections) are intentionally NOT allowed here — those go
-- through an admin role later.
create policy "own entries are readable"
  on public.hours_entries for select
  using (auth.uid() = user_id);

create policy "own entries are insertable"
  on public.hours_entries for insert
  with check (auth.uid() = user_id);
