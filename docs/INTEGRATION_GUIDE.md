# GGO Compass Integration Guide

This guide provides step-by-step instructions for integrating the standalone GGO Compass Next.js app into your main website.

## Table of Contents

1. [Integration Approaches](#integration-approaches)
2. [Component-Level Integration](#component-level-integration)
3. [Route Integration](#route-integration)
4. [Sanity Schema Merge](#sanity-schema-merge)
5. [Content Migration](#content-migration)
6. [Styling Integration](#styling-integration)
7. [State Management](#state-management)
8. [Testing Integration](#testing-integration)

---

## Integration Approaches

### Option 1: Subdomain (Recommended for MVP)
**Best for**: Quick deployment, minimal integration work

```
https://compass.ggomed.co.uk
```

**Steps**:
1. Deploy standalone app to Vercel/Netlify
2. Configure DNS subdomain to point to deployment
3. Add main site navigation link
4. Share Sanity project ID between apps

**Pros**: 
- ✅ Fastest to deploy
- ✅ Independent scaling
- ✅ Isolated updates

**Cons**:
- ❌ Separate authentication
- ❌ Different URL structure

### Option 2: Route Prefix
**Best for**: Unified experience, shared authentication

```
https://ggomed.co.uk/compass/*
```

**Steps**:
1. Copy `/app/compass/` routes to main site
2. Merge components and schemas
3. Update navigation
4. Share state management

**Pros**:
- ✅ Single domain
- ✅ Shared auth/session
- ✅ Unified branding

**Cons**:
- ❌ Requires code merge
- ❌ Deployment coupling

### Option 3: iframe Embed
**Best for**: Quick prototype, minimal code changes

```html
<iframe src="https://compass.ggomed.co.uk" />
```

**Pros**:
- ✅ No code changes
- ✅ Fast implementation

**Cons**:
- ❌ SEO limitations
- ❌ Height/scrolling issues
- ❌ Poor mobile experience

---

## Component-Level Integration

### Step 1: Copy GGO Components

```bash
# From GGOCompass repo
cp -r src/components/ggo/* <main-site>/components/ggo/
```

**Components to copy** (all 12):
- `CompassLogo.tsx`
- `RecoveryDayCard.tsx`
- `ModeSwitcher.tsx`
- `PhaseRail.tsx`
- `PhaseJumper.tsx`
- `MoodSlider.tsx`
- `PatientNoteField.tsx`
- `FooterDisclaimer.tsx`
- `GGOButton.tsx`
- `MicrocopyText.tsx`
- `StepPanel.tsx`
- `CompassMicroProgress.tsx`

### Step 2: Copy Shadcn UI Components

```bash
# Copy if not already in main site
cp -r src/components/ui/* <main-site>/components/ui/
```

### Step 3: Update Import Paths

Replace all imports in GGO components:

```typescript
// Before
import { cn } from '@/lib/utils';

// After (if different path)
import { cn } from '@/lib/utils';  // Update if needed
```

### Step 4: Copy Assets

```bash
cp public/compass-logo.png <main-site>/public/assets/
```

Update image references:
```typescript
// In CompassLogo.tsx
src="/compass-logo.png"  →  src="/assets/compass-logo.png"
```

---

## Route Integration

### Step 1: Choose Integration Pattern

**Pattern A: Prefix all routes**
```
/ → /compass/
/welcome → /compass/welcome
/recovery/[day] → /compass/recovery/[day]
```

**Pattern B: Nest under patient portal**
```
/patient/compass/
/patient/compass/welcome
/patient/compass/recovery/[day]
```

### Step 2: Copy Route Files

```bash
# Copy all route pages
cp -r src/app/* <main-site>/app/compass/

# If using Pattern B
cp -r src/app/* <main-site>/app/patient/compass/
```

### Step 3: Update Navigation Links

In your main site navigation:

```typescript
// components/MainNav.tsx
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/compass', label: 'Recovery Compass' },  // Add this
  // ...
];
```

### Step 4: Add Breadcrumbs

```typescript
// In compass routes
<Breadcrumbs>
  <Link href="/">Home</Link>
  <Link href="/compass">Compass</Link>
  <span>Recovery Day {day}</span>
</Breadcrumbs>
```

---

## Sanity Schema Merge

### Step 1: Copy Schemas

```bash
cp -r sanity/schemas/* <main-site>/sanity/schemas/ggo-compass/
```

### Step 2: Register Schemas

In your main site's `sanity.config.ts`:

```typescript
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

// Import GGO Compass schemas
import { schemaTypes as ggoCompassSchemas } from './schemas/ggo-compass';

// Your existing schemas
import yourExistingSchemas from './schemas';

export default defineConfig({
  // ...
  schema: {
    types: [
      ...yourExistingSchemas,
      ...ggoCompassSchemas,  // Add GGO Compass schemas
    ],
  },
});
```

### Step 3: Namespace Conflicts

If you already have a `procedure` schema, rename GGO's:

```typescript
// In sanity/schemas/ggo-compass/procedure.ts
export default defineType({
  name: 'ggoProcedure',  // Already prefixed
  title: 'GGO Compass Procedure',
  // ...
});
```

### Step 4: Create Studio Structure

```typescript
// sanity.config.ts - Custom desk structure
import { StructureBuilder } from 'sanity/desk';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Your existing content
      S.listItem()
        .title('Pages')
        .child(/* ... */),
      
      // Add GGO Compass section
      S.listItem()
        .title('GGO Compass')
        .child(
          S.list()
            .title('GGO Compass')
            .items([
              S.documentTypeListItem('ggoProcedure').title('Procedures'),
              S.documentTypeListItem('ggoRecoveryDay').title('Recovery Days'),
              S.documentTypeListItem('ggoTimelineStep').title('Timeline Steps'),
              S.documentTypeListItem('ggoMicrocopy').title('Microcopy'),
            ])
        ),
    ]);
```

---

## Content Migration

### Step 1: Run Migration Script

```bash
# Set environment variables
export NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
export NEXT_PUBLIC_SANITY_DATASET="production"
export SANITY_API_TOKEN="your-write-token"

# Run migration
npx ts-node scripts/migrate-to-sanity.ts
```

### Step 2: Verify Data

1. Open Sanity Studio: `http://localhost:3000/studio`
2. Check "GGO Compass" section
3. Verify procedures created
4. Verify recovery days populated

### Step 3: Create Additional Content

Using Sanity Studio, add:
- Missing procedures
- Timeline steps for each procedure
- Microcopy variants (pronouns, tone)

---

## Styling Integration

### Step 1: Merge Tailwind Config

```typescript
// tailwind.config.ts in main site
import type { Config } from 'tailwindcss';

const config: Config = {
  // ...
  theme: {
    extend: {
      colors: {
        // Add GGO Compass tokens
        'ggo-navy': '#1E3A5B',
        'ggo-teal': '#00BE92',
        'ggo-gold': '#E5C07B',
        'ggo-cream': '#FEF3C7',
        'ggo-red': '#DC2626',
        
        // Your existing colors
        // ...
      },
    },
  },
};
```

### Step 2: Import Global Styles

```typescript
// app/layout.tsx
import './globals.css';
import './compass-styles.css';  // GGO Compass specific styles
```

Or merge into single `globals.css`:

```css
/* globals.css */

/* GGO Compass Styles */
.high-contrast {
  --background: 0 0% 100%;
  --foreground: 0 0% 0%;
}

.larger-text {
  font-size: 1.125em;
}

.reduced-motion *,
.reduced-motion *::before,
.reduced-motion *::after {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
```

### Step 3: Font Integration

Add Plus Jakarta Sans if not already in main site:

```typescript
// app/layout.tsx
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
});

export default function RootLayout({ children }) {
  return (
    <html className={plusJakartaSans.variable}>
      {/* ... */}
    </html>
  );
}
```

---

## State Management

### Option 1: SessionStorage (Current)

No changes needed - works independently.

### Option 2: Shared Context

```typescript
// contexts/UserContext.tsx (in main site)
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [compassData, setCompassData] = useState({
    procedure: null,
    surgeryDate: null,
    mode: 'exploring',
  });
  
  return (
    <UserContext.Provider value={{ user, compassData, setCompassData }}>
      {children}
    </UserContext.Provider>
  );
}
```

Use in Compass routes:

```typescript
// app/compass/page.tsx
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';

export default function CompassHome() {
  const { compassData, setCompassData } = useContext(UserContext);
  
  // Use shared state instead of sessionStorage
  const handleModeSelect = (mode) => {
    setCompassData({ ...compassData, mode });
    router.push('/compass/welcome');
  };
}
```

### Option 3: URL State

```typescript
// Share state via URL parameters
router.push('/compass/recovery/5?procedure=circumcision&date=2025-01-15');

// Read in component
const searchParams = useSearchParams();
const procedure = searchParams.get('procedure');
const date = searchParams.get('date');
```

---

## Testing Integration

### Step 1: Test Routes

```bash
# Visit all routes
http://localhost:3000/compass
http://localhost:3000/compass/welcome
http://localhost:3000/compass/personalise
http://localhost:3000/compass/procedure
http://localhost:3000/compass/date
http://localhost:3000/compass/timeline
http://localhost:3000/compass/recovery/0
http://localhost:3000/compass/feedback
http://localhost:3000/compass/completion
```

### Step 2: Test Navigation Flow

1. Start at splash screen
2. Select mode (Tracking/Exploring)
3. Set preferences (pronoun, tone, accessibility)
4. Choose procedure and site
5. Enter surgery date (if Tracking mode)
6. Review timeline
7. Navigate recovery days
8. Submit feedback
9. View completion

### Step 3: Test Mode Switching

1. Start in Exploring mode
2. Navigate to day 10
3. Switch to Tracking mode
4. Verify days locked/unlocked correctly
5. Switch back to Exploring
6. Verify all days accessible

### Step 4: Test Accessibility

- ✅ Keyboard navigation (Tab, Enter, Arrow keys)
- ✅ Screen reader (test with NVDA/JAWS)
- ✅ High contrast mode toggle
- ✅ Reduced motion preference
- ✅ Larger text option
- ✅ Color contrast ratios

### Step 5: Test Responsive

- ✅ Mobile (375px)
- ✅ Tablet (768px)
- ✅ Desktop (1920px)

---

## Troubleshooting

### Issue: Components not found

**Solution**: Check import paths match your main site structure

```typescript
// Update all @/ imports if alias is different
import { cn } from '@/lib/utils';  // Your alias
import { cn } from '~/lib/utils';  // Or your alias
```

### Issue: Styles not applying

**Solution**: Ensure Tailwind config includes GGO paths

```typescript
// tailwind.config.ts
content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './components/ggo/**/*.{js,ts,jsx,tsx,mdx}',  // Add this
],
```

### Issue: Sanity queries failing

**Solution**: Check project ID and dataset in environment variables

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

### Issue: Build errors

**Solution**: Install missing dependencies

```bash
npm install framer-motion date-fns --legacy-peer-deps
```

---

## Checklist

### Pre-Integration
- [ ] Review integration approach (subdomain vs route prefix)
- [ ] Backup main site codebase
- [ ] Set up Sanity project
- [ ] Create feature branch

### Component Integration
- [ ] Copy GGO components to main site
- [ ] Copy Shadcn UI components (if needed)
- [ ] Update import paths
- [ ] Copy assets (logo, etc.)
- [ ] Test component rendering

### Route Integration
- [ ] Copy route files
- [ ] Update route prefixes (if needed)
- [ ] Add navigation links
- [ ] Add breadcrumbs
- [ ] Test route access

### Sanity Integration
- [ ] Copy schemas
- [ ] Register in config
- [ ] Run migration script
- [ ] Verify data in Studio
- [ ] Add custom desk structure

### Styling
- [ ] Merge Tailwind config
- [ ] Import global styles
- [ ] Add font imports
- [ ] Test responsive design
- [ ] Test accessibility modes

### Testing
- [ ] Test all routes
- [ ] Test navigation flow
- [ ] Test mode switching
- [ ] Test accessibility
- [ ] Test responsive breakpoints
- [ ] Cross-browser testing

### Deployment
- [ ] Update environment variables
- [ ] Build production bundle
- [ ] Deploy to staging
- [ ] User acceptance testing
- [ ] Deploy to production
- [ ] Monitor for errors

---

## Support

**Questions?** Contact the GGO Med Product Team

- Email: product@ggomed.co.uk
- Version: 0.2.0
- Last Updated: November 2025

---

**Integration Time Estimates**:
- Subdomain: 1-2 hours
- Route Prefix: 4-8 hours
- Full Integration: 1-2 days
