# 📦 GGO Compass – Component Index

## Complete Reference for Anima Export

---

## 🎯 Screens (13 Components)

### 1. SplashScreen
**Path:** `/components/screens/SplashScreen.tsx`  
**Purpose:** Animated intro with compass logo  
**Props:** `onComplete: () => void`  
**Dependencies:** CompassLogo  
**Animation:** Fade in + compass spin (2s)  
**Export Notes:** Ensure logo animation exports correctly

### 2. WelcomeScreen
**Path:** `/components/screens/WelcomeScreen.tsx`  
**Purpose:** Welcome message + pronoun selection  
**Props:** `onNext: (name: string) => void`  
**Dependencies:** GGOButton, Input  
**State:** User name input  
**Export Notes:** Input field validation required

### 3. PersonaliseScreen
**Path:** `/components/screens/PersonaliseScreen.tsx`  
**Purpose:** User preferences (tone, language, accessibility)  
**Props:** `onNext: (prefs: PersonalisePreferences) => void`  
**Dependencies:** Checkbox, RadioGroup  
**State:** Multi-select checkboxes  
**Export Notes:** State management for 9 checkboxes

### 4. ModeSelectScreen
**Path:** `/components/screens/ModeSelectScreen.tsx`  
**Purpose:** Choose Tracking or Exploring mode  
**Props:** `onSelectMode: (mode) => void, onExportVariables?: () => void, onViewMicrocopyStyles?: () => void`  
**Dependencies:** CompassLogo  
**Animation:** Card hover + icon tilt (±15°)  
**Export Notes:** Two large interactive cards + dev buttons

### 5. ProcedurePickerScreen
**Path:** `/components/screens/ProcedurePickerScreen.tsx`  
**Purpose:** Select procedure and site  
**Props:** `onNext: (procedure, site) => void`  
**Dependencies:** Card, Select  
**State:** Procedure + site selection  
**Export Notes:** Dropdown population from data

### 6. DateInputScreen
**Path:** `/components/screens/DateInputScreen.tsx`  
**Purpose:** Enter surgery date  
**Props:** `onNext: (date) => void, onBrowseMode: () => void`  
**Dependencies:** Calendar  
**State:** Date picker  
**Export Notes:** Calendar component + validation

### 7. TimelineScreen
**Path:** `/components/screens/TimelineScreen.tsx`  
**Purpose:** Pre-surgery preparation timeline  
**Props:** `procedure, site, date, preferences, onComplete`  
**Dependencies:** PhaseRail, StepPanel, CompassLogo  
**State:** Phase progression  
**Export Notes:** Complex multi-phase layout

### 8. RecoveryScreen
**Path:** `/components/screens/RecoveryScreen.tsx`  
**Purpose:** Post-op recovery with day cards (dual mode)  
**Props:** `procedure, site, preferences, mode, surgeryDate, onComplete, onModeChange`  
**Dependencies:** RecoveryDayCard, ModeSwitcher, PhaseJumper, MoodSlider, CompassLogo  
**State:** Current day, mood, notes, mode  
**Export Notes:** **CRITICAL** – Most complex screen, dual navigation logic

### 9. FeedbackScreen
**Path:** `/components/screens/FeedbackScreen.tsx`  
**Purpose:** User feedback collection  
**Props:** `onNext: () => void`  
**Dependencies:** Textarea, Checkbox  
**State:** Feedback text + rating  
**Export Notes:** Multi-input form

### 10. CompletionScreen
**Path:** `/components/screens/CompletionScreen.tsx`  
**Purpose:** Journey complete celebration  
**Props:** `onExport: () => void, onReset: () => void`  
**Dependencies:** GGOButton, CompassLogo  
**Animation:** Confetti or celebration visual  
**Export Notes:** Final screen with export options

### 11. ExportVariablesScreen
**Path:** `/components/screens/ExportVariablesScreen.tsx`  
**Purpose:** Export Figma variables + API data  
**Props:** `onBack: () => void`  
**Dependencies:** Card, GGOButton  
**State:** Export format selection  
**Export Notes:** JSON download functionality

### 12. MicrocopyStyleGuideScreen
**Path:** `/components/screens/MicrocopyStyleGuideScreen.tsx`  
**Purpose:** Browse all 18 text styles  
**Props:** `onBack: () => void`  
**Dependencies:** MicrocopyText, Card  
**State:** Tab selection (4 categories)  
**Export Notes:** Developer tool, optional for production

