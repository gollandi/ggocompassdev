# Sanity CMS Guide — GGO Compass

## Setup

### 1. Create project at sanity.io/manage
- Project name: GGO Compass
- Dataset: `production`
- Note your Project ID

### 2. Get an API token
API tab → Add API Token → Editor permissions → copy token (shown once)

### 3. Configure `.env.local`
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_editor_token
```

### 4. Access Studio
`http://localhost:3000/studio` (embedded at `/studio` route)

---

## Schemas

All schema files live in `sanity/schemas/`. All GROQ queries go through `src/lib/sanity/queries.ts`.

### `ggoProcedure`
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | string | ✓ | e.g. "Circumcision" |
| slug | slug | ✓ | auto-generated |
| availableLocations | reference[] | ✓ | refs to ggoLocation |
| totalRecoveryDays | number | ✓ | 0–365 |
| category | string | ✓ | urology / andrology / male-infertility |
| isActive | boolean | ✓ | hide inactive without deleting |
| displayOrder | number | | for ordering in picker |
| description | text | | patient-facing summary |
| emergencyContacts | object | | urgentLine, consultantTeam, specialistNurse |
| preOperativeInstructions | text | | |
| postOperativeInstructions | text | | |
| expectedOutcomes | text | | |
| commonConcerns | array | | {concern, response} pairs |

### `ggoRecoveryDay`
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| dayNumber | number | ✓ | 0 = surgery day |
| procedure | reference | ✓ | ref to ggoProcedure |
| phase | string | ✓ | surgery / early / healing / strengthening / final |
| phaseLabel | string | | e.g. "First Morning" |
| title | string | ✓ | |
| normalExperiences | block[] | ✓ | Portable Text |
| forecast | block[] | | what to expect next |
| redFlags | string[] | ✓ | SAFETY CRITICAL — see clinical rules |
| activities | object[] | | {icon, label, status: allowed/caution/avoid} |
| nurseNote | text | | personal note from nurse |
| nurseName | string | | |
| whyThisHappens | text | | medical explanation in plain English |
| educationalVideo | object | | {url, title, thumbnail, duration} |
| exerciseVideos | object[] | | |

### `ggoTimelineStep`
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| procedure | reference | ✓ | |
| phase | string | ✓ | Book / Prepare / Attend / Recover / Review |
| timeframe | string | ✓ | e.g. "7 days before surgery" |
| title | string | ✓ | |
| tasks | string[] | ✓ | min 1 |
| order | number | ✓ | sort order |
| isCompleted | boolean | | completed-by-default flag |
| video | object | | {url, title, thumbnail, duration} |
| clinicalGuidance | block[] | | Portable Text |

### `ggoMicrocopy`
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| key | string | ✓ | dot-separated, e.g. "splash.cta.start" |
| context | string | ✓ | which screen/component |
| text | string | ✓ | default copy |
| tone | string | | formal / friendly / supportive |
| style | string | | Figma text style name |
| variants | object[] | | {condition, text} — e.g. condition: "tone:formal" |

### `ggoLocation`
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | string | ✓ | e.g. "Chelsea" |
| slug | slug | ✓ | |
| shortName | string | | e.g. "Chelsea & Westminster" |
| address | object | ✓ | street, city, postcode, country |
| contacts.main | object | ✓ | phone, email, hours |
| contacts.booking | object | | phone, email, hours, onlineBookingUrl |
| contacts.ward | object | | phone, nurseStation, hours |
| contacts.emergency | object | | urgentLine, outOfHours, consultantSecretary |
| services | object[] | | {name, description, contactPhone, contactEmail} |
| facilities | object | | parking, publicTransport, accessibility |
| isActive | boolean | ✓ | |
| displayOrder | number | | |

---

## Data Migration

Run from repo root after setting env vars:
```bash
npx ts-node scripts/migrate-to-sanity.ts
```

This reads from `src/data/recoveryData.ts` and pushes to Sanity. Expects `SANITY_API_TOKEN` with Editor permissions.

---

## GROQ Query Examples

```groq
# All active procedures ordered by displayOrder
*[_type == "ggoProcedure" && isActive == true] | order(displayOrder asc)

# Recovery days for a procedure slug
*[_type == "ggoRecoveryDay" && procedure->slug.current == "circumcision"] | order(dayNumber asc)

# Timeline steps for a procedure
*[_type == "ggoTimelineStep" && procedure._ref == $procedureId] | order(order asc)

# All microcopy (for building lookup map)
*[_type == "ggoMicrocopy"] | order(context asc, key asc)
```

---

## Content Rules

- **Never publish recovery day content without clinical review** — red flags are safety-critical
- All content must be BAUS-compliant or explicitly approved by JJ
- Recovery day red flags: err conservative, never soften
- Publish only when all required fields are complete (Studio will warn)
- Leave video fields blank if no asset exists — the UI hides the player

---

## Sanity Studio Keyboard Shortcuts
- `Cmd+S` — save draft
- `Cmd+Shift+P` — publish
- `Cmd+K` — quick search
