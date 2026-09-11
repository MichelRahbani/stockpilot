-- Bullpen Team Mode - teams of up to 20 compete against as many other
-- teams as possible within one competition. Team score is the AVERAGE
-- return of its members (not the sum), so team size doesn't distort
-- rankings - a 3-person team and a 20-person team compete fairly.

CREATE TABLE IF NOT EXISTS bullpen_team_competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  creator_name text,
  market text NOT NULL DEFAULT 'us',
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bullpen_teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id uuid NOT NULL REFERENCES bullpen_team_competitions(id) ON DELETE CASCADE,
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  captain_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bullpen_team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL REFERENCES bullpen_teams(id) ON DELETE CASCADE,
  user_id uuid,
  name text NOT NULL,
  starters jsonb NOT NULL DEFAULT '[]',
  cash numeric NOT NULL DEFAULT 100000,
  starting_cash numeric NOT NULL DEFAULT 100000,
  holdings jsonb NOT NULL DEFAULT '{}',
  joined_at timestamptz NOT NULL DEFAULT now()
);

-- Enforces the 20-person team cap at the database level, not just in
-- the UI - a direct API call couldn't bypass it either.
CREATE OR REPLACE FUNCTION check_team_member_cap() RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM bullpen_team_members WHERE team_id = NEW.team_id) >= 20 THEN
    RAISE EXCEPTION 'This team is full (20 member max)';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_team_member_cap ON bullpen_team_members;
CREATE TRIGGER enforce_team_member_cap
  BEFORE INSERT ON bullpen_team_members
  FOR EACH ROW EXECUTE FUNCTION check_team_member_cap();
