import { sanityClient, isSanityConfigured } from './client';

// Type definitions
export interface Location {
  _id: string;
  name: string;
  slug: { current: string };
  shortName?: string;
  logo?: {
    asset: { _ref: string; _type: string };
    alt?: string;
    attribution?: string;
  };
  address: {
    street: string;
    city: string;
    postcode: string;
    country?: string;
  };
  contacts: {
    main: {
      phone: string;
      email?: string;
      hours?: string;
    };
    booking?: {
      phone?: string;
      email?: string;
      hours?: string;
      onlineBookingUrl?: string;
    };
    ward?: {
      phone?: string;
      nurseStation?: string;
      hours?: string;
    };
    emergency?: {
      urgentLine?: string;
      outOfHours?: string;
      consultantSecretary?: string;
    };
  };
  services?: Array<{
    name: string;
    description?: string;
    contactPhone?: string;
    contactEmail?: string;
  }>;
  facilities?: {
    parking?: {
      available: boolean;
      cost?: string;
      instructions?: string;
    };
    publicTransport?: {
      nearestStation?: string;
      busRoutes?: string;
      walkingTime?: string;
    };
    accessibility?: string[];
  };
  website?: string;
  googleMapsUrl?: string;
  isActive: boolean;
  displayOrder?: number;
  specialInstructions?: string;
}

export interface Procedure {
  _id: string;
  name: string;
  slug: { current: string };
  sites?: string[]; // Legacy field
  availableLocations?: Location[];
  description?: string;
  totalRecoveryDays: number;
  category: string;
  isActive: boolean;
  displayOrder?: number;
  emergencyContacts?: {
    urgentLine?: string;
    consultantTeam?: string;
    specialistNurse?: string;
  };
  preOperativeInstructions?: string;
  postOperativeInstructions?: string;
  expectedOutcomes?: string;
  commonConcerns?: Array<{
    concern: string;
    response: string;
  }>;
}

export interface RecoveryDay {
  _id: string;
  dayNumber: number;
  procedure: { _ref: string };
  phase: string;
  phaseLabel?: string;
  title: string;
  normalExperiences?: any[];
  forecast?: any[];
  redFlags?: string[];
  activities?: Array<{
    icon: string;
    label: string;
    status: 'allowed' | 'caution' | 'avoid';
  }>;
  educationalVideo?: {
    url?: string;
    title?: string;
    thumbnail?: string;
    duration?: string;
  };
  exerciseVideos?: Array<{
    url?: string;
    title?: string;
    thumbnail?: string;
    duration?: string;
    description?: string;
  }>;
  nurseNote?: string;
  nurseName?: string;
  whyThisHappens?: string;
}

export interface TimelineStep {
  _id: string;
  procedure: { _ref: string };
  phase: string;
  timeframe: string;
  title: string;
  tasks?: string[];
  video?: {
    url?: string;
    title?: string;
    thumbnail?: string;
    duration?: string;
  };
  clinicalGuidance?: any[];
  order: number;
  isCompleted?: boolean;
}

export interface Microcopy {
  _id: string;
  key: string;
  context: string;
  text: string;
  tone?: string;
  style?: string;
  variants?: Array<{
    condition: string;
    text: string;
  }>;
}

// Helper for safe fetching with fallback
async function safeFetch<T>(query: string, params: Record<string, any> = {}, defaultValue: T): Promise<T> {
  if (!isSanityConfigured()) {
    return defaultValue;
  }

  try {
    const result = await sanityClient.fetch(query, params);
    return result || defaultValue;
  } catch (error) {
    console.warn('Sanity fetch failed, using fallback data:', error);
    return defaultValue;
  }
}

// Location queries
export async function getLocations(): Promise<Location[]> {
  const query = `*[_type == "ggoLocation" && isActive == true] | order(displayOrder asc, name asc) {
    _id,
    name,
    slug,
    shortName,
    logo,
    address,
    contacts,
    services,
    facilities,
    website,
    googleMapsUrl,
    isActive,
    displayOrder,
    specialInstructions
  }`;

  return safeFetch<Location[]>(query, {}, []);
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  const query = `*[_type == "ggoLocation" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    shortName,
    logo,
    address,
    contacts,
    services,
    facilities,
    website,
    googleMapsUrl,
    isActive,
    displayOrder,
    specialInstructions
  }`;

  return safeFetch<Location | null>(query, { slug }, null);
}

