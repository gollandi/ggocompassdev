# GGO Compass — Remaining Sanity Studio Work

> Generated 2026-04-01. Use this as a checklist in Studio.
> Source .md files are in `docs/recovery-model-*.md` — copy Portable Text content from there.

---

## 1. Portable Text Fields to Populate in Studio

These fields require Sanity's Portable Text editor (rich text blocks). They cannot be imported programmatically — copy the content from the .md model files into Studio.

### Circumcision — 12 Recovery Days

Source: `docs/recovery-model-circumcision.md`

| Day | Title | normalExperiences | forecast | whyThisHappens |
|-----|-------|:-:|:-:|:-:|
| 0 | Surgery Day | ❌ | ❌ | ❌ (model has content) |
| 1 | First Morning | ❌ | ❌ | ❌ (model has content) |
| 2 | Peak Swelling | ❌ | ❌ | ❌ (model has content) |
| 3 | Glans Exposure | ❌ | ❌ | ❌ (model has content) |
| 5 | Wound Sealing | ❌ | ❌ | — |
| 7 | One Week | ❌ | ❌ | ❌ (model has content) |
| 10 | Healing Progress | ❌ | ❌ | — |
| 14 | Two Weeks | ❌ | ❌ | ❌ (model has content) |
| 21 | Three Weeks | ❌ | ❌ | — |
| 28 | Four Weeks | ❌ | ❌ | — |
| 35 | Five Weeks | ❌ | ❌ | — |
| 42 | Recovery Complete | ❌ | ❌ | ❌ (model has content) |

**Also missing on days 0–28 (older imports):** activities arrays — these days only have nurseNote + redFlags.

### Varicocele Single — 9 Recovery Days

Source: `docs/recovery-model-varicocele.md`

| Day | Title | normalExperiences | forecast | whyThisHappens |
|-----|-------|:-:|:-:|:-:|
| 0 | Surgery Day | ❌ | ❌ | ❌ (model has content) |
| 1 | First Morning | ❌ | ❌ | ❌ (model has content) |
| 2 | Peak Swelling | ❌ | ❌ | ❌ (model has content) |
| 3 | Turning the Corner | ❌ | ❌ | — |
| 5 | Gentle Return | ❌ | ❌ | — |
| 7 | One Week | ❌ | ❌ | ❌ (model has content) |
| 10 | Building Confidence | ❌ | ❌ | — |
| 14 | Two Weeks | ❌ | ❌ | — |
| 21 | Recovery Complete | ❌ | ❌ | ❌ (model has content) |

### Frenuloplasty (newer doc `e5f38681`) — 10 Recovery Days

Source: `docs/recovery-model-frenuloplasty.md`

| Day | Title | normalExperiences | forecast | whyThisHappens |
|-----|-------|:-:|:-:|:-:|
| 0 | Surgery Day | ❌ | ❌ | ❌ (model has content) |
| 1 | First Morning | ❌ | ❌ | ❌ (model has content) |
| 2 | Settling In | ❌ | ❌ | — |
| 3 | Wound Check | ❌ | ❌ | ❌ (model has content) |
| 5 | Wound Sealing | ❌ | ❌ | — |
| 7 | One Week | ❌ | ❌ | ❌ (model has content) |
| 10 | Healing Progress | ❌ | ❌ | — |
| 14 | Two Weeks | ❌ | ❌ | ❌ (model has content) |
| 21 | Nearly There | ❌ | ❌ | — |
| 28 | Recovery Complete | ❌ | ❌ | ❌ (model has content) |

### Micro-TESE — 6 Recovery Days (no .md model yet)

| Day | Title | normalExperiences | forecast | whyThisHappens |
|-----|-------|:-:|:-:|:-:|
| 0 | Surgery Day | ❌ | ❌ | ❌ |
| 1 | First Morning | ❌ | ❌ | ❌ |
| 3 | Settling Phase | ❌ | ❌ | ❌ |
| 5 | Wound Check | ❌ | ❌ | ❌ |
| 7 | One Week Mark | ❌ | ❌ | ❌ |
| 14 | Two Week Milestone | ❌ | ❌ | ❌ |

**Total Portable Text fields to populate: ~111 fields across 37 recovery days**

---

## 2. Procedure-Level Fields Still Missing

### Procedures needing commonConcerns

