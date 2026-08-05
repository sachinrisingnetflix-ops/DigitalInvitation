alter table public.users enable row level security;
alter table public.invitations enable row level security;
alter table public.gallery enable row level security;
alter table public.events enable row level security;
alter table public.rsvp enable row level security;

create policy "Users can view own profile"
on public.users
for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.users
for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on public.users
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can manage their invitations"
on public.invitations
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can manage gallery for their invitations"
on public.gallery
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can manage events for their invitations"
on public.events
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Authenticated users can view RSVPs for their invitations"
on public.rsvp
for select
using (
  auth.uid() is not null and invitation_id in (
    select id from public.invitations where user_id = auth.uid()
  )
);

create policy "Anyone can submit an RSVP"
on public.rsvp
for insert
with check (true);

create policy "Users can update RSVPs for their invitations"
on public.rsvp
for update
using (
  invitation_id in (
    select id from public.invitations where user_id = auth.uid()
  )
);
