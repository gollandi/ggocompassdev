#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_step() {
  echo -e "${YELLOW}▶ $1${NC}"
}

log_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

log_error() {
  echo -e "${RED}✗ $1${NC}"
}

# Step 1: Verify we're in the right directory
log_step "Checking directory..."
if [ ! -f "package.json" ]; then
  log_error "package.json not found. Are you in the ggocompassdev repo root?"
  exit 1
fi

if ! grep -qi "ggo\|compass" package.json; then
  log_error "package.json doesn't contain 'ggo' or 'compass'. Wrong directory?"
  exit 1
fi

log_success "In correct directory (ggocompassdev)"

# Step 2: Create .claude/commands/ directory
log_step "Creating .claude/commands/ directory..."
mkdir -p .claude/commands
log_success "Directory created"

# Step 3: Create CLAUDE.md in repo root
log_step "Creating CLAUDE.md..."
cat << 'ENDOFFILE' > CLAUDE.md
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
ENDOFFILE

log_success "CLAUDE.md created"

# Step 4: Create .claude/commands/add-procedure.md
log_step "Creating .claude/commands/add-procedure.md..."
cat << 'ENDOFFILE' > .claude/commands/add-procedure.md
Add a new surgical procedure with its full recovery timeline to GGO Compass.

## Usage

`/add-procedure [procedure name]`

## Process

1. Read `CLAUDE.md` for project context and clinical content rules.
2. Check `sanity/schemas/` for the existing schema structure — new procedures use the SAME schemas (`procedure`, `recoveryDay`, `timelineStep`).
3. Ask JJ for the clinical source document. Do NOT proceed without one.

## What to Create

### 1. Sanity Seed Data

Create seed files in `scripts/seed/[procedure-slug]/`:

**procedure.json:**
- Title, slug, description, recovery duration, category

**recovery-days.json (one entry per day, up to 28):**
For each day provide:
- `dayNumber`: 1–28
- `clinicalGuidance`: What's happening clinically (Portable Text)
- `expectedSymptoms`: Normal symptoms for this day
- `activityRestrictions`: What the patient must NOT do
- `warningSignsRedFlags`: When to seek emergency help (CRITICAL — must be accurate)
- `practicalTips`: Helpful advice
- `isMilestone`: Boolean — mark significant recovery points

**timeline-steps.json:**
- Group days into logical phases (e.g. "Immediate Recovery Day 1-3", "First Week", "Week 2-3", "Final Week")

### 2. Content Rules

- All content must be BAUS-compliant where BAUS guidance exists
- If no BAUS guidance exists for this procedure, use the clinical source provided by JJ
- Warning signs are SAFETY-CRITICAL — err on the side of caution
- Activity restrictions: conservative. When unsure, restrict more.
- NO specific drug dosages unless JJ provides them
- Include "contact your surgeon" as a safety net for any uncertain guidance
- British English throughout

### 3. Microcopy

Check if any new UI strings are needed for this procedure. If so, add them to the microcopy seed data with appropriate keys.

### 4. Quality Checks
- [ ] Every day from 1 to [recovery duration] has content
- [ ] Warning signs are clinically accurate and complete
- [ ] Activity restrictions are appropriately conservative
- [ ] Milestones are marked at meaningful recovery points
- [ ] No hardcoded text — all from Sanity
- [ ] Content flagged for JJ review where uncertain
ENDOFFILE

log_success ".claude/commands/add-procedure.md created"

# Step 5: Create .claude/commands/cleanup.md
log_step "Creating .claude/commands/cleanup.md..."
cat << 'ENDOFFILE' > .claude/commands/cleanup.md
Clean up the repository root by consolidating scattered markdown files from previous development sessions.

## Context

The repo root currently has ~30 markdown files generated during LLM development sessions. Most are session artifacts (handoff summaries, fix logs, transformation notes) that don't serve as ongoing documentation. This CLAUDE.md replaces all of them as the project context document.

## Actions

### 1. Create `docs/` directory
```bash
mkdir -p docs
```

### 2. Move keeper docs to `docs/`
```bash
mv BRAND_GUIDELINES.md docs/
mv COLOR_REFERENCE_CARD.md docs/
mv INTEGRATION_GUIDE.md docs/
mv DEPLOYMENT.md docs/
```

### 3. Consolidate Sanity docs
Read all `SANITY_*.md` files. Extract the still-relevant information into a single `docs/sanity-guide.md`. Delete the originals.

### 4. Consolidate Microcopy docs
Read all `MICROCOPY_*.md` and `MICROCOPY_*.csv` files. Extract the still-relevant information into a single `docs/microcopy-guide.md`. Keep `MICROCOPY_SANITY_IMPORT.csv` if it contains data needed for seeding. Delete the rest.

### 5. Delete session artifacts
```bash
rm -f FIX_SUMMARY.md
rm -f FINAL_HANDOFF_SUMMARY.md
rm -f TRANSFORMATION_COMPLETE.md
rm -f IMPLEMENTATION_STATUS_REPORT.md
rm -f DEPLOYMENT_FIXES_SUMMARY.md
rm -f BRAND_ENHANCEMENT_SUMMARY.md
rm -f CONTEXT_RECAP_FOR_LLM_TRANSITION.md
rm -f CMS_CONTENT_BACKFILL_CHECKLIST.md
rm -f PERSONALIZATION_FLOW_RECOMMENDATION.md
rm -f PERSONALIZATION_IMPLEMENTED.md
rm -f FEATURE_TESTING_GUIDE.md
rm -f QUICKSTART_DEPLOY.md
rm -f STUDIO_ERROR_FIX.md
rm -f STUDIO_READY.md
rm -f SANITY_CONFIGURATION_FIX.md
rm -f VERCEL_SECRETS_SETUP.md
```

