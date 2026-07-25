-- Doolenses Admin Operating System schema
-- Profiles + CRM + production + finance + ops

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Staff profiles (1:1 with auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'manager', 'staff', 'technician')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'staff')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_active = TRUE
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_manager()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_active = TRUE AND role IN ('admin', 'manager')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_active = TRUE AND role = 'admin'
  );
$$;

-- Leads (website + CRM)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  event_type TEXT,
  event_date DATE,
  event_location TEXT,
  budget_range TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'quoted', 'negotiating', 'booked', 'completed', 'lost')),
  priority TEXT NOT NULL DEFAULT 'normal'
    CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  assigned_to UUID REFERENCES public.profiles(id),
  notes TEXT,
  contacted_at TIMESTAMPTZ,
  quoted_at TIMESTAMPTZ,
  quote_amount DECIMAL(12,2),
  booked_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  lost_reason TEXT,
  created_by UUID REFERENCES public.profiles(id)
);

CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);
CREATE INDEX IF NOT EXISTS leads_priority_idx ON leads (priority);
CREATE INDEX IF NOT EXISTS leads_source_idx ON leads (source);
CREATE INDEX IF NOT EXISTS leads_assigned_to_idx ON leads (assigned_to);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_event_date_idx ON leads (event_date);

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT,
  client_email TEXT,
  project_name TEXT NOT NULL,
  project_type TEXT,
  description TEXT,
  event_date DATE,
  event_location TEXT,
  status TEXT NOT NULL DEFAULT 'planning'
    CHECK (status IN ('planning', 'pre_production', 'production', 'post_production', 'delivered', 'completed')),
  priority TEXT NOT NULL DEFAULT 'normal'
    CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  start_date DATE,
  estimated_completion DATE,
  actual_completion DATE,
  budget DECIMAL(12,2),
  actual_cost DECIMAL(12,2),
  assigned_team UUID[] DEFAULT '{}',
  notes TEXT,
  completed_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id)
);

CREATE INDEX IF NOT EXISTS projects_status_idx ON projects (status);
CREATE INDEX IF NOT EXISTS projects_event_date_idx ON projects (event_date);
CREATE INDEX IF NOT EXISTS projects_lead_id_idx ON projects (lead_id);

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

CREATE TABLE IF NOT EXISTS project_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES public.profiles(id),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'in_progress', 'completed', 'blocked')),
  priority TEXT NOT NULL DEFAULT 'normal'
    CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  due_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_tasks_project_id_idx ON project_tasks (project_id);

-- Equipment
CREATE TABLE IF NOT EXISTS equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  item_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other'
    CHECK (category IN ('camera', 'audio', 'lighting', 'grip', 'editing', 'studio', 'other')),
  description TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  available INTEGER NOT NULL DEFAULT 1,
  condition TEXT NOT NULL DEFAULT 'good'
    CHECK (condition IN ('excellent', 'good', 'fair', 'needs_repair')),
  location TEXT,
  notes TEXT
);

CREATE TRIGGER equipment_updated_at
  BEFORE UPDATE ON equipment
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

CREATE TABLE IF NOT EXISTS equipment_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id UUID NOT NULL REFERENCES public.equipment(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES public.profiles(id),
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  returned_at TIMESTAMPTZ,
  notes TEXT
);

-- Finance
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  invoice_number TEXT UNIQUE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  tax DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  paid_at TIMESTAMPTZ,
  payment_method TEXT
    CHECK (payment_method IS NULL OR payment_method IN ('cash', 'mobile_money', 'bank_transfer', 'card', 'cheque')),
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id)
);

CREATE INDEX IF NOT EXISTS invoices_status_idx ON invoices (status);
CREATE INDEX IF NOT EXISTS invoices_due_date_idx ON invoices (due_date);

CREATE TRIGGER invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(12,2) NOT NULL,
  total DECIMAL(12,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL DEFAULT 'other'
    CHECK (category IN ('equipment', 'supplies', 'transport', 'salaries', 'utilities', 'rent', 'marketing', 'other')),
  description TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  vendor TEXT,
  receipt_url TEXT,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  approved_by UUID REFERENCES public.profiles(id),
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id)
);

