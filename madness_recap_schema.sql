-- Stores a recap of the most recently closed Bullpen Madness round, so
-- every member sees what happened (best performer, who advanced, who was
-- eliminated) on their next visit - not just whoever clicked "close round".
ALTER TABLE bullpen_madness_tournaments ADD COLUMN IF NOT EXISTS last_round_recap jsonb;
