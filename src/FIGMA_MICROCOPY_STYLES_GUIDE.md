# 📝 GGO Compass – Figma Microcopy Text Styles Guide

## Overview

This guide provides the complete text style system for GGO Compass microcopy. All styles are designed for **Figma Tokens Studio** integration and use **Plus Jakarta Sans** font family with consistent spacing and color tokens.

---

## 🎨 Style System Principles

### Core Standards

- **Font Family:** Plus Jakarta Sans
- **Line Height:** 140% (1.4× font size)
- **Paragraph Spacing:** 1.4× font size
- **Color Tokens:** Mapped to CSS variables for theme consistency
- **Naming Convention:** `category/style-name`

### Typography Scale

| Size | Usage | Examples |
|------|-------|----------|
| 24px | Headers | Mode headers, welcome messages |
| 20px | Dialog titles | Confirmation modals |
| 16px | Subheaders, CTAs | Procedure labels, button text |
| 14px | Body text, safety | Red flags, reassurance |
| 12px | Labels, tooltips, footers | Section headers, helper text |
| 10px | Small footers | Source attribution |

---

## 📁 Style Categories

### 1. Tracking Mode (6 styles)

**Purpose:** Date-anchored daily guidance with stable, reassuring tone

| Style Name | Font/Size/Weight | Color | Usage |
|------------|------------------|-------|-------|
| `tracking/header-morning` | 24px Semibold | Navy | Day-start with time-based greeting |
| `tracking/header-evening` | 24px Medium | Navy | Night closure, end-of-day |
| `tracking/progress-hint` | 16px Regular | Teal | Above progress rail, milestone signal |
| `tracking/tooltip` | 12px Regular | Muted | Compact helper information |
| `tracking/encouragement` | 14px Medium Italic | Gold | Randomized daily motivation |
| `tracking/footer-reassure` | 12px Regular | Muted | Fixed educational disclaimer |

---

### 2. Exploring Mode (6 styles)

**Purpose:** Manual browsing with inquisitive, open tone

| Style Name | Font/Size/Weight | Color | Usage |
|------------|------------------|-------|-------|
| `exploring/header-intro` | 24px Semibold | Navy | Mode landing page introduction |
| `exploring/subheader-procedure` | 16px Medium | Dark | Under procedure name |
| `exploring/label-normal` | 12px Bold ALL CAPS | Teal | "COMMON EXPERIENCES" section |
| `exploring/label-forecast` | 12px Bold ALL CAPS | Gold | "WHAT IMPROVES NEXT" section |
| `exploring/label-redflag` | 12px Bold ALL CAPS | Red | "WHEN TO CONTACT YOUR TEAM" |
| `exploring/footer-note` | 10px Regular | Muted | Source attribution under cards |

---

### 3. Mode Switch (4 styles)

**Purpose:** Confirmation dialogs and CTAs

| Style Name | Font/Size/Weight | Color | Usage |
|------------|------------------|-------|-------|
| `switch/dialog-title` | 20px Semibold | Navy | Modal heading |
| `switch/dialog-body` | 14px Regular | Dark | Modal content explanation |
| `switch/cta-confirm` | 16px Medium UPPERCASE | Teal | Primary button text |
| `switch/cta-cancel` | 16px Medium UPPERCASE | Navy | Secondary button text |

---

### 4. Safety & Weekly Messages (2 styles)

**Purpose:** Reassurance and milestone celebrations

| Style Name | Font/Size/Weight | Color | Usage |
|------------|------------------|-------|-------|
| `safety/redflag-open` | 14px Medium | Red | When red-flag expanded |
| `safety/week-end` | 16px Medium Italic | Gold | Days 7, 14, 21, 28 |

---

## 🎯 Implementation in Figma

### Step-by-Step Setup

1. **Open Text Styles Panel**
   - Figma → Assets → Local Styles → Text

2. **Create New Style**
   - Click "+" → Create Text Style

3. **Name with Exact Format**
   - Use: `category/style-name`
   - Example: `tracking/header-morning`
   - ⚠️ **Critical:** Exact naming enables Tokens Studio import

4. **Apply Specifications**

   For `tracking/header-morning`:
   ```
   Font Family: Plus Jakarta Sans
   Font Size: 24px
   Font Weight: Semibold (600)
   Line Height: 140%
   Paragraph Spacing: 33.6px (1.4 × 24)
   Color: --color-primary-navy (#1E3A5B)
   ```

