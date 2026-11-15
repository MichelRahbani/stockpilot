-- Business games: Campaign Manager and Shield. Run once in the Supabase SQL editor.
CREATE TABLE IF NOT EXISTS bullpen_campaign_scores (
  id bigserial PRIMARY KEY,
  player_name text NOT NULL,
  score integer NOT NULL,
  seed text NOT NULL,
  created_at timestamptz DEFAULT now()
);
CREATE TABLE IF NOT EXISTS bullpen_shield_scores (
  id bigserial PRIMARY KEY,
  player_name text NOT NULL,
  score integer NOT NULL,
  seed text NOT NULL,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS bullpen_campaign_scores_seed_idx ON bullpen_campaign_scores (seed, score DESC);
CREATE INDEX IF NOT EXISTS bullpen_shield_scores_seed_idx ON bullpen_shield_scores (seed, score DESC);
ALTER TABLE bullpen_campaign_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE bullpen_shield_scores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "campaign read" ON bullpen_campaign_scores;
DROP POLICY IF EXISTS "campaign add" ON bullpen_campaign_scores;
DROP POLICY IF EXISTS "shield read" ON bullpen_shield_scores;
DROP POLICY IF EXISTS "shield add" ON bullpen_shield_scores;
CREATE POLICY "campaign read" ON bullpen_campaign_scores FOR SELECT USING (true);
CREATE POLICY "campaign add" ON bullpen_campaign_scores FOR INSERT WITH CHECK (char_length(player_name) BETWEEN 1 AND 20 AND char_length(seed) BETWEEN 1 AND 20 AND score BETWEEN -100000 AND 1000000);
CREATE POLICY "shield read" ON bullpen_shield_scores FOR SELECT USING (true);
CREATE POLICY "shield add" ON bullpen_shield_scores FOR INSERT WITH CHECK (char_length(player_name) BETWEEN 1 AND 20 AND char_length(seed) BETWEEN 1 AND 20 AND score BETWEEN 0 AND 1000000);
