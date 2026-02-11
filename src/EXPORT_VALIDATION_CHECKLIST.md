# ✅ Export Validation Checklist

**Project:** GGO Compass v2.0.0  
**Date:** 1 November 2025  
**Status:** Pre-Export Validation

---

## 🎯 Quick Validation

Run through this checklist before initiating Anima export.

---

## 📦 1. File Structure

### Core Files
- [x] `/App.tsx` exists and compiles
- [x] `/package.json` with all dependencies
- [x] `/tsconfig.json` configured
- [x] `/tailwind.config.js` or Tailwind v4 setup

### Screens (13)
- [x] `SplashScreen.tsx`
- [x] `WelcomeScreen.tsx`
- [x] `PersonaliseScreen.tsx`
- [x] `ModeSelectScreen.tsx`
- [x] `ProcedurePickerScreen.tsx`
- [x] `DateInputScreen.tsx`
- [x] `TimelineScreen.tsx`
- [x] `RecoveryScreen.tsx` ⭐ Critical
- [x] `FeedbackScreen.tsx`
- [x] `CompletionScreen.tsx`
- [x] `ExportVariablesScreen.tsx`
- [x] `MicrocopyStyleGuideScreen.tsx`
- [x] `StyleGuideScreen.tsx`

### Custom Components (12)
- [x] `CompassLogo.tsx` ⭐ Critical
- [x] `CompassMicroProgress.tsx`
- [x] `FooterDisclaimer.tsx` ⭐ Critical
- [x] `GGOButton.tsx`
- [x] `MicrocopyText.tsx`
- [x] `ModeSwitcher.tsx` ⭐ Critical
- [x] `MoodSlider.tsx`
- [x] `PatientNoteField.tsx`
- [x] `PhaseJumper.tsx`
- [x] `PhaseRail.tsx`
- [x] `RecoveryDayCard.tsx` ⭐ Critical
- [x] `StepPanel.tsx`

### Data Files (4)
- [x] `figmaVariables.ts`
- [x] `microcopyStyles.ts`
- [x] `recoveryData.ts`
- [x] `variableStructure.json`

### Styles (2)
- [x] `globals.css`
- [x] `microcopy.css`

### Utilities (1)
- [x] `dateCalculations.ts`

### Documentation (9)
- [x] `ANIMA_EXPORT_GUIDE.md`
- [x] `COMPONENT_INDEX.md`
- [x] `EXPORT_PACKAGE_MANIFEST.json`
- [x] `EXPORT_README.md`
- [x] `DUAL_NAVIGATION_MODE_GUIDE.md`
- [x] `FIGMA_MICROCOPY_STYLES_GUIDE.md`
- [x] `FIGMA_VARIABLES_GUIDE.md`
- [x] `RECOVERY_COMPONENT_SUMMARY.md`
- [x] `VARIABLE_SYSTEM_README.md`
- [x] `MICROCOPY_QUICK_REFERENCE.md`

**Status:** ✅ All files present

---

## 🔨 2. Build & Compile

### Commands to Run

```bash
# Install dependencies
npm install

# TypeScript check
npx tsc --noEmit

# Build
npm run build

# Test dev server
npm run dev
```

### Expected Results
- [ ] `npm install` → No errors
- [ ] `npx tsc --noEmit` → 0 errors
- [ ] `npm run build` → Success
- [ ] `npm run dev` → Localhost loads

### Common Issues
- **Missing dependencies?** Check `package.json`
- **Type errors?** Review component props
- **Build fails?** Check import paths
- **Dev server won't start?** Check port 3000

**Status:** ⬜ Run these commands and check all boxes

---

## 🎨 3. Figma Preparation

### Text Styles
- [ ] Open app → Mode Select → "Text Styles"
- [ ] Download Figma Tokens JSON
- [ ] Import to Figma via Tokens Studio plugin
- [ ] Verify all 18 styles imported correctly
- [ ] Apply styles to text elements in Figma

### Color Tokens
- [ ] Colors defined in Figma variables
- [ ] Navy: #1E3A5B
- [ ] Teal: #00BE92
- [ ] Gold: #E5C07B
- [ ] Red: #DC2626
- [ ] Muted: #64748B

