# SmileCare Dental Studio: Demo Website

Premium multi-page dental clinic website built by **Younus Web Solutions**.
Stack: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · React Hook Form + Zod · Lucide icons.

> **Fictional demo.** SmileCare Dental Studio, its dentists, testimonials, address and phone are samples. They are labelled as such on the site.

## Verification status (read this first)

This source was written in a sandbox **without network access**, so dependencies were never installed and nothing below was run.

| Item | Status |
|---|---|
| Source code written (all 14 page types, forms, API, SEO files) | Done |
| Syntax-level TypeScript parse (no syntax errors found) | Done (partial; types for React/Next unavailable offline) |
| `npm install`, `npm run build`, `npm run lint`, full type-check | **Not run, do this first** |
| Lighthouse, Core Web Vitals, accessibility audit | **Not run** (see docs/TESTING.md) |
| Form delivery (email / database) | **Not tested**; needs your keys |
| Real photography | **Not included**; placeholders shown (see public/images/README.md) |

Expect to fix a few small type or lint errors on the first build. Run `npm run typecheck` and `npm run lint`.

## Quick start

```bash
npm install
cp .env.example .env.local      # then edit
npm run dev                      # http://localhost:3000
npm run build && npm start       # production check
```
Requires Node 18.18+. Fonts (Fraunces, Plus Jakarta Sans) are fetched from Google Fonts at build time by `next/font` and self-hosted afterwards.

## Structure

```
src/app/            routes: /, about, dentists, dentists/[slug], services, services/[slug],
                    appointment, gallery, blog, blog/[slug], contact, privacy-policy, terms,
                    api/appointment, api/contact, not-found, sitemap.ts, robots.ts, opengraph-image.tsx
src/components/     layout/ ui/ home/ dentists/ services/ forms/ gallery/ blog/
src/data/           services.ts dentists.ts posts.ts content.ts   <- all editable content
src/lib/            site.ts (clinic + agency details) validation.ts seo.ts enquiry.ts email.ts db.ts ...
public/images/      drop photos here (README lists exact filenames)
supabase/schema.sql optional enquiries table
docs/               DEPLOYMENT.md CUSTOMIZATION.md TESTING.md LOCAL-SEO.md
```
Service, dentist and blog pages are statically generated from `src/data`.

## What works without any API keys

Everything visual and interactive: navigation, mobile menu, search and filters, dentist/service/blog pages, form validation (client and server), WhatsApp links, SEO metadata, sitemap, robots.

## What needs configuration

| Feature | Needed | Behaviour when missing |
|---|---|---|
| Enquiry delivery | `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO` and/or `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | API returns 503 and the form says online enquiries are not enabled, and points to WhatsApp. It **never** claims success. |
| Clinic WhatsApp | `NEXT_PUBLIC_CLINIC_WHATSAPP` (digits, e.g. `923001234567`) | Opens WhatsApp's contact chooser with the message pre-filled. |
| Google Maps | `NEXT_PUBLIC_MAP_EMBED_URL` | Placeholder panel plus "Open in Google Maps" link. |
| Analytics | `NEXT_PUBLIC_GA_ID` | GA4 not loaded. Events (`appointment_enquiry_submit`, `whatsapp_click`, `contact_form_submit`) are no-ops. |
| Search Console | `NEXT_PUBLIC_GSC_VERIFICATION` | No verification tag. |
| Images | files in `public/images` | Labelled placeholders. |

The agency WhatsApp/email (`src/lib/site.ts → agency`) are used only for the agency promo section and footer credit, never as patient contact.

## Demo mode vs. real clinic

`NEXT_PUBLIC_DEMO_MODE=true` (default): banner shown, `robots` blocks all crawling, and clinic-identity schema (Dentist/LocalBusiness/Person/Service) is **not** emitted, so a fictional clinic is never presented to search engines as a real business.
Set it to `false` only after replacing every clinic detail. Then indexing, sitemap and structured data switch on.

## Security notes

Server-side Zod validation (same schema as the browser) · honeypot + minimum-fill-time spam traps · in-memory rate limit (5 per 10 min per IP; per-instance only, so use Upstash/Vercel KV for production) · same-origin check · security headers and CSP in `next.config.mjs` (adjust if you add third-party scripts) · secrets only in server env vars · Supabase table has RLS enabled with no public policies · no medical data collected.
Optional hardening: add Cloudflare Turnstile or reCAPTCHA (needs keys; not included).

## Notes on requirements

- **shadcn/ui:** not installed (offline CLI). Accessible equivalents are built in: native `<details>` accordions, an ARIA mobile menu with Escape handling, and labelled form controls. Add shadcn Dialog later if you need modals.
- **Urdu-ready:** architecture notes in `src/lib/i18n.ts`; no translations yet.
- **PKR:** `formatPKR()` provided; no prices are shown.
- **Lighthouse 95+ / CWV:** these are targets. Hero image is `priority`, fonts use `display: swap`, JS is minimal, but scores must be measured on a deployed build.
