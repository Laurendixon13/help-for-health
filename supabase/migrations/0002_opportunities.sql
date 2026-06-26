-- Volunteer opportunities and student sign-ups.
create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null check (category in ('virtual', 'in_person', 'fundraiser', 'joy_visit')),
  location text,
  starts_at timestamptz,
  capacity int,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists opportunities_active_starts_idx
  on public.opportunities (is_active, starts_at);

create table if not exists public.opportunity_signups (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (opportunity_id, user_id)
);

create index if not exists opportunity_signups_user_idx
  on public.opportunity_signups (user_id);

alter table public.opportunities enable row level security;
alter table public.opportunity_signups enable row level security;

-- Anyone signed in can browse active opportunities.
create policy "opportunities are readable by all authed users"
  on public.opportunities for select
  using (auth.role() = 'authenticated');

-- A volunteer manages their own sign-ups only.
create policy "own signups are readable"
  on public.opportunity_signups for select
  using (auth.uid() = user_id);

create policy "own signups are insertable"
  on public.opportunity_signups for insert
  with check (auth.uid() = user_id);

create policy "own signups are deletable"
  on public.opportunity_signups for delete
  using (auth.uid() = user_id);

-- Seed a few opportunities so the page has content out of the box.
insert into public.opportunities (title, description, category, location, starts_at)
values
  (
    'Card Writing Event',
    'Write notes of encouragement for kids at Children''s National. No experience needed — supplies provided digitally.',
    'virtual',
    'Virtual (Zoom)',
    now() + interval '7 days'
  ),
  (
    'Local Hospital Volunteer Program',
    'Weekly in-person volunteer shifts at Children''s National Hospital. 16+, training provided.',
    'in_person',
    'Children''s National Hospital, DC',
    null
  ),
  (
    'Spring Care Package Drive',
    'Help assemble and ship 200 care packages to pediatric oncology units. Great for chapter service hours.',
    'fundraiser',
    'Your school chapter',
    now() + interval '21 days'
  ),
  (
    'Joy Visit Training',
    'Onboarding for student volunteers leading Joy Visits at partner hospitals this summer.',
    'joy_visit',
    'Virtual (Zoom)',
    now() + interval '14 days'
  )
on conflict do nothing;
