ALTER TABLE virtual_portfolios ADD COLUMN IF NOT EXISTS portfolio_cn jsonb;
ALTER TABLE virtual_portfolios ADD COLUMN IF NOT EXISTS portfolio_kr jsonb;
