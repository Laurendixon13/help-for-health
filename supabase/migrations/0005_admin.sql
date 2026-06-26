-- Admin role helper and RLS extensions.
-- Admins are identified by raw_app_meta_data->>'role' = 'admin' on auth.users.
-- This field is only writable with the service role, so a regular sign-up
-- cannot self-promote. Promotion is done via a SQL statement in the Supabase
-- dashboard (see the project setup notes).

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select coalesce(
    (
      select raw_app_meta_data->>'role' = 'admin'
      from auth.users
      where id = auth.uid()
    ),
    false
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Hours: admins can read every entry and update status.
create policy "admins can read all hours"
  on public.hours_entries for select
  using (public.is_admin());

create policy "admins can update hours"
  on public.hours_entries for update
  using (public.is_admin())
  with check (public.is_admin());

-- Chapter applications: admins can read everything and update status.
create policy "admins can read chapter applications"
  on public.chapter_applications for select
  using (public.is_admin());

create policy "admins can update chapter applications"
  on public.chapter_applications for update
  using (public.is_admin())
  with check (public.is_admin());
