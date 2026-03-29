Add a new surgical procedure "$ARGUMENTS" to GGO Compass.

## Instructions

1. Read CLAUDE.md at the repo root to understand the full project context and the Procedure Registry.
2. Confirm the procedure name and category (urology / andrology / male-infertility) with the user.
3. Research the procedure to establish accurate recovery timelines. Flag any clinical content as TODO for JJ's review.

## Step 1: Sanity Schema

- Check if `schemas/documents/procedure.ts` exists. If not, create it following the schema in CLAUDE.md.
- Create a seed data file: `data/procedures/[procedure-id].json`
- Populate all required fields:
  - `title`, `slug`, `procedureId` (kebab-case)
  - `category`
  - `shortDescription`
  - `recoveryDurationDays`
  - `hasCatheter`, `catheterDetails` (if applicable)
  - `anaesthesiaType`, `typicalStayType`
  - `preOpInstructions` (mark as `{/* TODO: Clinical review required */}`)
  - `overviewContent` (mark as `{/* TODO: Clinical review required */}`)
  - `risksSummary` (mark as `{/* TODO: Clinical review required */}`)
  - `bausPilReference` (look up on baus.org.uk, leave empty if none)
  - `emergencyThresholds` (common post-op red/amber alerts)

## Step 2: Recovery Timeline Content

Create `recoveryDay` seed documents for the following phases:

### Pre-Op (if applicable)
- Day -7: Pre-assessment preparation
- Day -1: Day before surgery

### Peri-Operative
- Day 0: Surgery day (what happens, what to expect on waking)

### Early Recovery
- Day 1: First morning after surgery
- Days 2–3: First few days at home
- Days 4–7: First week

### Mid Recovery
- Week 2 (Days 8–14)
- Week 3–4 (Days 15–28)

### Late Recovery (if applicable)
- Weeks 5–6 (Days 29–42)
- Beyond 6 weeks

For each recovery day/range, include:
- `whatToExpect`: Normal findings for this stage
- `warningSignsAmber`: Call the practice if...
- `warningSignsRed`: Go to A&E if...
- `medications`: Typical medication schedule for this day
- `activityRestrictions`: What they can/can't do
- `practicalTips`: Concrete actionable advice
- `milestones`: Checkable items for this day
- `faqs`: Common questions at this stage

All clinical content MUST include: `{/* TODO: Clinical review required — [describe what needs verification] */}`

## Step 3: FAQ Content

Create FAQ documents for the procedure covering these categories:
- `general`: About the procedure, preparation, what to expect
- `pain`: Pain management, normal pain levels
- `wound-care`: Dressing changes, bathing, signs of infection
- `activity`: Work return, exercise, driving, lifting
- `medication`: What to take, what to avoid
- `sexual-health`: When to resume, what to expect
- `work-return`: Timeline, desk vs physical work
- `emergency`: When to seek help

Minimum 3 FAQs per category. All flagged for clinical review.

## Step 4: Symptom Alert Thresholds

Create procedure-specific symptom alerts:

### Always Include (Red — A&E):
- Heavy bleeding soaking through dressing in <1 hour
- Temperature >38.5°C not responding to paracetamol
- Inability to pass urine for >8 hours (if applicable)
- Signs of deep vein thrombosis (calf pain + swelling)
- Chest pain or difficulty breathing

### Always Include (Amber — Call Practice):
- Wound redness spreading beyond 1cm from incision edge
- Temperature 37.5–38.5°C lasting >24 hours
- Pain not controlled by prescribed medications
- Unexpected swelling increasing after Day 3
- Concerns about wound healing

Add procedure-specific alerts based on the surgical type.

## Step 5: Medication Schedule Template

Create a default medication template including:
- Paracetamol 1g QDS (standard)
- Ibuprofen 400mg TDS with food (if not contraindicated)
- Procedure-specific medications (antibiotics, laxatives, etc.)
- Mark ALL dosages with: `{/* TODO: Clinical review — confirm standard post-op protocol for [procedure] */}`

## Step 6: Frontend Components

- Verify the procedure renders correctly in the procedure selection grid
- Verify the recovery timeline page loads for this procedure
- Verify individual day pages render
- Add the procedure to any navigation/filtering components

## Step 7: Update Registry

- Add the procedure to the Procedure Registry table in root CLAUDE.md
- Commit with message: `feat: add [procedure-name] procedure and recovery content`

## Quality Checks

- [ ] All clinical content flagged with TODO for review
- [ ] Procedure ID is unique and kebab-case
- [ ] Recovery days cover Day 0 through end of recovery period
- [ ] Red alerts include emergency contact information
- [ ] Medication dosages marked for clinical review
- [ ] BAUS PIL link included (if available)
- [ ] No hardcoded strings in components
- [ ] TypeScript compiles without errors
- [ ] Procedure appears in selection grid
