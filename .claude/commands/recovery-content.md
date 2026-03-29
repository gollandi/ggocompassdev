Audit or update recovery day content for a specific procedure.

## Usage

`/recovery-content [procedure-slug] [optional: day range e.g. 1-7]`

Examples:
- `/recovery-content circumcision` — full audit of all 28 days
- `/recovery-content turp 8-14` — audit only days 8–14

## Process

1. Identify the procedure in the hardcoded library (`src/lib/content/procedures/`) and in any Sanity seed data (`scripts/data/`).
2. Read every day in the specified range (or all days if no range given).
3. For each day, check:
   - Clinical guidance is present and accurate
   - Expected symptoms are listed
   - Activity restrictions are stated
   - Warning signs / red flags are present and clinically correct
   - Practical tips are useful and not contradictory
   - Milestones are marked where appropriate

## Output Format

For each day found to need attention, output:

```
### Day [N] — [status: ✅ OK | ⚠️ Review | 🔴 Fix required]
- **Issue:** [describe the problem]
- **Suggested fix:** [what to change, or "JJ to review"]
- **Reason:** [why this matters clinically or for UX]
```

## Safety Rules

- Never change warning signs / red flags without explicit JJ sign-off.
- Never soften activity restrictions — always err conservative.
- Never add drug names or dosages unless JJ has provided them.
- Flag anything uncertain with `<!-- TODO: Clinical review required — [gap] -->`.
- All patient-facing copy in British English.

## After Audit

If changes are made:
1. Update the appropriate file in `src/lib/content/procedures/[slug].ts`
2. Update corresponding Sanity seed data in `scripts/data/[slug].json` if it exists
3. Run `/clinical-check` to verify the full procedure
4. Commit with: `fix(content): update [procedure] day [N] recovery guidance`