### 6. Clean up legacy files
```bash
rm -f index.html.old
rm -f vite.config.ts.old
rm -f README.old.md
```

### 7. Move test files
```bash
mkdir -p tests/manual
mv test-*.html tests/manual/
```

### 8. Update README.md
Remove references to deleted files. Point documentation links to new `docs/` locations.

### 9. Commit
```bash
git add -A
git commit -m "docs: consolidate root markdown files into docs/, remove session artifacts"
```

## Do NOT Delete
- README.md (update it)
- CLAUDE.md
- .env.example
- Any file in `.github/`, `src/`, `sanity/`, `scripts/`, `public/`
ENDOFFILE

log_success ".claude/commands/cleanup.md created"

# Step 6: Create .claude/commands/clinical-check.md
log_step "Creating .claude/commands/clinical-check.md..."
cat << 'ENDOFFILE' > .claude/commands/clinical-check.md
Perform a clinical accuracy audit on all recovery timeline content in GGO Compass.

## Process

1. Identify all procedures currently in the app (check Sanity seed data and any hardcoded content).
2. For each procedure, review every recovery day's content:
   - Clinical guidance
   - Expected symptoms
   - Activity restrictions
   - Warning signs / red flags
   - Practical tips

## Check Categories

### RED FLAGS (patient safety — fix immediately)
- Warning signs that are clinically incorrect or incomplete
- Activity restrictions that are too permissive (patient could harm themselves)
- Recovery timelines that contradict BAUS guidance
- Missing critical warning signs for a given post-operative day
- Advice to take specific medications without "consult your surgeon" caveat
- Any content that could delay a patient seeking emergency care

### AMBER FLAGS (review with JJ)
- Content that is clinically reasonable but not sourced from BAUS or JJ
- Activity restrictions that may be overly conservative (won't harm but may frustrate)
- Day-to-day progression that seems too fast or too slow
- Symptoms described that are unusual for the procedure
- Any drug names or dosages mentioned

### GREEN (verified)
- Content directly from BAUS patient information leaflets
- Content explicitly provided or approved by JJ
- Generic recovery advice (rest, hydration, wound hygiene) that is universally accepted

## Output

Generate `docs/clinical-audit-[DATE].md` with summary table and detailed findings.

## Special Attention

- **Circumcision:** Verify against BAUS "Having a Circumcision" patient information
- **TURP:** Verify against BAUS "Transurethral Resection of the Prostate" patient information
- **Any new procedure:** Must have an identified clinical source before content is accepted
ENDOFFILE

log_success ".claude/commands/clinical-check.md created"

# Step 7: Create .claude/commands/microcopy-audit.md
log_step "Creating .claude/commands/microcopy-audit.md..."
cat << 'ENDOFFILE' > .claude/commands/microcopy-audit.md
Audit all patient-facing strings in the GGO Compass codebase to ensure they're managed through Sanity CMS microcopy.

## Process

1. Scan all files in `src/components/` and `src/app/` for hardcoded English strings.
2. Ignore: code comments, console.log, error messages for developers, aria-labels that are structural.
3. Flag: any patient-visible text (button labels, headings, instructions, tooltips, placeholders, error messages shown to users) that is NOT fetched from the Sanity `microcopy` schema.
4. For each flagged string, suggest a microcopy key following the existing naming convention.

## Output

Generate `docs/microcopy-audit-[DATE].md` with:

```
# Microcopy Audit — [DATE]

## Summary
- Files scanned: [N]
- Hardcoded strings found: [N]
- Already in CMS: [N]
- Missing from CMS: [N]

## Missing Microcopy Entries
| String | File | Line | Suggested Key | Category |
|---|---|---|---|---|
| "Start your recovery" | screens/Splash.tsx | 42 | splash.cta.start | button |
```

## Why This Matters

Hardcoded strings cannot be updated without a code deployment. CMS-managed microcopy allows JJ or clinical staff to update wording without developer involvement — essential for a medical app where language precision matters.
ENDOFFILE

log_success ".claude/commands/microcopy-audit.md created"

# Step 8: Verify syntax with bash -n
log_step "Verifying script syntax..."
bash -n "$0" 2>/dev/null && log_success "Script syntax is valid" || {
  log_error "Syntax error in script"
  exit 1
}

# Step 9: Git operations
log_step "Adding files to git..."
git add CLAUDE.md .claude/
log_success "Files staged"

log_step "Committing changes..."
git commit -m "Add Claude Code configuration: CLAUDE.md and slash commands

Sets up Claude Code integration for GGO Compass:
- CLAUDE.md with full project context, architecture, clinical rules
- .claude/commands/ with /add-procedure, /cleanup, /clinical-check, /microcopy-audit

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
log_success "Changes committed"

log_step "Pushing to main..."
git push origin main
log_success "Pushed to origin/main"

# Final success message
echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo "Created files:"
echo "  - CLAUDE.md (repo root)"
echo "  - .claude/commands/add-procedure.md"
echo "  - .claude/commands/cleanup.md"
echo "  - .claude/commands/clinical-check.md"
echo "  - .claude/commands/microcopy-audit.md"
echo ""
echo "Claude Code is now configured for GGO Compass."
echo "Use /add-procedure, /cleanup, /clinical-check, /microcopy-audit in Claude Code."
