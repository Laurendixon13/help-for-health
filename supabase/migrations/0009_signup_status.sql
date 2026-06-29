-- Track whether a signup is a firm commitment or just "considering it,"
-- so volunteers can sort their list and admins can see real interest.

alter table public.opportunity_signups
  add column if not exists status text not null default 'signed_up'
  check (status in ('signed_up', 'considering'));

create index if not exists opportunity_signups_user_status_idx
  on public.opportunity_signups (user_id, status);
