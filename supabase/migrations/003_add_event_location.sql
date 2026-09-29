alter table public.invitations
  add column if not exists venue_address text,
  add column if not exists maps_url text;