create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),

  invitation_id uuid not null
    references public.invitations(id)
    on delete cascade,

  guest_name text not null,

  attendance text not null
    check (attendance in ('attending', 'maybe', 'not_attending')),

  guest_count integer not null default 1
    check (guest_count >= 1 and guest_count <= 20),

  message text,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);

create index if not exists rsvps_invitation_id_idx
  on public.rsvps (invitation_id);

create index if not exists rsvps_attendance_idx
  on public.rsvps (attendance);