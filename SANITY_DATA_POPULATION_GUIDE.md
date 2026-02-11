# GGO Compass: Sanity Data Population Guide

## Overview
This guide helps you populate the Sanity CMS with location and procedure data for the GGO Compass app, replacing the hard-coded data with flexible, manageable content.

## Minimum vs Optional Content

| Content Type | Must Have (publish blockers) | Optional Enhancers |
| --- | --- | --- |
| **Locations (`ggoLocation`)** | Name, slug, full address (street, city, postcode), main contact phone | Site logos, booking/ward/emergency contact blocks (phone/email/hours), website, maps URL, facilities |
| **Procedures (`ggoProcedure`)** | Name, slug, total recovery days, at least one linked location, active flag | Description, emergency contacts, pre/post-op instructions, expected outcomes, FAQs |
| **Timeline Steps (`ggoTimelineStep`)** | Procedure reference, Compass phase (Book/Prepare/Attend/Recover/Review), timeframe label, title, ≥1 task, order number | Step video, clinical guidance rich text, “completed by default” flag |
| **Recovery Days (`ggoRecoveryDay`)** | Day number, procedure reference, phase, title, ≥1 normal experience block, ≥1 red flag, active status | Forecast blocks, activities grid, nurse note/name, "why this happens", educational + exercise videos, governance metadata |

> **Tip:** Leave video fields blank if no asset exists. The app hides the player entirely, so you never see an empty frame.

## 🏥 Setting Up Locations

### 1. Access Sanity Studio
1. Navigate to `/studio` in your app (e.g., `http://localhost:3000/studio`)
2. Sign in with your Sanity credentials
3. Go to the "GGO Location" section

### 2. Create Location Entries

> **Important:** The Compass timeline and recovery screens pull every phone/email directly from the `contacts` object. Keep the `main`, `booking`, and `emergency` numbers accurate for each site—users will see them exactly as entered.

#### Example: Chelsea Location
```
Name: Chelsea
Slug: chelsea
Short Name: Chelsea & Westminster
Full Address: 
  Street: 369 Fulham Road
  City: London
  Postal Code: SW10 9NH
  Country: UK

Main Contact:
  Phone: +44 20 3315 8000
  Email: info@chelseawestminster.nhs.uk

Ward Contact:
  Phone: +44 20 3315 8001
  Name: Urology Ward
  Extension: 8001

Emergency Contacts:
  Urgent Line: +44 20 3315 8002
  Emergency Instructions: "Call NHS 111 for urgent medical advice or 999 for life-threatening emergencies. For procedure-specific concerns, contact our urgent line."

Notes: Main GGO location with full surgical facilities
Active: ✓ (checked)
Display Order: 1
```

#### Example: Highgate Location
```
Name: Highgate
Slug: highgate
Short Name: Highgate Private Hospital
Full Address:
  Street: 17-19 View Road
  City: London
  Postal Code: N6 4DJ
  Country: UK

Main Contact:
  Phone: +44 20 8348 4300
  Email: enquiries@highgatehospital.co.uk

Ward Contact:
  Phone: +44 20 8348 4301
  Name: Day Surgery Unit
  Extension: 4301

Emergency Contacts:
  Urgent Line: +44 20 8348 4302
  Emergency Instructions: "Call NHS 111 for urgent medical advice or 999 for life-threatening emergencies. Contact our urgent line for procedure-related concerns."

Notes: Private facility with day surgery focus
Active: ✓ (checked)
Display Order: 2
```

## 🏥 Setting Up Procedures

### 1. Navigate to Procedures Section
In Sanity Studio, go to "GGO Procedure" section.

### 2. Create Procedure Entries

