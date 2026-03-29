Generate recovery day content for procedure "$ARGUMENTS".

Expected format: `/recovery-content circumcision days 0-7`
Or: `/recovery-content turp all`

## Instructions

1. Read CLAUDE.md to understand the Procedure Registry, recovery timeline architecture, and content rules.
2. Parse the arguments to determine:
   - `procedureId`: the procedure to generate content for
   - `dayRange`: specific days (e.g., "0-7") or "all" for the full timeline
3. Check what recovery day content already exists for this procedure in `data/recovery/`.
4. Generate missing content only (don't overwrite existing approved content).

## Content Generation Rules

### For Each Recovery Day/Range

Generate a JSON file at `data/recovery/[procedureId]/day-[N].json` (or `day-[N]-to-[M].json` for ranges).

Each file must contain:

```json
{
  "_type": "recoveryDay",
  "_meta": {
    "generatedBy": "claude-code",
    "generatedDate": "[ISO date]",
    "clinicalReviewRequired": true,
    "reviewNotes": "AI-generated recovery content. Requires clinical review by JJ before publishing."
  },
  "procedure": { "_ref": "[procedure-document-id]" },
  "dayNumber": 0,
  "dayRangeEnd": null,
  "title": "Day 0 — Surgery Day",
  "summary": "One-line summary of this day",
  "reviewStatus": "draft",
  "whatToExpect": [],
  "warningSignsAmber": [],
  "warningSignsRed": [],
  "medications": [],
  "activityRestrictions": [],
  "practicalTips": [],
  "milestones": [],
  "faqs": []
}
```

### Content Quality Standards

**What to Expect:**
- Written in second person ("You may notice...")
- Specific and measurable where possible
- Covers: physical sensations, normal findings
- Example: "Some bruising and swelling around the surgical site is expected. This typically peaks around Day 2–3."

**Warning Signs (Amber — Call Practice):**
- Each sign must be specific and measurable
- Include timeframe context ("If this persists beyond 24 hours...")
- Always include practice phone number placeholder: `{PRACTICE_PHONE}`
- Example: "Wound redness extending more than 1cm from the incision edge"

**Warning Signs (Red — A&E):**
- Life-threatening or limb-threatening signs only
- Always include: "Call 999 or go to your nearest A&E"
- Must be unambiguous — patient should not hesitate
- Example: "Heavy bleeding that soaks through your dressing within 1 hour"

**Medications:**
- Use BNF-standard names
- Include timing relative to meals/sleep
- Always add: "Take as prescribed by your surgeon"
- Never suggest stopping prescribed medication

**Activity Restrictions:**
- Specific activities with timeframes
- Cover: work, driving, exercise, sexual activity, bathing, lifting
- Use positive framing: "You can return to light desk work" vs "Don't go to work"

**Practical Tips:**
- Concrete, actionable advice
- Things patients actually ask about
- Example: "Wear loose-fitting underwear (cotton boxers work well) to reduce friction on the wound"

**Milestones:**
- Checkable items that give sense of progress
- Mix of automatic ("Sutures begin dissolving") and patient-action ("Completed gentle walk")
- Each milestone needs a unique `milestoneId`: `[procedureId]-d[day]-[type]-[n]`

**FAQs:**
- Questions patients actually ask at this stage of recovery
- Answers concise but complete
- Always include the "Is this normal?" variant for common concerns

## Day Templates by Phase

### Day 0 (Surgery Day)
- What happened during surgery (general terms)
- Immediate post-op: anaesthesia wearing off, pain levels, nausea
- First void (if relevant)
- Discharge criteria (if day-case)
- What to expect overnight

### Days 1–3 (Early Recovery)
- Pain management peak and plateau
- Wound appearance progression
- Activity: gentle movement, no lifting
- Hydration and diet

### Days 4–7 (First Week)
- Gradual improvement trajectory
- Dressing removal (procedure-specific)
- First follow-up appointment
- Driving/work considerations

### Week 2–4 (Mid Recovery)
- Suture dissolution (if applicable)
- Return to light exercise
- Work return (desk vs physical)

### Week 5+ (Late Recovery)
- Full activity resumption timeline
- Sexual activity clearance (if applicable)
- Final follow-up

## Output

For each day generated:
1. Create the JSON file in `data/recovery/[procedureId]/`
2. Log a summary: day number, title, content sections included
3. At the end, generate `data/recovery/[procedureId]/README.md` listing all days and their review status

Commit with: `content: add recovery days [range] for [procedure]`
