# GGO Compass – Figma Variables Integration Guide

## Overview

This guide explains how to integrate GGO Compass recovery data into Figma using variable collections, enabling dynamic content binding for the Daily Recovery Card component and seamless CMS/API integration for Carebit's server-side logic.

---

## 1. Root Variable Families

Each procedure becomes a **variable collection** under a common namespace. Use this structure inside Figma Tokens or any JSON-driven CMS:

```json
{
  "recovery": {
    "circumcision": {
      "days": {
        "0": { "today": "...", "forecast": "...", "redflag": "..." },
        "1": { "...": "..." },
        "...": {}
      }
    },
    "turp": {
      "days": {
        "0": { "today": "...", "forecast": "...", "redflag": "..." },
        "1": { "...": "..." },
        "...": {}
      }
    }
  }
}
```

Each `"days"` object contains **29 nested day entries** (Day 0–28).

---

## 2. Variable Keys (Naming for Figma Tokens)

| Level      | Naming Pattern            | Example                          |
|------------|---------------------------|----------------------------------|
| Collection | `recovery-[procedure]`    | `recovery-circumcision`          |
| Group      | `day-[number]`            | `day-14`                         |
| Variable   | `[field]-text`            | `today-text`, `forecast-text`    |

**Full variable path example:**

```
recovery-turp/day-07/today-text
```

---

## 3. Component Binding Logic

In your **Daily Recovery Card** component:

| Text Layer                  | Bound Variable                                        | Fallback                                  |
|-----------------------------|-------------------------------------------------------|-------------------------------------------|
| Today you may notice…       | `recovery-[procedure]/day-[number]/today-text`        | "You may feel mild soreness today."       |
| Things improving soon…      | `recovery-[procedure]/day-[number]/forecast-text`     | "Comfort improves daily."                 |
| Call if…                    | `recovery-[procedure]/day-[number]/redflag-text`      | "Contact your care team if symptoms worsen." |
| Nurse says:                 | `recovery-[procedure]/day-[number]/nurse-note-text`   | null                                      |
| Nurse name                  | `recovery-[procedure]/day-[number]/nurse-name-text`   | null                                      |
| Why this happens            | `recovery-[procedure]/day-[number]/why-this-happens-text` | null                                  |
| Day title                   | `recovery-[procedure]/day-[number]/day-title-text`    | "Day [number]"                            |

Each layer **pulls automatically** when the `Procedure` and `Day` variant properties are set.

---

## 4. Smart Fallback Logic (for Dev / Carebit Integration)

Later, Prince can use this structure for **server-side logic**:

```javascript
function getRecoveryText(procedure, day) {
  const data = recovery[procedure]?.days[day];
  if (!data) {
    return recovery["generic"].days[day] || recovery["generic"].days["default"];
  }
  return data;
}
```

That means if a **day or procedure is missing**, Compass still delivers a calm, generic reassurance.

---

## 5. Thematic Colour & Emotion Variables (for Context-Aware UI)

| Variable                  | Value                                              | Usage                          |
|---------------------------|----------------------------------------------------|--------------------------------|
| `emotion-normal`          | `#00BE92` (--color-accent-teal)                    | Base reassurance card          |
| `emotion-progress`        | `#E5C07B` (--color-highlight-gold)                 | Milestone day (7, 14, 21, 28)  |
| `emotion-alert`           | `#DC2626` (--color-alert-red)                      | Red-flag highlight strip       |
| `emotion-calm-bg`         | `linear-gradient(#E6FDF8, #FFFFFF)`                | Default card background        |
| `emotion-reassurance-bg`  | `linear-gradient(#1E3A5B, #00856D)`                | Navy → Dark teal (today card)  |
| `emotion-milestone-bg`    | `linear-gradient(#C4941F, #8B6914)`                | Dark gold (milestone today)    |

**Bind these to the component background** via conditional styles:

```
when Day % 7 == 0 → emotion-milestone-bg
else → emotion-reassurance-bg (if isToday)
else → emotion-calm-bg
```

---

## 6. Variant Properties to Declare in Figma

Declare the following **variant properties** on the Daily Recovery Card component:

| Property   | Values                                                                                      |
|------------|--------------------------------------------------------------------------------------------|
| Procedure  | Circumcision, TURP, Varicocele Repair, Hydrocele Repair, Frenuloplasty, etc. (13 total)   |
| Day        | 0–28 (29 values)                                                                           |
| Mood       | Low, Neutral, High                                                                         |
| Theme      | Light, Dark, High Contrast                                                                 |
| Forecast   | True, False                                                                                |
| Redflag    | Expanded, Collapsed                                                                        |

---

## 7. Data-Driven Animation Hooks

Set component **motion based on day-progress** variable:

```javascript
CompassNeedle.rotation = 45 + (Day / 28) * 40; // 45° to 85°
ProgressBar.width = (Day / 28) * 100 + "%";
```

→ Visually communicates improvement **without metrics**.

---

## 8. Governance and Content Versioning

Each dataset carries **metadata** for PIF Tick compliance:

```json
"meta": {
  "source": "BAUS/NICE NG128 2024",
  "lastReviewed": "2025-10-31",
  "author": "GGO Med Clinical Team",
  "reviewer": "FRCS Urol Governance Lead",
  "version": "1.2.0",
  "readingLevel": "Year 7 (UK)",
  "fleschScore": 74
}
```

That way, **every content update remains auditable** for PIF Tick compliance.

---

## 9. Exporting Variables from GGO Compass

### **In the App:**

1. Navigate to the **Mode Select** screen
2. Click **"Export Variables"** (top-right button)
3. Choose export format:
   - **Figma Tokens** – For Figma Tokens Studio plugin
   - **Server API** – For Carebit backend integration

### **File Outputs:**

- **`ggo-compass-figma-tokens.json`** – Import into Figma via Tokens Studio
- **`ggo-compass-server-api.json`** – Use in Prince's Carebit server-side logic

---

## 10. Implementation Checklist

### **For Figma Designers:**

- [ ] Create variable collections: `recovery-circumcision`, `recovery-turp`, etc.
- [ ] Create day groups: `day-00` through `day-28`
- [ ] Create text variables: `today-text`, `forecast-text`, `redflag-text`
- [ ] Bind text layers in Daily Recovery Card to variables
- [ ] Set up conditional background logic for milestone days
- [ ] Test all 29 days across all procedures

### **For Developers (Prince/Carebit):**

- [ ] Import `ggo-compass-server-api.json` into backend
- [ ] Implement `getRecoveryText(procedure, day)` fallback function
- [ ] Set up API endpoint: `GET /api/recovery/:procedure/:day`
- [ ] Add metadata tracking for content versioning
- [ ] Test smart fallback logic for missing procedures/days

---

## 11. Variable Path Examples

| Procedure     | Day | Field        | Full Path                                |
|---------------|-----|--------------|------------------------------------------|
| TURP          | 0   | today        | `recovery-turp/day-00/today-text`        |
| TURP          | 7   | forecast     | `recovery-turp/day-07/forecast-text`     |
| Circumcision  | 14  | redflag      | `recovery-circumcision/day-14/redflag-text` |
| TURP          | 28  | nurse-note   | `recovery-turp/day-28/nurse-note-text`   |

---

## 12. Accessibility & Localisation

All recovery text meets **WCAG 2.2 AA** standards:

- **Reading Level:** Year 7 (UK) / Flesch Score 72–75
- **Plain Language:** Toggle available (Concise vs. Warm & Friendly)
- **Reduced Motion:** Animation hooks respect user preferences
- **High Contrast:** Theme variant ensures 7:1 contrast ratio

Future localisation:

```
recovery-[procedure]-[locale]/day-[number]/[field]-text
```

Example: `recovery-turp-en-GB/day-07/today-text`

---

## 13. Clinical Review Process

Every dataset update follows:

1. **Drafting** – Clinical team writes new content
2. **Review** – FRCS Urol Governance Lead reviews
3. **Versioning** – Update `version` and `lastReviewed` in metadata
4. **Export** – Generate new JSON files
5. **Testing** – Verify all variable paths resolve correctly
6. **Deployment** – Push to Figma Tokens and Carebit backend

---

## Questions?

Contact: **GGO Med Clinical Team**  
Email: governance@ggomed.co.uk  
Version: 1.0.0  
Last Updated: 31 October 2025
