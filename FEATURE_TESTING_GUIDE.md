# GGO Compass: Feature Testing Guide

## Overview
This guide helps you test all the new Sanity CMS integration, mood tracking, emergency contacts, and patient notes features in the GGO Compass app.

## 🧪 Pre-Testing Setup

### 1. Environment Check
```bash
# Start the development server
npm run dev

# Open browser to http://localhost:3000
# Open browser developer tools (F12)
# Check console for any errors
```

### 2. Clear Browser Data
- Clear localStorage: `localStorage.clear()` in console
- Clear sessionStorage: `sessionStorage.clear()` in console
- Hard refresh the page (Ctrl/Cmd + Shift + R)

## 🎯 Feature Testing Checklist

### 1. Patient Notes (localStorage)

#### Test 1.1: Note Persistence
- [ ] Go to recovery page
- [ ] Enter text in patient notes field
- [ ] Navigate away and back to recovery page
- [ ] **Expected**: Note text should be preserved
- [ ] **Check console**: Should see `ggo_patientNote` in localStorage

#### Test 1.2: Note Updates
- [ ] Update existing note text
- [ ] Navigate away and back
- [ ] **Expected**: Updated text should be preserved
- [ ] **Verify**: `localStorage.getItem('ggo_patientNote')` returns correct text

#### Test 1.3: Cross-Session Persistence
- [ ] Close browser completely
- [ ] Reopen and navigate to recovery page
- [ ] **Expected**: Patient note should still be there

### 2. Mood Slider & Tracking

#### Test 2.1: Mood Slider Display
- [ ] Go to recovery page in tracking mode
- [ ] **Expected**: Mood slider should be visible
- [ ] **Expected**: Slider should have correct colors (red→yellow→green)
- [ ] Go to explore mode
- [ ] **Expected**: Mood slider should be hidden

#### Test 2.2: Emergency CTA Triggering
- [ ] In tracking mode, set mood to 0-30 range (uncertain)
- [ ] **Expected**: Emergency contacts should appear
- [ ] **Expected**: Should show UK numbers (111, 999)
- [ ] Set mood to 70-100 range (certain)
- [ ] **Expected**: Emergency contacts should be hidden

#### Test 2.3: Mood History Tracking
- [ ] Set mood multiple times over several days (simulate by changing date)
- [ ] **Expected**: Mood history should be saved in localStorage
- [ ] **Check**: `localStorage.getItem('ggo_moodHistory')` should contain entries
- [ ] **Expected**: 7-day average should be calculated correctly

### 3. Emergency Contacts Integration

#### Test 3.1: UK Emergency Numbers
- [ ] Trigger emergency CTA (mood slider in uncertain range)
- [ ] **Expected**: Should see NHS 111 for urgent medical advice
- [ ] **Expected**: Should see 999 for life-threatening emergencies
- [ ] **Expected**: Clear guidance on when to use each

#### Test 3.2: Copy-to-Clipboard Functionality
- [ ] Click copy button next to phone number
- [ ] **Expected**: Should see "Copied!" confirmation
- [ ] Paste in notes or another app
- [ ] **Expected**: Phone number should be copied correctly

#### Test 3.3: Location/Procedure Specific Contacts
- [ ] Select different procedures and locations
- [ ] Trigger emergency CTA
- [ ] **Expected**: Should show procedure/location specific contacts if available
- [ ] **Expected**: Should fall back to general UK numbers if specific contacts not available

### 4. Sanity CMS Integration

#### Test 4.1: Procedure Selection
- [ ] Go to `/procedure` page
- [ ] **Expected**: Should load procedures from Sanity (not hard-coded list)
- [ ] **Expected**: Should show loading state initially
- [ ] **Expected**: Should show fallback procedures if Sanity fails
- [ ] Test search functionality
- [ ] **Expected**: Search should filter procedures correctly

#### Test 4.2: Location Selection
- [ ] On procedure page, select hospital site
- [ ] **Expected**: Should load locations from Sanity
- [ ] **Expected**: Should show location details (short name, etc.)
- [ ] **Expected**: Should allow selection of any active location

