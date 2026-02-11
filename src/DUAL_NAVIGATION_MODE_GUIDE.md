# 🧭 GGO Compass – Dual Navigation Mode Guide

## Overview

GGO Compass features **two distinct navigation modes** that adapt the interaction logic while maintaining the identical calm interface:

1. **Tracking Mode** – Date-anchored, auto-advancing daily guidance
2. **Exploring Mode** – Manual browsing, all days freely accessible

> **Design Intent:** "The same calm interface adapts to two mental states: 'Guide me through each day' and 'Show me the map.' Nothing else changes — same tone, same trust, just different rhythm."

---

## 🎯 Mode Comparison

| Aspect | Tracking Mode | Exploring Mode |
|--------|---------------|----------------|
| **Mental Model** | "Guide me through each day" | "Show me the map" |
| **Day Unlocking** | Auto-unlocks daily at 00:01 | All days unlocked |
| **Navigation** | Linear, forward only | Free browsing |
| **Date Display** | Absolute date shown | Relative labels (Day 1, Week 2) |
| **Progress Bar** | Animated with gold pulse | Static, instant update |
| **Compass Needle** | Rotates incrementally (5° × day) | Rotates instantly on tap |
| **Header Message** | "Good morning — here's what to expect today" | "Select a day to see what recovery feels like" |
| **Card Appearance** | Current day centered, future days locked | All cards accessible with teal outline on active |
| **Emotion Tone** | Stable, reassuring, routine | Inquisitive, open |
| **Keyboard** | ← → arrows, Tab navigation | ← → arrows, Jump to phases |

---

## 🔄 Mode Toggle

### Location

- **Primary:** Mode Select screen (two card options)
- **Secondary:** Top-right corner of Recovery screen (dropdown switcher)

### Visual Cues

#### Mode Select Screen

**Tracking Card:**
- Gold background
- ClipboardCheck icon
- Rotates 15° on hover
- Border: 4px transparent → gold on hover
- Microcopy: "Guide me through each day"

**Exploring Card:**
- Teal background
- Compass icon
- Rotates -15° on hover
- Border: 4px transparent → teal on hover
- Microcopy: "Show me the map"

#### Mode Switcher Component

- **Tracking:** Gold badge with MapPin icon
- **Exploring:** Teal badge with Compass icon
- Dropdown shows both modes with descriptions
- Checkmark indicates current mode

---

## 📅 Tracking Mode

### Logic

```typescript
if (mode === "tracking") {
  const day = currentDate - surgeryDate;
  showCard(recovery[procedure].days[day]);
  lockAllCardsBeyond(day);
}
```

### UI Behavior

1. **Auto-Advance**
   - Progress rail updates daily at 00:01 local time
   - New card unlocks automatically
   - Previous cards remain accessible

2. **Card States**
   - **Today:** Centered, full opacity, active
   - **Past:** Accessible, 100% opacity, scrollable
   - **Tomorrow:** Locked, muted gold badge, "Unlocks tomorrow"
   - **Future:** Locked, 60% opacity, grey lock icon

3. **Visual Indicators**
   - Gold pulse animation on progress bar
   - Compass needle rotates incrementally (5° per day)
   - Surgery date shown below day label
   - "Good morning/afternoon/evening" greeting

4. **Navigation Limits**
   - Can navigate backwards to any past day
   - Cannot navigate beyond current day
   - Forward button disabled when at current day

5. **Accessibility**
   - Today's card auto-read in VoiceOver on app open
   - Locked cards marked with `aria-disabled="true"`
   - Clear focus indicators on all interactive elements

---

## 🗺️ Exploring Mode

### Logic

```typescript
if (mode === "exploring") {
  unlockAllCards();
  enableSwipe();
  enableJumpTo();
}
```

### UI Behavior

1. **Free Navigation**
   - All 29 days (0–28) unlocked
   - Swipe/scroll in any direction
   - Jump to specific phases via dropdown

2. **Card States**
   - **Active:** Teal ring (2px), full opacity
   - **Inactive:** Hover tint (light navy), no ring
   - **All:** Clickable, swipeable, fully accessible

3. **Visual Indicators**
   - No lock icons
   - No "tomorrow" preview badges
   - Progress bar updates instantly (no animation)
   - Compass needle rotates instantly on day select

4. **Phase Jumper**
   - Dropdown: "Jump to: [Current Phase]"
   - 5 phases:
     - Surgery Day (Day 0)
     - Early Recovery (Days 1-7)
     - Healing Phase (Days 8-14)
     - Strengthening (Days 15-21)
     - Final Phase (Days 22-28)
   - Clicking phase jumps to first day of that phase