### 13. StyleGuideScreen
**Path:** `/components/screens/StyleGuideScreen.tsx`  
**Purpose:** Component showcase (dev tool)  
**Props:** `onBack: () => void`  
**Dependencies:** All GGO components  
**State:** Component selection  
**Export Notes:** Developer tool, optional for production

---

## 🧩 Custom Components (12 Components)

### 1. CompassLogo
**Path:** `/components/ggo/CompassLogo.tsx`  
**Purpose:** Animated compass with rotating needle  
**Props:** `size?: number, needleRotation?: number, className?: string`  
**Animation:** Needle rotates based on progress (45° to 85°)  
**SVG:** Custom SVG with gradient fills  
**Export Notes:** Ensure SVG exports correctly with gradients

### 2. CompassMicroProgress
**Path:** `/components/ggo/CompassMicroProgress.tsx`  
**Purpose:** Mini progress indicator for cards  
**Props:** `progress: number (0-100), variant?: 'teal' | 'gold' | 'navy'`  
**Size:** 24×24px  
**Export Notes:** Compact version of CompassLogo

### 3. FooterDisclaimer
**Path:** `/components/ggo/FooterDisclaimer.tsx`  
**Purpose:** Fixed footer with disclaimer text  
**Props:** None  
**Position:** Fixed bottom, full-width  
**Text:** "This guidance is educational. Always follow your clinician's advice."  
**Export Notes:** Fixed positioning with backdrop blur

### 4. GGOButton
**Path:** `/components/ggo/GGOButton.tsx`  
**Purpose:** Branded button component  
**Props:** `variant?: 'primary' | 'secondary' | 'outline', icon?, disabled?, children`  
**Styles:** 3 variants with hover/active states  
**Export Notes:** Ensure all variants export with correct colors

### 5. MicrocopyText
**Path:** `/components/ggo/MicrocopyText.tsx`  
**Purpose:** Apply Figma text styles via prop  
**Props:** `style: string (e.g., "tracking/header-morning"), as?: HTMLElement, children`  
**Styles:** 18 preset text styles  
**Export Notes:** Maps to Figma text style tokens

### 6. ModeSwitcher
**Path:** `/components/ggo/ModeSwitcher.tsx`  
**Purpose:** Toggle between Tracking and Exploring modes  
**Props:** `currentMode: 'tracking' | 'exploring', onModeChange: (mode) => void, disabled?`  
**State:** Dropdown open/closed, confirmation modal  
**Animation:** Dropdown slide + modal fade  
**Export Notes:** Complex dropdown + modal interaction

### 7. MoodSlider
**Path:** `/components/ggo/MoodSlider.tsx`  
**Purpose:** 1-10 mood tracking slider  
**Props:** `onMoodChange?: (mood: number) => void`  
**State:** Mood value (1-10)  
**Visual:** Emoji faces change based on mood  
**Export Notes:** Slider with emoji indicators

### 8. PatientNoteField
**Path:** `/components/ggo/PatientNoteField.tsx`  
**Purpose:** Private notes textarea  
**Props:** `value: string, onChange: (value: string) => void, placeholder?`  
**Features:** Auto-resize, character count, save indicator  
**Export Notes:** Textarea with enhanced features

### 9. PhaseJumper
**Path:** `/components/ggo/PhaseJumper.tsx`  
**Purpose:** Jump to recovery phase dropdown (Exploring mode only)  
**Props:** `currentDay: number, onDaySelect: (day: number) => void, totalDays: number`  
**State:** Dropdown open/closed  
**Phases:** 5 phases (Surgery Day, Early Recovery, Healing, Strengthening, Final)  
**Export Notes:** Conditional rendering based on mode

### 10. PhaseRail
**Path:** `/components/ggo/PhaseRail.tsx`  
**Purpose:** Timeline progress rail for pre-surgery  
**Props:** `currentPhase: number, phases: Phase[], onPhaseClick?: (index) => void`  
**Visual:** Connected dots with labels  
**Animation:** Active phase glows  
**Export Notes:** Complex SVG line + dot system

### 11. RecoveryDayCard
**Path:** `/components/ggo/RecoveryDayCard.tsx`  
**Purpose:** Daily recovery guidance card  
**Props:** `day: RecoveryDay, isToday: boolean, moodState: 'low'|'neutral'|'high', totalDays, showForecast?, theme?, largerText?, reducedMotion?`  
**Size:** 320×500px (approx)  
**Sections:** Normal experiences, forecast, red flags  
**Export Notes:** **CRITICAL** – Most complex card, multiple states

### 12. StepPanel
**Path:** `/components/ggo/StepPanel.tsx`  
**Purpose:** Individual timeline step panel  
**Props:** `step: TimelineStep, isActive: boolean, isComplete: boolean`  
**Visual:** Expandable panel with icon  
**Animation:** Expand/collapse  
**Export Notes:** Accordion-style interaction

