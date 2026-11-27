-- StockPilot Cockpit: follows, friends and group invites.
-- Run AFTER cockpit.sql and cockpit_groups_dms.sql. Safe to re-run.

-- ============ FOLLOWS ============
create table if not exists cockpit_follows (
  follower_id uuid not null default auth.uid(),
  followee_id uuid not null,
  follower_name text not null check (char_length(follower_name) between 1 and 40),
  followee_name text not null check (char_length(followee_name) between 1 and 40),
  created_at timestamptz not null default now(),
  primary key (follower_id, followee_id),
  check (follower_id <> followee_id)
);
create index if not exists cockpit_follows_followee_idx on cockpit_follows (followee_id);

create or replace function cockpit_follow_guard() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if lower(new.follower_name) ~ '(stockpilot|admin|moderator|official)' then raise exception 'That display name is reserved'; end if;
  if (select count(*) from cockpit_follows where follower_id = new.follower_id) >= 500 then raise exception 'Limit: you can follow up to 500 people'; end if;
  if cockpit_has_blocked(new.followee_id, new.follower_id) then raise exception 'You cannot follow this person'; end if;
  return new;
end $$;

create or replace function cockpit_has_blocked(by uuid, target uuid) returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from cockpit_blocks where user_id = by and blocked_id = target)
$$;
drop trigger if exists cockpit_follows_guard on cockpit_follows;
create trigger cockpit_follows_guard before insert on cockpit_follows for each row execute function cockpit_follow_guard();

alter table cockpit_follows enable row level security;
drop policy if exists "follows read"   on cockpit_follows;
drop policy if exists "follows insert" on cockpit_follows;
drop policy if exists "follows delete" on cockpit_follows;
create policy "follows read"   on cockpit_follows for select to authenticated using (follower_id = auth.uid() or followee_id = auth.uid());
create policy "follows insert" on cockpit_follows for insert to authenticated with check (follower_id = auth.uid());
create policy "follows delete" on cockpit_follows for delete to authenticated using (follower_id = auth.uid());
grant select, insert, delete on cockpit_follows to authenticated;

-- Friends = both people follow each other.
create or replace function cockpit_is_friend(a uuid, b uuid) returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from cockpit_follows where follower_id = a and followee_id = b)
     and exists (select 1 from cockpit_follows where follower_id = b and followee_id = a)
$$;

-- Friends can message each other. Same rules as before otherwise. Blocks always win.
create or replace function cockpit_can_dm(a uuid, b uuid) returns boolean
language sql security definer stable set search_path = public as $$
  select a <> b
    and not exists (select 1 from cockpit_blocks where (user_id = a and blocked_id = b) or (user_id = b and blocked_id = a))
    and (
      cockpit_is_friend(a, b)
      or exists (select 1 from cockpit_group_members m1 join cockpit_group_members m2 on m1.group_id = m2.group_id
                 where m1.user_id = a and m2.user_id = b)
      or coalesce((select allow_dms from cockpit_profiles where user_id = b), false)
      or exists (select 1 from cockpit_dms where sender_id = b and recipient_id = a)
    )
$$;

-- Blocking someone also removes any follow between you.
create or replace function cockpit_block_cleanup() returns trigger language plpgsql security definer set search_path = public as $$
begin
  delete from cockpit_follows where (follower_id = new.user_id and followee_id = new.blocked_id) or (follower_id = new.blocked_id and followee_id = new.user_id);
  return new;
end $$;
drop trigger if exists cockpit_blocks_cleanup on cockpit_blocks;
create trigger cockpit_blocks_cleanup after insert on cockpit_blocks for each row execute function cockpit_block_cleanup();

-- ============ GROUP INVITES ============
create table if not exists cockpit_group_invites (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references cockpit_groups(id) on delete cascade,
  group_name text not null,
  inviter_id uuid not null default auth.uid(),
  inviter_name text not null check (char_length(inviter_name) between 1 and 40),
  invitee_id uuid not null,
  created_at timestamptz not null default now(),
  unique (group_id, invitee_id)
);
create index if not exists cockpit_group_invites_invitee_idx on cockpit_group_invites (invitee_id);

alter table cockpit_group_invites enable row level security;
drop policy if exists "invites read"   on cockpit_group_invites;
drop policy if exists "invites delete" on cockpit_group_invites;
create policy "invites read"   on cockpit_group_invites for select to authenticated using (invitee_id = auth.uid() or inviter_id = auth.uid());
create policy "invites delete" on cockpit_group_invites for delete to authenticated using (invitee_id = auth.uid() or inviter_id = auth.uid());
grant select, delete on cockpit_group_invites to authenticated;

-- Members can invite their friends. Invites are created and accepted through these functions.
create or replace function cockpit_invite_to_group(p_group uuid, p_invitee uuid, p_inviter_name text)
returns boolean language plpgsql security definer set search_path = public as $$
declare gname text;
begin
  if auth.uid() is null then raise exception 'Sign in first'; end if;
  if not cockpit_is_member(p_group) then raise exception 'Only members can invite'; end if;
  if not cockpit_is_friend(auth.uid(), p_invitee) then raise exception 'You can only invite friends (you both follow each other)'; end if;
  if exists (select 1 from cockpit_group_members where group_id = p_group and user_id = p_invitee) then raise exception 'Already in the group'; end if;
  if (select count(*) from cockpit_group_invites where inviter_id = auth.uid() and created_at > now() - interval '1 hour') >= 30 then raise exception 'Slow down: 30 invites per hour'; end if;
  select name into gname from cockpit_groups where id = p_group;
  insert into cockpit_group_invites (group_id, group_name, inviter_id, inviter_name, invitee_id)
    values (p_group, gname, auth.uid(), left(p_inviter_name, 40), p_invitee)
    on conflict (group_id, invitee_id) do nothing;
  return true;
end $$;

create or replace function cockpit_accept_invite(p_invite uuid, p_display text)
returns cockpit_groups language plpgsql security definer set search_path = public as $$
declare inv cockpit_group_invites; g cockpit_groups;
begin
  select * into inv from cockpit_group_invites where id = p_invite and invitee_id = auth.uid();
  if not found then raise exception 'Invite not found'; end if;
  if (select count(*) from cockpit_group_members where group_id = inv.group_id) >= 500 then raise exception 'That group is full'; end if;
  insert into cockpit_group_members (group_id, user_id, display_name, role) values (inv.group_id, auth.uid(), left(p_display, 40), 'member') on conflict do nothing;
  delete from cockpit_group_invites where id = inv.id;
  select * into g from cockpit_groups where id = inv.group_id;
  return g;
end $$;

grant execute on function cockpit_invite_to_group(uuid, uuid, text) to authenticated;
grant execute on function cockpit_accept_invite(uuid, text) to authenticated;
