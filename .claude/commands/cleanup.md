Perform a code quality and hygiene pass on the GGO Compass codebase.

## Process

1. Read CLAUDE.md to understand the project structure and standards.
2. Run through each check category below.
3. Fix issues automatically where safe. Flag for review where judgment is needed.

## Check Categories

### 1. Dead Code Removal
- Unused imports (run `npx tsc --noEmit` and check for warnings)
- Unused variables and functions
- Commented-out code blocks (remove unless marked with a TODO)
- Unused component files (not imported anywhere)
- Unused Sanity schema fields (defined but never queried)
- Stale test fixtures

### 2. Console Cleanup
- Remove all `console.log` statements (except in error boundaries)
- Remove all `console.warn` statements (except intentional deprecation notices)
- Keep `console.error` in catch blocks
- Remove `debugger` statements

### 3. TypeScript Strict Mode
- Fix all `any` types — replace with proper types
- Add explicit return types to exported functions
- Fix all `@ts-ignore` and `@ts-expect-error` comments (resolve the underlying issue)
- Ensure all component props have explicit interfaces
- Run `npx tsc --noEmit --strict` and fix all errors

### 4. Component Consolidation
- Find duplicate component patterns (e.g., multiple card components)
- Identify components that could be merged or composed
- Find components that violate the Server/Client boundary rules from CLAUDE.md
- Flag Client Components that don't actually need interactivity

### 5. Root File Cleanup
- Consolidate any stray markdown files in the root that should be in `docs/`
- Ensure CLAUDE.md is the single source of truth (no competing README.md with different info)
- Check `.gitignore` covers: `.env*`, `node_modules/`, `.next/`, `.sanity/`
- Remove any IDE-specific files that shouldn't be committed

### 6. Dependency Audit
- Run `npm audit` and report findings
- Check for unused dependencies in `package.json`
- Check for duplicate functionality (e.g., both `dayjs` and `date-fns`)
- Ensure no `devDependencies` are imported in production code

### 7. Tailwind Cleanup
- Find inline `style` attributes that should be Tailwind classes
- Find CSS modules or styled-components (should not exist)
- Check for hardcoded colour values (should use design tokens)
- Verify responsive classes follow mobile-first pattern

## Output

Generate a report as `docs/cleanup-report-[DATE].md` with:

1. Summary of issues found per category
2. Issues fixed automatically (with file + description)
3. Issues requiring manual review (with file + description + recommendation)
4. Before/after line counts (net code reduction)

Commit all automatic fixes with: `refactor: code cleanup pass [DATE]`
