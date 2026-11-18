# Local SEO (Pakistan)

Supported cities in `CITIES` (`src/lib/site.ts`): Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Gujranwala, Sialkot.
Set `NEXT_PUBLIC_CITY` to the client's city; titles, descriptions and keywords use it. One site = one real location.
**Do not create duplicate city pages** for places the clinic does not serve. For a multi-branch group, add genuinely distinct branch pages with real addresses and staff.

## Google Business Profile
1. Create/claim at business.google.com using the clinic's real name, address, phone and category "Dentist".
2. Verify (postcard/phone). Match name, address and phone **exactly** to the website.
3. Add hours, services, photos; link the website; paste the Maps embed URL into `NEXT_PUBLIC_MAP_EMBED_URL`.
4. Ask real patients for reviews; never fabricate them.

## Search Console
1. Add the domain property at search.google.com/search-console.
2. Verify via DNS, or put the HTML-tag token in `NEXT_PUBLIC_GSC_VERIFICATION`.
3. Submit `https://yourdomain.com/sitemap.xml` (only works once `NEXT_PUBLIC_DEMO_MODE=false`).
Phone format: Pakistani mobiles accepted as `03XX XXXXXXX` or `+92 3XX XXXXXXX`; stored as `+923XXXXXXXXX`.
