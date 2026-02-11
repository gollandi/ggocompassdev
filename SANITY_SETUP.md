# Sanity CMS Setup Guide

This guide walks you through setting up Sanity CMS for the GGO Compass application.

## Table of Contents

1. [Create Sanity Project](#create-sanity-project)
2. [Configure Environment Variables](#configure-environment-variables)
3. [Understanding Schemas](#understanding-schemas)
4. [Migrate Existing Data](#migrate-existing-data)
5. [Content Entry Guide](#content-entry-guide)
6. [Using Sanity Studio](#using-sanity-studio)
7. [Querying Content](#querying-content)

---

## Create Sanity Project

### Step 1: Sign Up for Sanity

1. Visit [sanity.io](https://www.sanity.io/)
2. Click "Get Started" or "Sign Up"
3. Create account (GitHub, Google, or email)

### Step 2: Create New Project

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Create new project (optional - can use existing)
sanity init
```

**Or create via Dashboard**:
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click "Create Project"
3. Enter project name: "GGO Compass"
4. Choose dataset: "production"
5. Note your Project ID (e.g., `abc123xyz`)

### Step 3: Get API Token

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Click "API" tab
4. Click "Add API Token"
5. Name: "GGO Compass - Write Token"
6. Permissions: "Editor"
7. Copy the token (you won't see it again!)

---

## Configure Environment Variables

### Step 1: Create `.env.local`

```bash
cp .env.example .env.local
```

### Step 2: Add Your Credentials

```env
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk_test_xxxxxxxxxxxx
```

**Variables Explained**:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your project ID from Sanity dashboard
- `NEXT_PUBLIC_SANITY_DATASET`: Dataset name (usually "production")
- `SANITY_API_TOKEN`: Write token for migrations (keep secret!)

### Step 3: Verify Configuration

```bash
npm run dev
```

Visit `http://localhost:3000/studio` - you should see Sanity Studio load.

---

## Understanding Schemas

GGO Compass uses 4 Sanity schemas:

### 1. GGO Procedure (`ggoProcedure`)

**Purpose**: Define surgical procedures and their basic information

**Fields**:
- `name` (string, required): Procedure name (e.g., "Circumcision")
- `slug` (slug, required): URL-friendly identifier (auto-generated)
- `sites` (array of strings): Available sites ["Chelsea", "Highgate"]
- `description` (text): Brief description
- `totalRecoveryDays` (number, required): Total days in timeline (0-365)

**Example**:
```json
{
  "name": "Circumcision",
  "slug": { "current": "circumcision" },
  "sites": ["Chelsea", "Highgate"],
  "description": "Adult circumcision for medical or personal reasons",
  "totalRecoveryDays": 28
}
```

### 2. GGO Recovery Day (`ggoRecoveryDay`)

**Purpose**: Daily recovery guidance for each procedure

**Fields**:
- `dayNumber` (number, required): Day in recovery (0-365)
- `procedure` (reference, required): Link to ggoProcedure
- `phase` (string, required): Recovery phase (surgery/early/healing/strengthening/final)
- `phaseLabel` (string): Custom label (e.g., "Week 1")
- `title` (string, required): Day title (e.g., "Surgery Day")
- `normalExperiences` (block array): What patients experience
- `forecast` (block array): What to expect next
- `redFlags` (array of strings): Warning signs
- `activities` (array of objects): Activity restrictions
- `nurseNote` (text): Personal note from nurse
- `nurseName` (string): Nurse's name
- `whyThisHappens` (text): Medical explanation

**Example**:
```json
{
  "dayNumber": 0,
  "procedure": { "_ref": "procedure-id-here" },
  "phase": "surgery",
  "phaseLabel": "Surgery Day",
  "title": "Surgery Day",
  "normalExperiences": [/* block content */],
  "redFlags": ["Bleeding that won't stop", "Severe pain"],
  "nurseNote": "Rest and elevate your feet",
  "nurseName": "Caroline"
}
```

### 3. GGO Timeline Step (`ggoTimelineStep`)

**Purpose**: Pre-surgery preparation tasks

**Fields**:
- `procedure` (reference, required): Link to ggoProcedure
- `phase` (string, required): Phase (pre-surgery/surgery/recovery)
- `timeframe` (string, required): When (e.g., "2 weeks before")
- `title` (string, required): Step title
- `tasks` (array of strings): List of tasks
- `order` (number, required): Display order
- `isCompleted` (boolean): Completed by default

**Example**:
```json
{
  "procedure": { "_ref": "procedure-id" },
  "phase": "pre-surgery",
  "timeframe": "2 weeks before",
  "title": "Initial Consultation",
  "tasks": [
    "Meet with surgeon",
    "Discuss procedure details",
    "Sign consent forms"
  ],
  "order": 1,
  "isCompleted": false
}
```

### 4. GGO Microcopy (`ggoMicrocopy`)

**Purpose**: UI text with tone and pronoun variants

**Fields**:
- `key` (string, required): Unique identifier (e.g., "welcome.greeting")
- `context` (string, required): Where used (e.g., "Welcome Screen")
- `text` (text, required): Default text content
- `tone` (string): Tone (formal/friendly/supportive)
- `style` (string): Figma text style name
- `variants` (array of objects): Alternative versions
  - `condition`: When to use (e.g., "pronoun:she")
  - `text`: Variant text

**Example**:
```json
{
  "key": "recovery.encouragement",
  "context": "Recovery Day Card",
  "text": "You're doing great! Keep up the good work.",
  "tone": "friendly",
  "variants": [
    {
      "condition": "tone:formal",
      "text": "Your progress is satisfactory. Continue following guidance."
    }
  ]
}
```

---

## Migrate Existing Data

### Step 1: Prepare Migration

Ensure environment variables are set:

```bash
export NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
export NEXT_PUBLIC_SANITY_DATASET=production
export SANITY_API_TOKEN=sk_test_xxxxxxxxxxxx
```

### Step 2: Run Migration Script

```bash
npx ts-node scripts/migrate-to-sanity.ts
```

**What it does**:
1. Reads existing data from `src/data/recoveryData.ts`
2. Creates procedure documents in Sanity
3. Creates recovery day documents for each procedure
4. Links recovery days to procedures via references

**Expected output**:
```
Starting migration to Sanity...

Step 1: Creating procedures...
✓ Created procedure: Circumcision (abc-123)
✓ Created procedure: TURP (def-456)

Created 2 procedures

Step 2: Creating recovery days...

Creating 29 days for Circumcision...
.............................
Creating 29 days for TURP...
.............................

✓ Migration complete!
  Procedures created: 2
  Recovery days created: 58

You can now view your content in Sanity Studio at /studio
```

### Step 3: Verify Migration

1. Visit `http://localhost:3000/studio`
2. Check "GGO Procedures" - should see 2 procedures
3. Check "GGO Recovery Days" - should see 58 days
4. Click a recovery day - verify all fields populated

---

## Content Entry Guide

### Adding a New Procedure

1. Open Sanity Studio: `http://localhost:3000/studio`
2. Click "GGO Procedures"
3. Click "+ Create" button
4. Fill in fields:
   - **Name**: "Varicocele Repair"
   - **Slug**: Click "Generate" (auto-creates from name)
   - **Sites**: Add "Chelsea", "Highgate"
   - **Description**: "Surgical repair of varicocele..."
   - **Total Recovery Days**: 21
5. Click "Publish"

### Adding Recovery Days

1. Click "GGO Recovery Days"
2. Click "+ Create"
3. Fill in fields:
   - **Day Number**: 0
   - **Procedure**: Select from dropdown
   - **Phase**: Choose from radio buttons
   - **Phase Label**: "Surgery Day"
   - **Title**: "Surgery Day"
   - **Normal Experiences**: Write rich text
   - **Forecast**: Write rich text
   - **Red Flags**: Add array items
     - Click "+", type warning, press Enter
     - Add 2-4 red flags per day
   - **Nurse Note**: Personal message
   - **Nurse Name**: "Caroline"
   - **Why This Happens**: Medical explanation
4. Click "Publish"

**Tip**: Create days 0-28 in sequence for best organization

### Adding Timeline Steps

1. Click "GGO Timeline Steps"
2. Click "+ Create"
3. Fill in:
   - **Procedure**: Select procedure
   - **Phase**: "pre-surgery"
   - **Timeframe**: "2 weeks before surgery"
   - **Title**: "Book Pre-Op Consultation"
   - **Tasks**: Add array items
     - "Call clinic to schedule"
     - "Bring medical history"
     - "List current medications"
   - **Order**: 1 (sequence number)
   - **Completed by Default**: false
4. Click "Publish"

**Tip**: Use order 1, 2, 3... for proper timeline sequencing

### Adding Microcopy

1. Click "GGO Microcopy"
2. Click "+ Create"
3. Fill in:
   - **Key**: "welcome.greeting"
   - **Context**: "Welcome Screen"
   - **Text**: "Welcome to GGO Compass"
   - **Tone**: Select "friendly"
   - **Text Style**: "Heading 1 / Bold"
   - **Variants**: Add alternatives
     - Condition: "tone:formal"
     - Text: "Welcome to the GGO Compass System"
4. Click "Publish"

---

## Using Sanity Studio

### Navigation

- **Left Sidebar**: Document types (Procedures, Recovery Days, etc.)
- **Center Panel**: Document list
- **Right Panel**: Document editor

### Keyboard Shortcuts

- `Cmd/Ctrl + S`: Save draft
- `Cmd/Ctrl + Shift + P`: Publish
- `Cmd/Ctrl + K`: Quick search
- `Cmd/Ctrl + Alt + R`: Refresh

### Document States

- **Draft**: Saved but not published (green dot)
- **Published**: Live content (no indicator)
- **Edited**: Published with unpublished changes (orange dot)

### Publishing Workflow

1. Create/edit document
2. Click "Save" (auto-saves anyway)
3. Click "Publish" to make live
4. Changes appear instantly in app

### Bulk Operations

**Duplicate Documents**:
1. Open document
2. Click "..." menu
3. Select "Duplicate"
4. Edit fields and publish

**Delete Documents**:
1. Open document
2. Click "..." menu
3. Select "Delete"
4. Confirm deletion

---

## Querying Content

### In Your Code

All queries are in `src/lib/sanity/queries.ts`:

```typescript
import { getProcedures, getRecoveryDay } from '@/lib/sanity/queries';

// Get all procedures
const procedures = await getProcedures();

// Get specific recovery day
const day5 = await getRecoveryDay(5, procedureId);

// Get timeline steps
const steps = await getTimelineSteps(procedureId);
```

### In Sanity Vision

1. Open Studio: `http://localhost:3000/studio`
2. Click "Vision" tab (plugin)
3. Write GROQ queries:

**Get all procedures**:
```groq
*[_type == "ggoProcedure"] {
  name,
  slug,
  totalRecoveryDays
}
```

**Get recovery days for Circumcision**:
```groq
*[_type == "ggoRecoveryDay" && procedure._ref == "circumcision-id"] | order(dayNumber asc)
```

**Get day 5 with procedure name**:
```groq
*[_type == "ggoRecoveryDay" && dayNumber == 5] {
  title,
  "procedureName": procedure->name,
  redFlags
}
```

---

## Best Practices

### Content Guidelines

✅ **DO**:
- Use clear, patient-friendly language
- Include 2-4 red flags per day
- Write nurse notes in first person
- Explain medical terms simply
- Keep descriptions concise (<100 words)

❌ **DON'T**:
- Use medical jargon without explanation
- Make absolute promises ("never", "always")
- Include diagnosis information
- Give specific medical advice

### Data Organization

- **Procedures**: One document per surgical procedure
- **Recovery Days**: 28-29 days per procedure (Day 0 = surgery)
- **Timeline Steps**: 5-10 steps per procedure
- **Microcopy**: Group by screen/context

### Naming Conventions

- **Procedures**: Formal name (e.g., "Circumcision", not "circ")
- **Slugs**: Lowercase, hyphenated (e.g., "circumcision")
- **Microcopy Keys**: Dot-separated (e.g., "welcome.greeting")
- **Phases**: Lowercase (e.g., "surgery", "early", "healing")

---

## Troubleshooting

### Issue: Studio won't load

**Check**:
1. Environment variables set correctly
2. Project ID is valid (no typos)
3. Dataset exists in Sanity dashboard
4. No network errors in browser console

### Issue: Can't save documents

**Check**:
1. API token has "Editor" permissions
2. Token is not expired
3. Dataset is not archived
4. Required fields are filled

### Issue: Migration fails

**Check**:
1. `SANITY_API_TOKEN` is set (with write permissions)
2. Token has correct permissions
3. No rate limiting (wait and retry)
4. Check error message for specific issue

### Issue: Queries return no data

**Check**:
1. Documents are published (not just drafted)
2. Reference IDs are correct
3. Query syntax is valid GROQ
4. Using correct dataset in queries

---

## Advanced Topics

### Custom Validation

Add to schema:

```typescript
defineField({
  name: 'dayNumber',
  type: 'number',
  validation: (Rule) => Rule.required().min(0).max(365)
    .custom((value, context) => {
      // Custom validation logic
      if (value < 0) return 'Day cannot be negative';
      return true;
    })
})
```

### Initial Values

```typescript
defineField({
  name: 'phase',
  type: 'string',
  initialValue: 'early',
  options: { list: [...] }
})
```

### Conditional Fields

```typescript
defineField({
  name: 'nurseName',
  type: 'string',
  hidden: ({ document }) => !document?.nurseNote
})
```

---

## Support

### Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Schema Types](https://www.sanity.io/docs/schema-types)

### Contact

- Email: product@ggomed.co.uk
- Sanity Support: support@sanity.io

---

**Estimated Setup Time**: 1-2 hours  
**Difficulty**: Intermediate  
**Prerequisites**: Node.js, npm, basic React/TypeScript knowledge

---

© 2025 GGO Med. All rights reserved.
