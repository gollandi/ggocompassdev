# GGO Compass - Digital Patient Journey Companion

![CI Status](https://github.com/gollandi/ggocompassdev/workflows/CI/badge.svg)
![Deploy Status](https://github.com/gollandi/ggocompassdev/workflows/Deploy%20to%20Vercel/badge.svg)

A standalone Next.js 14+ application with Sanity CMS integration for post-surgery recovery tracking and guidance. This app transforms the original React/Vite wireframe prototype into a production-ready, scalable system designed for easy integration into the main GGO website.

## Overview

GGO Compass guides patients through their surgical recovery journey with:
- **Dual Navigation Modes**: Tracking (date-anchored, auto-unlocking) and Exploring (free browsing)
- **28-Day Recovery Timelines**: BAUS-compliant clinical guidance for multiple procedures
- **Personalized Experience**: Pronoun preferences, tone settings, and accessibility options
- **CMS-Driven Content**: All recovery guidance, timelines, and microcopy managed through Sanity CMS

## Quick Start

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Copy environment template
cp .env.example .env.local
# Edit .env.local with your Sanity credentials

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the app  
Visit [http://localhost:3000/studio](http://localhost:3000/studio) for Sanity Studio

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gollandi/ggocompassdev)

**For complete deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

**Quick Deploy:**
1. Click the "Deploy with Vercel" button above
2. Set environment variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`
3. Deploy!

**Automated Deployment:**
- Push to `main` branch for automatic deployment via GitHub Actions
- See [GitHub Actions Setup](.github/workflows/README.md) for configuration

## Features

- ✅ **13 Complete Screens** - Full patient journey from splash to completion
- ✅ **Dual Navigation Mode** - Tracking vs Exploring with mode switcher
- ✅ **28-Day Recovery Data** - BAUS-compliant for Circumcision and TURP
- ✅ **Sanity CMS** - 4 schemas (procedures, recovery days, timeline steps, microcopy)
- ✅ **Accessibility** - WCAG 2.2 AA compliant with high contrast and reduced motion
- ✅ **TypeScript** - Strict mode, zero errors
- ✅ **Responsive** - Mobile-first design (375px → 1920px)

## Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide with CI/CD setup
- **[.github/workflows/README.md](.github/workflows/README.md)** - GitHub Actions workflows documentation
- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - How to integrate into main website
- **[SANITY_SETUP.md](./SANITY_SETUP.md)** - Sanity CMS setup and data migration
- **[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)** - Legacy Vercel deployment guide

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **CMS**: Sanity.io
- **Styling**: Tailwind CSS + custom GGO tokens
- **UI**: 46 Shadcn + 12 custom GGO components
- **Animations**: Framer Motion
- **Language**: TypeScript (strict mode)

## Project Structure

```
/
├── app/                    # Next.js routes (13 screens + Studio)
├── components/            
│   ├── ggo/               # 12 custom components
│   ├── ui/                # 46 Shadcn components
│   └── screens/           # 13 screen components
├── lib/
│   ├── sanity/            # CMS client & queries
│   └── utils/             # User preferences, date utils
├── sanity/
│   ├── schemas/           # 4 CMS schemas
│   └── sanity.config.ts   # Sanity configuration
├── scripts/
│   └── migrate-to-sanity.ts  # Data migration
└── public/
```

## License

© 2025 GGO Med. All rights reserved.

---

**Status**: ✅ Production Ready  
**Build**: ✅ Successful  
**Version**: 0.2.0
