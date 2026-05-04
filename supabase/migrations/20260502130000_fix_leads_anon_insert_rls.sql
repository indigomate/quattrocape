-- Replace permissive anon INSERT (WITH CHECK true) with field validation aligned to BookingForm.
-- Apply in Supabase SQL Editor or via: supabase db push / migration run

-- Previous dashboard policy name (adjust if yours differs)
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.leads;

-- Ensure created_at is server-controlled when clients omit it
ALTER TABLE public.leads
  ALTER COLUMN created_at SET DEFAULT (now());

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

COMMENT ON POLICY "anon_insert_leads_validated" ON public.leads IS
  'Anonymous booking inserts only; validates shape of reservation requests (not fully open).';
