# 🎨 Figma Component Binding Guide

## Daily Recovery Card Component Setup

This guide shows **exactly** how to set up the Daily Recovery Card component in Figma with variable binding.

---

## Step 1: Create Variant Properties

In your Daily Recovery Card component, add these variant properties:

```
Component: Daily Recovery Card
└── Variants:
    ├── Procedure: Circumcision, TURP, Varicocele Repair, ... (13 options)
    ├── Day: 0, 1, 2, 3, ... 28 (29 options)
    ├── Mood: Low, Neutral, High
    ├── Theme: Light, Dark, High Contrast
    ├── Forecast: True, False
    └── Redflag: Expanded, Collapsed
```

---

## Step 2: Import Variables via Tokens Studio

1. **Download** `ggo-compass-figma-tokens.json` from the app
2. Open **Tokens Studio** plugin in Figma
3. Click **Import** and select the JSON file
4. Confirm import of all collections

You should now see these collections in Tokens Studio:

```
📁 recovery-circumcision
📁 recovery-turp
📁 recovery-varicocele-repair
📁 recovery-hydrocele-repair
📁 emotion
```

---

## Step 3: Bind Text Layers to Variables

### Layer 1: Day Number Badge

**Text Layer:** "0"  
**Variable Binding:** `recovery-[procedure]/day-[day]/day-title-text`  
**Formula:** Extract number from title (e.g., "Day 7" → "7")

**Figma Setup:**
- Select text layer
- In right panel → Variables → Bind to variable
- Choose: `recovery-circumcision/day-00/day-title-text`
- Set conditional expression: `extract_number(variable)`

---

### Layer 2: Day Title

**Text Layer:** "Surgery Day"  
**Variable Binding:** `recovery-[procedure]/day-[day]/day-title-text`

**Figma Setup:**
- Select text layer
- Bind to: `recovery-circumcision/day-00/day-title-text`
- No formula needed (use full value)

---

### Layer 3: Today You May Notice

**Section Header:** "Today you may notice…" (static text)  
**Content Text:** Dynamic reassurance text  
**Variable Binding:** `recovery-[procedure]/day-[day]/today-text`

**Figma Setup:**
- Section header stays as static text
- Select content text layer below it
- Bind to: `recovery-circumcision/day-00/today-text`

---

### Layer 4: Things Improving Soon

**Section Header:** "Things improving soon…" (static text)  
**Content Text:** Dynamic forecast text  
**Variable Binding:** `recovery-[procedure]/day-[day]/forecast-text`  
**Visibility:** Controlled by `Forecast` variant property

**Figma Setup:**
- Section header stays static
- Select content text layer
- Bind to: `recovery-circumcision/day-00/forecast-text`
- Set layer visibility rule: `Show when Forecast = True`

---

### Layer 5: Call If (Red Flags)

**Section Header:** "Call if…" (static text)  
**Content Text:** Dynamic red flag text  
**Variable Binding:** `recovery-[procedure]/day-[day]/redflag-text`  
**Visibility:** Controlled by `Redflag` variant property

**Figma Setup:**
- Section header stays static
- Select content text layer
- Bind to: `recovery-circumcision/day-00/redflag-text`
- Set layer visibility rule: `Show when Redflag = Expanded`

---

### Layer 6: Nurse Note (Optional)

**Static Text:** "Caroline says:" (or dynamic nurse name)  
**Content Text:** Dynamic nurse note  
**Variable Binding:** 
- Nurse name: `recovery-[procedure]/day-[day]/nurse-name-text`
- Nurse note: `recovery-[procedure]/day-[day]/nurse-note-text`

**Figma Setup:**
- Create text layer with formula: `{nurse-name} says:`
- Bind nurse-name to: `recovery-circumcision/day-00/nurse-name-text`
- Bind note content to: `recovery-circumcision/day-00/nurse-note-text`
- Set visibility: `Show when nurse-note-text is not empty`

---

### Layer 7: Why This Happens (Optional)

