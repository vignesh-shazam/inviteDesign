create extension if not exists "pgcrypto";

create sequence if not exists public.wish_card_id_seq
  start 1
  increment 1;

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),

  card_id text not null unique default (
    'wish' ||
    lpad(
      nextval('public.wish_card_id_seq')::text,
      6,
      '0'
    )
  ),

  recipient_name  text not null,
  relationship    text not null,
  occasion        text not null,
  sender_name     text,
  custom_message  text,
  ai_prompt       text,

  selected_style       text not null,
  selected_mood        text not null,
  selected_color_theme text not null,

  title         text not null,
  message       text not null,
  short_message text not null,
  signature     text not null,

  design_config    jsonb not null default '{}'::jsonb,
  animation_config jsonb not null default '{}'::jsonb,

  status text not null default 'draft'
    check (status in ('draft', 'published')),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists wishes_card_id_idx  on public.wishes (card_id);
create index if not exists wishes_status_idx   on public.wishes (status);
create index if not exists wishes_occasion_idx on public.wishes (occasion);

-- Reactions table
create table if not exists public.wish_reactions (
  id         uuid primary key default gen_random_uuid(),
  wish_id    uuid not null references public.wishes (id) on delete cascade,
  reaction   text not null default 'like'
    check (reaction in ('like', 'love', 'celebrate', 'happy')),
  session_id text,
  created_at timestamptz not null default now()
);

create index if not exists wish_reactions_wish_id_idx on public.wish_reactions (wish_id);
