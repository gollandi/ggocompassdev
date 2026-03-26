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
