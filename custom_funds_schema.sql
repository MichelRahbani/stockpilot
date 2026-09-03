-- Custom Funds: lets a user build their own ETF-style basket (stocks) or
-- a crypto index, with real component tickers and chosen weights. The
-- fund then trades inside the Virtual Market like any other ticker -
-- its live price is computed from real component prices, not stored.
CREATE TABLE IF NOT EXISTS custom_funds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,         -- short shareable code, e.g. "F7K2M9"
  ticker text NOT NULL,               -- display ticker, e.g. "MYETF"
  name text NOT NULL,
  creator_name text,
  universe text NOT NULL DEFAULT 'stocks', -- 'stocks' or 'crypto'
  holdings jsonb NOT NULL,            -- [{ "ticker": "AAPL", "weight": 40 }, ...]
  starting_nav numeric NOT NULL DEFAULT 100,
  starting_prices jsonb NOT NULL,     -- { "AAPL": 234.12, ... } snapshot at creation
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_custom_funds_code ON custom_funds(code);
CREATE INDEX IF NOT EXISTS idx_custom_funds_ticker ON custom_funds(ticker);

ALTER TABLE custom_funds ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "custom_funds_all" ON custom_funds;
CREATE POLICY "custom_funds_all" ON custom_funds FOR ALL USING (true) WITH CHECK (true);
