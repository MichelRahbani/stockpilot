-- Bullpen League currently has no way to know which leagues a logged-in
-- account belongs to - membership is only remembered on the device you
-- joined from (localStorage). This adds the same user_id link that
-- bullpen_showdown_entries already has, so My Account can list a
-- person's leagues the same way it already lists their Showdowns.
--
-- Existing rows will have user_id = NULL (joins made before this
-- migration can't be retroactively linked) - only joins/creates going
-- forward will populate it, once the app code is updated to set it.

ALTER TABLE bullpen_members ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

CREATE INDEX IF NOT EXISTS idx_bullpen_members_user_id ON bullpen_members(user_id);

-- Showdown and 1v1 Duels share the same tournaments/entries tables (a
-- duel is just a showdown capped at 2 people), but My Account needs to
-- tell them apart to list them separately rather than lumping 1v1s in
-- with open-pool Showdowns.
ALTER TABLE bullpen_showdown_tournaments ADD COLUMN IF NOT EXISTS game_type text NOT NULL DEFAULT 'showdown';
