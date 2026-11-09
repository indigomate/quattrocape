# QuattroCape SEO launch plan

## Search intent and page ownership

| Page                 | Main intent                 | Supporting subjects                                                                              |
| -------------------- | --------------------------- | ------------------------------------------------------------------------------------------------ |
| `/`                  | Cape Town chauffeur service | private chauffeur, airport pickup, chauffeured day experience                                    |
| `/airport-transfers` | Cape Town airport transfers | Cape Town International Airport pickup, hotel transfer, private airport chauffeur, R1,000 pickup |
| `/private-day-tours` | private Cape Town day tours | Cape Peninsula with a chauffeur, Winelands chauffeur, personalised city itinerary, R5,000/day    |

The new copy distinguishes chauffeur service from self-drive rental. Service pages contain distinct, helpful information rather than duplicate keyword/location pages. Airport coverage and tour stops are requests to agree, not unsupported guarantees. Prices are in ZAR throughout.

## Implemented in this branch

- HTML-rendered public content with one H1 per page and real internal links.
- Unique titles, descriptions, primary-domain canonicals, Open Graph and Twitter metadata.
- LocalBusiness and Service/Offer structured data with numeric ZAR pricing; visible FAQs and matching FAQPage markup; service breadcrumbs.
- No invented business address, customer ratings, reviews, awards or opening hours. FAQ markup does not imply Google will display a rich result.
- Sitemap containing only public canonical routes; staff pages marked noindex and excluded. Permanent redirect for the retired stay-chauffeur service.
- Local imagery, lazy-loaded secondary images, explicit image space, responsive navigation, labelled forms, keyboard focus, and reduced-motion support.
- Public content renders without waiting for an authentication/network request.

## Business-owner actions before indexing

1. Confirm the primary domain and `VITE_SITE_URL`. Bind that domain to the actual Vercel project for this source. Ensure the public production website is not behind Vercel authentication. Redirect alternate hostnames to the primary domain.
2. Verify the real business name, WhatsApp number, service area and contact details. Confirm the published inclusions, itinerary terms, tour length and route coverage. Add only real operational promises.
3. Create or claim a Google Business Profile if the business is eligible. Use the accurate business category and service area. Hide a residential/non-customer-facing address rather than inventing a storefront. Link to the verified primary domain and keep business details consistent across legitimate listings.
4. Verify the domain in Google Search Console and Bing Webmaster Tools. Submit `/sitemap.xml`, inspect the homepage and both service URLs, and check rendered HTML, canonical selection and indexability. Validate structured data in Schema.org Validator and Google's applicable testing tools.
5. Ask actual customers for honest reviews after completed journeys. Build real local relationships with accommodation providers, travel planners and tourism businesses. Do not buy reviews or bulk links.

## Useful next content, once facts are confirmed

- A real Cape Peninsula itinerary with agreed day length, realistic stop durations, admission exclusions and seasonal considerations.
- A real Winelands itinerary with venue booking requirements and tasting/meal exclusions.
- Airport meeting-point instructions, luggage limits, child-seat options, waiting policy and supported transfer areas.
- Original vehicle/experience photographs and permission-based customer stories.

Publish these when operational details are available; do not create thin near-duplicate pages for every suburb or use fabricated expert/review claims.

## Measure after launch

Review Search Console impressions, clicks, queries, index status and canonical selection after launch, then monthly. Use real-user Core Web Vitals and PageSpeed Insights to identify bottlenecks before claiming performance scores. Track submitted enquiries and completed bookings separately; add privacy-appropriate analytics only with the required disclosure/consent. Watch search intent and qualified enquiries rather than promising a number-one ranking.

## Current verification limits

The build, TypeScript and generated HTML can be checked locally. The current session has no Vercel management connection or Supabase administrative access, and the earlier backend probe was blocked by the workspace proxy. The screenshot proves the old deployment loads for the owner; it does not establish that this source is deployed or that backend submission works. Google/Bing account configuration, real backlinks, remote migration, live booking tests and production deployment have not been completed here.