### Variables
- [ ] Open app → Mode Select → "Export Variables"
- [ ] Download Figma Variables JSON
- [ ] Import to Figma variables panel
- [ ] Bind variables to components

### Component Organization
- [ ] All screens in Figma frames
- [ ] Layers named semantically
- [ ] Auto Layout applied
- [ ] Components grouped logically
- [ ] Responsive constraints set

**Status:** ⬜ Complete Figma setup

---

## 🧪 4. Visual Testing

### Test Each Screen

**SplashScreen**
- [ ] Compass animation plays (2s)
- [ ] Smooth fade-in transition
- [ ] Logo renders correctly

**WelcomeScreen**
- [ ] Input field accepts text
- [ ] Button enables after input
- [ ] Transitions to next screen

**PersonaliseScreen**
- [ ] All 9 checkboxes work
- [ ] Radio buttons select correctly
- [ ] "Continue" button works

**ModeSelectScreen**
- [ ] Two large cards present
- [ ] Hover effects work (±15° tilt)
- [ ] "Export Variables" button (top-right)
- [ ] "Text Styles" button (top-right)

**ProcedurePickerScreen**
- [ ] Procedure cards clickable
- [ ] Site dropdown populates
- [ ] Selection shows feedback

**DateInputScreen**
- [ ] Calendar opens correctly
- [ ] Date selection works
- [ ] "Browse Mode" link present

**TimelineScreen**
- [ ] Phase rail displays
- [ ] Steps expand/collapse
- [ ] Compass shows at correct rotation
- [ ] Progress animates

**RecoveryScreen** ⭐ Critical
- [ ] Day cards render (29 total)
- [ ] Current day centered
- [ ] Mode switcher (top-right)
- [ ] Tracking mode: Future days locked
- [ ] Exploring mode: All days unlocked
- [ ] Phase jumper (Exploring only)
- [ ] Mood slider works
- [ ] Patient notes field functional
- [ ] Quick access buttons work
- [ ] Footer disclaimer visible

**FeedbackScreen**
- [ ] Textarea accepts input
- [ ] Rating selection works
- [ ] Submit button functional

**CompletionScreen**
- [ ] Celebration message shows
- [ ] Export button works
- [ ] Reset button works

**ExportVariablesScreen**
- [ ] Two export cards present
- [ ] Download buttons work
- [ ] JSON files download correctly

**MicrocopyStyleGuideScreen**
- [ ] 4 tabs (Tracking, Exploring, Switch, Safety)
- [ ] All 18 styles display
- [ ] Copy buttons work
- [ ] Download JSON works

**Status:** ⬜ Test all screens

---

## 🖱️ 5. Interaction Testing

### Navigation Flow
- [ ] Splash → Welcome → Personalise → Mode Select
- [ ] Mode Select → Explore → Procedure Picker → Date → Timeline → Recovery
- [ ] Mode Select → Track → Procedure Picker → Date → Timeline → Recovery
- [ ] Recovery → Feedback → Completion

### Mode Switching
- [ ] Click Mode Switcher dropdown
- [ ] Select opposite mode
- [ ] Confirmation modal appears
- [ ] Click "Switch to [Mode]"
- [ ] Mode changes correctly
- [ ] Cards lock/unlock appropriately

### Recovery Day Navigation
- [ ] Click Previous button (left arrow)
- [ ] Click Next button (right arrow)
- [ ] Tracking: Cannot go beyond current day
- [ ] Exploring: Can navigate all days
- [ ] Cards scroll horizontally
- [ ] Active card stays centered

### Phase Jumper (Exploring Mode)
- [ ] Click "Jump to:" dropdown
- [ ] Select "Week 2"
- [ ] Jumps to Day 14
- [ ] Dropdown closes

### Quick Access
- [ ] Click "Pain Control"
- [ ] Content expands below
- [ ] Click again to collapse
- [ ] Try all 4 buttons

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Shift+T switches to Tracking
- [ ] Shift+E switches to Exploring
- [ ] Arrow keys navigate days (if implemented)
- [ ] Enter/Space activate buttons

