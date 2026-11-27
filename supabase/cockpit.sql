-- StockPilot Cockpit: public feed. Run once in Supabase, SQL Editor.
-- Safe to re-run.

create table if not exists cockpit_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  author_name text not null check (char_length(author_name) between 1 and 40),
  body text not null check (char_length(body) between 1 and 500),
  tickers text[] not null default '{}',
  sentiment text check (sentiment in ('bull','bear')),
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists cockpit_posts_created_idx on cockpit_posts (created_at desc);
create index if not exists cockpit_posts_tickers_idx on cockpit_posts using gin (tickers);

create table if not exists cockpit_replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references cockpit_posts(id) on delete cascade,
  user_id uuid not null default auth.uid(),
  author_name text not null check (char_length(author_name) between 1 and 40),
  body text not null check (char_length(body) between 1 and 300),
  created_at timestamptz not null default now()
);
create index if not exists cockpit_replies_post_idx on cockpit_replies (post_id, created_at);

create table if not exists cockpit_likes (
  post_id uuid not null references cockpit_posts(id) on delete cascade,
  user_id uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create table if not exists cockpit_reports (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references cockpit_posts(id) on delete cascade,
  user_id uuid not null default auth.uid(),
  reason text,
  created_at timestamptz not null default now(),
  unique (post_id, user_id)
);

-- Row level security
alter table cockpit_posts   enable row level security;
alter table cockpit_replies enable row level security;
alter table cockpit_likes   enable row level security;
alter table cockpit_reports enable row level security;

drop policy if exists "posts read"   on cockpit_posts;
drop policy if exists "posts insert" on cockpit_posts;
drop policy if exists "posts delete" on cockpit_posts;
create policy "posts read"   on cockpit_posts for select using (hidden = false);
create policy "posts insert" on cockpit_posts for insert to authenticated with check (user_id = auth.uid() and hidden = false);
create policy "posts delete" on cockpit_posts for delete to authenticated using (user_id = auth.uid());

drop policy if exists "replies read"   on cockpit_replies;
drop policy if exists "replies insert" on cockpit_replies;
drop policy if exists "replies delete" on cockpit_replies;
create policy "replies read"   on cockpit_replies for select using (true);
create policy "replies insert" on cockpit_replies for insert to authenticated with check (user_id = auth.uid());
create policy "replies delete" on cockpit_replies for delete to authenticated using (user_id = auth.uid());

drop policy if exists "likes read"   on cockpit_likes;
drop policy if exists "likes insert" on cockpit_likes;
drop policy if exists "likes delete" on cockpit_likes;
create policy "likes read"   on cockpit_likes for select using (true);
create policy "likes insert" on cockpit_likes for insert to authenticated with check (user_id = auth.uid());
create policy "likes delete" on cockpit_likes for delete to authenticated using (user_id = auth.uid());

drop policy if exists "reports insert" on cockpit_reports;
create policy "reports insert" on cockpit_reports for insert to authenticated with check (user_id = auth.uid());
-- no select policy on reports: only you can read them, in the dashboard.

-- Guard rails: reserved names and a posting rate limit
create or replace function cockpit_guard() returns trigger language plpgsql security definer set search_path = public as $$
declare recent int;
begin
  if lower(new.author_name) ~ '(stockpilot|admin|moderator|official)' then
    raise exception 'That display name is reserved';
  end if;
  if tg_table_name = 'cockpit_posts' then
    select count(*) into recent from cockpit_posts where user_id = new.user_id and created_at > now() - interval '1 hour';
    if recent >= 10 then raise exception 'Slow down: 10 posts per hour'; end if;
  else
    select count(*) into recent from cockpit_replies where user_id = new.user_id and created_at > now() - interval '1 hour';
    if recent >= 30 then raise exception 'Slow down: 30 replies per hour'; end if;
  end if;
  return new;
end $$;
drop trigger if exists cockpit_posts_guard on cockpit_posts;
create trigger cockpit_posts_guard before insert on cockpit_posts for each row execute function cockpit_guard();
drop trigger if exists cockpit_replies_guard on cockpit_replies;
create trigger cockpit_replies_guard before insert on cockpit_replies for each row execute function cockpit_guard();

-- Auto-hide a post once 3 different people report it
create or replace function cockpit_autohide() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(distinct user_id) from cockpit_reports where post_id = new.post_id) >= 3 then
    update cockpit_posts set hidden = true where id = new.post_id;
  end if;
  return new;
end $$;
drop trigger if exists cockpit_reports_autohide on cockpit_reports;
create trigger cockpit_reports_autohide after insert on cockpit_reports for each row execute function cockpit_autohide();

grant select on cockpit_posts, cockpit_replies, cockpit_likes to anon, authenticated;
grant insert, delete on cockpit_posts, cockpit_replies, cockpit_likes to authenticated;
grant insert on cockpit_reports to authenticated;