CREATE TABLE IF NOT EXISTS team_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  shift TEXT NOT NULL DEFAULT 'full_day'
    CHECK (shift IN ('morning', 'afternoon', 'evening', 'full_day')),
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS team_schedule_date_idx ON team_schedule (date);
CREATE INDEX IF NOT EXISTS team_schedule_user_id_idx ON team_schedule (user_id);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'system'
    CHECK (type IN ('lead', 'project', 'invoice', 'equipment', 'task', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  read_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications (user_id, read);

CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  user_agent TEXT
);

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

CREATE TABLE IF NOT EXISTS company_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  company_name TEXT NOT NULL DEFAULT 'Doolenses',
  legal_name TEXT DEFAULT 'Doolenses Media',
  email TEXT DEFAULT 'doolenses@gmail.com',
  phone TEXT DEFAULT '0556195581',
  office_phone TEXT DEFAULT '0303963158',
  address TEXT DEFAULT 'House No. 13, Mahogany Close, Near Mary-Lucy Hospital, Awoshie, Accra, Ghana',
  tagline TEXT DEFAULT 'Creative Work, For Creative People',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO company_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Staff can view profiles"
  ON profiles FOR SELECT TO authenticated
  USING (public.is_staff());

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins manage profiles"
  ON profiles FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Leads
CREATE POLICY "Staff can view leads"
  ON leads FOR SELECT TO authenticated
  USING (public.is_staff());

CREATE POLICY "Staff can insert leads"
  ON leads FOR INSERT TO authenticated
  WITH CHECK (public.is_staff());

CREATE POLICY "Staff can update leads"
  ON leads FOR UPDATE TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

CREATE POLICY "Managers can delete leads"
  ON leads FOR DELETE TO authenticated
  USING (public.is_admin_or_manager());

-- Projects + tasks
CREATE POLICY "Staff can view projects"
  ON projects FOR SELECT TO authenticated USING (public.is_staff());
CREATE POLICY "Staff can insert projects"
  ON projects FOR INSERT TO authenticated WITH CHECK (public.is_staff());
CREATE POLICY "Staff can update projects"
  ON projects FOR UPDATE TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "Managers can delete projects"
  ON projects FOR DELETE TO authenticated USING (public.is_admin_or_manager());

CREATE POLICY "Staff can manage tasks"
  ON project_tasks FOR ALL TO authenticated
  USING (public.is_staff()) WITH CHECK (public.is_staff());

-- Equipment
CREATE POLICY "Staff can view equipment"
  ON equipment FOR SELECT TO authenticated USING (public.is_staff());
CREATE POLICY "Staff can manage equipment"
  ON equipment FOR ALL TO authenticated
  USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "Staff can manage equipment assignments"
  ON equipment_assignments FOR ALL TO authenticated
  USING (public.is_staff()) WITH CHECK (public.is_staff());

-- Finance
CREATE POLICY "Staff can view invoices"
  ON invoices FOR SELECT TO authenticated USING (public.is_staff());
CREATE POLICY "Staff can manage invoices"
  ON invoices FOR ALL TO authenticated
  USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "Staff can manage invoice items"
  ON invoice_items FOR ALL TO authenticated
  USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "Staff can manage expenses"
  ON expenses FOR ALL TO authenticated
  USING (public.is_staff()) WITH CHECK (public.is_staff());

-- Schedule / notifications / audit
CREATE POLICY "Staff can manage schedule"
  ON team_schedule FOR ALL TO authenticated
  USING (public.is_staff()) WITH CHECK (public.is_staff());

CREATE POLICY "Users manage own notifications"
  ON notifications FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Managers view audit log"
  ON audit_log FOR SELECT TO authenticated
  USING (public.is_admin_or_manager());

CREATE POLICY "Staff insert audit log"
  ON audit_log FOR INSERT TO authenticated
  WITH CHECK (public.is_staff());

-- Public catalogue
CREATE POLICY "Public can read services"
  ON services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can read portfolio"
  ON portfolio FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage services"
  ON services FOR ALL TO authenticated
  USING (public.is_admin_or_manager()) WITH CHECK (public.is_admin_or_manager());
CREATE POLICY "Admins manage portfolio"
  ON portfolio FOR ALL TO authenticated
  USING (public.is_admin_or_manager()) WITH CHECK (public.is_admin_or_manager());

CREATE POLICY "Staff can view settings"
  ON company_settings FOR SELECT TO authenticated USING (public.is_staff());
CREATE POLICY "Admins update settings"
  ON company_settings FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
