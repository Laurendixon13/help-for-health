-- Student applications to start a Help 4 Health chapter at their school.
create table if not exists public.chapter_applications (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  school_name text not null,
  school_city text not null,
  school_state text not null,
  grade text,
  why text,
  status text not null default 'new' check (status in ('new', 'in_review', 'approved', 'declined')),
  created_at timestamptz not null default now()
);

create index if not exists chapter_applications_status_idx
  on public.chapter_applications (status, created_at desc);

alter table public.chapter_applications enable row level security;

-- Anyone (including signed-out visitors) can submit an application.
create policy "anyone can submit a chapter application"
  on public.chapter_applications for insert
  with check (true);

-- No public read policy — only the service role / admin dashboard can list them.
