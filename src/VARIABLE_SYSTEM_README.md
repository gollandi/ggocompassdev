# 🧭 GGO Compass – Variable System Quick Start

## What is this?

A **complete Figma-compatible variable structure** for the GGO Compass recovery data system. This enables:

1. **Dynamic content binding** in Figma components
2. **CMS integration** for content management
3. **Server-side API** for Carebit's backend logic
4. **Smart fallback logic** for missing procedures/days
5. **Governance metadata** for PIF Tick compliance

---

## 🚀 Quick Access

### **In the App:**

1. Navigate to **Mode Select** screen
2. Click **"Export Variables"** button (top-right)
3. Choose your export format:
   - **Figma Tokens** → For Figma Tokens Studio plugin
   - **Server API** → For Carebit backend integration

### **File Downloads:**

- `ggo-compass-figma-tokens.json` – Import into Figma
- `ggo-compass-server-api.json` – Use in Carebit backend

---

## 📚 Documentation

| File                              | Purpose                                              |
|-----------------------------------|------------------------------------------------------|
| `/FIGMA_VARIABLES_GUIDE.md`      | Complete integration guide for Figma & Carebit       |
| `/data/variableStructure.json`   | JSON schema and reference for variable structure     |
| `/data/figmaVariables.ts`        | TypeScript utilities for exporting and accessing data |
| `/data/recoveryData.ts`          | Source recovery data with 28-day timelines           |

---

## 🏗️ Variable Structure

### **Naming Convention:**

```
recovery-[procedure]/day-[number]/[field]-text
```

### **Example Paths:**

```
recovery-turp/day-00/today-text
recovery-circumcision/day-14/forecast-text
recovery-turp/day-07/redflag-text
```

### **Available Fields:**

- `today-text` → "Today you may notice…"
- `forecast-text` → "Things improving soon…"
- `redflag-text` → "Call if…"
- `nurse-note-text` → Nurse reassurance
- `nurse-name-text` → Nurse name (Caroline, Sarah, Michael)
- `why-this-happens-text` → Clinical explanation
- `day-title-text` → Day milestone title

---

## 🎨 Emotion Variables (Context-Aware UI)

| Variable                 | Value                                  | Usage                         |
|--------------------------|----------------------------------------|-------------------------------|
| `emotion-normal`         | `#00BE92`                              | Base reassurance card (Teal)  |
| `emotion-progress`       | `#E5C07B`                              | Milestone days (Gold)         |
| `emotion-alert`          | `#DC2626`                              | Red-flag warnings             |
| `emotion-calm-bg`        | `linear-gradient(#E6FDF8, #FFFFFF)`    | Default card background       |
| `emotion-reassurance-bg` | `linear-gradient(#1E3A5B, #00856D)`    | Navy → Dark teal (today)      |
| `emotion-milestone-bg`   | `linear-gradient(#C4941F, #8B6914)`    | Dark gold (milestone today)   |

---

## 🔄 Smart Fallback Logic

```typescript
function getRecoveryText(procedure: string, day: number): RecoveryDayVariables {
  // 1. Try exact match
  const data = recovery[procedure]?.days[day];
  if (data) return data;
  
  // 2. Fall back to generic
  const generic = recovery["generic"]?.days[day];
  if (generic) return generic;
  
  // 3. Ultimate fallback
  return {
    "today-text": "You may feel mild soreness today.",
    "forecast-text": "Comfort improves daily.",
    "redflag-text": "Contact your care team if symptoms worsen."
  };
}
```

---

## 📦 Procedures with Full 28-Day Data

| Procedure         | Days | Source                                  |
|-------------------|------|-----------------------------------------|
| **Circumcision**  | 0–28 | BAUS/NICE NG128 2024                    |
| **TURP**          | 0–28 | BAUS "After Your TURP" leaflet (2024)   |
| Varicocele Repair | 0, 1, 3, 7, 14, 28 | BAUS/NICE Clinical Guidelines  |
| Hydrocele Repair  | 0, 1, 7, 14, 28 | GGO Med Standard Recovery Protocol |

