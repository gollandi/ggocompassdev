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
