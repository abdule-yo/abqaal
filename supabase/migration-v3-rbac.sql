-- ============================================================
-- Abqaal Dashboard V3 — Role-Based Access Control
-- Roles: super_admin, admin, editor
-- super_admin: full CRUD + user management
-- admin: create, read, update (no delete)
-- editor: read-only dashboard access
-- ============================================================

-- 1. Create enum for roles
DO $$ BEGIN
  CREATE TYPE admin_role AS ENUM ('super_admin', 'admin', 'editor');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Admin users table (linked to auth.users)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  role admin_role NOT NULL DEFAULT 'editor',
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id),
  UNIQUE(email)
);

CREATE INDEX idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX idx_admin_users_role ON admin_users(role);

-- Updated_at trigger
CREATE TRIGGER set_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 3. RLS for admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read admin_users (to check roles)
CREATE POLICY "admin_users_auth_read" ON admin_users
  FOR SELECT TO authenticated USING (true);

-- Only super_admins can insert new admin users
CREATE POLICY "admin_users_super_insert" ON admin_users
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Only super_admins can update admin users
CREATE POLICY "admin_users_super_update" ON admin_users
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Only super_admins can delete admin users (but not themselves)
CREATE POLICY "admin_users_super_delete" ON admin_users
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
    AND user_id != auth.uid()
  );

-- 4. Helper function to get current user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS admin_role AS $$
  SELECT role FROM admin_users WHERE user_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 5. Update existing table RLS policies for role-based delete
-- Drop old permissive delete policies and replace with role-checked ones

-- Projects: only super_admin can delete
DROP POLICY IF EXISTS "projects_auth_delete" ON projects;
CREATE POLICY "projects_role_delete" ON projects
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Products: only super_admin can delete
DROP POLICY IF EXISTS "products_auth_delete" ON products;
CREATE POLICY "products_role_delete" ON products
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Categories: only super_admin can delete
DROP POLICY IF EXISTS "categories_auth_delete" ON categories;
CREATE POLICY "categories_role_delete" ON categories
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Gallery: only super_admin can delete
DROP POLICY IF EXISTS "gallery_auth_delete" ON gallery;
CREATE POLICY "gallery_role_delete" ON gallery
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Testimonials: only super_admin can delete
DROP POLICY IF EXISTS "testimonials_auth_delete" ON testimonials;
CREATE POLICY "testimonials_role_delete" ON testimonials
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- ============================================================
-- IMPORTANT: After running this migration, seed your first
-- super_admin by running:
--
-- INSERT INTO admin_users (user_id, email, name, role)
-- VALUES (
--   '<your-auth-user-uuid>',
--   'your-email@example.com',
--   'Your Name',
--   'super_admin'
-- );
--
-- Find your user_id in Supabase Dashboard > Authentication > Users
-- ============================================================
