create extension if not exists "pgcrypto";

create sequence if not exists public.invitation_card_id_seq
  start 1
  increment 1;

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),

  card_id text not null unique default (
    'cardid' ||
    lpad(
      nextval('public.invitation_card_id_seq')::text,
      6,
      '0'
    )
  ),

  slug text not null unique,

  title text not null,

  template_id text not null,

  category text not null,

  event_date date,

  event_time text,

  venue text,

  theme jsonb not null default '{}'::jsonb,

  typography jsonb not null default '{}'::jsonb,

  status text not null default 'draft'
    check (status in ('draft', 'published')),

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);

create index if not exists invitations_slug_idx
  on public.invitations (slug);

create index if not exists invitations_card_id_idx
  on public.invitations (card_id);

create index if not exists invitations_status_idx
  on public.invitations (status);

create index if not exists invitations_template_id_idx
  on public.invitations (template_id);