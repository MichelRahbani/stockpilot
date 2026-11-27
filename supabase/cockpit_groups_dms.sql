-- StockPilot Cockpit: groups and direct messages.
-- Run AFTER supabase/cockpit.sql. Safe to re-run.

-- ============ GROUPS ============
create table if not exists cockpit_groups (
  id uuid primary key default gen_random_uuid(),
  code text not null unique default upper(substr(md5(gen_random_uuid()::text), 1, 6)),
  name text not null check (char_length(name) between 2 and 50),
  description text not null default '' check (char_length(description) <= 200),
  visibility text not null default 'private' check (visibility in ('open','private')),
  created_by uuid not null default auth.uid(),
  member_count int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists cockpit_group_members (
  group_id uuid not null references cockpit_groups(id) on delete cascade,
  user_id uuid not null,
  display_name text not null check (char_length(display_name) between 1 and 40),
  role text not null default 'member' check (role in ('owner','member')),
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);
create index if not exists cockpit_group_members_user_idx on cockpit_group_members (user_id);

alter table cockpit_posts add column if not exists group_id uuid references cockpit_groups(id) on delete cascade;
create index if not exists cockpit_posts_group_idx on cockpit_posts (group_id, created_at desc);

create or replace function cockpit_is_member(gid uuid) returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from cockpit_group_members where group_id = gid and user_id = auth.uid())
$$;

create or replace function cockpit_member_count() returns trigger language plpgsql security definer set search_path = public as $$
begin
  update cockpit_groups g set member_count = (select count(*) from cockpit_group_members m where m.group_id = g.id)
   where g.id = coalesce(new.group_id, old.group_id);
  return null;
end $$;
drop trigger if exists cockpit_members_count on cockpit_group_members;
create trigger cockpit_members_count after insert or delete on cockpit_group_members for each row execute function cockpit_member_count();

alter table cockpit_groups enable row level security;
alter table cockpit_group_members enable row level security;

drop policy if exists "groups read"   on cockpit_groups;
drop policy if exists "groups delete" on cockpit_groups;
create policy "groups read"   on cockpit_groups for select using (visibility = 'open' or created_by = auth.uid() or cockpit_is_member(id));
create policy "groups delete" on cockpit_groups for delete to authenticated using (created_by = auth.uid());

drop policy if exists "members read"   on cockpit_group_members;
drop policy if exists "members delete" on cockpit_group_members;
create policy "members read"   on cockpit_group_members for select using (cockpit_is_member(group_id));
create policy "members delete" on cockpit_group_members for delete to authenticated using (
  user_id = auth.uid() or exists (select 1 from cockpit_groups g where g.id = group_id and g.created_by = auth.uid())
);

-- Creating and joining go through these functions so nobody can add themselves to a private group without its code.
create or replace function cockpit_create_group(p_name text, p_desc text, p_vis text, p_display text)
returns cockpit_groups language plpgsql security definer set search_path = public as $$
declare g cockpit_groups;
begin
  if auth.uid() is null then raise exception 'Sign in first'; end if;
  if lower(p_name) ~ '(stockpilot|admin|moderator|official)' then raise exception 'That group name is reserved'; end if;
  if (select count(*) from cockpit_groups where created_by = auth.uid()) >= 5 then raise exception 'Limit: 5 groups per person'; end if;
  insert into cockpit_groups (name, description, visibility, created_by)
    values (left(trim(p_name), 50), left(coalesce(p_desc, ''), 200), case when p_vis = 'open' then 'open' else 'private' end, auth.uid())
    returning * into g;
  insert into cockpit_group_members (group_id, user_id, display_name, role) values (g.id, auth.uid(), left(p_display, 40), 'owner');
  select * into g from cockpit_groups where id = g.id;
  return g;
end $$;

create or replace function cockpit_join_group(p_code text, p_display text)
returns cockpit_groups language plpgsql security definer set search_path = public as $$
declare g cockpit_groups;
begin
  if auth.uid() is null then raise exception 'Sign in first'; end if;
  select * into g from cockpit_groups where code = upper(trim(p_code));
  if not found then raise exception 'No group with that code'; end if;
  if (select count(*) from cockpit_group_members where group_id = g.id) >= 500 then raise exception 'That group is full'; end if;
  insert into cockpit_group_members (group_id, user_id, display_name, role) values (g.id, auth.uid(), left(p_display, 40), 'member')
    on conflict do nothing;
  select * into g from cockpit_groups where id = g.id;
  return g;
end $$;

grant execute on function cockpit_create_group(text, text, text, text) to authenticated;
grant execute on function cockpit_join_group(text, text) to authenticated;
grant select on cockpit_groups, cockpit_group_members to anon, authenticated;
grant delete on cockpit_groups, cockpit_group_members to authenticated;

-- Posts, replies and likes now respect group privacy
drop policy if exists "posts read"   on cockpit_posts;
drop policy if exists "posts insert" on cockpit_posts;
drop policy if exists "posts delete" on cockpit_posts;
create policy "posts read" on cockpit_posts for select using (
  hidden = false and (group_id is null or cockpit_is_member(group_id))
);
create policy "posts insert" on cockpit_posts for insert to authenticated with check (
  user_id = auth.uid() and hidden = false and (group_id is null or cockpit_is_member(group_id))
);
create policy "posts delete" on cockpit_posts for delete to authenticated using (
  user_id = auth.uid()
  or (group_id is not null and exists (select 1 from cockpit_groups g where g.id = group_id and g.created_by = auth.uid()))
);

