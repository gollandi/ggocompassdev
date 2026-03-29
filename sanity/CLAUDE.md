# sanity/ — Backend / CMS Rules

Sanity schema definitions for GGO Compass. These schemas define the content model in Sanity Studio.

## Schema Overview

| File | Type name | Purpose |
|---|---|---|
| `schemas/procedure.ts` | `procedure` | Surgical procedure definitions |
| `schemas/recoveryDay.ts` | `recoveryDay` | Per-day recovery content (1–28) |
| `schemas/timelineStep.ts` | `timelineStep` | Recovery phase groupings |
| `schemas/microcopy.ts` | `microcopy` | UI string overrides (key/value) |
| `schemas/location.ts` | `location` | GGO Med clinic locations |
| `schemas/faqEntry.ts` | `faqEntry` | FAQ items for procedures |
| `schemas/medicalEntityData.ts` | `medicalConditionEntity`, `medicalProcedureEntity` | Schema.org structured data |
| `schemas/objects/accordionBlock.ts` | `accordionBlock` | Reusable accordion content block |
| `schemas/objects/cardBlock.ts` | `cardBlock` | Reusable card content block |
| `schemas/objects/videoResourceBlock.ts` | `videoResourceBlock` | Video embed block |

Schema types are registered in `src/sanity/schemaTypes/index.ts` (re-exports from here).

## Rules for Schema Changes

1. **Never rename an existing field name** once data has been published to production. Create a new field instead, then migrate.
2. **Never remove a field** that is referenced in GROQ queries (`src/lib/sanity/queries.ts`). Check all queries before removing any field.
3. **Add `validation: Rule => Rule.required()`** to all clinically critical fields: `warningSignsRedFlags`, `activityRestrictions`, `dayNumber`.
4. **Portable Text fields** (`array` of `block` type) must be processed through `src/lib/sanity/text.ts` helpers — never rendered raw.
5. **All new schemas** must be added to `src/sanity/schemaTypes/index.ts`.

## Clinical Content Schemas

### `recoveryDay` — most safety-critical schema

Fields with clinical safety implications:
- `warningSignsRedFlags` — when to seek emergency help. **NEVER leave empty. NEVER soften.** Flag for JJ review if uncertain.
- `activityRestrictions` — what the patient must NOT do. Conservative defaults required.
- `clinicalGuidance` — Portable Text with BAUS-compliant recovery guidance.

### `procedure`

The `slug` field is the identifier used across the app (e.g. `circumcision`, `turp`). It must match the key in the hardcoded content library (`src/lib/content/procedures/`). Do not change slugs after data is live.

## Plugins

`sanity/plugins/json-importer/` — a custom Sanity Studio plugin for bulk-importing seed data as JSON. Do not modify this unless fixing a bug.

## Adding Content via Studio

1. Go to `/studio` in the running app.
2. Use the structured navigation to find the correct document type.
3. For bulk imports, use the JSON Importer tool (bottom of Studio sidebar).
4. Seed data files live in `scripts/data/` — JSON format matching the schema.

## GROQ Queries

All GROQ queries are in `src/lib/sanity/queries.ts`. Do not write inline GROQ queries in components.