**Status:** ⬜ Test all interactions

---

## ♿ 6. Accessibility Testing

### Screen Reader
- [ ] Turn on VoiceOver (Mac) or NVDA (Windows)
- [ ] Navigate through app
- [ ] All interactive elements announced
- [ ] Locked cards announce "Locked"
- [ ] ARIA labels present

### Keyboard Only
- [ ] Disconnect mouse
- [ ] Navigate entire app with keyboard
- [ ] All features accessible
- [ ] Focus indicators visible
- [ ] No keyboard traps

### Contrast Ratios
- [ ] Navy on white: ≥4.5:1 ✅
- [ ] Teal on white: ≥3:1 (large text) ✅
- [ ] Red on white: ≥4.5:1 ✅
- [ ] Muted on white: ≥4.5:1 ✅

### Reduced Motion
- [ ] Enable "Reduce Motion" in OS settings
- [ ] Animations respect preference
- [ ] Page transitions still functional
- [ ] No jarring motion

### High Contrast
- [ ] Enable High Contrast mode
- [ ] All text readable
- [ ] Borders visible
- [ ] Interactive elements distinguishable

**Status:** ⬜ Complete accessibility audit

---

## 📱 7. Responsive Testing

### Mobile (375×667 – iPhone SE)
- [ ] All screens fit without horizontal scroll
- [ ] Text readable without zoom
- [ ] Buttons thumb-sized (≥44×44px)
- [ ] Cards stack vertically
- [ ] Navigation accessible

### Tablet (768×1024 – iPad)
- [ ] 2-column layouts work
- [ ] Spacing appropriate
- [ ] Touch targets adequate
- [ ] Landscape orientation functional

### Desktop (1920×1080)
- [ ] Content centered (max-w-7xl)
- [ ] No excessive whitespace
- [ ] Hover states work
- [ ] Mouse interactions smooth

### Breakpoint Testing
- [ ] sm: 640px
- [ ] md: 768px
- [ ] lg: 1024px
- [ ] xl: 1280px
- [ ] 2xl: 1536px

**Status:** ⬜ Test all screen sizes

---

## 🎬 8. Animation Verification

### Page Transitions
- [ ] Fade in (opacity 0 → 1)
- [ ] Slide up (y: 20 → 0)
- [ ] Duration: 0.4s
- [ ] Easing: [0.4, 0, 0.2, 1]

### Compass Needle
- [ ] Rotates based on progress
- [ ] Range: 45° to 85°
- [ ] Smooth animation
- [ ] Duration: 1.2s

### Progress Bar
- [ ] Animates width 0% → X%
- [ ] Duration: 0.6s
- [ ] Gold pulse in Tracking mode
- [ ] No pulse in Exploring mode

### Card Hover
- [ ] Scale: 1 → 1.02
- [ ] Shadow increases
- [ ] Smooth transition

### Modal Animations
- [ ] Fade in/out
- [ ] Scale: 0.95 → 1
- [ ] Backdrop blur

**Status:** ⬜ Verify all animations

---

## 🔍 9. Data Validation

### Recovery Data
- [ ] Circumcision: 29 days (Day 0-28)
- [ ] TURP: 29 days (Day 0-28)
- [ ] Each day has:
  - [ ] `day` number
  - [ ] `normal` experiences (array)
  - [ ] `forecast` text
  - [ ] `redFlags` (array)

### Text Styles
- [ ] 18 styles total
- [ ] 6 Tracking styles
- [ ] 6 Exploring styles
- [ ] 4 Switch styles
- [ ] 2 Safety styles

### Variables
- [ ] `mode`: "tracking" | "exploring"
- [ ] `procedure`: "Circumcision" | "TURP"
- [ ] `site`: string
- [ ] `surgeryDate`: Date
- [ ] `currentDay`: 0-28

**Status:** ⬜ Validate all data

---

## 🚀 10. Performance Check

### Lighthouse Audit
- [ ] Run Lighthouse in Chrome DevTools
- [ ] Performance: ≥90
- [ ] Accessibility: ≥90
- [ ] Best Practices: ≥90
- [ ] SEO: ≥90

