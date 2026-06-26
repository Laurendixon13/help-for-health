-- Leaderboard of top volunteers by approved hours.
-- Wrapped as a SECURITY DEFINER function so it can read auth.users without
-- granting blanket access to the auth schema. Returns first name + last
-- initial only — no emails.

create or replace function public.get_volunteer_leaderboard(limit_count int default 10)
returns table (
  user_id uuid,
  display_name text,
  total_hours numeric,
  monthly_hours numeric
)
language sql
security definer
set search_path = public, auth
as $$
  select
    h.user_id,
    coalesce(
      nullif(trim(u.raw_user_meta_data->>'first_name'), ''),
      split_part(u.email, '@', 1)
    )
      || case
           when nullif(trim(u.raw_user_meta_data->>'last_name'), '') is not null
             then ' ' || left(trim(u.raw_user_meta_data->>'last_name'), 1) || '.'
           else ''
         end as display_name,
    sum(h.hours)::numeric as total_hours,
    sum(case
          when h.occurred_on >= date_trunc('month', current_date)
          then h.hours
          else 0
        end)::numeric as monthly_hours
  from public.hours_entries h
  join auth.users u on u.id = h.user_id
  where h.status = 'approved'
  group by h.user_id, u.raw_user_meta_data, u.email
  order by total_hours desc
  limit greatest(1, least(limit_count, 100));
$$;

revoke all on function public.get_volunteer_leaderboard(int) from public;
grant execute on function public.get_volunteer_leaderboard(int) to authenticated;
