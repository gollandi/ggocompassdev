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