drop policy if exists "replies read"   on cockpit_replies;
drop policy if exists "replies insert" on cockpit_replies;
create policy "replies read"   on cockpit_replies for select using (exists (select 1 from cockpit_posts p where p.id = post_id));
create policy "replies insert" on cockpit_replies for insert to authenticated with check (
  user_id = auth.uid() and exists (select 1 from cockpit_posts p where p.id = post_id)
);

drop policy if exists "likes read"   on cockpit_likes;
drop policy if exists "likes insert" on cockpit_likes;
create policy "likes read"   on cockpit_likes for select using (exists (select 1 from cockpit_posts p where p.id = post_id));
create policy "likes insert" on cockpit_likes for insert to authenticated with check (
  user_id = auth.uid() and exists (select 1 from cockpit_posts p where p.id = post_id)
);

-- ============ DIRECT MESSAGES ============
create table if not exists cockpit_profiles (
  user_id uuid primary key default auth.uid(),
  allow_dms boolean not null default false
);
create table if not exists cockpit_blocks (
  user_id uuid not null default auth.uid(),
  blocked_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (user_id, blocked_id)
);
create table if not exists cockpit_dms (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null default auth.uid(),
  recipient_id uuid not null,
  sender_name text not null check (char_length(sender_name) between 1 and 40),
  recipient_name text not null check (char_length(recipient_name) between 1 and 40),
  body text not null check (char_length(body) between 1 and 1000),
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists cockpit_dms_recipient_idx on cockpit_dms (recipient_id, created_at desc);
create index if not exists cockpit_dms_sender_idx on cockpit_dms (sender_id, created_at desc);
create table if not exists cockpit_dm_reports (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references cockpit_dms(id) on delete cascade,
  reporter_id uuid not null default auth.uid(),
  reason text,
  created_at timestamptz not null default now(),
  unique (message_id, reporter_id)
);

-- You can message someone if you share a group, or they allow messages from anyone, or they already messaged you.
-- Blocks always win.
create or replace function cockpit_can_dm(a uuid, b uuid) returns boolean
language sql security definer stable set search_path = public as $$
  select a <> b
    and not exists (select 1 from cockpit_blocks where (user_id = a and blocked_id = b) or (user_id = b and blocked_id = a))
    and (
      exists (select 1 from cockpit_group_members m1 join cockpit_group_members m2 on m1.group_id = m2.group_id
              where m1.user_id = a and m2.user_id = b)
      or coalesce((select allow_dms from cockpit_profiles where user_id = b), false)
      or exists (select 1 from cockpit_dms where sender_id = b and recipient_id = a)
    )
$$;

create or replace function cockpit_dm_guard() returns trigger language plpgsql security definer set search_path = public as $$
declare recent int;
begin
  if lower(new.sender_name) ~ '(stockpilot|admin|moderator|official)' then raise exception 'That display name is reserved'; end if;
  select count(*) into recent from cockpit_dms where sender_id = new.sender_id and created_at > now() - interval '1 hour';
  if recent >= 60 then raise exception 'Slow down: 60 messages per hour'; end if;
  return new;
end $$;
drop trigger if exists cockpit_dms_guard on cockpit_dms;
create trigger cockpit_dms_guard before insert on cockpit_dms for each row execute function cockpit_dm_guard();

alter table cockpit_profiles   enable row level security;
alter table cockpit_blocks     enable row level security;
alter table cockpit_dms        enable row level security;
alter table cockpit_dm_reports enable row level security;

drop policy if exists "profiles own read"   on cockpit_profiles;
drop policy if exists "profiles own insert" on cockpit_profiles;
drop policy if exists "profiles own update" on cockpit_profiles;
create policy "profiles own read"   on cockpit_profiles for select to authenticated using (user_id = auth.uid());
create policy "profiles own insert" on cockpit_profiles for insert to authenticated with check (user_id = auth.uid());
create policy "profiles own update" on cockpit_profiles for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "blocks own read"   on cockpit_blocks;
drop policy if exists "blocks own insert" on cockpit_blocks;
drop policy if exists "blocks own delete" on cockpit_blocks;
create policy "blocks own read"   on cockpit_blocks for select to authenticated using (user_id = auth.uid());
create policy "blocks own insert" on cockpit_blocks for insert to authenticated with check (user_id = auth.uid());
create policy "blocks own delete" on cockpit_blocks for delete to authenticated using (user_id = auth.uid());

drop policy if exists "dms read"   on cockpit_dms;
drop policy if exists "dms insert" on cockpit_dms;
drop policy if exists "dms mark read" on cockpit_dms;
create policy "dms read"   on cockpit_dms for select to authenticated using (sender_id = auth.uid() or recipient_id = auth.uid());
create policy "dms insert" on cockpit_dms for insert to authenticated with check (sender_id = auth.uid() and cockpit_can_dm(sender_id, recipient_id));
create policy "dms mark read" on cockpit_dms for update to authenticated using (recipient_id = auth.uid()) with check (recipient_id = auth.uid());

drop policy if exists "dm reports insert" on cockpit_dm_reports;
create policy "dm reports insert" on cockpit_dm_reports for insert to authenticated with check (
  reporter_id = auth.uid() and exists (select 1 from cockpit_dms d where d.id = message_id and d.recipient_id = auth.uid())
);
-- Reports have no read policy: only you can read them, in the dashboard.

grant select, insert, update on cockpit_profiles to authenticated;
grant select, insert, delete on cockpit_blocks to authenticated;
grant select, insert on cockpit_dms to authenticated;
revoke update on cockpit_dms from authenticated;
grant update (read_at) on cockpit_dms to authenticated;
grant insert on cockpit_dm_reports to authenticated;
