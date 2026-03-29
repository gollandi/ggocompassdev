# GGO Compass

![CI Status](https://github.com/gollandi/ggocompassdev/workflows/CI/badge.svg)
![Deploy Status](https://github.com/gollandi/ggocompassdev/workflows/Deploy%20to%20Vercel/badge.svg)

Digital patient journey companion for post-surgery recovery at GGO Med Ltd (Mr Giangiacomo Ollandini's private urology and andrology practice).

Guides patients through surgical recovery with CMS-driven day-by-day clinical content, self-tracking tools, and personalised guidance across 16 procedures.

## Quick start

```bash
npm install --legacy-peer-deps
cp .env.example .env.local
# Edit .env.local with your Sanity credentials
npm run dev
```

- App: `http://localhost:3000`
- Sanity Studio: `http://localhost:3000/studio`

## Build & deploy

```bash
npm run build
npm run start
```

Push to `main` triggers automatic deployment via GitHub Actions → Vercel.

## Stack

- Next.js 14+ (App Router)
- Sanity v3 (embedded Studio)
- Tailwind CSS + GGO design tokens
- Shadcn/ui + custom GGO components
- Framer Motion
- TypeScript strict mode
- Vercel

## Documentation

- `docs/sanity-guide.md` — CMS schema reference, GROQ examples, migration
- `docs/microcopy-guide.md` — Managing patient-facing strings via CMS
- `docs/DEPLOYMENT.md` — Vercel deployment and CI/CD setup
- `docs/INTEGRATION_GUIDE.md` — Embedding into ggomed.co.uk
- `docs/BRAND_GUIDELINES.md` — Design tokens and visual identity
- `CLAUDE.md` — Full project context for Claude Code

## Environment variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=
```

## License

© 2025 GGO Med. All rights reserved.
