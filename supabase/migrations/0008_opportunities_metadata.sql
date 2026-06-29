-- Add an external source link and a volunteer age requirement to
-- opportunities, so the Opportunities page can show "Learn more" links and
-- group/filter by who can attend.

alter table public.opportunities
  add column if not exists source_url text,
  add column if not exists age_range text;
