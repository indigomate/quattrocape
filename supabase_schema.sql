-- QuattroCape Supabase Schema
-- Use this in the Supabase SQL Editor (https://supabase.com/dashboard/project/eobzmqrkvpnbfyjkdlhf/sql)

-- 1. Create the 'leads' table for bookings and enquiries
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'contacted', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 3. Define Security Policies

-- Policy: Allow any visitor to submit a booking/lead
CREATE POLICY "Enable insert for anonymous users" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only allow authenticated admins to view and manage leads
CREATE POLICY "Enable all actions for authenticated admins" ON leads
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Storage for User Profile / Admin settings (Optional)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- 5. Indexes for faster search
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
