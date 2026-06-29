-- Let the signed-in user see chapter applications they submitted.
-- The chapter_applications RLS only allows admins to SELECT, so we need a
-- SECURITY DEFINER function that filters by the calling user's JWT email
-- to surface their own application without exposing anyone else's.

create or replace function public.get_my_chapter_applications()
returns table (
  id uuid,
  school_name text,
  school_city text,
  school_state text,
  status text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public, auth
as $$
  select c.id, c.school_name, c.school_city, c.school_state, c.status, c.created_at
  from public.chapter_applications c
  join auth.users u on lower(u.email) = lower(c.email)
  where u.id = auth.uid()
  order by c.created_at desc;
$$;

revoke all on function public.get_my_chapter_applications() from public;
grant execute on function public.get_my_chapter_applications() to authenticated;
