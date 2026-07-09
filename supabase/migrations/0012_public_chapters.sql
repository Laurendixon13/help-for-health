-- Expose an approved-chapters listing safe for public visitors.
-- chapter_applications RLS only lets admins SELECT rows, so we need a
-- SECURITY DEFINER function that returns just the non-identifying fields
-- (school + city + state) of approved rows for anyone to read.

create or replace function public.get_public_chapters()
returns table (
  id uuid,
  school_name text,
  school_city text,
  school_state text
)
language sql
stable
security definer
set search_path = public
as $$
  select id, school_name, school_city, school_state
  from public.chapter_applications
  where status = 'approved'
  order by school_state, school_name;
$$;

revoke all on function public.get_public_chapters() from public;
grant execute on function public.get_public_chapters() to anon, authenticated;
