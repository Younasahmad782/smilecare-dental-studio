# Customising for a client

| Change | Where |
|---|---|
| Name, tagline, address, phone, email, hours, social links, city | `src/lib/site.ts` + `.env` |
| Clinic WhatsApp / Maps / GA | `.env` |
| Colours | `tailwind.config.ts` (`navy`, `teal`, `ivory`, `mint`, `ash`) |
| Fonts | `src/app/layout.tsx` |
| Dentists, services, blog posts, testimonials, FAQs, gallery | `src/data/*.ts` (add an object; pages and sitemap update automatically) |
| Photos | `public/images/` (see its README) |
| Privacy / Terms | `src/app/privacy-policy`, `src/app/terms` (legal review needed) |
| Remove demo labels | set `NEXT_PUBLIC_DEMO_MODE=false`, then edit text containing "sample" |

Agency details live in `agency` inside `src/lib/site.ts` and are shown only in the footer credit and promo section.
Remove "(sample)" wording and all "Fictional demo" badges when real data replaces demo data.
