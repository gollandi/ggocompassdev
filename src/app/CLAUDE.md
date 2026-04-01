# app/ — Frontend Rules

Next.js App Router pages and route handlers for GGO Compass.

## Route Map

| Route | File | Description |
|---|---|---|
| `/` | `page.tsx` | Splash → redirects to `/personalise` |
| `/personalise` | `personalise/page.tsx` | Pronoun / tone / accessibility setup |
| `/procedure` | `procedure/page.tsx` | Procedure + location picker |
| `/mode` | `mode/page.tsx` | Tracking vs Exploring mode select |
| `/date` | `date/page.tsx` | Surgery date input (Tracking mode only) |
| `/welcome` | `welcome/page.tsx` | Personalised welcome screen |
| `/timeline` | `timeline/page.tsx` | Recovery timeline overview |
| `/recovery/[day]` | `recovery/[day]/page.tsx` | Day-detail recovery screen |
| `/feedback` | `feedback/page.tsx` | Patient feedback form |
| `/completion` | `completion/page.tsx` | Recovery complete screen |
| `/studio/[[...tool]]` | `studio/[[...tool]]/page.tsx` | Embedded Sanity Studio |
| `/export` | `export/page.tsx` | Dev-only: Figma variable export |
| `/styles` | `styles/page.tsx` | Dev-only: Style guide |

## Component Rules

- **Server Components by default.** Only add `'use client'` when the component uses hooks, event handlers, or browser APIs (`localStorage`, `window`, etc.).
- **No `any` types.** If a type is unknown, use `unknown` and narrow it.
- **No hardcoded patient-facing text.** All UI strings must come from the Sanity microcopy schema via `getMicrocopyMap()`. Use the Sanity value with a fallback string: `microcopyMap["key"] || "Fallback text"`.
- **Framer Motion animations** must respect `prefers-reduced-motion`. Apply `duration: 0` when the `rm` class is on `<html>`.
- **localStorage access** must always be guarded with `typeof window !== 'undefined'` in utility functions. Inside Client Components, access inside `useEffect` is safe.

## Navigation

Pages do not use a shared navigation component. Each screen is self-contained and navigates forward via `useRouter().push()` or `router.replace()`. Back navigation is handled by the browser.

The app is a linear flow (Splash → Personalise → Procedure → Mode → Date → Welcome → Timeline/Recovery), but the timeline and recovery screens can be navigated freely once unlocked.

## Error Boundaries

- `error.tsx` — catches errors within the app subtree (already implemented)
- `global-error.tsx` — catches root layout errors (already implemented)

## Metadata

Set `export const metadata` in each page that has meaningful SEO content. Recovery and personalisation pages should use generic metadata (no patient data in `<title>`).

## Dev-Only Routes

`/export` and `/styles` are development tools. They should be conditionally rendered or protected in production if they contain sensitive schema information.
