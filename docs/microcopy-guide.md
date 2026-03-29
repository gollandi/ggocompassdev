# Microcopy Guide — GGO Compass

## What is microcopy?

All patient-facing UI strings (button labels, headings, instructions, error messages, tooltips, placeholders) must be managed through the Sanity `ggoMicrocopy` schema — not hardcoded in components. This allows JJ or clinical staff to update wording without a code deployment.

---

## Key naming convention

Keys use dot-separated namespacing: `[screen].[element].[variant]`

Examples:
```
splash.cta.start
splash.headline
recovery.redFlag.title
settings.clearData.label
consent.banner.body
onboarding.pronoun.label
```

---

## Using microcopy in components

The `MicrocopyText` component handles fetching and fallback:

```tsx
import { MicrocopyText } from '@/components/ggo/MicrocopyText';

<MicrocopyText microcopyKey="splash.cta.start" fallback="Start your recovery" />
```

For server-side or utility use:
```ts
import { getMicrocopyText } from '@/lib/sanity/queries';

const label = await getMicrocopyText('splash.cta.start', 'Start your recovery');
```

---

## Fallback defaults

Fallback strings are defined in `src/data/microcopyDefaults.ts`. Every key used in the app must have a fallback here. The fallback is shown when Sanity is unreachable or the key hasn't been published yet.

---

## Tone variants

Each microcopy item can have tone variants:
```json
{
  "key": "recovery.nurseGreeting",
  "text": "You're doing brilliantly.",
  "variants": [
    { "condition": "tone:formal", "text": "Your recovery is progressing well." },
    { "condition": "tone:clinical", "text": "Recovery progress is within expected parameters." }
  ]
}
```

The tone is set by the patient's personalisation preference (`ggo_tone` in localStorage).

---

## Categories

| Category | Examples |
|----------|---------|
| button | CTA labels, action buttons |
| heading | Screen titles, section headers |
| body | Instructional text, descriptions |
| error | User-facing error messages |
| tooltip | Hover/tap labels |
| placeholder | Input placeholder text |
| label | Form labels, tag text |
| notification | Alerts, banners |

---

## Adding microcopy for a new screen or component

1. Identify every patient-visible string in the component
2. Create a microcopy key following the naming convention
3. Add the fallback to `src/data/microcopyDefaults.ts`
4. Replace the hardcoded string with `<MicrocopyText>` or `getMicrocopyText()`
5. Add the entry to Sanity Studio under "GGO Microcopy"

---

## British English rules

- colour, not color
- centre, not center
- cancelled, not canceled
- recognised, not recognized
- fulfil, not fulfill
- organisation, not organization
- whilst, not while (in formal tone)

---

## Running a microcopy audit

Use `/microcopy-audit` to scan all components for hardcoded strings that should be in CMS.