---

## 🎨 UI Library Components (40+ from Shadcn)

### Essential Components (Used in App)

| Component | Path | Usage |
|-----------|------|-------|
| Button | `/components/ui/button.tsx` | All screens |
| Card | `/components/ui/card.tsx` | Procedure picker, exports |
| Input | `/components/ui/input.tsx` | Welcome, personalise |
| Textarea | `/components/ui/textarea.tsx` | Feedback, notes |
| Checkbox | `/components/ui/checkbox.tsx` | Personalise |
| RadioGroup | `/components/ui/radio-group.tsx` | Personalise |
| Select | `/components/ui/select.tsx` | Procedure picker |
| Calendar | `/components/ui/calendar.tsx` | Date input |
| Slider | `/components/ui/slider.tsx` | Mood slider |
| AlertDialog | `/components/ui/alert-dialog.tsx` | Mode switch confirmation |
| Dialog | `/components/ui/dialog.tsx` | Modals |
| Progress | `/components/ui/progress.tsx` | Progress bars |
| Separator | `/components/ui/separator.tsx` | Visual dividers |
| Badge | `/components/ui/badge.tsx` | Status indicators |
| Tooltip | `/components/ui/tooltip.tsx` | Helper text |

### Optional Components (Available, Not Required)

Accordion, Alert, AspectRatio, Avatar, Breadcrumb, Carousel, Chart, Collapsible, Command, ContextMenu, Drawer, DropdownMenu, Form, HoverCard, InputOTP, Label, Menubar, NavigationMenu, Pagination, Popover, Resizable, ScrollArea, Sheet, Sidebar, Skeleton, Sonner, Switch, Table, Tabs, ToggleGroup, Toggle

---

## 📊 Data Files (4 Files)

### 1. figmaVariables.ts
**Path:** `/data/figmaVariables.ts`  
**Purpose:** Variable structure definitions  
**Exports:** `FigmaVariable`, `variableCollections`, `generateFigmaJSON()`, `generateServerJSON()`  
**Usage:** Export Variables screen  
**Export Notes:** Complete variable architecture for Figma binding

### 2. microcopyStyles.ts
**Path:** `/data/microcopyStyles.ts`  
**Purpose:** Text style definitions (18 styles)  
**Exports:** `TextStyle`, `microcopyStyles`, `generateFigmaTextTokens()`, `encouragementMessages`, `weeklyMessages`  
**Usage:** MicrocopyText component, Style Guide screen  
**Export Notes:** Maps to Figma text styles exactly

### 3. recoveryData.ts
**Path:** `/data/recoveryData.ts`  
**Purpose:** 28-day recovery timelines for 2 procedures  
**Exports:** `RecoveryDay`, `getRecoveryTimeline(procedure)`  
**Data:** Circumcision (29 days), TURP (29 days)  
**Usage:** RecoveryScreen, RecoveryDayCard  
**Export Notes:** BAUS-compliant clinical data

### 4. variableStructure.json
**Path:** `/data/variableStructure.json`  
**Purpose:** Pre-exported Figma variables  
**Format:** Figma Tokens Studio JSON  
**Usage:** Direct import to Figma  
**Export Notes:** Static snapshot, regenerate from figmaVariables.ts for latest

---

## 🛠️ Utility Files (1 File)

### dateCalculations.ts
**Path:** `/utils/dateCalculations.ts`  
**Purpose:** Date math for tracking mode  
**Exports:** `calculateRecoveryDay()`, `formatRelativeDay()`, `getTimeBasedGreeting()`, `getPhaseFromDay()`, etc.  
**Usage:** RecoveryScreen, Timeline logic  
**Export Notes:** Pure functions, no side effects

---

## 🎨 Style Files (2 Files)

### 1. globals.css
**Path:** `/styles/globals.css`  
**Purpose:** Global styles + Tailwind setup  
**Contains:** Color tokens, typography base, Tailwind v4 config  
**Size:** ~200 lines  
**Export Notes:** Import in App.tsx root

### 2. microcopy.css
**Path:** `/styles/microcopy.css`  
**Purpose:** CSS classes for 18 text styles  
**Contains:** All microcopy styles as classes  
**Size:** ~280 lines  
**Export Notes:** Auto-imported via globals.css

---

## 📝 Documentation Files (7 Files)

### 1. ANIMA_EXPORT_GUIDE.md (This file)
Complete export instructions

### 2. DUAL_NAVIGATION_MODE_GUIDE.md
Tracking vs Exploring mode logic