5. **Labels**
   - No absolute dates shown
   - Relative labels: "Day 0 – Surgery Day", "Week 1", "Day 14", etc.
   - Format: `formatRelativeDay(dayNumber)`

6. **Accessibility**
   - All cards keyboard navigable
   - Phase jumper keyboard accessible
   - Clear focus indicators throughout

---

## 🔀 Mode Switching

### Confirmation Modal

**Triggered When:** User selects different mode from dropdown

**Content:**

**Switching to Tracking:**
> Tracking mode links to your surgery date. You'll see daily guidance that unlocks automatically as you progress through recovery.
> 
> Your browsing won't affect your recovery record.

**Switching to Exploring:**
> Exploring mode lets you browse all recovery days freely. This is helpful for planning ahead or learning what to expect.
> 
> This won't affect your recovery record or daily tracking.

**Actions:**
- Cancel: "Stay in [Current Mode]"
- Confirm: "Switch to [New Mode]"

### State Persistence

```typescript
user.mode = mode; // "tracking" | "exploring"
user.surgeryDate = [Date]; // Required for tracking
```

In Carebit integration, these map to real user data in database.

---

## ⌨️ Keyboard Accessibility

### Global Shortcuts

- **Shift + T** – Switch to Tracking mode
- **Shift + E** – Switch to Exploring mode

### Navigation

- **← →** – Previous/Next day
- **Tab** – Cycle through interactive elements
- **Enter/Space** – Activate buttons, open dropdowns
- **Escape** – Close modals, dropdowns

### Focus Management

- Mode switcher receives focus on mount
- Locked cards skip in tab order
- Phase jumper fully keyboard navigable

---

## 🎨 Shared Interface Components

### Reused Across Both Modes

1. **Daily Recovery Card**
   - Same structure, colors, typography
   - Same empathic microcopy
   - Same "Why this happens" tooltips
   - Only opacity/lock state changes

2. **Progress Rail**
   - Same visual design
   - Tracking: Auto-animates with gold pulse
   - Exploring: Updates instantly on click

3. **Compass Needle**
   - Same rotation range (45° to 85°)
   - Tracking: Smooth incremental rotation
   - Exploring: Instant rotation on day select

4. **Quick Access Buttons**
   - Pain Control, Wound Care, Activity, When to Call
   - Same content across both modes

5. **Mood Slider**
   - Same functionality
   - Affects card tone (low/neutral/high reassurance)

6. **Patient Note Field**
   - Same private note-taking functionality
   - Persistent across mode switches

---

## 📱 Responsive Behavior

### Mobile (< 768px)

- Mode switcher stacks below header on small screens
- Phase jumper full-width dropdown
- Cards scroll horizontally (snap points)
- Touch gestures for day navigation

### Desktop (≥ 768px)

- Mode switcher top-right corner
- Phase jumper inline with navigation
- Cards horizontal carousel with visible overflow
- Mouse + keyboard navigation

---

## 🧪 Testing Checklist

### Tracking Mode

- [ ] Current day auto-calculates from surgery date
- [ ] Future days show lock icon and badge
- [ ] Tomorrow card shows "Unlocks tomorrow" in gold
- [ ] Progress bar animates with gold pulse
- [ ] Cannot navigate beyond current day
- [ ] Surgery date displays correctly
- [ ] Time-based greeting appears (morning/afternoon/evening)
- [ ] Auto-advance simulation works (change system date)

### Exploring Mode

- [ ] All 29 days accessible immediately
- [ ] No lock icons visible
- [ ] Active day shows teal ring
- [ ] Phase jumper dropdown works
- [ ] Clicking phase jumps to correct day
- [ ] Progress bar updates instantly
- [ ] Relative day labels display correctly
- [ ] No absolute dates shown

### Mode Switching

- [ ] Confirmation modal appears on switch
- [ ] Modal content correct for each direction
- [ ] Switching to Tracking jumps to current day
- [ ] Switching to Exploring unlocks all cards
- [ ] Mode state persists across navigation
- [ ] Keyboard shortcuts work (Shift+T, Shift+E)
- [ ] Mode indicator updates in UI

### Accessibility

- [ ] VoiceOver reads today's card in Tracking
- [ ] Locked cards have aria-disabled
- [ ] All buttons have aria-labels
- [ ] Focus indicators visible throughout
- [ ] Keyboard navigation works completely
- [ ] Reduced motion respected (no auto-animations)
- [ ] High contrast mode works in both modes

