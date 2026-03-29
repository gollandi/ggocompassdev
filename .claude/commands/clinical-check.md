Perform a clinical accuracy audit on the patient-facing content in GGO Compass.

## Process

1. Read CLAUDE.md at the repo root for terminology guide and content rules.
2. If $ARGUMENTS specifies a procedure, audit only that procedure's content. Otherwise, audit everything.
3. Scan ALL patient-facing content: components/, data/, seed files, and any Sanity-queryable content.
4. For each clinical statement, categorise it.

## Check Categories

### RED FLAGS (must fix immediately)
- Any clinical statement that contradicts BAUS Patient Information Leaflets
- Incorrect medication dosages or drug interactions not flagged
- Wrong emergency thresholds (e.g., temperature thresholds, bleeding criteria)
- Incorrect catheter timelines or management instructions
- Recovery timelines that are dangerously optimistic (could cause patients to ignore warning signs)
- Any clinical claim without a source or TODO marker
- Medications that should be avoided post-operatively but are recommended
- Advice that could delay emergency treatment (e.g., "wait and see" for red-flag symptoms)

### AMBER FLAGS (review with JJ)
- Content that is clinically reasonable but not explicitly from a BAUS PIL or EAU guideline
- Recovery timelines that are conservative but not harmful
- Drug dosages that are within BNF ranges but should be confirmed for this practice
- Activity restriction timelines (return to work, sexual activity, exercise)
- Any procedure-specific advice not covered by standard guidelines
- Fasting instructions (confirm current practice protocol)
- Specific contact numbers or clinic hours

### GREEN (verified)
- Content directly from a BAUS PIL with correct reference
- Content matching EAU guidelines with citation
- Standard post-operative advice consistent with NHS best practice
- Emergency thresholds that match accepted clinical criteria

### Content Quality Checks
- Terminology matches the guide in CLAUDE.md (British English, no euphemisms)
- No fear-mongering language ("dangerous", "serious risk", "you must")
- Warning signs are specific and measurable ("temperature above 38°C" not "if you feel hot")
- Activity guidance gives specific timeframes, not vague advice
- Medication advice includes "as prescribed by your surgeon" caveat
- No unsourced complication statistics

## Output

Generate a report as `docs/clinical-audit-[DATE].md` with:

1. Summary: total items checked, RED/AMBER/GREEN counts
2. RED flags: full detail with file location, current content, what's wrong, suggested fix
3. AMBER flags: full detail with file location, content, reason for review
4. GREEN items: brief list confirming verification
5. Missing content: procedures or recovery days that have no clinical content yet
6. Recommendations: priority order for JJ's clinical review session

## Procedure-Specific Checks

### Circumcision
- Dressing removal timing correct
- Suture dissolution timeline accurate
- Sexual activity resumption timeline correct
- Post-op hygiene instructions present

### TURP / HoLEP
- Catheter management instructions accurate
- Haematuria expectations realistic
- Retrograde ejaculation information included
- Irrigation/washout instructions if applicable

### Penile Implant
- Pump activation timeline correct
- Infection warning signs comprehensive
- Device-specific care instructions present

### Vasectomy
- Semen analysis timing (16+ weeks) correct
- Contraception continuation advice present
- Failure rate information accurate and sourced

### Micro-TESE / Sperm Retrieval
- Results timeline expectations realistic
- Fertility next-steps information present
- Partner/IVF clinic coordination notes included