export async function getLocationById(id: string): Promise<Location | null> {
  const query = `*[_type == "ggoLocation" && _id == $id][0] {
    _id,
    name,
    slug,
    shortName,
    logo,
    address,
    contacts,
    services,
    facilities,
    website,
    googleMapsUrl,
    isActive,
    displayOrder,
    specialInstructions
  }`;

  return safeFetch<Location | null>(query, { id }, null);
}

// Query functions
export async function getProcedures(): Promise<Procedure[]> {
  const query = `*[_type == "ggoProcedure" && isActive == true] | order(displayOrder asc, name asc) {
    _id,
    name,
    slug,
    sites,
    "availableLocations": availableLocations[]-> {
      _id,
      name,
      slug,
      shortName,
      address,
      contacts,
      isActive
    },
    description,
    totalRecoveryDays,
    category,
    isActive,
    displayOrder,
    emergencyContacts,
    preOperativeInstructions,
    postOperativeInstructions,
    expectedOutcomes,
    commonConcerns
  }`;

  return safeFetch<Procedure[]>(query, {}, []);
}

export async function getProcedureBySlug(slug: string): Promise<Procedure | null> {
  const query = `*[_type == "ggoProcedure" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    sites,
    "availableLocations": availableLocations[]-> {
      _id,
      name,
      slug,
      shortName,
      address,
      contacts,
      services,
      facilities,
      website,
      googleMapsUrl,
      isActive,
      specialInstructions
    },
    description,
    totalRecoveryDays,
    category,
    isActive,
    displayOrder,
    emergencyContacts,
    preOperativeInstructions,
    postOperativeInstructions,
    expectedOutcomes,
    commonConcerns
  }`;

  return safeFetch<Procedure | null>(query, { slug }, null);
}

export async function getRecoveryDay(
  dayNumber: number,
  procedureId: string
): Promise<RecoveryDay | null> {
  const query = `*[_type == "ggoRecoveryDay" && dayNumber == $dayNumber && procedure._ref == $procedureId][0] {
    _id,
    dayNumber,
    procedure,
    phase,
    phaseLabel,
    title,
    normalExperiences,
    forecast,
    redFlags,
    activities,
    educationalVideo {
      url,
      title,
      thumbnail,
      duration
    },
    exerciseVideos[] {
      url,
      title,
      thumbnail,
      duration,
      description
    },
    nurseNote,
    nurseName,
    whyThisHappens
  }`;

  return safeFetch<RecoveryDay | null>(query, { dayNumber, procedureId }, null);
}

export async function getRecoveryDaysForProcedure(
  procedureId: string
): Promise<RecoveryDay[]> {
  const query = `*[_type == "ggoRecoveryDay" && procedure._ref == $procedureId] | order(dayNumber asc) {
    _id,
    dayNumber,
    procedure,
    phase,
    phaseLabel,
    title,
    normalExperiences,
    forecast,
    redFlags,
    activities,
    educationalVideo {
      url,
      title,
      thumbnail,
      duration
    },
    exerciseVideos[] {
      url,
      title,
      thumbnail,
      duration,
      description
    },
    nurseNote,
    nurseName,
    whyThisHappens
  }`;

  return safeFetch<RecoveryDay[]>(query, { procedureId }, []);
}

export async function getRecoveryDaysForProcedureSlug(
  procedureSlug: string
): Promise<RecoveryDay[]> {
  const query = `*[_type == "ggoRecoveryDay" && procedure->slug.current == $procedureSlug] | order(dayNumber asc) {
    _id,
    dayNumber,
    procedure,
    phase,
    phaseLabel,
    title,
    normalExperiences,
    forecast,
    redFlags,
    activities,
    educationalVideo {
      url,
      title,
      thumbnail,
      duration
    },
    exerciseVideos[] {
      url,
      title,
      thumbnail,
      duration,
      description
    },
    nurseNote,
    nurseName,
    whyThisHappens
  }`;

  return safeFetch<RecoveryDay[]>(query, { procedureSlug }, []);
}