### 3. FIGMA_COMPONENT_BINDING_GUIDE.md
Variable binding system

### 4. FIGMA_MICROCOPY_STYLES_GUIDE.md
Text styles specification (600+ lines)

### 5. FIGMA_VARIABLES_GUIDE.md
Data variable architecture

### 6. RECOVERY_COMPONENT_SUMMARY.md
Recovery system overview

### 7. VARIABLE_SYSTEM_README.md + MICROCOPY_QUICK_REFERENCE.md
Quick references

---

## 🔗 Dependency Graph

```
App.tsx
├── SplashScreen
│   └── CompassLogo
├── WelcomeScreen
│   └── GGOButton
├── PersonaliseScreen
│   ├── Checkbox (ui)
│   └── RadioGroup (ui)
├── ModeSelectScreen
│   ├── CompassLogo
│   └── GGOButton
├── ProcedurePickerScreen
│   ├── Card (ui)
│   └── Select (ui)
├── DateInputScreen
│   └── Calendar (ui)
├── TimelineScreen
│   ├── PhaseRail
│   ├── StepPanel
│   └── CompassLogo
├── RecoveryScreen ⭐ CRITICAL
│   ├── RecoveryDayCard ⭐
│   ├── ModeSwitcher
│   ├── PhaseJumper
│   ├── MoodSlider
│   ├── CompassLogo
│   ├── PatientNoteField
│   └── FooterDisclaimer
├── FeedbackScreen
│   └── Textarea (ui)
├── CompletionScreen
│   ├── GGOButton
│   └── CompassLogo
├── ExportVariablesScreen
│   └── Card (ui)
└── MicrocopyStyleGuideScreen
    └── MicrocopyText
```

---

## 🎯 Export Priority

### P0 – Critical (Must Export First)
1. CompassLogo – Used everywhere
2. RecoveryDayCard – Most complex
3. RecoveryScreen – Core functionality
4. ModeSwitcher – Key interaction
5. FooterDisclaimer – Always visible

### P1 – High Priority
6. GGOButton – Standard button
7. PhaseRail – Timeline visual
8. StepPanel – Timeline steps
9. MoodSlider – User input
10. PatientNoteField – User input

### P2 – Medium Priority
11. PhaseJumper – Exploring mode only
12. CompassMicroProgress – Optional enhancement
13. MicrocopyText – Style wrapper
14. All Screen components

### P3 – Optional (Dev Tools)
15. ExportVariablesScreen
16. MicrocopyStyleGuideScreen
17. StyleGuideScreen

---

## 📏 Component Sizes

| Component | Width | Height | Responsive |
|-----------|-------|--------|------------|
| CompassLogo | Variable (size prop) | Variable | Yes |
| RecoveryDayCard | 320px | ~500px | Fixed width |
| GGOButton | Auto | 48px min | Yes |
| PhaseRail | 100% | 120px | Yes |
| ModeSwitcher | 200px | 40px | Yes |
| FooterDisclaimer | 100vw | 60px | Fixed |
| Screen | 100vw | 100vh | Yes |

---

## 🎨 Color Usage Map

| Color | Token | Usage |
|-------|-------|-------|
| Navy #1E3A5B | `--ggo-navy` | Headers, primary text, Tracking icon |
| Teal #00BE92 | `--ggo-teal` | Actions, Exploring mode, progress |
| Gold #E5C07B | `--ggo-gold` | Milestones, encouragement, Tracking mode |
| Red #DC2626 | `--ggo-alert-red` | Warnings, red flags |
| Muted #64748B | `--ggo-text-muted` | Helper text, footers |
| Light #F4F6F8 | `--ggo-light` | Backgrounds |

---

## ✅ Export Validation Checklist

**Before Export:**
- [ ] All 13 screens render
- [ ] All 12 custom components work
- [ ] Text styles applied (18/18)
- [ ] Color tokens set in Figma
- [ ] Animations defined
- [ ] Responsive layouts tested
- [ ] Data variables bound

**After Export:**
- [ ] Code compiles
- [ ] No TypeScript errors
- [ ] All imports resolve
- [ ] Styles match design
- [ ] Animations work
- [ ] Mobile responsive
- [ ] Accessibility intact

---

**Total Components:** 13 screens + 12 custom + 40+ UI = 65+ components  
**Total Files:** ~80 files  
**Lines of Code:** ~15,000 LOC  
**Export Ready:** ✅ Yes

---

**Last Updated:** 31 October 2025  
**Version:** 2.0.0  
**Status:** 🟢 Ready for Anima Export
