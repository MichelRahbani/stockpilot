-- Bullpen Tycoon: a solo, progression-based mode. Real stocks, real
-- prices - "cash" (net worth) unlocks new countries, each revealing
-- real companies as collectible cards.

CREATE TABLE IF NOT EXISTS tycoon_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  device_id text, -- fallback identity for guests not signed in
  starting_cash numeric NOT NULL DEFAULT 10000,
  cash numeric NOT NULL DEFAULT 10000, -- uninvested cash on hand
  unlocked_countries text[] NOT NULL DEFAULT ARRAY['usa'],
  missions_completed text[] NOT NULL DEFAULT ARRAY[]::text[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_tycoon_players_user_id ON tycoon_players(user_id);
CREATE INDEX IF NOT EXISTS idx_tycoon_players_device_id ON tycoon_players(device_id);

CREATE TABLE IF NOT EXISTS tycoon_holdings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES tycoon_players(id) ON DELETE CASCADE,
  ticker text NOT NULL,
  shares numeric NOT NULL DEFAULT 0,
  avg_cost numeric NOT NULL DEFAULT 0,
  first_bought_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(player_id, ticker)
);
CREATE INDEX IF NOT EXISTS idx_tycoon_holdings_player_id ON tycoon_holdings(player_id);

ALTER TABLE tycoon_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE tycoon_holdings ENABLE ROW LEVEL SECURITY;

-- Anyone can read/write their own row via the anon key (same public
-- pattern the rest of Bullpen uses) - guests are identified by
-- device_id, signed-in users by user_id, matched client-side.
-- CREATE POLICY doesn't support IF NOT EXISTS in Postgres, so drop
-- first to keep this safely re-runnable.
DROP POLICY IF EXISTS "tycoon_players_all" ON tycoon_players;
CREATE POLICY "tycoon_players_all" ON tycoon_players FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "tycoon_holdings_all" ON tycoon_holdings;
CREATE POLICY "tycoon_holdings_all" ON tycoon_holdings FOR ALL USING (true) WITH CHECK (true);
