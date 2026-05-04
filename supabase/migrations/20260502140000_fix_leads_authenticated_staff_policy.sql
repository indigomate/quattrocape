-- Replace permissive FOR ALL on authenticated (USING true / WITH CHECK true) with SELECT-only.
-- Admin UI only reads leads; INSERT stays on anon policy; UPDATE/DELETE denied by default.

DROP POLICY IF EXISTS "Enable all actions for authenticated staff" ON public.leads;

CREATE POLICY "authenticated_staff_select_leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

COMMENT ON POLICY "authenticated_staff_select_leads" ON public.leads IS
  'Staff may read inquiries only. No broad INSERT/UPDATE/DELETE for authenticated role.';
