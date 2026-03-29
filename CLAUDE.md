# CLAUDE.md — GGO Compass

## Project Identity

GGO Compass is a digital patient recovery companion for post-surgery guidance at GGO Med Ltd — Mr Giangiacomo Ollandini's private urology and andrology practice.

**Tone:** Authoritative, structured, reassuring. This is a private specialist practice, not an NHS ward. Speak with clinical confidence, not anxious hedging.

**Production URL:** TBC (Vercel deployment)
**Sanity Studio:** `/studio` route (embedded)

---

## Architecture

**Single Next.js app with embedded Sanity Studio (NOT a monorepo).**

```
ggocompassdev/
├── src/
│   ├── app/                    # Next.js App Router (screens + Studio)
│   ├── components/
│   │   ├── ggo/               # Custom GGOMed-branded components
│   │   ├── ui/                # Shadcn components
│   │   └── screens/           # Screen components
│   └── lib/
│       ├── sanity/            # CMS client & GROQ queries
│       └── utils/             # User preferences, date utils
├── sanity/
│   └── schemas/               # CMS schemas
├── scripts/                   # Seed & migration scripts
├── public/
├── .github/workflows/         # CI/CD (GitHub Actions → Vercel)
├── docs/                      # Reference documentation
├── sanity.config.ts           # Sanity Studio config (root level)
├── sanity.cli.ts
├── next.config.ts
├── tailwind.config.ts
├── package.json               # npm (not pnpm — use --legacy-peer-deps)
└── CLAUDE.md
```

**Stack:**
- Framework: Next.js 14+ (App Router)
- CMS: Sanity v3 (embedded Studio at `/studio`)
- Styling: Tailwind CSS + custom GGO design tokens
- UI Components: Shadcn/ui base + custom `ggo/` components
- Animations: Framer Motion
- Language: TypeScript (strict mode)
- Package manager: npm (`--legacy-peer-deps`)
- Deployment: Vercel (via GitHub Actions CI/CD)

---

## Core Features

### Dual Navigation Modes
1. **Tracking Mode:** Date-anchored to surgery date. Days auto-unlock sequentially.
2. **Exploring Mode:** Free browsing of all recovery content. No date anchoring. For patients researching pre-surgery.

### Day-by-Day Recovery Timelines
Each day has: clinical guidance, expected symptoms, practical tips, warning signs, activity restrictions.

Content must be **BAUS-compliant** (British Association of Urological Surgeons) where BAUS guidance exists. For procedures without BAUS PILs, use content explicitly provided by JJ.

### Personalisation
- Pronoun preferences
- Tone settings (clinical vs conversational)
- Accessibility options (high contrast, reduced motion)
- All stored in `localStorage` — NO server-side user data, no cookies

