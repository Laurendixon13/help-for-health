-- Self-service request flow for admin access. Anyone signed in can request
-- admin access (typically chapter leaders or hospital partners); existing
-- admins approve or decline from the admin review screen.

create table if not exists public.admin_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  reason text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  unique (user_id)
);

create index if not exists admin_requests_status_idx
  on public.admin_requests (status, created_at desc);

alter table public.admin_requests enable row level security;

create policy "own admin requests are readable"
  on public.admin_requests for select
  using (auth.uid() = user_id);

create policy "own admin requests are insertable"
  on public.admin_requests for insert
  with check (auth.uid() = user_id);

create policy "admins can read all admin requests"
  on public.admin_requests for select
  using (public.is_admin());

create policy "admins can update admin requests"
  on public.admin_requests for update
  using (public.is_admin())
  with check (public.is_admin());

-- Promote a user to admin. Gated on the caller being an admin since the
-- function is SECURITY DEFINER and would otherwise let anyone grant the role.
create or replace function public.promote_user_to_admin(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_admin() then
    raise exception 'Only admins can promote users';
  end if;
  update auth.users
    set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
                              || jsonb_build_object('role', 'admin')
    where id = target_user_id;
end;
$$;

revoke all on function public.promote_user_to_admin(uuid) from public;
grant execute on function public.promote_user_to_admin(uuid) to authenticated;

-- Read pending admin requests with the requester's email and name for review.
create or replace function public.get_pending_admin_requests()
returns table (
  id uuid,
  user_id uuid,
  reason text,
  created_at timestamptz,
  user_email text,
  user_name text
)
language sql
stable
security definer
set search_path = public, auth
as $$
  select
    r.id,
    r.user_id,
    r.reason,
    r.created_at,
    u.email,
    nullif(
      trim(
        coalesce(u.raw_user_meta_data->>'first_name', '')
        || ' '
        || coalesce(u.raw_user_meta_data->>'last_name', '')
      ),
      ''
    )
  from public.admin_requests r
  join auth.users u on u.id = r.user_id
  where r.status = 'pending'
    and public.is_admin()
  order by r.created_at asc;
$$;

revoke all on function public.get_pending_admin_requests() from public;
grant execute on function public.get_pending_admin_requests() to authenticated;
