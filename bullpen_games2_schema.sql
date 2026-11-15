-- Cash Crunch, Spot the Error and Season league score tables. Run once in the Supabase SQL editor.
CREATE TABLE IF NOT EXISTS bullpen_crunch_scores (
  id bigserial PRIMARY KEY, player_name text NOT NULL, score integer NOT NULL, months integer, created_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS bullpen_spot_scores (
  id bigserial PRIMARY KEY, player_name text NOT NULL, puzzle_date date NOT NULL, score integer NOT NULL, created_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS bullpen_season_scores (
  id bigserial PRIMARY KEY, player_name text NOT NULL, league text NOT NULL, round integer NOT NULL, score integer NOT NULL, created_at timestamptz DEFAULT now());
CREATE UNIQUE INDEX IF NOT EXISTS bullpen_season_one_try ON bullpen_season_scores (league, round, lower(player_name));
CREATE INDEX IF NOT EXISTS bullpen_spot_day_idx ON bullpen_spot_scores (puzzle_date, score DESC);
ALTER TABLE bullpen_crunch_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE bullpen_spot_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE bullpen_season_scores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "crunch read" ON bullpen_crunch_scores;
DROP POLICY IF EXISTS "crunch add" ON bullpen_crunch_scores;
DROP POLICY IF EXISTS "spot read" ON bullpen_spot_scores;
DROP POLICY IF EXISTS "spot add" ON bullpen_spot_scores;
DROP POLICY IF EXISTS "season read" ON bullpen_season_scores;
DROP POLICY IF EXISTS "season add" ON bullpen_season_scores;
CREATE POLICY "crunch read" ON bullpen_crunch_scores FOR SELECT USING (true);
CREATE POLICY "crunch add" ON bullpen_crunch_scores FOR INSERT WITH CHECK (char_length(player_name) BETWEEN 1 AND 20 AND score BETWEEN 0 AND 5000);
CREATE POLICY "spot read" ON bullpen_spot_scores FOR SELECT USING (true);
CREATE POLICY "spot add" ON bullpen_spot_scores FOR INSERT WITH CHECK (char_length(player_name) BETWEEN 1 AND 20 AND score BETWEEN 0 AND 1000);
CREATE POLICY "season read" ON bullpen_season_scores FOR SELECT USING (true);
CREATE POLICY "season add" ON bullpen_season_scores FOR INSERT WITH CHECK (char_length(player_name) BETWEEN 1 AND 20 AND char_length(league) BETWEEN 1 AND 16 AND round BETWEEN 1 AND 4 AND score BETWEEN -100000 AND 100000);