5. **Set Line Height & Spacing**
   - Line Height: Always 140%
   - Paragraph Spacing: Font size × 1.4
   - Example: 24px → 33.6px spacing

6. **Apply Color Token**
   - Use CSS variable names (--color-*)
   - Map to actual hex values in Figma

7. **Group Under Collection**
   - Create collection: "Microcopy Styles"
   - Organize by category folders

---

## 🔤 Special Typography Features

### Uppercase Labels (Exploring Mode)

```css
Text Transform: UPPERCASE
Letter Spacing: 0.05em (5%)
Font Weight: Bold (700)
```

Used for:
- `exploring/label-normal`
- `exploring/label-forecast`
- `exploring/label-redflag`

### Italic Styles

```css
Font Style: Italic
```

Used for:
- `tracking/encouragement`
- `safety/week-end`

### Button Text (CTAs)

```css
Text Transform: UPPERCASE
Letter Spacing: 0.025em (2.5%)
Font Weight: Medium (500)
```

Used for:
- `switch/cta-confirm`
- `switch/cta-cancel`

---

## 🎨 Color Token System

### Token → Hex Mapping

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-navy` | `#1E3A5B` | Headers, main text |
| `--color-text-dark` | `#2C2C2C` | Body copy |
| `--color-text-muted` | `#64748B` | Helper text, footers |
| `--color-accent-teal` | `#00BE92` | Action, progress |
| `--color-highlight-gold` | `#E5C07B` | Milestones, encouragement |
| `--color-alert-red` | `#DC2626` | Warnings, red flags |

### Applying in Figma

1. **Method 1: Direct Hex**
   - Select text → Fill → Enter hex value

2. **Method 2: Color Styles**
   - Create color style with token name
   - Apply to text fill
   - Better for theme management

3. **Method 3: Tokens Studio Plugin**
   - Import JSON with color tokens
   - Automatically maps to text styles

---

## 📦 Exporting for Tokens Studio

### JSON Export Structure

```json
{
  "textStyles": {
    "tracking/header-morning": {
      "value": {
        "fontFamily": "Plus Jakarta Sans",
        "fontSize": "24px",
        "fontWeight": 600,
        "lineHeight": "140%",
        "paragraphSpacing": "33.6px"
      },
      "type": "typography",
      "description": "For day-start card headers"
    }
  }
}
```

### Export from App

1. Navigate to Mode Select screen
2. Click **"Text Styles"** button (top-right)
3. Click **"Download Figma Tokens JSON"**
4. Save as `ggo-compass-microcopy-styles.json`

### Import to Figma

1. Install **Tokens Studio** plugin
2. Open plugin → Settings → Import
3. Select downloaded JSON file
4. Confirm import of all text styles

---

## 💬 Dynamic Content Variations

### Time-Based Greetings (Tracking Mode)

Style: `tracking/header-morning`

**Morning (00:00–11:59):**
- "Good morning — here's what to expect today."
- "Morning — let's see what today brings."
- "Good morning. Here's your daily guidance."

**Afternoon (12:00–16:59):**
- "Good afternoon — here's what to expect today."
- "Afternoon check-in — here's today's guidance."

**Evening (17:00–23:59):**
- "Good evening — here's what to expect tonight."
- "Evening — time to review today's progress."

### Randomized Encouragements (Tracking Mode)

Style: `tracking/encouragement`

- "Small steps count most."
- "You're doing well."
- "Trust the process."
- "Rest is part of healing."
- "Every day adds up."
- "Be patient with yourself."
- "Progress isn't always visible."
- "Healing takes time."
- "Listen to your body."
- "You're on track."

### Weekly Milestone Messages (Safety)

Style: `safety/week-end`

| Day | Message |
|-----|---------|
| 7 | "Another week behind you. Keep the pace gentle." |
| 14 | "Two weeks done. You're halfway through the key healing phase." |
| 21 | "Three weeks complete. Your body is rebuilding strength." |
| 28 | "Four weeks reached. You've come a long way." |

---

## 🔧 Usage in React Components

### Import Component

```tsx
import { MicrocopyText } from './components/ggo/MicrocopyText';
```

### Basic Usage

```tsx
<MicrocopyText style="tracking/header-morning">
  Good morning — here's what to expect today.
</MicrocopyText>
```

### With Custom Element

```tsx
<MicrocopyText style="exploring/header-intro" as="h1">
  Explore how recovery unfolds, one day at a time.
</MicrocopyText>
```

### Preset Components