---

## 🎯 Design Deliverables

### Figma Structure

```
📁 GGO Compass v2
 ├── 00 Mode Select
 │   ├── Tracking Card (hover states)
 │   └── Exploring Card (hover states)
 ├── 01 TRACKING FLOW
 │   ├── Header with Mode Switcher
 │   ├── Progress Rail (animated)
 │   ├── Day Cards (locked states)
 │   └── Quick Access
 ├── 02 EXPLORING FLOW
 │   ├── Header with Mode Switcher
 │   ├── Progress Rail (static)
 │   ├── Phase Jumper
 │   ├── Day Cards (all unlocked)
 │   └── Quick Access
 └── 03 Components (Shared)
     ├── Daily Recovery Card
     ├── Mode Switcher Dropdown
     ├── Confirmation Modal
     ├── Phase Jumper
     ├── Compass Logo
     └── Footer Disclaimer
```

### Annotations

Add prototype notes:

```
"Mode controls interaction logic, not visual design.
 - Tracking = daily unlock with date anchor
 - Exploring = free browse, no date dependency
 
 Same calm interface, different rhythm."
```

---

## 🔐 Safety & Privacy

### Data Handling

- Mode choice stored locally (prototype variables)
- Surgery date encrypted in real implementation
- Browsing history doesn't affect recovery record
- Mode switching explicitly communicated to user

### User Control

- Easy mode switching at any time
- Clear confirmation before switching
- No data loss when switching modes
- Private notes persist across modes

---

## 🚀 Implementation Notes

### Date Calculation (Tracking Mode)

```typescript
// utils/dateCalculations.ts
function calculateRecoveryDay(surgeryDate: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const surgery = new Date(surgeryDate);
  surgery.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - surgery.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays); // Day 0 is surgery day
}
```

### Auto-Advance Simulation (Tracking Mode)

```typescript
// Real implementation would use cron job or background task
// Prototype simulates by checking date on app open
useEffect(() => {
  if (mode === "tracking" && surgeryDate) {
    const currentDay = calculateRecoveryDay(surgeryDate);
    setCurrentDayIndex(Math.min(currentDay, recoveryDays.length - 1));
  }
}, [mode, surgeryDate]);
```

### Phase Detection (Exploring Mode)

```typescript
function getPhaseFromDay(dayNumber: number): string {
  if (dayNumber === 0) return "Surgery Day";
  if (dayNumber >= 1 && dayNumber <= 7) return "Early Recovery";
  if (dayNumber >= 8 && dayNumber <= 14) return "Healing Phase";
  if (dayNumber >= 15 && dayNumber <= 21) return "Strengthening";
  if (dayNumber >= 22 && dayNumber <= 28) return "Final Phase";
  return "Extended Recovery";
}
```

---

## 📊 Analytics Events (Future)

Track mode usage for improvements:

```typescript
// Tracking: Log daily engagement
analytics.track("recovery_day_viewed", {
  mode: "tracking",
  day: currentDay,
  surgeryDate: surgeryDate,
  daysPostOp: currentDay
});

// Exploring: Log browsing patterns
analytics.track("recovery_day_viewed", {
  mode: "exploring",
  day: viewedDay,
  phase: getPhaseFromDay(viewedDay),
  userIntent: "planning" | "learning" | "comparing"
});

// Mode Switch: Log transitions
analytics.track("navigation_mode_switched", {
  from: previousMode,
  to: newMode,
  trigger: "manual" | "keyboard_shortcut"
});
```

---

## ❓ FAQ

**Q: Can I switch modes at any time?**  
A: Yes, the mode switcher is always accessible in the top-right corner. You'll see a confirmation modal before switching.

**Q: Does switching modes affect my recovery record?**  
A: No, your recovery record is separate. Exploring mode is just for viewing and planning.

**Q: What happens if I'm on Day 10 in Tracking and switch to Exploring?**  
A: You'll stay on Day 10, but all other days become accessible. Switching back to Tracking returns you to your current day.

**Q: Can I see future days in Tracking mode?**  
A: No, future days are locked until that day arrives. This maintains the daily rhythm of recovery.

**Q: Why have two modes?**  
A: Some users want daily guidance (Tracking), others want to plan ahead (Exploring). Both needs are valid.

---

## 📞 Support

Questions? Contact:  
**GGO Med Product Team**  
Email: product@ggomed.co.uk  
Version: 2.0.0  
Last Updated: 31 October 2025
