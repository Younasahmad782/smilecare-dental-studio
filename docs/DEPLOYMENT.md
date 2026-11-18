# Deployment (Vercel)

1. Push the project to GitHub (`git init && git add . && git commit -m "init"`).
2. Vercel → **Add New → Project** → import the repo (framework auto-detected: Next.js).
3. **Environment Variables:** copy everything from `.env.example`. Set `NEXT_PUBLIC_SITE_URL` to your final `https://` domain.
4. Deploy. Add your custom domain under *Settings → Domains*; HTTPS is automatic.
5. Redeploy after changing any `NEXT_PUBLIC_*` variable (they are inlined at build time).

## Email (Resend)
Create an account, verify your sending domain, create an API key, then set `RESEND_API_KEY`, `EMAIL_FROM` (verified domain), `EMAIL_TO`.

## Database (Supabase, optional)
Create a project, run `supabase/schema.sql` in the SQL editor, then set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (server-only; never prefix with `NEXT_PUBLIC_`).

## Going live for a real clinic
Set `NEXT_PUBLIC_DEMO_MODE=false`, replace data in `src/lib/site.ts`, `src/data/*`, add photos, have privacy/terms reviewed by a lawyer, then submit `/sitemap.xml` in Search Console.
