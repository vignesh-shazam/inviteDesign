alter table public.invitations
  add column if not exists ai_design jsonb;