#### Example: Circumcision
```
Name: Circumcision
Slug: circumcision
Available Locations: [Reference to Chelsea, Reference to Highgate]

Description: Surgical removal of the foreskin for medical or personal reasons

Total Recovery Days: 14

Emergency Contacts:
  Urgent Line: +44 20 3315 9000
  Consultant Team: +44 20 3315 9001
  Specialist Nurse: +44 20 3315 9002

Pre-operative Instructions:
- Stop taking aspirin 7 days before surgery
- Fast from midnight before surgery
- Arrange transport home
- Have loose-fitting underwear ready

Post-operative Instructions:
- Keep the area dry for 48 hours
- Take prescribed pain medication as directed
- Wear loose-fitting underwear
- No heavy lifting for 2 weeks

Expected Outcomes:
Complete healing typically takes 2-3 weeks. Most patients return to normal activities within 1-2 weeks.

Common Concerns:
[
  {
    Concern: "Is swelling normal?"
    Response: "Yes, mild swelling is expected for the first week. Apply ice packs if recommended."
  },
  {
    Concern: "When can I shower?"
    Response: "You can shower after 48 hours, but keep the area dry with a plastic covering."
  }
]

Active: ✓ (checked)
Display Order: 1
```

#### Example: TURP
```
Name: TURP
Slug: turp
Available Locations: [Reference to Chelsea]

Description: Transurethral Resection of the Prostate - minimally invasive treatment for enlarged prostate

Total Recovery Days: 28

Emergency Contacts:
  Urgent Line: +44 20 3315 9003
  Consultant Team: +44 20 3315 9004
  Specialist Nurse: +44 20 3315 9005

Pre-operative Instructions:
- Stop blood-thinning medications as directed
- Complete pre-operative blood tests
- Arrange extended recovery time at home
- Ensure someone can assist you for first 3 days

Post-operative Instructions:
- Drink plenty of fluids
- Expect blood in urine initially
- No driving for 1 week
- No heavy lifting for 4 weeks

Expected Outcomes:
Improved urinary flow within 2-4 weeks. Full recovery takes 4-6 weeks.

Common Concerns:
[
  {
    Concern: "Blood in urine - is this normal?"
    Response: "Yes, light pink or red urine is normal for the first 1-2 weeks. Contact us if it's heavy bleeding."
  },
  {
    Concern: "When will urination improve?"
    Response: "You should notice improvement within 2-4 weeks as swelling reduces."
  }
]

Active: ✓ (checked)
Display Order: 5
```

## 📅 Setting Up Recovery Days

### 1. Navigate to Recovery Days Section
In Sanity Studio, go to "GGO Recovery Day" section.

### 2. Create Recovery Day Entries

#### Example: Circumcision Day 0
```
Day Number: 0
Procedure: [Reference to Circumcision]
Phase: surgery
Phase Label: Surgery Day
Title: Surgery Day

Normal Experiences:
Numbness and mild bleeding are normal after the operation. The dressing feels tight and secure.

Forecast:
The local anaesthetic will wear off this evening. Take pain relief as advised by your clinical team.

Red Flags:
- Bleeding that soaks through a pad
- Bleeding that won't stop with gentle pressure
- Severe pain not controlled by prescribed medication

Activities:
[
  {
    Icon: "Pill"
    Label: "Pain medication"
    Status: "allowed"
  },
  {
    Icon: "Shower"
    Label: "Showering"
    Status: "avoid"
  },
  {
    Icon: "Activity"
    Label: "Heavy lifting"
    Status: "avoid"
  }
]

Nurse Note: Keep the dressing dry and wear loose-fitting underwear. Rest with your feet slightly elevated when possible.

Nurse Name: Caroline

Why This Happens: Local anaesthetic numbs the area during surgery. As it wears off, some discomfort is expected — pain relief helps manage this transition.
```

