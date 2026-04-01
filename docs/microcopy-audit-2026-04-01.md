# Microcopy & Copy Quality Audit — 2026-04-01

## Executive Summary

| Metric | Count |
|--------|-------|
| Total hardcoded patient-facing strings | ~210 |
| MUST migrate to Sanity | 83 |
| Grey area (flag for discussion) | 12 |
| OK to keep hardcoded | ~115 |
| Files with most hardcoded strings | 6 critical files |
| Sanity documents deployed | 0 (schema deployed today, empty) |
| Copy quality issues found | 18 |

---

## 1. Critical Files Requiring Migration

### Priority 1 — Clinical Content (Immediate)

| File | Hardcoded Strings | Risk | Notes |
|------|------------------|------|-------|
| `src/data/recoveryData.ts` | ~60 strings across 2 procedure timelines | **HIGH** — Clinical content with specific medication, wound care, red flags | Full recovery day content for penile procedures + sperm retrieval |
| `src/data/microcopyDefaults.ts` | 124 keyed strings | **HIGH** — Contains medication dosages, wound care protocols, emergency guidance | Already structured with keys — ideal migration candidate |
| `src/components/ggo/StepPanel.tsx` | 4 generic red flags + 8 UI strings | **HIGH** — BAUS-derived red flags hardcoded as const | Should come from `ggoTimelineStep.redFlags` in Sanity |
| `src/lib/contentDefaults.ts` | 8 fallback strings | **MEDIUM** — Clinical checklist items and welcome/completion copy | Already has Sanity fetch logic, just needs content |

### Priority 2 — Contact Information & Locations

| File | Hardcoded Strings | Risk | Notes |
|------|------------------|------|-------|
| `src/components/screens/ProcedurePickerScreen.tsx` | ~20 strings (procedure descriptions + location data) | **HIGH** — Hardcoded Chelsea/Highgate addresses, phone numbers, procedure descriptions | `ggoLocation` and `ggoProcedure` schemas exist but are empty |
| `src/components/ggo/EmergencyContacts.tsx` | ~15 strings (emergency guidance, contact labels) | **HIGH** — Emergency protocols and phone numbers | Fetches from Sanity but falls back to hardcoded |

### Priority 3 — UI/UX Copy

| File | Hardcoded Strings | Risk | Notes |
|------|------------------|------|-------|
| `src/components/ggo/FooterDisclaimer.tsx` | 1 clinical disclaimer | **MEDIUM** | Should be editable by clinical team |
| `src/components/screens/TimelineScreen.tsx` | ~10 strings (phase content) | **MEDIUM** | Legacy phase steps with clinical content |
| `src/components/screens/CompletionScreen.tsx` | ~8 strings | **LOW** | Motivational copy |
| `src/components/screens/WelcomeScreen.tsx` | 4 strings | **LOW** | Already in microcopyDefaults |

---

## 2. Copy Quality Issues Found

### 2.1 Clinical Accuracy Issues

| # | File | Line(s) | Current Copy | Issue | Suggested Fix |
|---|------|---------|-------------|-------|---------------|
| 1 | `microcopyDefaults.ts` | 37 | "Take paracetamol (1g) every 6 hours" | Missing "as prescribed by your surgeon" caveat per CLAUDE.md rules | Add: "Take paracetamol (1g) every 6 hours, as prescribed by your surgeon." |
| 2 | `microcopyDefaults.ts` | 37 | "Ibuprofen (400mg) can be added if needed" | No contraindication warning (renal patients, GI risk) | Add: "Ibuprofen (400mg) can be added if needed and not contraindicated." |
| 3 | `microcopyDefaults.ts` | 37 | "Avoid aspirin unless prescribed" | Correct but incomplete — should specify why | Add: "Avoid aspirin (increases bleeding risk) unless specifically prescribed." |
| 4 | `microcopyDefaults.ts` | 45 | "no lifting >5kg" | Metric-only; no context for patient understanding | Rewrite: "no lifting heavier than a full kettle" |
| 5 | `recoveryData.ts` | 103 | "Avoid sexual activity until at least 4 weeks or your surgeon clears you" | Good but "at least" is imprecise — should be procedure-specific | Flag: `{/* TODO: Clinical review — timeframe varies by procedure */}` |
| 6 | `StepPanel.tsx` | 9-14 | Generic red flags array | Labelled "BAUS Clinical Guidelines 2025" but not verified against actual BAUS PILs | Flag for clinical review — source attribution needs verification |

### 2.2 Tone & Language Issues

| # | File | Line(s) | Current Copy | Issue | Suggested Fix |
|---|------|---------|-------------|-------|---------------|
| 7 | `microcopyDefaults.ts` | 41 | "gentle shower is fine" | Informal — "fine" is vague per CLAUDE.md tone rules | Rewrite: "a gentle shower is appropriate" |
| 8 | `microcopyDefaults.ts` | 41 | "Pat dry, don't rub" | Imperative without context | Rewrite: "Pat dry gently — avoid rubbing the area" |
| 9 | `contentDefaults.ts` | 36 | "We're here to support you through every step" | Overly soft/wellness-blog tone per CLAUDE.md | Rewrite: "This plan guides you through each stage of your recovery." |
| 10 | `contentDefaults.ts` | 40 | "You have successfully completed your recovery plan. Well done." | "Well done" is slightly patronising per CLAUDE.md ("not infantilising") | Rewrite: "You have completed your structured recovery plan." |
| 11 | `recoveryData.ts` | 124 | "Well done. Follow up as scheduled" | Same issue — "Well done" | Rewrite: "Follow up as scheduled for your final check." |
| 12 | `CompletionScreen` | 73 | "Minor changes can continue for months." | Vague — what kind of changes? | Rewrite: "Subtle changes in sensitivity or appearance may continue for several months. This is expected." |