| Procedure | Status |
|---|---|
| Circumcision | ✅ Done (10 items) |
| Frenuloplasty (e5f38681) | ❌ Copy from `recovery-model-frenuloplasty.md` (10 items) |
| Varicocele Single | ❌ Copy from `recovery-model-varicocele.md` (8 items) |
| Varicocele Bilateral | ❌ Same content as Single |
| Micro-TESE | ❌ No model yet |
| Flexible Cystoscopy | ❌ No model yet |
| Rigid Cystoscopy | ❌ No model yet |
| TURP | ❌ No model yet |

### Procedures needing uiCustomization

| Procedure | Status |
|---|---|
| Circumcision | ✅ Done |
| Frenuloplasty (e5f38681) | ❌ Copy from `recovery-model-frenuloplasty.md` |
| Varicocele Single | ❌ Copy from `recovery-model-varicocele.md` |
| Varicocele Bilateral | ❌ Adapt from Single |
| All others | ❌ No model yet |

---

## 3. FAQ Entries — 0 exist, ~36 ready in models

Source files contain complete FAQ entries ready to create as `faqEntry` documents:

### From `recovery-model-circumcision.md` — 13 FAQs

| question | category |
|----------|----------|
| How long does an adult circumcision take? | pre-op |
| Will I be awake during the procedure? | pre-op |
| What type of anaesthesia is used? | pre-op |
| How long do the sutures take to dissolve? | recovery |
| When can I shower after circumcision? | recovery |
| When can I drive after circumcision? | recovery |
| When can I return to work? | recovery |
| When can I exercise after circumcision? | recovery |
| When can I have sex after circumcision? | sexual-health |
| How sensitive will the glans be? | recovery |
| What should I do if I have an erection during healing? | recovery |
| Is it normal for the penis to look swollen and discoloured? | recovery |
| When should I go to A&E? | emergency |

### From `recovery-model-frenuloplasty.md` — 13 FAQs

| question | category |
|----------|----------|
| How long does a frenuloplasty take? | pre-op |
| Will I be awake during the procedure? | pre-op |
| Does it hurt? | pre-op |
| When do the stitches dissolve? | recovery |
| When can I shower? | recovery |
| When can I drive? | recovery |
| When can I return to work? | recovery |
| When should I start foreskin retraction exercises? | recovery |
| When can I have sex again? | sexual-health |
| Will the frenulum tear again? | general |
| Is frenuloplasty better than circumcision? | general |
| What if the wound opens? | emergency |
| What does the scar look like? | recovery |

### From `recovery-model-varicocele.md` — 10 FAQs

| question | category |
|----------|----------|
| How long does the microsurgical varicocele repair take? | pre-op |
| Will I be awake during the procedure? | pre-op |
| How long do I need to wear scrotal support? | recovery |
| When can I drive after varicocele surgery? | recovery |
| When can I return to work? | recovery |
| When can I exercise after varicocele repair? | recovery |
| Is it normal for bruising to spread to my thigh? | recovery |
| When will I know if the surgery improved my fertility? | recovery |
| What is the difference between single-sided and bilateral repair? | general |
| Can a varicocele come back after microsurgical repair? | general |

---

## 4. Timeline Steps — Only Frenuloplasty has them

| Procedure | Steps | Status |
|---|---|---|
| Frenuloplasty (older doc) | 14 | ✅ Exist |
| Microsurgical Varicocele (older doc) | 1 | Partial |
| Circumcision | 0 | ❌ 8 steps in model |
| Varicocele Single | 0 | ❌ 7 steps in model |
| Frenuloplasty (newer doc) | 0 | ❌ 9 steps in model |
| All others | 0 | ❌ No model yet |

Create from the model files — each step needs: procedure ref, phase, timeframe, title, tasks[], order, redFlags[].

---

## 5. Microcopy Keys Still Missing

23 exist. Models define ~30 additional keys. Priority additions:

### From models — procedure-specific greetings