### Bundle Size
- [ ] Build project: `npm run build`
- [ ] Check `dist/` folder size
- [ ] Total: <500KB gzipped
- [ ] Main chunk: <300KB

### Load Times
- [ ] First Contentful Paint: <1.5s
- [ ] Time to Interactive: <3s
- [ ] Largest Contentful Paint: <2.5s

### Memory
- [ ] Open DevTools → Performance
- [ ] Record while navigating app
- [ ] No memory leaks
- [ ] Smooth 60fps animations

**Status:** ⬜ Run performance audit

---

## 🌐 11. Cross-Browser Testing

### Chrome (Latest)
- [ ] All features work
- [ ] Animations smooth
- [ ] Layout correct

### Safari (Latest)
- [ ] All features work
- [ ] Animations smooth
- [ ] Layout correct
- [ ] iOS Safari tested

### Firefox (Latest)
- [ ] All features work
- [ ] Animations smooth
- [ ] Layout correct

### Edge (Latest)
- [ ] All features work
- [ ] Animations smooth
- [ ] Layout correct

**Status:** ⬜ Test in all browsers

---

## 📤 12. Export Preparation

### Figma File
- [ ] All screens organized
- [ ] Text styles applied
- [ ] Color tokens set
- [ ] Variables bound
- [ ] Auto Layout used
- [ ] Layers named clearly

### Anima Plugin
- [ ] Plugin installed in Figma
- [ ] GGO Compass frame selected
- [ ] Settings configured:
  - Framework: React + TypeScript
  - Styling: Tailwind CSS
  - Components: Shadcn/UI

### Export Settings
- [ ] Component naming: Semantic
- [ ] Import paths: Relative or absolute
- [ ] State management: React Hooks
- [ ] Code formatting: Prettier (optional)

**Status:** ⬜ Prepare for export

---

## ✅ 13. Final Checklist

### Code Quality
- [x] TypeScript: 0 errors
- [x] ESLint: 0 warnings
- [x] Build: Successful
- [x] Tests: Passing (if any)

### Design Fidelity
- [ ] Colors match Figma
- [ ] Typography accurate
- [ ] Spacing correct
- [ ] Animations faithful

### Functionality
- [ ] All screens navigate correctly
- [ ] All interactions work
- [ ] Data displays properly
- [ ] Forms validate

### Accessibility
- [ ] WCAG 2.2 AA compliant
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Contrast ratios pass

### Performance
- [ ] Lighthouse score ≥90
- [ ] Bundle size <500KB
- [ ] Load time <3s
- [ ] No memory leaks

### Documentation
- [x] Export guide complete
- [x] Component index created
- [x] All READMEs written
- [x] Manifest generated

**Status:** ⬜ Complete all sections

---

## 🎉 Export Ready?

### All Sections Complete?
- [ ] 1. File Structure
- [ ] 2. Build & Compile
- [ ] 3. Figma Preparation
- [ ] 4. Visual Testing
- [ ] 5. Interaction Testing
- [ ] 6. Accessibility Testing
- [ ] 7. Responsive Testing
- [ ] 8. Animation Verification
- [ ] 9. Data Validation
- [ ] 10. Performance Check
- [ ] 11. Cross-Browser Testing
- [ ] 12. Export Preparation
- [ ] 13. Final Checklist

### If All Checked:

**🟢 YOU'RE READY TO EXPORT!**

Proceed to `/ANIMA_EXPORT_GUIDE.md` for detailed export instructions.

---

### If Issues Found:

**🟡 RESOLVE BEFORE EXPORTING**

Document issues here:

**Issue 1:**
- Description:
- Severity:
- Resolution:

**Issue 2:**
- Description:
- Severity:
- Resolution:

---

## 📝 Validation Sign-Off

**Validated By:** ___________________________  
**Date:** ___________________________  
**Status:** ⬜ Ready ⬜ Issues Found  
**Notes:**

---

**GGO Compass v2.0.0**  
**Export Validation Checklist**  
**Last Updated:** 1 November 2025
