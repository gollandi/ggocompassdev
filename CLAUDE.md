# GGO Compass — Patient Recovery Companion

## Project Identity

GGO Compass is a digital patient journey companion for post-surgery recovery, built by GGO Med Ltd (ggomed.co.uk). It guides patients through day-by-day recovery after urological, andrological, and male infertility procedures performed by Mr Giangiacomo Ollandini.

### Tone & Voice
- **Authoritative:** Written by a consultant surgeon's practice, not a wellness blog.
- **Structured:** Clear timelines, concrete milestones, specific instructions.
- **Reassuring:** Patients are recovering, not in crisis. Confidence without minimising.
- **Practical:** What to do, when to do it, what's normal, what's not.
- NOT protective/fragile (that's Chrysalis). Compass patients are adults making informed choices about elective or semi-elective procedures.
- No fear-mongering. No catastrophising. No vague "contact your doctor if concerned" — always specify WHAT to look for and WHEN to escalate.

### Brand Identity
- **Practice:** GGO Med Ltd
- **Clinician:** Mr Giangiacomo Ollandini, Consultant Urological Surgeon & Andrologist
- **Context:** Private practice, London. Patients have chosen their surgeon and paid for their care.
- **Regulatory:** BAUS (British Association of Urological Surgeons) guidelines as baseline.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 14+ (App Router) | React Server Components default |
| CMS | Sanity v3 (embedded studio) | NOT monorepo — single app with /studio route |
| Styling | Tailwind CSS | Mobile-first, custom config |
| Package Manager | npm | NOT pnpm |
| Deployment | Vercel | Edge runtime where beneficial |
| Auth | None (v1) | Future: patient portal with magic links |
| Analytics | Vercel Analytics + Plausible | Privacy-first, no Google Analytics |
| Cookie Consent | Custom implementation | GDPR-compliant, see Consent section |

### Key Architectural Decisions
- **Single Next.js app** with Sanity Studio embedded at `/studio` route
- **No monorepo.** Everything in one repo: `ggocompassdev/`
- **npm** for package management (not pnpm, not yarn)
- **App Router** exclusively — no pages/ directory
- **GROQ** for all Sanity queries — no GraphQL

---

## Design System

### Colours

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-teal` | `#0D9488` | Primary actions, active states, progress indicators |
| `--color-teal-light` | `#14B8A6` | Hover states, secondary emphasis |
| `--color-teal-dark` | `#0F766E` | Pressed states, headings on light bg |
| `--color-navy` | `#1E3A5F` | Primary text, headers, navigation |
| `--color-navy-light` | `#2D5F8A` | Secondary text, labels |
| `--color-slate` | `#64748B` | Body text, descriptions |
| `--color-amber` | `#F59E0B` | Warnings, caution alerts |
| `--color-amber-light` | `#FEF3C7` | Warning backgrounds |
| `--color-red` | `#EF4444` | Danger/emergency alerts |
| `--color-red-light` | `#FEE2E2` | Emergency alert backgrounds |
| `--color-green` | `#10B981` | Success, milestone completed |
| `--color-green-light` | `#D1FAE5` | Success backgrounds |
| `--color-bg` | `#FAFBFC` | Page background |
| `--color-surface` | `#FFFFFF` | Card/panel surfaces |
| `--color-border` | `#E2E8F0` | Default borders |

### Typography

| Element | Font | Weight | Size (mobile / desktop) |
|---------|------|--------|------------------------|
| H1 | Plus Jakarta Sans | 700 | 28px / 36px |
| H2 | Plus Jakarta Sans | 600 | 22px / 28px |
| H3 | Plus Jakarta Sans | 600 | 18px / 22px |
| Body | Inter | 400 | 16px / 16px |
| Body small | Inter | 400 | 14px / 14px |
| Label | Inter | 500 | 12px / 13px |
| Button | Inter | 600 | 14px / 15px |

### Spacing Scale
Base unit: 4px. Use multiples: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.

### Border Radius
- Cards: `12px` (`rounded-xl`)
- Buttons: `8px` (`rounded-lg`)
- Inputs: `8px` (`rounded-lg`)
- Badges/pills: `9999px` (`rounded-full`)

### Shadows
- Card resting: `shadow-sm` (0 1px 2px rgba(0,0,0,0.05))
- Card hover: `shadow-md` (0 4px 6px rgba(0,0,0,0.07))
- Modal: `shadow-xl`

---

## Procedure Registry

Compass supports multiple surgical procedures. Each procedure is a first-class entity with its own recovery timeline, FAQs, symptom alerts, and medication schedules.

### Urology Procedures

| ID | Procedure | Recovery Days | Catheter | Key Milestones |
|----|-----------|--------------|----------|----------------|
| `circumcision` | Adult Circumcision | 42 | None | Dressing removal (D2), suture dissolution (D14), sexual activity (D42) |
| `frenuloplasty` | Frenuloplasty | 28 | None | Wound check (D3), suture dissolution (D10), sexual activity (D28) |
| `turp` | TURP (Transurethral Resection of Prostate) | 42 | Urethral 1–3 days | Catheter removal (D1–3), haematuria resolves (D14–21), normal voiding (D28) |
| `holep` | HoLEP (Holmium Laser Enucleation) | 42 | Urethral 1 day | Catheter removal (D1), haematuria resolves (D7–14), continence recovery (D28–42) |
| `cystoscopy-flexible` | Flexible Cystoscopy | 3 | None | Mild haematuria (D0–1), normal voiding (D1–2), results discussion (D3–7) |
| `cystoscopy-rigid` | Rigid Cystoscopy | 7 | Sometimes 1 day | Haematuria resolves (D1–3), normal activity (D3–5) |
| `hydrocele` | Hydrocele Repair | 28 | None | Drain removal if present (D1), scrotal support (D14), normal activity (D21–28) |
| `vasectomy` | Vasectomy | 14 | None | Rest (D0–2), light activity (D3–7), semen analysis (week 16) |
| `ureteroscopy` | Ureteroscopy | 14 | Stent 1–4 weeks | Stent discomfort management, stent removal date, normal activity (D7–14) |

### Andrology Procedures

| ID | Procedure | Recovery Days | Key Milestones |
|----|-----------|--------------|----------------|
| `penile-implant` | Penile Implant (IPP/Malleable) | 56 | Wound check (D7), pump activation training (D28), sexual activity (D42–56) |
| `peyronies` | Peyronie's Surgery (Nesbit/Grafting/Plication) | 42 | Catheter removal (D1), wound check (D7), sexual activity (D42) |
| `varicocele` | Varicocele Repair (Micro/Lap) | 21 | Scrotal support (D0–14), light activity (D7), normal activity (D21) |
| `penile-doppler-followup` | Penile Doppler Follow-Up | 1 | Results discussion, treatment plan, no recovery per se |

### Male Infertility Procedures

| ID | Procedure | Recovery Days | Key Milestones |
|----|-----------|--------------|----------------|
| `micro-tese` | Micro-TESE | 14 | Scrotal support (D0–7), wound check (D5–7), normal activity (D14), results (D14–28) |
| `sperm-retrieval` | Sperm Retrieval (PESA/MESA/TESA) | 7 | Rest (D0–1), light activity (D3), normal activity (D7) |
| `fertility-preservation` | Fertility Preservation (Sperm Banking) | 1 | Sample provision, storage confirmation, no physical recovery |

---

## Recovery Timeline Architecture

### Date Anchoring
The entire recovery experience is anchored to the patient's **surgery date**. All content is relative:
- **Day 0** = surgery day
- **Day 1** = first day post-op
- Negative days = pre-op preparation

### Day Content Structure

```typescript
interface RecoveryDay {
  procedure: Reference<Procedure>;
  dayNumber: number;           // 0 = surgery day, negative = pre-op
  dayRangeEnd?: number;        // For ranges like "Days 3–7"
  title: string;               // e.g., "Day 1 — First Morning After Surgery"
  summary: string;             // One-line overview
  whatToExpect: PortableText;  // Normal experiences today
  warningSignsAmber: PortableText;  // Call the practice
  warningSignsRed: PortableText;    // Go to A&E
  medications: MedicationSchedule[];
  activityRestrictions: PortableText;
  practicalTips: PortableText;
  milestones: Milestone[];     // Checkable achievements
  faqs: FAQ[];                 // Day-specific questions
}
```

### Milestone Types
- `medication` — Take/stop a medication
- `wound-care` — Dressing change, wound check
- `catheter` — Catheter-related milestone
- `activity` — Activity restriction change
- `appointment` — Follow-up visit
- `recovery` — General recovery marker (e.g., "sutures dissolved")
- `clearance` — Clinical clearance (e.g., "sexual activity permitted")

---

## Sanity Schema Definitions

### Document Types

#### `procedure`
Key fields: `title`, `slug`, `procedureId` (kebab-case, unique), `category` (urology/andrology/male-infertility), `shortDescription`, `recoveryDurationDays`, `hasCatheter`, `catheterDetails`, `anaesthesiaType`, `typicalStayType`, `preOpInstructions`, `overviewContent`, `risksSummary`, `consentFormNotes`, `bausPilReference`, `emergencyThresholds` (array of `symptomAlert`), `relatedProcedures`.

#### `recoveryDay`
Key fields: `procedure` (reference), `dayNumber`, `dayRangeEnd`, `title`, `summary`, `whatToExpect` (Portable Text), `warningSignsAmber` (Portable Text), `warningSignsRed` (Portable Text), `medications` (array of `medicationSchedule`), `activityRestrictions`, `practicalTips`, `milestones`, `faqs`, `reviewStatus` (draft/in-review/approved), `sortOrder`.

Ordering: by `dayNumber` asc. Preview: `title + procedure.title + dayNumber`.

#### `patientProfile`
NOT a Sanity document in v1 — stored in encrypted cookie.

```typescript
interface PatientProfile {
  id: string;                    // Generated UUID
  selectedProcedure: string;     // procedure.procedureId
  surgeryDate: string;           // ISO date
  createdAt: string;             // ISO datetime
  completedMilestones: string[]; // milestone IDs
  consentGiven: boolean;
  consentTimestamp: string;
  preferences: {
    notificationsEnabled: boolean;
    fontSize: 'default' | 'large' | 'xl';
  };
}
```

### Object Types

#### `symptomAlert`
Fields: `symptom` (required), `severity` (amber/red), `description`, `action` (required — if red, MUST include emergency contact), `timeframe`, `contactNumber`.

#### `milestone`
Fields: `milestoneId` (required, unique per procedure), `title` (required), `description`, `type` (medication/wound-care/catheter/activity/appointment/recovery/clearance), `isCheckable` (default true), `dayExpected`.

#### `medicationSchedule`
Fields: `medicationName` (required, BNF-standard), `dosage` (required), `frequency`, `duration`, `timing` (e.g., "with food"), `notes`, `isAsNeeded` (default false).

#### `faqItem`
Fields: `question` (required), `answer` (Portable Text), `category` (general/pain/wound-care/activity/medication/emergency/sexual-health/work-return).

### Portable Text Block Types
Available in all Portable Text fields: `infoBox` (teal), `warningBox` (amber/red severity), `tipBox` (green), `emergencyBox` (red, never collapsible), `medicationAlert` (start/continue/stop/change-dose), `recoveryMilestone` (inline checkable), `timelineCallout` ("By Day X..." badge), `glossaryTerm` (inline definition tooltip).

### Schema Rules
- Use `defineType` and `defineField` from `sanity`
- Every document needs `title` (string) and `slug` (slug, sourced from title)
- camelCase for field names: `dayNumber`, `warningSignsAmber`, `recoveryDurationDays`
- Descriptive `description` property on every field (for content editors)
- `procedure.procedureId` must match an entry in the Procedure Registry above
- All Sanity queries go through `src/lib/sanity/queries.ts` — GROQ only, never GraphQL

---

## Cookie Consent & GDPR

### What We Store (v1)

| Data | Storage | Requires Consent | Purpose |
|------|---------|-----------------|---------|
| Selected procedure | Cookie | Yes (functional) | Core app functionality |
| Surgery date | Cookie | Yes (functional) | Recovery timeline calculation |
| Completed milestones | Cookie | Yes (functional) | Progress tracking |
| Font size preference | localStorage | No (strictly necessary) | Accessibility |
| Cookie consent choice | Cookie | No (strictly necessary) | Record of consent |
| Analytics (Plausible) | None (cookieless) | No | Privacy-first analytics |

### Consent Flow
1. First visit: cookie banner appears (cannot be dismissed without choice)
2. Two options: "Accept Functional Cookies" / "Continue Without Cookies"
3. If declined: app works but cannot save progress (every visit starts fresh)
4. Consent stored in `ggo-compass-consent` cookie (httpOnly, secure, sameSite: strict)
5. Consent can be withdrawn at any time via Settings page
6. All functional cookies expire after 90 days

### Data Lifecycle
- No data leaves the browser in v1
- No server-side storage of patient data
- No third-party cookies
- Cookie deletion = full data reset (by design)
- Privacy notice accessible at `/privacy`

---

## Content Rules

### Clinical Content Standards
- All clinical content must be BAUS-compliant where BAUS Patient Information Leaflets exist
- Where no BAUS PIL exists, use EAU (European Association of Urology) guidelines
- Medication dosages: ALWAYS include "as prescribed by your surgeon" caveat
- Complication rates: cite source and date. NEVER invent statistics.
- Recovery timelines: present as ranges, not absolutes. "Most patients" not "you will"
- Emergency thresholds: specific and measurable (e.g., "temperature above 38°C" not "if you feel feverish")

### Language Rules
- British English throughout (colour, theatre, anaesthesia, organisation)
- Patient-facing: second person ("you", "your")
- No euphemisms for body parts in clinical context. Use anatomical terms with brief plain-English explanation on first use.
- No infantilising language. These are adults.
- Avoid: "little", "just a small", "don't worry", "perfectly normal" (use "expected" or "common" instead)
- Prefer: "You may notice..." over "You might experience..."
- Prefer: "This typically resolves within..." over "This should go away..."

### Terminology Guide

| Use | Don't Use |
|-----|----------|
| Theatre / operating theatre | OR / operating room |
| Anaesthesia / anaesthetic | Anesthesia |
| Catheter | Tube (when referring to urinary catheter) |
| Wound / surgical site | Incision (patient-facing) |
| Paracetamol | Acetaminophen |
| Ibuprofen | Advil / Motrin |
| A&E / Emergency Department | ER |
| GP | Primary care physician |
| Discharge (from hospital) | Release |
| Void / pass urine | Urinate / pee (in clinical context) |
| Scrotum / scrotal | "Down there" |
| Penis / penile | Euphemisms |
| Ejaculation | "Finishing" / euphemisms |
| Erectile function | "Getting hard" (in clinical context) |

---

## Accessibility Requirements

- WCAG 2.1 AA compliance minimum
- Minimum touch target: 44×44px
- Colour contrast: 4.5:1 for normal text, 3:1 for large text
- All interactive elements keyboard-navigable
- `prefers-reduced-motion` respected — no animations if set
- `prefers-color-scheme` supported (light/dark)
- Semantic HTML: `<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`
- Skip-to-content link
- Font size adjustable (default, large, XL) persisted in localStorage
- Screen reader tested with VoiceOver (primary) and NVDA

---

## Agent Architecture

### How Claude Code Should Work on This Project

1. **Always read CLAUDE.md first.** Before any task, load this file.
2. **Multi-file changes:** When a feature touches both Sanity schema and frontend, do schema first, then components, then test.
3. **Content from CMS:** Never hardcode patient-facing strings. If you need placeholder text during development, use `{/* TODO: Move to Sanity */}` comments.
4. **Clinical content:** Flag with `{/* TODO: Clinical review required — [gap description] */}`. Never invent clinical facts.
5. **Testing approach:** Build → check TypeScript compilation → verify Sanity schema validates → test component renders.
6. **Git workflow:** Feature branches off `main`. Conventional commits. PR with description.
7. **When unsure:** Ask. Don't guess clinical content. Don't guess design decisions. Don't invent procedure details.

### File Modification Priority
1. Sanity schemas (source of truth)
2. Type definitions
3. GROQ queries
4. Server Components (data fetching)
5. Client Components (interactivity)
6. Tailwind/styles
7. Seed data / test fixtures

---

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/add-procedure` | Scaffold a new procedure (schema + seed data + components) |
| `/clinical-check` | Audit clinical accuracy (RED / AMBER / GREEN) |
| `/microcopy-audit` | Find hardcoded patient-facing strings not in CMS |
| `/cleanup` | Code quality pass (dead code, TypeScript strict, console.logs, Tailwind tokens) |
| `/recovery-content` | Generate or audit day-by-day recovery content |
| `/consent-flow` | GDPR consent audit and implementation |
| `/design-audit` | Colour tokens, typography, accessibility, responsive check |

---

## Environment Variables

Required in `.env.local` (NEVER commit):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=
SANITY_REVALIDATE_SECRET=
```

---

## Relationship to Other Projects

- **ggomed.co.uk** — Main GGOMed website (separate Next.js/Sanity repo). GGO Compass is a companion app, designed to integrate as a subdomain.
- **chrysalis-pathway** — CCGS patient journey app (NHS context, different clinical domain). Shared architectural patterns but different tone and clinical standards.
- Global code standards: `~/.claude/CLAUDE.md`.