**Button Text:** "Why this happens" (static)  
**Tooltip Content:** Dynamic explanation  
**Variable Binding:** `recovery-[procedure]/day-[day]/why-this-happens-text`

**Figma Setup:**
- Button text stays static
- Create tooltip component
- Bind tooltip text to: `recovery-circumcision/day-00/why-this-happens-text`
- Set button visibility: `Show when why-this-happens-text is not empty`

---

## Step 4: Bind Background to Emotion Variables

### Background Fill Logic

Use **conditional fills** based on variant properties:

```
IF Day = 0, 7, 14, 21, 28 AND isToday = True
  → Use: emotion-milestone-bg (Gold gradient)

ELSE IF isToday = True
  → Use: emotion-reassurance-bg (Navy to Teal gradient)

ELSE
  → Use: emotion-calm-bg (Pale teal to white gradient)
```

**Figma Setup:**

1. Select card background rectangle
2. Open **Fill** settings
3. Add **conditional fill** expression:

```javascript
if (Day % 7 == 0 && Day > 0 && isToday) {
  return emotion-milestone-bg;
} else if (isToday) {
  return emotion-reassurance-bg;
} else {
  return emotion-calm-bg;
}
```

---

## Step 5: Text Color Conditional Logic

### Today Card Text

**When:** `isToday = True`  
**Color:** White (#FFFFFF)  
**Contrast Ratio:** 4.8:1 minimum (WCAG AA)

**Figma Setup:**
- Select all text layers
- Add conditional fill:
  ```javascript
  if (isToday) return #FFFFFF;
  else return #1E3A5B; // Navy
  ```

---

### Red Flag Highlight

**Section:** "Call if…"  
**Background:** Light red tint  
**Text Color:** Dark red (#991B1B)

**Figma Setup:**
- Create container with red tint background
- Set visibility: `Show when Redflag = Expanded`
- Text color: `#991B1B`

---

## Step 6: Compass Micro Progress Indicator

### Needle Rotation

**Formula:** `45 + (Day / 28) * 40`  
**Range:** 45° (SW) to 85° (SE)

**Figma Setup:**
1. Create compass needle component
2. Set rotation origin to bottom center
3. Add rotation variable:
   ```javascript
   rotation = 45 + (Day / 28) * 40
   ```

### Ring Segments

**Active segments:** `Math.ceil((Day / 28) * 8)`  
**Total segments:** 8

**Figma Setup:**
- Create 8 arc segments around compass
- Set conditional opacity for each:
  ```javascript
  segment[n].opacity = (Day / 28 >= n/8) ? 1 : 0.2
  ```

---

## Step 7: Animation States (Motion)

### Hover State

**When:** Mouse hover  
**Effect:** Scale 1.02, shadow increase

**Figma Setup:**
- Add prototype interaction: `While hovering`
- Animate: `Scale to 102%`
- Easing: `Ease out` (0.3s)

---

### Reduced Motion

**When:** `Theme includes 'Reduced Motion'` OR user preference  
**Effect:** Disable all animations

**Figma Setup:**
- Add conditional animation:
  ```javascript
  if (reducedMotion) {
    animation.duration = 0;
    animation.enabled = false;
  }
  ```

---

## Step 8: Test All Variants

### Testing Checklist

- [ ] Select `Procedure = Circumcision`, `Day = 0` → Shows "Surgery Day"
- [ ] Select `Procedure = TURP`, `Day = 7` → Shows "Week One Check"
- [ ] Select `Procedure = TURP`, `Day = 14` → Shows "Two Week Milestone"
- [ ] Select `Day = 7`, `isToday = True` → Gold gradient background
- [ ] Select `Day = 5`, `isToday = True` → Navy-teal gradient background
- [ ] Select `Forecast = False` → Forecast section hidden
- [ ] Select `Redflag = Collapsed` → Red flags hidden
- [ ] All text on "today" cards is white and readable
- [ ] Compass needle rotates from 45° to 85° across days 0-28

---

## Step 9: Export Component for Development

### Auto Layout Settings

```
Direction: Vertical
Gap: 16px
Padding: 24px
Width: 320px
Height: Auto (min 400px)
Border Radius: 24px
```

### Developer Handoff Notes

Include in Figma Inspect panel:

```
Component: Daily Recovery Card
Variables Used:
- recovery-{procedure}/day-{day}/today-text
- recovery-{procedure}/day-{day}/forecast-text
- recovery-{procedure}/day-{day}/redflag-text
- emotion-reassurance-bg
- emotion-milestone-bg
- emotion-calm-bg

Conditional Logic:
- Background: milestone if (day % 7 == 0 && day > 0)
- Text color: white if isToday
- Compass rotation: 45 + (day/28)*40
```

---

## Step 10: Version Control & Updates

### When Recovery Data Changes

1. **Export new JSON** from GGO Compass app
2. **Re-import** via Tokens Studio
3. **Verify** all variable paths still resolve
4. **Test** changed content displays correctly
5. **Document** changes in component description

---

## Troubleshooting

### "Variable not found"

**Problem:** Variable path doesn't resolve  
**Solution:** 
1. Check spelling in variable path
2. Ensure procedure name is lowercase with hyphens
3. Verify day number has leading zero (e.g., `day-07` not `day-7`)

---

### Text color unreadable on "today" card

**Problem:** White text on white background  
**Solution:**
1. Check background is bound to correct emotion variable
2. Verify `isToday` variant is set correctly
3. Ensure text color conditional is: `if (isToday) return #FFFFFF`

---

### Forecast section always visible

**Problem:** Forecast doesn't hide when `Forecast = False`  
**Solution:**
1. Select forecast container layer
2. Set visibility rule: `visible = (Forecast == "True")`
3. Apply to entire auto-layout container, not just text

---

### Nurse note missing

**Problem:** Some days don't show nurse notes  
**Solution:**
- This is expected! Not all days have nurse notes
- Only show nurse section when `nurse-note-text` has value
- Use conditional visibility: `visible = (nurse-note-text != null && nurse-note-text != "")`

---

## Reference: Complete Variable List

### Per-Day Variables (repeat for day-00 through day-28)

| Variable                     | Type   | Required | Example Value                                      |
|------------------------------|--------|----------|----------------------------------------------------|
| `today-text`                 | String | Yes      | "Mild burning at the tip is expected."             |
| `forecast-text`              | String | Yes      | "Irritation settles as the bladder relaxes."       |
| `redflag-text`               | String | Yes      | "Sudden blockage or continuous leakage."           |
| `day-title-text`             | String | Yes      | "First Morning"                                    |
| `nurse-note-text`            | String | No       | "Avoid caffeine and alcohol for now."              |
| `nurse-name-text`            | String | No       | "Caroline"                                         |
| `why-this-happens-text`      | String | No       | "Your bladder needs time to adjust."               |

### Emotion Variables

| Variable                  | Type     | Value                                        |
|---------------------------|----------|----------------------------------------------|
| `emotion-normal`          | Color    | `#00BE92`                                    |
| `emotion-progress`        | Color    | `#E5C07B`                                    |
| `emotion-alert`           | Color    | `#DC2626`                                    |
| `emotion-calm-bg`         | Gradient | `linear-gradient(#E6FDF8, #FFFFFF)`          |
| `emotion-reassurance-bg`  | Gradient | `linear-gradient(#1E3A5B, #00856D)`          |
| `emotion-milestone-bg`    | Gradient | `linear-gradient(#C4941F, #8B6914)`          |

---

## Next Steps

1. **Share component** with development team
2. **Export to code** using Figma Dev Mode
3. **Implement in React** using existing `/components/ggo/RecoveryDayCard.tsx`
4. **Test with real data** from `/data/recoveryData.ts`
5. **Deploy** to GGO Compass app

---

## Support

Questions? Contact:  
**GGO Med Design Team**  
Email: design@ggomed.co.uk
