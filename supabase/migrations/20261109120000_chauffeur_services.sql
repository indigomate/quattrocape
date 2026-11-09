-- Chauffeur-only booking flow. Apply after existing migrations.
-- Leaves all historical lead records intact.
-- Before rollout, provision the existing staff user's app_metadata.role='admin'
-- through the Supabase Admin API / dashboard using a trusted administrator.
-- Client-editable user_metadata MUST NOT be used to grant staff access.
BEGIN;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
-- Remove legacy broad policies as permissive policies otherwise combine with OR.
DO $$ DECLARE p record; BEGIN
  FOR p IN SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename='leads'
  LOOP EXECUTE format('DROP POLICY %I ON public.leads',p.policyname); END LOOP;
END $$;
CREATE POLICY chauffeur_enquiry_insert ON public.leads
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(trim(coalesce(name,''))) BETWEEN 2 AND 200
  AND length(trim(coalesce(email,''))) BETWEEN 5 AND 320
  AND position('@' IN trim(email)) > 1
  AND split_part(lower(trim(email)), '@', 2) LIKE '%.%'
  AND service IN ('Airport pickup','Daily tour')
  AND length(trim(coalesce(message,''))) BETWEEN 5 AND 10000
);
CREATE POLICY staff_read_leads ON public.leads
FOR SELECT TO authenticated
USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
-- This enquiry dashboard is read-only. No client UPDATE/DELETE policies.
COMMIT;
