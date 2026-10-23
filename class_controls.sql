-- Class controls for teachers: open/close a class, and turn student discussion off.
-- Run once in the Supabase SQL editor. Safe to run again. Existing classes stay
-- open with discussion on, exactly as they behave today.
alter table classes add column if not exists is_open boolean not null default true;
alter table classes add column if not exists discussion_enabled boolean not null default true;