#### Example: Circumcision Day 1
```
Day Number: 1
Procedure: [Reference to Circumcision]
Phase: early
Phase Label: First Morning
Title: First Morning

Normal Experiences:
Swelling and bruising around the tip or shaft are expected. Some discomfort when moving.

Forecast:
Discomfort should ease once you start moving about gently. The swelling may peak today.

Red Flags:
- Pain increasing sharply despite painkillers
- Signs of infection (excessive heat, pus)
- Inability to urinate

Activities:
[
  {
    Icon: "Activity"
    Label: "Short walks"
    Status: "allowed"
  },
  {
    Icon: "Pill"
    Label: "Regular pain relief"
    Status: "allowed"
  },
  {
    Icon: "Dumbbell"
    Label: "Exercise/sports"
    Status: "avoid"
  }
]

Nurse Note: Short bathroom walks are good. Gentle movement helps circulation while avoiding strain.

Nurse Name: Sarah

Why This Happens: Your body's inflammatory response brings healing cells to the area. This causes temporary swelling and bruising.
```

## 📋 Setting Up Timeline Steps

1. In Sanity Studio open **GGO Timeline Step**.
2. For each procedure, create the steps that match the Compass rail phases (Book → Prepare → Attend → Recover → Review).
3. **Do not publish** a step until it contains every “must have” field: procedure reference, phase, timeframe label, title, at least one task entry, and an order number so it sorts correctly.
4. Add optional content—short instructional video and rich-text clinical guidance—when available. Leave the video fields empty if you do not have media; the UI simply omits the player.

#### Example: Prepare Phase Step
```
Procedure: Circumcision
Phase: prepare
Timeframe: 7 days before surgery
Title: Confirm medications & fasting

Tasks:
- Stop aspirin/NSAIDs unless your consultant advised otherwise
- Confirm lift home and overnight support

Order: 2

Video:
  URL: https://vimeo.com/123456
  Title: Medication checklist
  Duration: 0:45

Clinical Guidance Blocks:
- Bring your medication list on the morning of surgery
- Take your usual morning tablets with a small sip of water unless told otherwise
```

Compass will automatically surface the latest content from the CMS, so keep the phases well-structured and up to date for every location that offers the procedure.

## 🧪 Testing Your Data

### 1. Test Procedure Selection
1. Go to `/procedure` in your app
2. Verify all locations appear correctly
3. Verify all procedures appear correctly
4. Test the search functionality
5. Ensure selection and navigation works

### 2. Test Recovery Content
1. Select a procedure and location
2. Navigate to recovery section
3. Verify recovery days load from Sanity
4. Check that nurse notes, red flags, and activities display correctly
5. Test mood slider with emergency contacts

### 3. Test Emergency Contacts
1. Use mood slider in "uncertain" range
2. Verify emergency contacts display correctly
3. Test copy-to-clipboard functionality
4. Verify UK emergency numbers (111, 999) appear

## 🔄 Migration Checklist

### Phase 1: Core Data
- [ ] Create all location entries (Chelsea, Highgate, others)
- [ ] Create all procedure entries with location references
- [ ] Test procedure picker functionality
- [ ] Verify emergency contacts display correctly

### Phase 2: Recovery Content
- [ ] Create recovery day entries for top 3 procedures
- [ ] Test recovery timeline loading
- [ ] Verify mood slider integration
- [ ] Test emergency contact integration

### Phase 3: Full Content
- [ ] Complete all recovery days for all procedures
- [ ] Add comprehensive nurse notes and guidance
- [ ] Test all user journeys
- [ ] Verify mobile responsiveness

### Phase 4: Validation
- [ ] Clinical team review of all content
- [ ] User testing with sample patients
- [ ] Performance testing with full data
- [ ] Final deployment preparation

## 🚨 Important Notes

1. **Backup**: Always backup existing data before major changes
2. **Gradual Migration**: Migrate procedures one at a time
3. **Testing**: Test each procedure thoroughly before moving to the next
4. **Fallbacks**: The app has fallback mechanisms if Sanity data is missing
5. **Emergency Info**: Double-check all emergency contact numbers
6. **Clinical Review**: Have clinical team review all medical content

## 📞 Support

If you encounter issues:
1. Check the console for error messages
2. Verify Sanity connection in development tools
3. Test with a simple procedure first
4. Contact development team with specific error details

---

**Next Steps**: After populating basic data, run the app in development mode and test all user journeys to ensure the Sanity integration works correctly.