| key | context | source |
|-----|---------|--------|
| `circumcision.greeting.day0` | Recovery Screen | circumcision model |
| `circumcision.greeting.day1` | Recovery Screen | circumcision model |
| `circumcision.greeting.week1` | Recovery Screen | circumcision model |
| `circumcision.greeting.week2` | Recovery Screen | circumcision model |
| `circumcision.greeting.week4` | Recovery Screen | circumcision model |
| `circumcision.greeting.complete` | Recovery Screen | circumcision model |
| `circumcision.quick.glans` | Quick Access | circumcision model |
| `circumcision.quick.sutures` | Quick Access | circumcision model |
| `circumcision.quick.erections` | Quick Access | circumcision model |
| `circumcision.quick.support` | Quick Access | circumcision model |
| `circumcision.quick.sex` | Quick Access | circumcision model |
| `circumcision.quick.hygiene` | Quick Access | circumcision model |
| `frenuloplasty.greeting.day0` | Recovery Screen | frenuloplasty model |
| `frenuloplasty.greeting.day1` | Recovery Screen | frenuloplasty model |
| `frenuloplasty.greeting.week1` | Recovery Screen | frenuloplasty model |
| `frenuloplasty.greeting.week2` | Recovery Screen | frenuloplasty model |
| `frenuloplasty.greeting.complete` | Recovery Screen | frenuloplasty model |
| `frenuloplasty.quick.briefs` | Quick Access | frenuloplasty model |
| `frenuloplasty.quick.erections` | Quick Access | frenuloplasty model |
| `frenuloplasty.quick.retraction` | Quick Access | frenuloplasty model |
| `varicocele.greeting.day0` | Recovery Screen | varicocele model |
| `varicocele.greeting.day1` | Recovery Screen | varicocele model |
| `varicocele.greeting.week1` | Recovery Screen | varicocele model |
| `varicocele.greeting.week2` | Recovery Screen | varicocele model |
| `varicocele.greeting.complete` | Recovery Screen | varicocele model |
| `varicocele.quick.support` | Quick Access | varicocele model |
| `varicocele.quick.ice` | Quick Access | varicocele model |
| `varicocele.quick.fertility` | Quick Access | varicocele model |

### From microcopyDefaults.ts — still not in Sanity

| key | context |
|-----|---------|
| `greeting.morning` | Recovery Screen |
| `greeting.afternoon` | Recovery Screen |
| `greeting.evening` | Recovery Screen |
| `greeting.completion` | Recovery Screen |
| `progress.tracking` | Recovery Screen |
| `progress.exploring` | Recovery Screen |
| `milestone.7` | Recovery Screen |
| `milestone.14` | Recovery Screen |
| `milestone.21` | Recovery Screen |
| `milestone.28` | Recovery Screen |
| `encouragement.0` through `encouragement.9` | Recovery Screen |
| `mode.headline` | Mode Select |
| `mode.explore.title` | Mode Select |
| `mode.explore.description` | Mode Select |
| `mode.track.title` | Mode Select |
| `mode.track.description` | Mode Select |
| `personalise.*` (15+ keys) | Personalise Screen |
| `completion.*` | Completion Screen |
| `recovery.surgery_date.*` | Recovery Screen |
| `recovery.mood.title` | Recovery Screen |
| `recovery.emergency.*` | Recovery Screen |

---

## 6. Procedures Without Recovery Models

These procedures have NO .md model and NO recovery days. They need content creation from scratch:

| Procedure | Recovery Days | Priority |
|---|---|---|
| **TURP** | 42 days, overnight stay | 🔴 High — common procedure |
| **Varicocele Bilateral** | 28 days (adapt from Single) | 🟡 Medium — adapt existing model |
| **Flexible Cystoscopy** | 3 days | 🟡 Medium — short recovery |
| **Rigid Cystoscopy & Bladder Biopsy** | 7 days | 🟡 Medium |
| **Micro-TESE** | 14 days (has 6 sparse days) | 🟡 Medium — enrich existing |

---

## 7. Duplicate/Legacy Documents to Clean Up

| Document | Issue | Action |
|---|---|---|
| Circumcision (`d42afbbe`) | Older duplicate, no content | Delete or merge |
| Frenuloplasty (`procedure.frenuloplasty`) | Older doc with 30 daily recovery days | Keep as reference, consolidate with newer `e5f38681` |
| Microsurgical Varicocele (`823f82f0`) | Older doc, no recovery days | Delete or merge with `c229258a` |
| Default Clinic (`location.default-clinic`) | Placeholder with dummy data | Deactivate or delete |
| Orphan recovery day (null procedure) | 1 document with no procedure ref | Delete |

---

## Summary — Work Remaining

| Task | Volume | Can use Sanity AI? |
|---|---|---|
| Populate Portable Text fields from .md models | ~111 fields | ✅ Yes — paste from .md |
| Add commonConcerns to 2 procedures | ~18 items | ✅ Yes |
| Add uiCustomization to 2 procedures | 12 fields | ✅ Yes |
| Create FAQ entries | 36 documents | ✅ Yes |
| Create Timeline Steps | ~24 documents | ✅ Yes |
| Create Microcopy keys | ~60 documents | ✅ Yes |
| Create recovery models for 5 procedures | New content needed | ⚠️ Partially — needs clinical input |
| Clean up duplicates | ~5 documents | Manual |