export async function getTimelineSteps(procedureId: string): Promise<TimelineStep[]> {
  const query = `*[_type == "ggoTimelineStep" && procedure._ref == $procedureId] | order(order asc) {
    _id,
    procedure,
    phase,
    timeframe,
    title,
    tasks,
    video {
      url,
      title,
      thumbnail,
      duration
    },
    clinicalGuidance,
    order,
    isCompleted
  }`;

  return safeFetch<TimelineStep[]>(query, { procedureId }, []);
}

import { microcopyDefaults } from '../../data/microcopyDefaults';

export async function getMicrocopy(key: string): Promise<Microcopy | null> {
  const query = `*[_type == "ggoMicrocopy" && key == $key][0] {
    _id,
    key,
    context,
    text,
    tone,
    style,
    variants
  }`;

  return safeFetch<Microcopy | null>(query, { key }, null);
}

export async function getAllMicrocopy(): Promise<Microcopy[]> {
  const query = `*[_type == "ggoMicrocopy"] | order(context asc, key asc) {
    _id,
    key,
    context,
    text,
    tone,
    style,
    variants
  }`;

  return safeFetch<Microcopy[]>(query, {}, []);
}

/**
 * Get map of all microcopy items for efficient lookup
 */
export async function getMicrocopyMap(): Promise<Record<string, string>> {
  try {
    const items = await getAllMicrocopy();
    const map: Record<string, string> = { ...microcopyDefaults };

    items.forEach(item => {
      if (item.key && item.text) {
        map[item.key] = item.text;
      }
    });

    return map;
  } catch (error) {
    console.warn('getMicrocopyMap failed, using defaults:', error);
    return microcopyDefaults;
  }
}

// Helper function to get microcopy with fallback
export async function getMicrocopyText(
  key: string,
  fallback?: string
): Promise<string> {
  const microcopy = await getMicrocopy(key);
  return microcopy?.text || fallback || microcopyDefaults[key] || "";
}

export interface EmergencyContactDetails {
  procedure: {
    name: string;
    emergencyContacts?: Procedure["emergencyContacts"];
  };
  location: {
    name: string;
    contacts: Location["contacts"];
    address: Location["address"];
  };
  ukEmergencyNumbers: {
    emergency: string;
    medicalAdvice: string;
    description: string;
  };
}

// Utility function to get emergency contacts for a procedure at a specific location
export async function getEmergencyContacts(
  procedureSlug: string,
  locationSlug: string
): Promise<EmergencyContactDetails | null> {
  try {
    const procedure = await getProcedureBySlug(procedureSlug);
    const location = await getLocationBySlug(locationSlug);

    if (!procedure || !location) {
      return null;
    }

    return {
      procedure: {
        name: procedure.name,
        emergencyContacts: procedure.emergencyContacts,
      },
      location: {
        name: location.name,
        contacts: location.contacts,
        address: location.address,
      },
      ukEmergencyNumbers: {
        emergency: '999',
        medicalAdvice: '111',
        description: 'Call 999 for life-threatening emergencies, 111 for urgent medical advice',
      },
    };
  } catch (error) {
    console.warn('getEmergencyContacts failed:', error);
    return null;
  }
}

// Function to get procedures available at a specific location
export async function getProceduresAtLocation(locationSlug: string): Promise<Procedure[]> {
  const query = `*[_type == "ggoProcedure" && isActive == true && references(*[_type == "ggoLocation" && slug.current == $locationSlug]._id)] | order(displayOrder asc, name asc) {
    _id,
    name,
    slug,
    description,
    totalRecoveryDays,
    category,
    emergencyContacts
  }`;

  return safeFetch<Procedure[]>(query, { locationSlug }, []);
}
