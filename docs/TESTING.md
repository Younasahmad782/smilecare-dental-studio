# Testing checklist (none of this has been run yet)

Mark each item only after you have actually done it.

- [ ] `npm install` · `npm run typecheck` · `npm run lint` · `npm run build` pass
- [ ] Every internal link works (nav, footer, cards, breadcrumbs, related items)
- [ ] Mobile menu opens/closes, Escape closes, active page highlighted
- [ ] Appointment form: empty submit shows errors; invalid mobile (`0412…`) rejected; valid `0300 1234567` accepted; past/too-far dates rejected
- [ ] Appointment form with no keys shows the "not enabled" message (not a success)
- [ ] With Resend/Supabase keys: enquiry arrives / row is stored; 6th submit within 10 minutes returns 429
- [ ] "Continue on WhatsApp" opens a pre-filled message; blocked until the form is valid
- [ ] Floating WhatsApp button uses the clinic number, agency links go to wa.me/923457305226 and the agency email
- [ ] Dentist search/filter, blog search/category, gallery filter
- [ ] Images load (after adding real photos); no layout shift while loading
- [ ] Keyboard-only pass: skip link, focus rings, accordions, forms
- [ ] Screen reader spot-check (NVDA/VoiceOver) of forms and menu
- [ ] 320px, 375px, 768px, 1280px: no horizontal scroll
- [ ] View source: unique title/description/canonical; validate JSON-LD (search.google.com/test/rich-results) with demo mode off
- [ ] Console free of errors
- [ ] Lighthouse (mobile) on the Vercel production URL: record Performance / Accessibility / Best Practices / SEO
- [ ] Field data: check Core Web Vitals in Search Console / PageSpeed Insights after real traffic (lab ≠ field)

## Report template
| Metric | Actual result |
|---|---|
| Lighthouse Performance | |
| Lighthouse Accessibility | |
| Lighthouse Best Practices | |
| Lighthouse SEO | |
| Mobile / Desktop responsiveness | |
| Form validation | |
| WhatsApp integration | |
| Core Web Vitals | |
