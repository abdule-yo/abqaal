-- ============================================================
-- Abqaal Dashboard V2 Migration
-- New tables: categories, site_settings, gallery, testimonials
-- Modified tables: products (category_id FK), projects (cover_image, cover_color)
-- ============================================================

-- 1. Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_sort ON categories(sort_order);

-- 2. Add category_id FK to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE CASCADE;
CREATE INDEX idx_products_category_id ON products(category_id);

-- 3. Add cover_image and cover_color to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS cover_image TEXT DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS cover_color TEXT DEFAULT '';

-- 4. Site settings (key/value JSONB store)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_site_settings_key ON site_settings(key);

-- Seed hero_stats
INSERT INTO site_settings (key, value) VALUES (
  'hero_stats',
  '[
    {"value": 10, "suffix": "+", "label": "Years of Experience", "description": "Serving the Horn of Africa since 2016"},
    {"value": 12, "suffix": "", "label": "Regions Covered", "description": "Somaliland, Somalia & Ethiopia"},
    {"value": 5000, "suffix": "+", "label": "Farmers & Academics Trained", "description": "Through capacity building programs"},
    {"value": 317, "suffix": "", "label": "Projects Delivered", "description": "With trusted partners"}
  ]'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- 5. Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_gallery_sort ON gallery(sort_order);

-- 6. Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  quote TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_testimonials_sort ON testimonials(sort_order);

-- ============================================================
-- RLS Policies: Public read, authenticated write
-- ============================================================

-- Categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories_public_read" ON categories FOR SELECT USING (true);
CREATE POLICY "categories_auth_insert" ON categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "categories_auth_update" ON categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "categories_auth_delete" ON categories FOR DELETE TO authenticated USING (true);

-- Site Settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site_settings_public_read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "site_settings_auth_insert" ON site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "site_settings_auth_update" ON site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "site_settings_auth_delete" ON site_settings FOR DELETE TO authenticated USING (true);

-- Gallery
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gallery_public_read" ON gallery FOR SELECT USING (true);
CREATE POLICY "gallery_auth_insert" ON gallery FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "gallery_auth_update" ON gallery FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "gallery_auth_delete" ON gallery FOR DELETE TO authenticated USING (true);

-- Testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "testimonials_public_read" ON testimonials FOR SELECT USING (true);
CREATE POLICY "testimonials_auth_insert" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "testimonials_auth_update" ON testimonials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "testimonials_auth_delete" ON testimonials FOR DELETE TO authenticated USING (true);

-- ============================================================
-- Updated_at triggers
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_gallery_updated_at
  BEFORE UPDATE ON gallery
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