```tsx
import {
  TrackingHeaderMorning,
  ExploringLabelNormal,
  SafetyWeekEnd
} from './components/ggo/MicrocopyText';

<TrackingHeaderMorning>
  Good morning — here's what to expect today.
</TrackingHeaderMorning>

<ExploringLabelNormal>
  Common Experiences
</ExploringLabelNormal>

<SafetyWeekEnd>
  Another week behind you. Keep the pace gentle.
</SafetyWeekEnd>
```

---

## ♿ Accessibility Considerations

### Contrast Ratios (WCAG AA)

All styles meet minimum 4.5:1 contrast ratio:

| Style | Background | Contrast | Pass |
|-------|-----------|----------|------|
| Navy text | White | 10.8:1 | ✅ AAA |
| Teal text | White | 3.2:1 | ⚠️ Large text only |
| Red text | White | 5.7:1 | ✅ AA |
| Muted text | White | 4.6:1 | ✅ AA |

### High Contrast Mode

Adjust these styles:
- Teal → Darker teal (#008B6B)
- Gold → Darker gold (#C4941F)
- Ensures 7:1 contrast minimum

### Large Text Exception

Styles ≥18px (or 14px bold) pass at 3:1:
- `tracking/header-morning` (24px)
- `exploring/header-intro` (24px)
- `safety/week-end` (16px)

### Screen Reader Support

All styles include semantic HTML:
- Headers use `<h1>`–`<h6>`
- Labels use `<label>`
- Body text uses `<p>`

---

## 🧪 Testing Checklist

### Visual Verification

- [ ] All 18 styles render correctly
- [ ] Font weights display accurately
- [ ] Colors match token values
- [ ] Line heights are 140%
- [ ] Paragraph spacing is 1.4× font size
- [ ] Uppercase transforms work
- [ ] Italic styles render properly

### Figma Import

- [ ] JSON exports successfully
- [ ] Tokens Studio imports without errors
- [ ] All styles appear in Figma panel
- [ ] Naming follows exact convention
- [ ] Color tokens map correctly
- [ ] Typography values are accurate

### Accessibility

- [ ] Contrast ratios meet WCAG AA
- [ ] Large text exception applied
- [ ] High contrast mode tested
- [ ] Screen readers announce correctly
- [ ] Focus indicators visible

---

## 📊 Style Usage Matrix

| Screen | Primary Styles Used |
|--------|-------------------|
| **Mode Select** | exploring/header-intro, exploring/subheader-procedure |
| **Recovery (Tracking)** | tracking/header-morning, tracking/progress-hint, tracking/encouragement |
| **Recovery (Exploring)** | exploring/label-normal, exploring/label-forecast, exploring/label-redflag |
| **Mode Switch Dialog** | switch/dialog-title, switch/dialog-body, switch/cta-confirm |
| **Day Cards** | exploring/footer-note, safety/redflag-open |
| **Milestones** | safety/week-end |
| **Footer** | tracking/footer-reassure |

---

## 🔄 Version Control

### Current Version: 1.0.0

**Changelog:**

**1.0.0** (2025-10-31)
- Initial microcopy style system
- 18 styles across 4 categories
- Figma Tokens export support
- React component integration
- Dynamic content variations

**Future Updates:**

- Localization support (FR, ES, DE)
- Dark mode color variants
- Additional size scales (mobile)
- Animation timing tokens

---

## 📚 Related Documentation

- [DUAL_NAVIGATION_MODE_GUIDE.md](./DUAL_NAVIGATION_MODE_GUIDE.md) – Mode-specific usage
- [FIGMA_VARIABLES_GUIDE.md](./FIGMA_VARIABLES_GUIDE.md) – Data variable binding
- [VARIABLE_SYSTEM_README.md](./VARIABLE_SYSTEM_README.md) – Quick reference
- [/styles/globals.css](./styles/globals.css) – CSS implementation

---

## 💡 Best Practices

### DO

✅ Use exact style names for consistency  
✅ Apply 140% line height to all text  
✅ Use color tokens, not hard-coded hex  
✅ Include paragraph spacing (1.4× font size)  
✅ Test in both light and high contrast modes  
✅ Group styles by category in Figma  

### DON'T

❌ Modify font sizes without updating spacing  
❌ Use arbitrary line heights  
❌ Hard-code colors in components  
❌ Skip contrast ratio testing  
❌ Rename styles after export  
❌ Mix style categories  

---

## 📞 Support

Questions about microcopy styles?

**GGO Med Design Team**  
Email: design@ggomed.co.uk  
Version: 1.0.0  
Last Updated: 31 October 2025
