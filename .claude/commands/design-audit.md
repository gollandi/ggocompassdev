Audit the UI/UX of GGO Compass for accessibility, consistency, and rough edges.

## Usage

`/design-audit [optional: component or screen name]`

Examples:
- `/design-audit` — full audit
- `/design-audit RecoveryScreen` — single screen audit
- `/design-audit MoodSlider` — single component audit

## Audit Categories

### 1. Accessibility (WCAG 2.2 AA)

For each screen/component, check:
- [ ] Interactive elements have `aria-label` or visible text label
- [ ] `aria-pressed` on toggle buttons (see pronoun/tone buttons in PersonaliseScreen)
- [ ] Focus management — tabbing order is logical
- [ ] Minimum touch target: 44×44px on all buttons
- [ ] Colour contrast: text must meet 4.5:1 (normal) / 3:1 (large text) ratio
- [ ] `prefers-reduced-motion` is respected — Framer Motion animations should use `transition={{ duration: 0 }}` when `rm` class is on `<html>`
- [ ] High contrast mode (`hc` class on `<html>`) is visually meaningful
- [ ] Images have `alt` text; decorative images have `alt=""`
- [ ] Form inputs have associated `<label>` elements (not just `placeholder`)

### 2. Error States

For each data-fetching component, check:
- [ ] Loading state is shown (spinner or skeleton)
- [ ] Empty state is handled (Sanity returns no data)
- [ ] Error state is handled (Sanity fetch fails)
- [ ] Error messages are user-friendly (not raw JS errors)
- [ ] Recovery action is offered (e.g. "Try again" button)

### 3. Brand Consistency

- [ ] All colours use GGO design tokens (`text-ggo-navy`, `bg-ggo-teal`, etc.) — no raw hex values
- [ ] Typography uses Plus Jakarta Sans for headings, system font for body
- [ ] Border radius follows GGO convention: cards 24px, buttons 12px, inputs 8px
- [ ] Shadows are consistent (`shadow-md` for cards, `shadow-sm` for inputs)
- [ ] Button variants match GGO spec: `gold` for primary CTA, `outline` for secondary

### 4. Mobile UX

- [ ] Viewport is 375px–430px friendly (no horizontal scroll)
- [ ] Sticky elements don't obscure content
- [ ] Date picker input is native on mobile (not a custom calendar)
- [ ] Sliders (MoodSlider) are usable with thumb on mobile

### 5. Microcopy

- [ ] All patient-facing strings have Sanity microcopy keys
- [ ] Fallback strings are meaningful (not empty)
- [ ] Error messages are empathetic (patient-friendly, not technical)
- [ ] All text is British English (no "color", "center", "canceled")

## Output Format

```
### [Screen / Component Name]
**Status:** ✅ Good | ⚠️ Minor issues | 🔴 Fix required

Issues found:
- [Issue description] — Suggested fix: [fix]
- [Issue description] — Suggested fix: [fix]
```

## After Audit

Fix items that are clearly safe to change (missing `aria-label`, typos, token replacements).
Flag anything that requires design decisions with `// TODO: Design review — [JJ to decide]`.
Commit fixes with: `fix(a11y): [description]` or `fix(ux): [description]`.
