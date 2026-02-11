# 📝 Microcopy Text Styles – Quick Reference

## Access Style Guide

**In App:** Mode Select → Click "Text Styles" button (top-right)

**Export:** Download Figma Tokens JSON → Import to Figma via Tokens Studio

---

## All 18 Styles

### 🎯 Tracking Mode (6)

| Style | Size | Weight | Color | Example |
|-------|------|--------|-------|---------|
| `tracking/header-morning` | 24px | Semibold | Navy | "Good morning — here's what to expect today." |
| `tracking/header-evening` | 24px | Medium | Navy | "Another day complete." |
| `tracking/progress-hint` | 16px | Regular | Teal | "Your next phase is ready." |
| `tracking/tooltip` | 12px | Regular | Muted | "Tap for signs that need attention." |
| `tracking/encouragement` | 14px | Medium Italic | Gold | "Small steps count most." |
| `tracking/footer-reassure` | 12px | Regular | Muted | "This guidance is educational..." |

### 🧭 Exploring Mode (6)

| Style | Size | Weight | Color | Example |
|-------|------|--------|-------|---------|
| `exploring/header-intro` | 24px | Semibold | Navy | "Explore how recovery unfolds..." |
| `exploring/subheader-procedure` | 16px | Medium | Dark | "Select a day to see what it feels like." |
| `exploring/label-normal` | 12px | Bold CAPS | Teal | "COMMON EXPERIENCES" |
| `exploring/label-forecast` | 12px | Bold CAPS | Gold | "WHAT IMPROVES NEXT" |
| `exploring/label-redflag` | 12px | Bold CAPS | Red | "WHEN TO CONTACT YOUR TEAM" |
| `exploring/footer-note` | 10px | Regular | Muted | "Based on BAUS patient guidance." |

### 🔄 Mode Switch (4)

| Style | Size | Weight | Color | Example |
|-------|------|--------|-------|---------|
| `switch/dialog-title` | 20px | Semibold | Navy | "Start following your own journey?" |
| `switch/dialog-body` | 14px | Regular | Dark | "Switching to Exploring lets you..." |
| `switch/cta-confirm` | 16px | Medium CAPS | Teal | "YES, BEGIN TRACKING" |
| `switch/cta-cancel` | 16px | Medium CAPS | Navy | "STAY IN EXPLORE MODE" |

### 🛡️ Safety Messages (2)

| Style | Size | Weight | Color | Example |
|-------|------|--------|-------|---------|
| `safety/redflag-open` | 14px | Medium | Red | "If you're unsure, contact your care team..." |
| `safety/week-end` | 16px | Medium Italic | Gold | "Another week behind you. Keep the pace gentle." |

---

## Usage in React

```tsx
import { MicrocopyText } from './components/ggo/MicrocopyText';

<MicrocopyText style="tracking/header-morning">
  Good morning — here's what to expect today.
</MicrocopyText>
```

**Or use presets:**

```tsx
import { TrackingHeaderMorning } from './components/ggo/MicrocopyText';

<TrackingHeaderMorning>
  Good morning — here's what to expect today.
</TrackingHeaderMorning>
```

---

## Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-navy` | #1E3A5B | Headers, main |
| `--color-text-dark` | #2C2C2C | Body copy |
| `--color-text-muted` | #64748B | Helper, footer |
| `--color-accent-teal` | #00BE92 | Action, teal |
| `--color-highlight-gold` | #E5C07B | Milestone, gold |
| `--color-alert-red` | #DC2626 | Warning, red |

---

## Typography Rules

- **Font:** Plus Jakarta Sans
- **Line Height:** 140%
- **Paragraph Spacing:** Font size × 1.4
- **Naming:** `category/style-name`

---

## Figma Setup

1. Text Styles panel → Create Style
2. Name: `category/style-name` (exact format)
3. Apply specs from tables above
4. Line height = 140%, spacing = size × 1.4
5. Group under "Microcopy Styles" collection

---

## Dynamic Content

### Randomized Encouragement (10 messages)
"Small steps count most." • "You're doing well." • "Trust the process." • "Rest is part of healing." • "Every day adds up." • "Be patient with yourself." • "Progress isn't always visible." • "Healing takes time." • "Listen to your body." • "You're on track."

### Weekly Milestones
- Day 7: "Another week behind you. Keep the pace gentle."
- Day 14: "Two weeks done. You're halfway through..."
- Day 21: "Three weeks complete. Your body is rebuilding..."
- Day 28: "Four weeks reached. You've come a long way."

---

## Files

- `/data/microcopyStyles.ts` – Style definitions
- `/components/ggo/MicrocopyText.tsx` – React component
- `/components/screens/MicrocopyStyleGuideScreen.tsx` – Visual guide
- `/FIGMA_MICROCOPY_STYLES_GUIDE.md` – Complete docs

---

**Version:** 1.0.0  
**Last Updated:** 31 October 2025
