Find hardcoded patient-facing strings that should be in Sanity CMS.

## Process

1. Read CLAUDE.md to understand the content architecture.
2. Scan all `.tsx` and `.ts` files in `app/`, `components/`, and `lib/`.
3. Identify strings that are patient-facing (visible in the UI) but hardcoded in source code.

## What Counts as Hardcoded

### MUST migrate to Sanity:
- Any medical/clinical text (symptoms, instructions, advice)
- Procedure descriptions or recovery guidance
- FAQ questions and answers
- Error messages shown to patients
- Onboarding copy
- Button labels with clinical meaning ("Check my symptoms", "Mark as complete")
- Alert/warning text
- Medication names or dosages
- Contact information (phone numbers, addresses, email)
- Practice opening hours

### OK to keep hardcoded:
- Generic UI labels ("Back", "Next", "Close", "Menu")
- Purely technical strings (aria-labels that are generic)
- Date format strings
- CSS class names
- Console.log messages
- Developer comments
- Test fixtures

### Grey area (flag for discussion):
- Navigation labels ("Home", "Timeline", "Settings")
- Page titles that aren't procedure-specific
- Accessibility strings ("Loading...", "No results found")
- Legal text (privacy notice, cookie consent)

## Detection Rules

Look for these patterns:
1. JSX string literals in patient-facing components: `<p>Any text here</p>`
2. Template literals with clinical content: `` `You are on Day ${day} of recovery` ``
3. Object literals with label/text properties used in UI: `{ label: 'Some text' }`
4. Placeholder text in inputs: `placeholder="Enter your surgery date"`
5. Alt text that is clinical: `alt="Wound care diagram"`
6. Title attributes: `title="Click to check this milestone"`

## Output

Generate a report as `docs/microcopy-audit-[DATE].md` with:

### Summary
- Total hardcoded strings found
- Breakdown by category (MUST migrate / OK / Grey area)
- Files with the most hardcoded strings

### Migration Plan
For each string that MUST migrate:

| File | Line | Current String | Suggested Sanity Location | Priority |
|------|------|---------------|--------------------------|----------|
| ... | ... | ... | ... | High/Medium/Low |

### Recommended Sanity Schema Changes
If new fields or document types are needed to house the migrated content, specify them.

### Implementation Steps
1. Create any new Sanity schema fields needed
2. Seed the current hardcoded values into Sanity
3. Update components to fetch from Sanity
4. Verify no regressions
5. Remove old hardcoded strings
