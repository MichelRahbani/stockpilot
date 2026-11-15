-- Debit/Credit Blitz and Supply Chain Showdown score tables.
-- Run once in the Supabase SQL editor.
CREATE TABLE IF NOT EXISTS bullpen_blitz_scores (
  id bigserial PRIMARY KEY,
  player_name text NOT NULL,
  score integer NOT NULL,
  created_at timestamptz DEFAULT now()
);
CREATE TABLE IF NOT EXISTS bullpen_supply_scores (
  id bigserial PRIMARY KEY,
  player_name text NOT NULL,
  score integer NOT NULL,
  seed text NOT NULL,
  profit integer,
  lost_units integer,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS bullpen_supply_scores_seed_idx ON bullpen_supply_scores (seed, score DESC);
ALTER TABLE bullpen_blitz_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE bullpen_supply_scores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "blitz read" ON bullpen_blitz_scores;
DROP POLICY IF EXISTS "blitz add" ON bullpen_blitz_scores;
DROP POLICY IF EXISTS "supply read" ON bullpen_supply_scores;
DROP POLICY IF EXISTS "supply add" ON bullpen_supply_scores;
CREATE POLICY "blitz read" ON bullpen_blitz_scores FOR SELECT USING (true);
CREATE POLICY "blitz add" ON bullpen_blitz_scores FOR INSERT WITH CHECK (char_length(player_name) BETWEEN 1 AND 20 AND score BETWEEN 0 AND 5000);
CREATE POLICY "supply read" ON bullpen_supply_scores FOR SELECT USING (true);
CREATE POLICY "supply add" ON bullpen_supply_scores FOR INSERT WITH CHECK (char_length(player_name) BETWEEN 1 AND 20 AND char_length(seed) BETWEEN 1 AND 20 AND score BETWEEN -100000 AND 100000);
