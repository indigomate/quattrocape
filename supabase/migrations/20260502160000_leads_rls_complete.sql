-- ============================================================================
-- COMPLETE public.leads RLS setup (run once in Supabase SQL Editor)
-- - No permissive FOR ALL / WITH CHECK (true) on INSERT
-- - Anon: validated INSERT only (booking form, guest)
-- - Authenticated: SELECT all (admin dashboard) + validated INSERT (booking while logged in)
-- - No UPDATE/DELETE for anon/authenticated unless you add policies later
-- ============================================================================

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.leads
  ALTER COLUMN created_at SET DEFAULT (now());

-- Tear down old / conflicting policies (adjust names in dashboard if these differ)
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.leads;
DROP POLICY IF EXISTS "anon_insert_leads_validated" ON public.leads;
DROP POLICY IF EXISTS "Enable all actions for authenticated staff" ON public.leads;
DROP POLICY IF EXISTS "authenticated_staff_select_leads" ON public.leads;
DROP POLICY IF EXISTS "authenticated_insert_leads_validated" ON public.leads;

-- Shared INSERT validation (matches BookingForm: Day, 3-Day, Weekly)
CREATE POLICY "anon_insert_leads_validated"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (
  length(trim(coalesce(name, ''))) BETWEEN 2 AND 200
  AND length(trim(coalesce(email, ''))) BETWEEN 5 AND 320
  AND position('@' IN trim(coalesce(email, ''))) > 1
  AND split_part(lower(trim(coalesce(email, ''))), '@', 2) LIKE '%.%'
  AND length(trim(coalesce(service, ''))) BETWEEN 1 AND 100
  AND trim(service) IN ('Day', '3-Day', 'Weekly')
  AND message IS NOT NULL
  AND length(trim(message)) BETWEEN 5 AND 10000
);

CREATE POLICY "authenticated_staff_select_leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "authenticated_insert_leads_validated"
ON public.leads
FOR INSERT
TO authenticated
WITH CHECK (
  length(trim(coalesce(name, ''))) BETWEEN 2 AND 200
  AND length(trim(coalesce(email, ''))) BETWEEN 5 AND 320
  AND position('@' IN trim(coalesce(email, ''))) > 1
  AND split_part(lower(trim(coalesce(email, ''))), '@', 2) LIKE '%.%'
  AND length(trim(coalesce(service, ''))) BETWEEN 1 AND 100
  AND trim(service) IN ('Day', '3-Day', 'Weekly')
  AND message IS NOT NULL
  AND length(trim(message)) BETWEEN 5 AND 10000
);

COMMENT ON POLICY "anon_insert_leads_validated" ON public.leads IS 'Guest booking via anon key; validated fields only.';
COMMENT ON POLICY "authenticated_staff_select_leads" ON public.leads IS 'Staff dashboard read-only.';
COMMENT ON POLICY "authenticated_insert_leads_validated" ON public.leads IS 'Booking form with active session; same validation as anon.';
