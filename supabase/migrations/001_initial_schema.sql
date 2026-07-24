-- Doolenses Lead Generation Schema
-- Run in Supabase SQL Editor or via CLI migrations

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_type TEXT,
  event_date DATE,
  event_location TEXT,
  budget_range TEXT,
  message TEXT,
  source TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  contacted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);
CREATE INDEX IF NOT EXISTS leads_source_idx ON leads (source);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  features TEXT[],
  image_url TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 0
);

-- Portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  client_name TEXT,
  location TEXT,
  image_url TEXT[],
  event_date DATE,
  featured BOOLEAN DEFAULT FALSE
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Public read for catalogue tables
CREATE POLICY "Public can read services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read portfolio"
  ON portfolio FOR SELECT
  TO anon, authenticated
  USING (true);

-- Leads: no public SELECT. Inserts go through service role in server actions.
-- Optional: allow anon insert if you prefer client-side inserts with RLS.
-- CREATE POLICY "Anyone can insert leads"
--   ON leads FOR INSERT
--   TO anon, authenticated
--   WITH CHECK (true);

-- Service role bypasses RLS for lead inserts from Next.js server actions.
