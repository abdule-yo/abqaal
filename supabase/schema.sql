-- ============================================================
-- Abqaal Admin Dashboard — Database Schema
-- Run this in Supabase SQL Editor (supabase.com > SQL Editor)
-- ============================================================

-- 1. Create enum for project status
CREATE TYPE project_status AS ENUM ('Completed', 'Ongoing', 'Upcoming');

-- 2. Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL,
  partner TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  year INT NOT NULL,
  category TEXT NOT NULL,
  impact TEXT[] DEFAULT '{}',
  duration TEXT NOT NULL,
  status project_status NOT NULL DEFAULT 'Upcoming'
);

-- 3. Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT DEFAULT '',
  price TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  highlights TEXT[] DEFAULT '{}'
);

-- 4. Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 5. Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view)
CREATE POLICY "Public read projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read products" ON products
  FOR SELECT USING (true);

-- Authenticated users can manage (insert, update, delete)
CREATE POLICY "Auth manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth manage products" ON products
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 6. Indexes for common queries
CREATE INDEX idx_projects_slug ON projects (slug);
CREATE INDEX idx_projects_status ON projects (status);
CREATE INDEX idx_projects_category ON projects (category);
CREATE INDEX idx_products_slug ON products (slug);
CREATE INDEX idx_products_category ON products (category);
CREATE INDEX idx_products_featured ON products (featured);
