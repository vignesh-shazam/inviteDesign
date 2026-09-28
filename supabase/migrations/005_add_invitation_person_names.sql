alter table public.invitations
add column if not exists person1_name text,
add column if not exists person2_name text;