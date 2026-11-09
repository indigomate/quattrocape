# QuattroCape — private chauffeur services

React 19, Vite, TypeScript and Supabase. Chauffeur-driven airport pickups (R1,000) and private daily tours (R5,000/day). This repository does not offer self-drive rentals.

## Local development

```sh
npm ci
npm run dev
```

The development server listens on port 3000. Public pages do not wait for Supabase authentication. Booking requests require a working Supabase project and the migration below. Successful submission means the enquiry was saved, not that a booking or payment was confirmed.

## Configuration

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the intended project's public URL and publishable/anonymous key. Never place a service-role key in `VITE_*` variables. The previous repository's public Supabase defaults are preserved as a fallback; production should configure the intended project explicitly.

Set `VITE_SITE_URL` to your verified primary production origin, without a trailing slash. The default is the repository's existing canonical origin, `https://quattrocape.com`; ownership, DNS and the Vercel domain binding still need verification. The build uses this value for canonical URLs, structured data, social images and the sitemap. Configure it in Vercel before building. Local `.env.local` values are also respected by the build.

## Database rollout

Apply `supabase/migrations/20261109120000_chauffeur_services.sql` **after the existing migrations**, through a trusted Supabase administrator. It replaces the old Day/3-Day/Weekly INSERT rules with Airport pickup/Daily tour. It preserves existing enquiry records and replaces broad authenticated-user read policies with a staff check on trusted JWT `app_metadata.role = 'admin'`.

Provision existing staff accounts with that app metadata through the Supabase admin interface or Admin API before rollout; refresh their sessions afterwards. Never use client-editable `user_metadata` to grant roles. Staff login uses existing accounts only (`shouldCreateUser: false`). Configure the production `/admin` URL in Supabase Auth's redirect allowlist. The dashboard remains read-only. The old root `supabase_schema.sql` is historical: do not rerun it over the new policies.

This migration has been prepared, **not applied to the remote database**. Do not release the new form against the old service validation rules. Confirm a real enquiry saves and a non-staff authenticated user cannot read leads before rollout. No live test enquiries or login emails have been sent by this rebuild.

## Build and validation

```sh
npm run lint
npm run build
npm run check:seo
```

`npm run build` first builds Vite assets, then renders five public pages to HTML with unique metadata and JSON-LD. `scripts/prerender.tsx` also generates private-route noindex shells, robots.txt, and sitemap.xml. The public pages contain their copy and links before JavaScript runs. React takes over in the browser. Never deploy only the intermediate Vite output; allow the complete build command to finish.

`vercel.json` sets the output directory and routes the service/legal paths to their rendered HTML. It permanently redirects `/stay-chauffeur` to `/private-day-tours`. Unknown paths are genuine static-host 404s rather than indexable copies of the homepage. Vercel deployment requires this repository to be linked to the intended project; the supplied protected v0 deployment has not been confirmed as that project.

## Before going live

1. Verify the WhatsApp number retained from the existing site (+27 84 692 9334), route coverage, daily tour hours, vehicle/passenger and luggage limits, cancellation and waiting terms, and what any third-party experiences cost. No invented insurance, accreditation, ratings, testimonials or office address are included.
2. Apply the Supabase migration, provision staff claims, configure environment variables and redirect URLs, and test form and dashboard access.
3. Connect this branch/repository to the correct Vercel project. Review mobile and desktop layouts, service links, form error/success states, and privacy/booking terms in a working browser. Browser QA was unavailable in the current managed session because the desktop JS tool was not provisioned.
4. Bind the verified primary domain and redirect alternate domains to it. Make the intended public production deployment accessible to search crawlers; keep preview deployments protected/noindex. A protected Vercel deployment cannot serve as the public SEO destination.
5. Follow `SEO-LAUNCH.md` for business verification, indexing and measurement. No position or indexing outcome is guaranteed.
