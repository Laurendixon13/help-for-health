-- Pending hours with volunteer name + email for the admin review screen.
-- Wrapped as SECURITY DEFINER so admins can see auth.users fields they
-- couldn't otherwise read directly; gated on public.is_admin() so a
-- non-admin who calls it gets back an empty result.

create or replace function public.get_pending_hours_with_volunteer()
returns table (
  id uuid,
  user_id uuid,
  hours numeric,
  activity text,
  occurred_on date,
  location text,
  notes text,
  status text,
  created_at timestamptz,
  volunteer_email text,
  volunteer_name text
)
language sql
security definer
set search_path = public, auth
as $$
  select
    h.id,
    h.user_id,
    h.hours,
    h.activity,
    h.occurred_on,
    h.location,
    h.notes,
    h.status,
    h.created_at,
    u.email as volunteer_email,
    nullif(
      trim(
        coalesce(u.raw_user_meta_data->>'first_name', '')
        || ' '
        || coalesce(u.raw_user_meta_data->>'last_name', '')
      ),
      ''
    ) as volunteer_name
  from public.hours_entries h
  join auth.users u on u.id = h.user_id
  where h.status = 'pending'
    and public.is_admin()
  order by h.created_at asc;
$$;

revoke all on function public.get_pending_hours_with_volunteer() from public;
grant execute on function public.get_pending_hours_with_volunteer() to authenticated;
