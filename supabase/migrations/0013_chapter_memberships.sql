-- Volunteers can join any approved chapter. One row per (user, chapter);
-- the same user can join multiple chapters if they want.

create table if not exists public.chapter_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  chapter_id uuid not null references public.chapter_applications (id) on delete cascade,
  joined_at timestamptz not null default now(),
  unique (user_id, chapter_id)
);

create index if not exists chapter_memberships_chapter_idx
  on public.chapter_memberships (chapter_id);

alter table public.chapter_memberships enable row level security;

create policy "own memberships are readable"
  on public.chapter_memberships for select
  using (auth.uid() = user_id);

create policy "own memberships are insertable"
  on public.chapter_memberships for insert
  with check (auth.uid() = user_id);

create policy "own memberships are deletable"
  on public.chapter_memberships for delete
  using (auth.uid() = user_id);

create policy "admins can read all memberships"
  on public.chapter_memberships for select
  using (public.is_admin());

-- Return the caller's chapter memberships with the joined school details.
-- chapter_applications RLS blocks the join from a normal client, so this
-- SECURITY DEFINER function serves the details of just the caller's rows.
create or replace function public.get_my_chapter_memberships()
returns table (
  chapter_id uuid,
  joined_at timestamptz,
  school_name text,
  school_city text,
  school_state text
)
language sql
stable
security definer
set search_path = public, auth
as $$
  select m.chapter_id, m.joined_at, c.school_name, c.school_city, c.school_state
  from public.chapter_memberships m
  join public.chapter_applications c on c.id = m.chapter_id
  where m.user_id = auth.uid()
  order by m.joined_at desc;
$$;

revoke all on function public.get_my_chapter_memberships() from public;
grant execute on function public.get_my_chapter_memberships() to authenticated;

-- Expose approved chapters with member counts for the public directory.
create or replace function public.get_public_chapters_with_counts()
returns table (
  id uuid,
  school_name text,
  school_city text,
  school_state text,
  member_count bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select c.id, c.school_name, c.school_city, c.school_state,
         (select count(*) from public.chapter_memberships m where m.chapter_id = c.id)
  from public.chapter_applications c
  where c.status = 'approved'
  order by c.school_state, c.school_name;
$$;

revoke all on function public.get_public_chapters_with_counts() from public;
grant execute on function public.get_public_chapters_with_counts() to anon, authenticated;
