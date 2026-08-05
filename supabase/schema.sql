create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text unique,
  role text not null default 'user' check (role in ('admin', 'user')),
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  slug text unique,
  event_date date,
  location text,
  status text not null default 'draft' check (status in ('draft', 'sent', 'opened', 'rsvp')),
  recipient_count integer default 0,
  bride_first_name text,
  bride_last_name text,
  groom_first_name text,
  groom_last_name text,
  event_time text,
  venue_name text,
  venue_address text,
  message text,
  rsvp_deadline date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  title text,
  image_url text not null,
  caption text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  event_type text,
  event_date date,
  event_time text,
  venue_name text,
  venue_address text,
  details text,
  created_at timestamptz default now()
);

create table if not exists public.rsvp (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  guest_name text not null,
  email text,
  phone text,
  attending boolean default true,
  note text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'declined')),
  created_at timestamptz default now()
);

create index if not exists invitations_user_id_idx on public.invitations(user_id);
create index if not exists gallery_invitation_id_idx on public.gallery(invitation_id);
create index if not exists events_invitation_id_idx on public.events(invitation_id);
create index if not exists rsvp_invitation_id_idx on public.rsvp(invitation_id);
