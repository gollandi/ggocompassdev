# CLAUDE.md — GGO Compass

## Project Identity

GGO Compass is a digital patient journey companion for post-surgery recovery tracking and guidance, built for GGO Med Ltd (Mr Giangiacomo Ollandini's private urology practice).

**Purpose:** Guide patients through their surgical recovery with personalised, CMS-driven clinical content, day-by-day recovery timelines, and self-tracking tools.

**Production URL:** TBC (Vercel deployment)
**Sanity Studio:** `/studio` route (embedded)

---

## Architecture

**Single Next.js app with embedded Sanity Studio (NOT a monorepo).**

```
ggocompassdev/
├── src/
│   ├── app/                    # Next.js App Router (13 screens + Studio)
│   ├── components/
│   │   ├── ggo/               # 12 custom GGOMed-branded components
│   │   ├── ui/                # 46 Shadcn components
│   │   └── screens/           # 13 screen components
│   └── lib/
│       ├── sanity/            # CMS client & GROQ queries
│       └── utils/             # User preferences, date utils
├── sanity/
│   └── schemas/               # 4 CMS schemas
├── scripts/
│   └── migrate-to-sanity.ts   # Data migration
├── public/
├── .github/workflows/         # CI/CD (GitHub Actions → Vercel)
├── sanity.config.ts           # Sanity Studio config (root level)
├── sanity.cli.ts
├── next.config.ts
├── tailwind.config.ts
├── package.json               # npm (not pnpm)
└── CLAUDE.md
```

**Stack:**
- Framework: Next.js 14+ (App Router)
- CMS: Sanity.io (embedded Studio at `/studio`)
- Styling: Tailwind CSS + custom GGO design tokens
- UI Components: 46 Shadcn + 12 custom GGO components
- Animations: Framer Motion
- Language: TypeScript (strict mode)
- Package manager: npm (with `--legacy-peer-deps`)
- Deployment: Vercel (via GitHub Actions CI/CD)

---

## Core Features

### Dual Navigation Modes
1. **Tracking Mode:** Date-anchored to surgery date. Days auto-unlock sequentially. Patient tracks their actual recovery.
2. **Exploring Mode:** Free browsing of all recovery content. No date anchoring. For patients researching before surgery.

Mode switcher is persistent. Both modes share the same recovery content but present it differently.

### 13 Screen Flow
1. Splash screen
2. Procedure selection
3. Personalisation (pronouns, tone, accessibility)
4. Surgery date input (Tracking mode)
5. Dashboard / day view
6. Day detail (recovery guidance, symptoms, tips)
7. Timeline overview
8. Milestone celebrations
9. Emergency contacts
10. Settings
11. Help / FAQ
12. Progress summary
13. Completion

### 28-Day Recovery Timelines
- Currently implemented: **Circumcision**, **TURP**
- Content is **BAUS-compliant** (British Association of Urological Surgeons)
- Each day has: clinical guidance, expected symptoms, practical tips, warning signs, activity restrictions
- Future procedures to add: vasectomy, hydrocele repair, penile prosthesis, and others from GGOMed service list

### Personalisation
- Pronoun preferences
- Tone settings (clinical vs conversational)
- Accessibility options (high contrast, reduced motion)
- All stored in localStorage — NO server-side user data

---

## Sanity CMS Schemas

4 existing schemas:

### 1. `procedure`
- Title, slug, description
- Recovery duration (days)
- Category
- Clinical notes

### 2. `recoveryDay`
- Procedure reference
- Day number
- Clinical guidance (Portable Text)
- Expected symptoms
- Activity restrictions
- Warning signs (red flags)
- Practical tips
- Milestone flag

### 3. `timelineStep`
- Procedure reference
- Step number
- Title, description
- Time range (e.g. "Day 1-3", "Week 2")
- Key activities

### 4. `microcopy`
- Key (unique identifier)
- Value (the text)
- Context (where it's used)
- Category (UI element type)

All Sanity queries go through `src/lib/sanity/` — GROQ only, never GraphQL.

---

## Design System

### GGOMed Brand Tokens

The app uses custom GGO design tokens extending Tailwind. These are defined in `tailwind.config.ts`.

**Brand colours:**
- Primary: Deep teal (from GGOMed brand)
- Secondary: Warm gold accent
- Refer to `BRAND_GUIDELINES.md` and `COLOR_REFERENCE_CARD.md` in the repo for exact values

**Typography:**
- Plus Jakarta Sans (headings — consistent with ggomed.co.uk)
- System font stack (body)

**Component library:**
- Shadcn/ui base (46 components)
- 12 custom `ggo/` components with GGOMed branding applied
- Framer Motion for transitions and micro-interactions

### Accessibility (WCAG 2.2 AA)
- High contrast mode toggle
- Reduced motion support (respects `prefers-reduced-motion`)
- Responsive: 375px → 1920px (mobile-first)
- Minimum touch targets 44×44px

---

## Development Rules

### Code Standards
- TypeScript strict mode — zero errors policy
- All components: explicit prop types, no `any`
- Server Components by default; Client Components for interactivity
- Tailwind for styling — use existing GGO tokens, don't create new arbitrary values
- All patient-facing text from Sanity CMS (microcopy schema for UI strings)
- GROQ queries in `src/lib/sanity/`

### Clinical Content Rules
- **NEVER invent clinical information.** All recovery guidance must be BAUS-compliant or explicitly approved by JJ.
- If content is unclear: `{/* TODO: Clinical review required — [describe gap] */}`
- Warning signs / red flags are CRITICAL — get them exactly right. Wrong red flags = patient safety issue.
- Activity restrictions must be conservative — when in doubt, restrict more, not less.
- Pain management advice: general guidance only, always include "contact your surgeon if..."
- NO specific drug dosages in patient-facing content unless explicitly provided by JJ.

### Content for New Procedures
When adding a new procedure's recovery timeline:
1. JJ provides the clinical content (or a source document)
2. Create seed data following the existing `recoveryDay` schema pattern
3. Each day needs: clinical guidance, symptoms, restrictions, tips, warning signs
4. Run `/clinical-check` before marking as complete
5. Flag anything uncertain with TODO comments

---

## Repo Cleanup Needed

The repo root has ~30 markdown files from previous LLM development sessions. These should be consolidated:

**Keep:**
- `README.md` (update it)
- `DEPLOYMENT.md`
- `BRAND_GUIDELINES.md`
- `COLOR_REFERENCE_CARD.md`
- `.env.example`

**Move to `docs/` or delete:**
- All `*_SUMMARY.md`, `*_FIX*.md`, `*_COMPLETE.md` files — these are session artifacts, not documentation
- `CONTEXT_RECAP_FOR_LLM_TRANSITION.md` — replaced by this CLAUDE.md
- `MICROCOPY_*.md` and `.csv` files — consolidate into one `docs/microcopy-guide.md`
- `SANITY_*.md` files — consolidate into one `docs/sanity-guide.md`
- `test-*.html` files — move to a `tests/` directory or delete
- `*.old` files — delete

**Suggested cleanup command:**
```bash
mkdir -p docs
# Move reference docs
mv BRAND_GUIDELINES.md docs/
mv COLOR_REFERENCE_CARD.md docs/
mv INTEGRATION_GUIDE.md docs/
mv DEPLOYMENT.md docs/
# Delete session artifacts
rm -f *_SUMMARY.md *_FIX*.md *_COMPLETE.md *_READY.md
rm -f CONTEXT_RECAP_FOR_LLM_TRANSITION.md
rm -f QUICKSTART_DEPLOY.md FEATURE_TESTING_GUIDE.md
rm -f PERSONALIZATION_*.md
rm -f *.old
# Move test files
mkdir -p tests
mv test-*.html tests/
```

---

## Slash Commands Available

### `/add-procedure`
Add a new surgical procedure with its full 28-day recovery timeline to the app.

### `/clinical-check`
Audit all patient-facing clinical content against source documents.

### `/microcopy-audit`
Scan all hardcoded strings in components and verify they're in the Sanity microcopy schema.

### `/cleanup`
Consolidate the root markdown files into `docs/` and remove session artifacts.

---

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=
```

For Vercel deployment, also set:
```
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
```

---

## Relationship to Other Projects

- **ggomed.co.uk** — Main GGOMed website (separate Next.js/Sanity repo). GGO Compass is designed to integrate as a subdomain or embedded route.
- **chrysalis-pathway** — CCGS patient journey app (separate project, NHS context). Different clinical domain but shared architectural patterns.
- Both share the global `~/.claude/CLAUDE.md` for universal code standards.
