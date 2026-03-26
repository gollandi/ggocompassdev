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