---

## 🧩 Component Variant Properties (Figma)

Declare these on the **Daily Recovery Card** component:

| Property   | Values                                      |
|------------|---------------------------------------------|
| `Procedure`| Circumcision, TURP, Varicocele Repair, etc. (13 procedures) |
| `Day`      | 0–28 (29 values)                            |
| `Mood`     | Low, Neutral, High                          |
| `Theme`    | Light, Dark, High Contrast                  |
| `Forecast` | True, False                                 |
| `Redflag`  | Expanded, Collapsed                         |

---

## 📊 Data-Driven Animation Hooks

```javascript
// Compass needle rotates with progress
CompassNeedle.rotation = 45 + (Day / 28) * 40; // 45° to 85°

// Progress bar fills linearly
ProgressBar.width = (Day / 28) * 100 + "%";

// Milestone scaling
if (Day % 7 === 0 && Day > 0) {
  Card.scale = 1.02;
  Card.background = "emotion-milestone-bg";
}
```

---

## 🔐 Governance Metadata

Every procedure dataset includes **PIF Tick compliant** metadata:

```json
{
  "source": "BAUS/NICE NG128 2024",
  "lastReviewed": "2025-10-31",
  "author": "GGO Med Clinical Team",
  "reviewer": "FRCS Urol Governance Lead",
  "version": "1.2.0",
  "readingLevel": "Year 7 (UK)",
  "fleschScore": 74
}
```

---

## ♿ Accessibility Features

- **Reading Level:** Year 7 (UK) / Flesch Score 72–75
- **Plain Language:** Toggle between Concise and Warm & Friendly tone
- **Reduced Motion:** Animations respect user preference
- **High Contrast:** 7:1 contrast ratio in High Contrast theme
- **Larger Text:** Base text scales from 18px to 22px

---

## 🔗 API Integration (Carebit)

### **Suggested Endpoints:**

```
GET /api/recovery/:procedure/:day
GET /api/recovery/:procedure/metadata
GET /api/procedures
GET /api/variables/export
```

### **Example Response:**

```json
{
  "procedure": "turp",
  "day": 7,
  "title": "Week One Check",
  "reassurance": "Slight leakage after voiding is normal.",
  "forecast": "Pelvic floor exercises will help control.",
  "redFlags": ["Inability to reach the toilet or new incontinence."],
  "nurseNote": "Avoid caffeine and alcohol for now — they irritate the bladder.",
  "nurseName": "Caroline"
}
```

---

## 🛠️ Implementation Checklist

### **For Figma Designers:**

- [ ] Import `ggo-compass-figma-tokens.json` via Tokens Studio
- [ ] Create variable collections for each procedure
- [ ] Bind text layers in Daily Recovery Card to variables
- [ ] Set up conditional background logic for milestone days
- [ ] Test all 29 days across all procedures

### **For Developers (Prince/Carebit):**

- [ ] Import `ggo-compass-server-api.json` into backend
- [ ] Implement `getRecoveryText(procedure, day)` function
- [ ] Set up API endpoints for recovery data
- [ ] Add metadata tracking for content versioning
- [ ] Test smart fallback logic for missing data

---

## 📖 Full Documentation

Read the complete guide: **[FIGMA_VARIABLES_GUIDE.md](./FIGMA_VARIABLES_GUIDE.md)**

---

## 🔄 Version History

| Version | Date       | Changes                                    |
|---------|------------|--------------------------------------------|
| 1.0.0   | 2025-10-31 | Initial variable system implementation     |
|         |            | Complete TURP 28-day dataset               |
|         |            | Figma Tokens export functionality          |
|         |            | Server API export functionality            |
|         |            | Smart fallback logic                       |
|         |            | Governance metadata integration            |

---

## 📧 Contact

**GGO Med Clinical Team**  
Email: governance@ggomed.co.uk  
Version: 1.0.0  
Last Updated: 31 October 2025
