-- Public booking form uses the anon key, but if a Supabase session exists (e.g. admin tab),
-- inserts run as role "authenticated". Without an INSERT policy for that role, RLS rejects the row.

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

COMMENT ON POLICY "authenticated_insert_leads_validated" ON public.leads IS
  'Same validated booking insert as anon; required when the browser has an auth session.';