#### Test 4.3: Recovery Data Loading
- [ ] Complete procedure selection
- [ ] Navigate to recovery timeline
- [ ] **Expected**: Should attempt to load recovery days from Sanity
- [ ] **Check console**: Should see Sanity query attempts
- [ ] **Expected**: Should show fallback content if Sanity data not available

### 5. UI/UX Testing

#### Test 5.1: Responsive Design
- [ ] Test on mobile viewport (375px width)
- [ ] Test on tablet viewport (768px width)
- [ ] Test on desktop viewport (1200px width)
- [ ] **Expected**: All features should work on all screen sizes
- [ ] **Expected**: Touch interactions should work on mobile

#### Test 5.2: Accessibility
- [ ] Navigate using only keyboard (Tab, Enter, Arrow keys)
- [ ] **Expected**: All interactive elements should be accessible
- [ ] **Expected**: Emergency contacts should be clearly announced by screen readers
- [ ] Test with high contrast mode
- [ ] **Expected**: All text should remain readable

#### Test 5.3: Performance
- [ ] Check loading times for each page
- [ ] **Expected**: Initial page load < 3 seconds
- [ ] **Expected**: Navigation between pages < 1 second
- [ ] **Expected**: Sanity queries should not block UI

## 🚨 Error Testing

### 1. Network Failures
- [ ] Disconnect internet and test app
- [ ] **Expected**: Should show appropriate error messages
- [ ] **Expected**: Should fall back to cached or default data
- [ ] **Expected**: Patient notes should still work (localStorage)

### 2. Sanity Service Failures
- [ ] Block Sanity requests in developer tools
- [ ] **Expected**: Should fall back to default procedures/locations
- [ ] **Expected**: App should remain functional
- [ ] **Expected**: Should show user-friendly error messages

### 3. Browser Compatibility
- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)
- [ ] **Expected**: All features should work consistently

## 📊 Testing Data

### Sample Test Scenarios

#### Scenario 1: First-time User
1. Visit app for first time
2. Go through personalisation flow
3. Select procedure and location
4. Use tracking mode
5. Add patient notes
6. Test mood slider

#### Scenario 2: Returning User
1. Return to app with existing data
2. Check patient notes preserved
3. Check mood history preserved
4. Try different procedures
5. Test emergency contacts

#### Scenario 3: Emergency Situation
1. Set mood to uncertain range
2. Verify emergency contacts appear
3. Test copy-to-clipboard for phone numbers
4. Verify UK-specific emergency guidance

## 🔍 Console Monitoring

### Key Things to Watch For
- No JavaScript errors
- Sanity query success/failure logs
- localStorage operations
- Network request status
- Performance warnings

### Expected Console Messages
```
✅ Patient note saved: [timestamp]
✅ Mood entry saved: [timestamp]
✅ Procedures loaded from Sanity: [count]
✅ Locations loaded from Sanity: [count]
⚠️ No recovery days found for procedure: [slug]
❌ Error fetching data: [error details]
```

## 📝 Bug Reporting Template

When reporting bugs, include:

```
**Bug Description**: 
**Steps to Reproduce**: 
1. 
2. 
3. 

**Expected Behavior**: 
**Actual Behavior**: 
**Browser**: 
**Screen Size**: 
**Console Errors**: 
**Screenshots**: 
```

## ✅ Sign-off Checklist

Before considering testing complete:

### Core Functionality
- [ ] Patient notes save and persist correctly
- [ ] Mood tracking works in tracking mode only
- [ ] Emergency contacts appear when needed
- [ ] UK emergency numbers are correct
- [ ] Copy-to-clipboard works for all phone numbers

### Integration
- [ ] Sanity CMS loads procedures and locations
- [ ] Fallback mechanisms work when Sanity fails
- [ ] All error states are handled gracefully
- [ ] Performance is acceptable on all devices

### User Experience
- [ ] All interactions feel smooth and responsive
- [ ] Error messages are clear and helpful
- [ ] Loading states provide appropriate feedback
- [ ] Mobile experience is fully functional

### Clinical Accuracy
- [ ] All emergency contact numbers are verified
- [ ] Medical guidance is appropriate for UK context
- [ ] Procedure information matches clinical expectations
- [ ] Recovery timelines are realistic and helpful

---

**Final Step**: Have clinical team and real users test the app with this guide to identify any remaining issues before production deployment.