### Consent & Privacy
Cookie consent + GDPR compliance is required:
- No tracking cookies used (localStorage only, so PECR cookie rules don't apply)
- Procedure selection and mood history are **special category health data** under UK GDPR
- A `ConsentBanner` must be shown on first visit before any data is written
- `clearAllLocalData()` must be available in Settings
- See `/consent-flow` for full implementation spec

---

## Procedures (16 Total)

### Urology (9)
| Slug | Procedure |
|------|-----------|
| `circumcision` | Circumcision |
| `frenuloplasty` | Frenuloplasty |
| `turp` | Transurethral Resection of the Prostate (TURP) |
| `holep` | Holmium Laser Enucleation of the Prostate (HoLEP) |
| `cystoscopy-flex` | Flexible Cystoscopy |
| `cystoscopy-rigid` | Rigid Cystoscopy |
| `hydrocele` | Hydrocele Repair |
| `vasectomy` | Vasectomy |
| `ureteroscopy` | Ureteroscopy |

### Andrology (4)
| Slug | Procedure |
|------|-----------|
| `penile-implant` | Penile Implant (Inflatable Penile Prosthesis) |
| `peyronies` | Peyronie's Disease Surgery |
| `varicocele` | Varicocele Repair |
| `penile-doppler-followup` | Penile Doppler Follow-up |

### Male Infertility (3)
| Slug | Procedure |
|------|-----------|
| `micro-tese` | Microsurgical Testicular Sperm Extraction (micro-TESE) |
| `sperm-retrieval` | Surgical Sperm Retrieval |
| `fertility-preservation` | Fertility Preservation |

---

## Design System

### Brand Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--ggo-teal` | `#0D9488` | Primary CTA, active states, links |
| `--ggo-navy` | `#1E3A5F` | Headings, primary text |
| Warm gold | (see `docs/BRAND_GUIDELINES.md`) | Secondary CTA, accents |

**Typography:**
- Headings: **Plus Jakarta Sans** (consistent with ggomed.co.uk)
- Body: **Inter** (system fallback stack)

**Border radius:**
- Cards: `24px`
- Buttons: `12px`
- Inputs: `8px`

**Button variants:**
- Primary CTA: `gold` variant
- Secondary: `outline` variant

### Accessibility (WCAG 2.1 AA)
- High contrast mode toggle (`hc` class on `<html>`)
- Reduced motion support (`rm` class + `prefers-reduced-motion`)
- Responsive: 375px → 1920px (mobile-first)
- Minimum touch targets: 44×44px
- All interactive elements must have `aria-label` or visible label

---

## Sanity CMS Schemas

GROQ queries only — never GraphQL. All queries go through `src/lib/sanity/`.

### `procedure`
- Title, slug, description, recovery duration, category, clinical notes

### `recoveryDay`
- Procedure reference, day number, clinical guidance (Portable Text), expected symptoms, activity restrictions, warning signs (red flags), practical tips, milestone flag

### `timelineStep`
- Procedure reference, step number, title, description, time range, key activities

### `microcopy`
- Key, value, context, category
- **All patient-facing text must come from this schema.** Hardcoded strings cannot be updated without a deploy.

---

## Development Rules

### Code Standards
- TypeScript strict mode — zero errors, no `any`
- Server Components by default; Client Components only for interactivity
- Tailwind tokens only — no raw hex values in components
- GROQ queries in `src/lib/sanity/`
- No `console.log` — use `console.error` or `console.warn` for genuine runtime issues

### Clinical Content Rules
- **NEVER invent clinical information.** Must be BAUS-compliant or explicitly approved by JJ.
- Uncertain content: `{/* TODO: Clinical review required — [describe gap] */}`
- Warning signs / red flags are SAFETY-CRITICAL — wrong red flags = patient harm.
- Activity restrictions: conservative. When unsure, restrict more, not less.
- Pain management: general guidance only, always with "contact your surgeon if..."
- NO specific drug dosages unless explicitly provided by JJ.
- British English throughout — no "color", "center", "canceled".

### Adding a New Procedure
1. JJ provides clinical source document — do not proceed without one.
2. Create seed data in `scripts/seed/[procedure-slug]/` following existing schema.
3. Run `/clinical-check` before marking complete.
4. Flag uncertain content with TODO comments.

---

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/add-procedure` | Scaffold a new procedure (schema + seed data + components) |
| `/clinical-check` | Audit clinical accuracy (RED / AMBER / GREEN) |
| `/microcopy-audit` | Find hardcoded patient-facing strings not in CMS |
| `/cleanup` | Code quality pass (dead code, TypeScript strict, console.logs, Tailwind tokens) |
| `/recovery-content` | Audit or generate day-by-day recovery content |
| `/consent-flow` | GDPR consent audit and implementation |
| `/design-audit` | Colour tokens, typography, accessibility, responsive check |

---

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=
```

For Vercel deployment:
```
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
```

---

## Relationship to Other Projects

- **ggomed.co.uk** — Main GGOMed website (separate Next.js/Sanity repo). GGO Compass is a companion app, designed to integrate as a subdomain.
- **chrysalis-pathway** — CCGS patient journey app (NHS context, different clinical domain). Shared architectural patterns but different tone and clinical standards.
- Global code standards: `~/.claude/CLAUDE.md`.