### 2.3 British English & Terminology Issues

| # | File | Line(s) | Current Copy | Issue | Suggested Fix |
|---|------|---------|-------------|-------|---------------|
| 13 | `microcopyDefaults.ts` | 49 | "Call NHS 111 for urgent medical advice or 999 for life-threatening emergencies" | Correct but should include "while we publish your site-specific number" — this reads as permanent | Rewrite: "For urgent medical advice, call NHS 111. For life-threatening emergencies, call 999." |
| 14 | `EmergencyContacts.tsx` | ~139 | "Life-threatening emergencies" | Correct terminology | OK |
| 15 | `ProcedurePickerScreen.tsx` | fallbacks | "Surgical removal of the foreskin" | Correct but could add context | Add: "— the fold of skin covering the head of the penis" on first use |
| 16 | `recoveryData.ts` | 31 | "Mild bleeding, swelling, and tenderness around the penis are normal today." | Uses "normal" — CLAUDE.md prefers "expected" or "common" | Rewrite: "Mild bleeding, swelling, and tenderness around the penis are expected today." |
| 17 | `recoveryData.ts` | 44 | "Swelling and bruising around the penis can look worse today — this is expected." | Good — already uses "expected" | OK |
| 18 | `microcopyDefaults.ts` | 109 | "https://ggomedical.co.uk" | Domain should be "ggomed.co.uk" per CLAUDE.md brand identity | Fix: "https://ggomed.co.uk" |

---

## 3. Migration Plan

### Phase 1: Seed Sanity with Existing Hardcoded Content (Week 1)

The schema is now deployed. Populate it with the current hardcoded values:

1. **Locations** — Create `ggoLocation` documents for Chelsea and Highgate with full contact details
2. **Procedures** — Create `ggoProcedure` documents for all 8+ procedures with descriptions, categories, recovery days
3. **Microcopy** — Create `ggoMicrocopy` documents for all 124 keys in `microcopyDefaults.ts`
4. **Recovery Days** — Create `ggoRecoveryDay` documents for the penile and sperm retrieval timelines
5. **Timeline Steps** — Create `ggoTimelineStep` documents for the 5-phase journey

### Phase 2: Wire Components to Sanity (Week 2)

1. `ProcedurePickerScreen.tsx` — Replace hardcoded fallback procedures/locations with GROQ query
2. `StepPanel.tsx` — Replace `GENERIC_RED_FLAGS` const with data from `ggoTimelineStep.redFlags`
3. `EmergencyContacts.tsx` — Already wired; just needs Sanity content
4. `FooterDisclaimer.tsx` — Fetch disclaimer text from `ggoMicrocopy` with key `footer.disclaimer`
5. `TimelineScreen.tsx` — Replace legacy phase steps (lines 42-66) with `ggoTimelineStep` query

### Phase 3: Remove Hardcoded Fallbacks (Week 3)

1. Deprecate `src/data/recoveryData.ts` — All content now in Sanity
2. Slim down `src/data/microcopyDefaults.ts` — Keep only truly generic UI labels
3. Update `src/lib/contentDefaults.ts` — Remove `FALLBACK_COPY`, rely on Sanity with graceful empty states

### Recommended Sanity Schema Additions

No new schemas needed — the existing 11 types cover all identified content. However, consider:

- Adding a `severity` field (amber/red) to `ggoRecoveryDay.redFlags` to distinguish "call the practice" from "go to A&E"
- Adding a `disclaimerText` field to a global settings singleton for the footer disclaimer
- Adding `procedureId` (kebab-case) to `ggoProcedure` to match the Procedure Registry in CLAUDE.md

---

## 4. Strings OK to Keep Hardcoded

These do not need Sanity migration:

- Generic UI: "Back", "Next", "Close", "Menu", "Cancel", "Save"
- Loading states: "Loading...", "Loading your personalised plan..."
- Navigation labels: "Home", "Timeline", "Settings"
- Aria labels and accessibility strings
- Date format patterns
- CSS class names and developer comments
- Error page generic copy ("Something went wrong")
- Pronoun options, tone options, accessibility toggles (structural, not clinical)

---

## 5. Grey Area (Flag for Discussion)

| String | File | Recommendation |
|--------|------|---------------|
| Phase labels: "Book", "Prepare", "Attend", "Recover", "Review" | `PhaseRail.tsx` | Keep hardcoded — structural, not clinical |
| Cookie consent copy | `CookieConsent.tsx` | Keep hardcoded — legal text, rarely changes |
| Feedback scale labels | `FeedbackScreen.tsx` | Could migrate for A/B testing but low priority |
| Encouragement phrases (10 variants) | `microcopyDefaults.ts` | Migrate — allows editorial team to add/edit without deploys |
| "Guiding you, step by step." tagline | `SplashScreen.tsx` | Migrate — brand copy that marketing may want to iterate |
