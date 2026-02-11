# Sanity Migration Guide

## Overview
This migration moves location and procedure data from hard-coded app data to Sanity CMS for better flexibility and management.

## New Schemas Added

### 1. Location Schema (`ggoLocation`)
- **Purpose**: Store hospital/clinic location data with comprehensive contact information
- **Features**: 
  - Complete address information
  - Multiple contact types (main, booking, ward, emergency)
  - Services and facilities information
  - Emergency contact details with UK numbers (111, 999)

### 2. Enhanced Procedure Schema (`ggoProcedure`)
- **New fields**:
  - `availableLocations`: References to location documents
  - `category`: Procedure categorization
  - `emergencyContacts`: Procedure-specific contacts
  - `isActive`: Enable/disable procedures
  - `displayOrder`: Custom ordering
  - Pre/post-operative instructions
  - Common patient concerns

## Migration Steps

### 1. Create Location Documents in Sanity

Example for London Bridge Hospital:
```json
{
  "name": "London Bridge Hospital",
  "slug": "london-bridge-hospital",
  "shortName": "LBH",
  "address": {
    "street": "27 Tooley Street",
    "city": "London",
    "postcode": "SE1 2PR",
    "country": "United Kingdom"
  },
  "contacts": {
    "main": {
      "phone": "020 7407 3100",
      "email": "info@londenbridgehospital.com",
      "hours": "Mon-Fri 8:00-18:00"
    },
    "booking": {
      "phone": "020 7407 3200",
      "email": "bookings@londenbridgehospital.com",
      "hours": "Mon-Fri 8:00-17:00",
      "onlineBookingUrl": "https://booking.londenbridgehospital.com"
    },
    "ward": {
      "phone": "020 7407 3300",
      "nurseStation": "020 7407 3301",
      "hours": "24/7"
    },
    "emergency": {
      "urgentLine": "020 7407 3999",
      "outOfHours": "020 7407 3998",
      "consultantSecretary": "020 7407 3400"
    }
  },
  "services": [
    {
      "name": "Urology Department",
      "description": "Specialist urological procedures",
      "contactPhone": "020 7407 3500",
      "contactEmail": "urology@londenbridgehospital.com"
    }
  ],
  "facilities": {
    "parking": {
      "available": true,
      "cost": "£3/hour",
      "instructions": "Main car park on Tooley Street"
    },
    "publicTransport": {
      "nearestStation": "London Bridge",
      "busRoutes": "43, 141, 149, 521",
      "walkingTime": "5 minutes"
    },
    "accessibility": [
      "Wheelchair accessible",
      "Hearing loop available",
      "Large print information"
    ]
  },
  "isActive": true,
  "displayOrder": 1
}
```

### 2. Update Procedure Documents

Add location references and new fields:
```json
{
  "name": "TURP (Transurethral Resection of Prostate)",
  "slug": "turp",
  "availableLocations": [
    {"_ref": "london-bridge-hospital-id"},
    {"_ref": "manchester-clinic-id"}
  ],
  "category": "urology",
  "emergencyContacts": {
    "urgentLine": "020 7407 5100",
    "consultantTeam": "020 7407 5101",
    "specialistNurse": "020 7407 5102"
  },
  "isActive": true,
  "displayOrder": 1
}
```

### 3. Update App Components

The following components now support dynamic location/procedure data:
- `EmergencyContacts`: Shows UK emergency numbers (111, 999) + location-specific contacts
- `MoodSlider`: Includes emergency CTA with relevant contacts
- `RecoveryScreen`: Passes procedure/location slugs to components

## UK Emergency Numbers Integration

### Fixed Implementation
- **999**: Life-threatening emergencies
- **111**: Urgent medical advice (NHS)
- **Clinical teams**: Location/procedure-specific contacts

### Usage
```tsx
<EmergencyContacts 
  procedureSlug="turp"
  locationSlug="london-bridge-hospital"
  compact={true}
/>
```

## Benefits

1. **Flexibility**: Add new locations/procedures without code changes
2. **Accurate contacts**: Real-time emergency contact information
3. **UK compliance**: Proper NHS emergency numbers (111, 999)
4. **Rich data**: Comprehensive location details (parking, transport, accessibility)
5. **Emergency ready**: Quick access to relevant contacts during patient uncertainty

## Testing

1. Create location documents in Sanity Studio
2. Update procedure documents with location references
3. Test emergency contacts in mood slider (set mood to 1-3)
4. Verify UK emergency numbers display correctly
5. Test contact copying functionality

## Rollback Plan

If issues occur:
1. Revert to hard-coded data in app
2. Update `site` prop to use legacy string values
3. Remove Sanity queries from components
4. Keep emergency numbers fix (111/999)
