Check design consistency and accessibility across GGO Compass.

Usage: `/design-audit` — Full audit
Usage: `/design-audit colours` — Colour token audit only
Usage: `/design-audit a11y` — Accessibility audit only
Usage: `/design-audit responsive` — Responsive design audit only

## Process

1. Read CLAUDE.md for the Design System specification (colours, typography, spacing, shadows, border radius).
2. Scan all `.tsx`, `.ts`, and `.css` files.

## Colour Token Audit

### Check 1: Hardcoded Colours
Scan for any colour value that isn't a design token:
- Hex codes in className strings: `text-[#1E3A5F]` (should be `text-navy`)
- Hex codes in inline styles (shouldn't exist at all)
- RGB/HSL values anywhere in components
- Tailwind default colours used instead of custom tokens (e.g., `bg-blue-500` instead of `bg-teal`)

### Check 2: Colour Consistency
- Primary actions all use `teal` (not a mix of teal and other colours)
- Text colours use `navy` (primary) or `slate` (secondary), not arbitrary greys
- Warning states use `amber`, danger states use `red`, success uses `green`
- Backgrounds use `bg` or `surface`, not random whites/greys

### Check 3: Dark Mode
- All colour usages respect the `prefers-color-scheme` media query
- No hardcoded `white` or `black` that breaks in dark mode
- Verify the dark mode CSS variables in `globals.css` are complete

## Typography Audit

### Check 1: Font Usage
- Headings (h1–h3) use `font-heading` (Plus Jakarta Sans)
- Body text uses `font-body` (Inter)
- No inline font-family declarations
- Font sizes match the scale in CLAUDE.md

### Check 2: Text Hierarchy
- Only one `<h1>` per page
- Heading levels don't skip (no h1 → h3 without h2)
- Font weights match spec: h1=700, h2=600, h3=600, body=400

## Spacing Audit

- All spacing uses the 4px base scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64)
- No arbitrary spacing values like `p-[13px]` or `mt-[7px]`
- Consistent card padding: `p-4` (16px) on mobile, `p-6` (24px) on desktop
- Consistent section gaps: `space-y-6` or `gap-6`

## Border Radius Audit

Per CLAUDE.md: cards `rounded-xl` (12px), buttons `rounded-lg` (8px), inputs `rounded-lg` (8px), badges `rounded-full`.
- Flag any hardcoded `borderRadius` in inline styles
- Flag any use of `rounded-3xl` (24px) on cards — should be `rounded-xl`

## Accessibility Audit

### Check 1: Contrast Ratios
Verify against WCAG 2.1 AA:
- Normal text (16px): minimum 4.5:1 ratio
- Large text (18px+ bold or 24px+): minimum 3:1 ratio
- Interactive elements: minimum 3:1 against adjacent colours

Known combinations to verify:
- `navy` on `bg`: expected pass
- `slate` on `bg`: verify
- `white` on `teal`: verify
- `navy` on `amber-light`: verify
- `red` on `red-light`: verify

### Check 2: Touch Targets
- All clickable elements: minimum 44×44px
- Buttons, links, checkboxes, toggles, accordion triggers
- Space between adjacent touch targets: minimum 8px

### Check 3: Semantic HTML
- `<main>` wraps primary content (one per page)
- `<nav>` wraps navigation
- `<article>` wraps recovery day content
- `<section>` with heading for distinct content areas
- Lists use `<ul>`/`<ol>`, not styled divs

### Check 4: ARIA
- Interactive elements have `aria-label` or `aria-labelledby`
- Expandable sections: `aria-expanded`, `aria-controls`
- Progress indicators: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Loading states: `aria-busy="true"`
- Alerts: `role="alert"` for warning/emergency boxes
- Milestone checkboxes: proper `role="checkbox"`, `aria-checked`
- Toggle buttons: `aria-pressed`

### Check 5: Motion
- All animations wrapped in `prefers-reduced-motion: no-preference` check
- No auto-playing animations
- No essential information conveyed only through animation

### Check 6: Keyboard Navigation
- Tab order follows visual order
- Focus styles visible (not removed with `outline-none` without replacement)
- Skip-to-content link present
- Modal/dialog focus trap when open
- Escape key closes modals/overlays

## Responsive Audit

### Check 1: Mobile-First
- Base styles target mobile (320px+)
- Larger screens use `sm:`, `md:`, `lg:` prefixes
- No `max-width` media queries (anti-pattern in mobile-first)

### Check 2: Breakpoint Consistency
- `sm:640px` — large phones
- `md:768px` — tablets
- `lg:1024px` — desktop
- No custom breakpoints unless justified

### Check 3: Navigation
- Mobile: fixed bottom tab bar
- Tablet+: sidebar navigation
- Transition is clean, no layout shift

### Check 4: Content Overflow
- No horizontal scroll on any viewport
- Long text doesn't break layouts (truncation or wrapping)

## Output

Generate `docs/design-audit-[DATE].md` with:

1. **Score:** Overall design consistency score (percentage of checks passed)
2. **Critical Issues:** Accessibility failures that affect usability
3. **Design Debt:** Inconsistencies that should be fixed
4. **Suggestions:** Improvements that would enhance the experience
5. **File-by-file:** Issues listed by file for easy fixing

Auto-fix where safe:
- Replace hardcoded colours with tokens
- Add missing `aria-label` attributes
- Fix heading hierarchy

Commit auto-fixes with: `fix: design consistency improvements [DATE]`
