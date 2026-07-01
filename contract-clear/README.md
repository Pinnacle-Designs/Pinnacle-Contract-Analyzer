# Pinnacle Contract Analyzer

AI-powered contract review for freelancers and small businesses. Dual-hosted:

| Host | URL | Purpose |
|------|-----|---------|
| GitHub Pages | [pinnaclecontractanalyzer.com](https://pinnaclecontractanalyzer.com) | Marketing, pricing, legal pages, AdSense |
| Vercel | [pinnacle-contract-analyzer.vercel.app](https://pinnacle-contract-analyzer.vercel.app) | Auth, dashboard, Stripe, API routes |

## Local development

```bash
cd contract-clear
cp .env.local.example .env.local   # fill in your keys
npm install
npm run dev
```

If the dev server shows a blank page, stop all `next dev` processes and run:

```bash
npm run dev:reset
```

Do not run `npm run build:gh-pages` while `npm run dev` is active.

## Environment variables

Copy `.env.local.example` to `.env.local`. Required for the full app:

- **Supabase** — `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **Anthropic** — `ANTHROPIC_API_KEY`
- **Stripe** — secret key, webhook secret, and three price IDs
- **URLs** — `NEXT_PUBLIC_SITE_URL` (marketing), `NEXT_PUBLIC_APP_URL` (Vercel app)

Push env vars to Vercel (after filling `.env.local`):

```bash
node scripts/push-vercel-env.mjs
```

## Supabase setup

Run these in the Supabase SQL editor (or use `supabase/schema.sql` for a fresh project):

1. `supabase/schema.sql` — profiles, analyses, free-tier enforcement
2. `supabase/migrations/002_api_rate_limits.sql` — if upgrading an existing DB

In Supabase Auth settings:

- Enable **email confirmation**
- Add redirect URLs: `https://pinnacle-contract-analyzer.vercel.app/auth/callback`

## Stripe setup

1. Create products/prices for single analysis, Pro monthly, and Pro annual
2. Add webhook endpoint: `https://pinnacle-contract-analyzer.vercel.app/api/webhooks/stripe`
3. Events: `checkout.session.completed`, `customer.subscription.deleted`

## Deploy

### Vercel (full app)

Connect the repo with root directory `contract-clear`. Set all env vars from `.env.local.example`.

### GitHub Pages (marketing)

Pushes to `main` run `.github/workflows/deploy-github-pages.yml` automatically. Set these GitHub Actions env vars (or repo secrets) if using AdSense:

- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- `ADSENSE_PUBLISHER_ID`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run dev:reset` | Clear `.next` and restart dev |
| `npm run build` | Production build (Vercel) |
| `npm run build:gh-pages` | Static export for GitHub Pages |
| `npm run lint` | ESLint |
| `npm run sitemap` | Regenerate `public/sitemap.xml` |
| `npm run ads-txt` | Regenerate `public/ads.txt` |

## Production checklist

- [ ] Supabase schema + migrations applied
- [ ] Email confirmation enabled in Supabase
- [ ] All Vercel env vars set (`push-vercel-env.mjs`)
- [ ] Stripe webhook configured and tested
- [ ] Smoke test: signup → confirm email → analyze → checkout → pro
- [ ] AdSense: set client ID, run `npm run ads-txt`, deploy Pages
- [ ] Google Search Console: submit sitemap

## Security

- `/api/analyze` and `/api/parse-pdf` require authentication
- Per-user rate limits on analyze and PDF parsing (see `src/lib/rateLimit.ts`)
- Ads load only on marketing pages after cookie consent
- Security headers on Vercel deployment (see `next.config.ts`)
