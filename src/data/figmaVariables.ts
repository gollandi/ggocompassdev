import { procedureRecoveryData, ProcedureType } from "./recoveryData";

/**
 * Governance metadata for clinical content
 * Ensures PIF Tick compliance and audit trail
 */
export interface DatasetMetadata {
  source: string;
  lastReviewed: string;
  author: string;
  reviewer: string;
  version: string;
  readingLevel: string;
  fleschScore: number;
}

/**
 * Recovery day variables for Figma Tokens binding
 */
export interface RecoveryDayVariables {
  "today-text": string;
  "forecast-text": string;
  "redflag-text": string;
  "nurse-note-text"?: string;
  "nurse-name-text"?: string;
  "why-this-happens-text"?: string;
  "day-title-text": string;
}

/**
 * Procedure-specific metadata
 */
export const procedureMetadata: Record<string, DatasetMetadata> = {
  "circumcision": {
    source: "BAUS/NICE NG128 2024",
    lastReviewed: "2025-10-31",
    author: "GGO Med Clinical Team",
    reviewer: "FRCS Urol Governance Lead",
    version: "1.2.0",
    readingLevel: "Year 7 (UK)",
    fleschScore: 74,
  },
  "turp": {
    source: "BAUS 'After Your TURP' leaflet (2024) and NICE NG128",
    lastReviewed: "2025-10-31",
    author: "GGO Med Clinical Team",
    reviewer: "FRCS Urol Governance Lead",
    version: "1.0.0",
    readingLevel: "Year 7 (UK)",
    fleschScore: 74,
  },
  "varicocele-repair": {
    source: "BAUS/NICE Clinical Guidelines 2024",
    lastReviewed: "2025-10-31",
    author: "GGO Med Clinical Team",
    reviewer: "FRCS Urol Governance Lead",
    version: "1.0.0",
    readingLevel: "Year 7 (UK)",
    fleschScore: 72,
  },
  "generic": {
    source: "GGO Med Standard Recovery Protocol",
    lastReviewed: "2025-10-31",
    author: "GGO Med Clinical Team",
    reviewer: "FRCS Urol Governance Lead",
    version: "1.0.0",
    readingLevel: "Year 7 (UK)",
    fleschScore: 75,
  },
};

/**
 * Thematic colour and emotion variables
 * For context-aware UI binding in Figma
 */
export const emotionVariables = {
  "emotion-normal": "#00BE92", // --color-accent-teal
  "emotion-progress": "#E5C07B", // --color-highlight-gold
  "emotion-alert": "#DC2626", // --color-alert-red
  "emotion-calm-bg": "linear-gradient(180deg, #E6FDF8 0%, #FFFFFF 100%)",
  "emotion-reassurance-bg": "linear-gradient(135deg, #1E3A5B 0%, #00856D 100%)", // Navy to dark teal
  "emotion-milestone-bg": "linear-gradient(135deg, #C4941F 0%, #8B6914 100%)", // Gold gradient
};

/**
 * Component animation variables
 * Day-progress driven motion hooks
 */
export const animationVariables = {
  "compass-needle-rotation": (day: number) => 45 + (day / 28) * 40, // 45° to 85°
  "progress-bar-width": (day: number, totalDays: number = 28) => `${(day / totalDays) * 100}%`,
  "card-scale-milestone": 1.02,
  "transition-breathing": "cubic-bezier(0.4, 0, 0.2, 1)",
  "duration-fast": "0.2s",
  "duration-normal": "0.4s",
  "duration-slow": "0.6s",
};

/**
 * Convert recovery data to Figma Tokens JSON structure
 * Usage: Import into Figma via Tokens Studio plugin
 */
export function generateFigmaTokensJSON() {
  const tokens: any = {
    recovery: {},
    meta: {},
  };

  // Add all procedures
  Object.keys(procedureRecoveryData).forEach((procedure) => {
    const normalizedProcedure = procedure
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const recoveryDays = procedureRecoveryData[procedure as ProcedureType];
    
    tokens.recovery[normalizedProcedure] = {
      days: {},
    };

    // Add metadata
    tokens.meta[normalizedProcedure] = 
      procedureMetadata[normalizedProcedure] || procedureMetadata["generic"];

    // Convert each day to variable structure
    recoveryDays?.forEach((day) => {
      tokens.recovery[normalizedProcedure].days[day.day] = {
        "today-text": { value: day.reassurance, type: "string" },
        "forecast-text": { value: day.forecast, type: "string" },
        "redflag-text": { value: day.redFlags.join(" "), type: "string" },
        "day-title-text": { value: day.title, type: "string" },
        ...(day.nurseNote && {
          "nurse-note-text": { value: day.nurseNote, type: "string" },
        }),
        ...(day.nurseName && {
          "nurse-name-text": { value: day.nurseName, type: "string" },
        }),
        ...(day.whyThisHappens && {
          "why-this-happens-text": { value: day.whyThisHappens, type: "string" },
        }),
      };
    });
  });

  // Add emotion variables
  tokens.emotion = {};
  Object.entries(emotionVariables).forEach(([key, value]) => {
    tokens.emotion[key] = { value, type: "color" };
  });

  return tokens;
}

/**
 * Smart fallback logic for missing procedures or days
 * Ensures Compass always delivers calm, generic reassurance
 */
export function getRecoveryText(
  procedure: string,
  day: number
): RecoveryDayVariables | null {
  const normalizedProcedure = procedure as ProcedureType;
  
  // Try exact match
  const procedureData = procedureRecoveryData[normalizedProcedure];
  if (procedureData) {
    const dayData = procedureData.find((d) => d.day === day);
    if (dayData) {
      return {
        "today-text": dayData.reassurance,
        "forecast-text": dayData.forecast,
        "redflag-text": dayData.redFlags.join(" "),
        "day-title-text": dayData.title,
        "nurse-note-text": dayData.nurseNote,
        "nurse-name-text": dayData.nurseName,
        "why-this-happens-text": dayData.whyThisHappens,
      };
    }
  }

  // Fallback to generic if available
  const genericData = procedureRecoveryData["Other Procedure"];
  if (genericData) {
    const closestDay = genericData.reduce((prev, curr) =>
      Math.abs(curr.day - day) < Math.abs(prev.day - day) ? curr : prev
    );
    return {
      "today-text": closestDay.reassurance,
      "forecast-text": closestDay.forecast,
      "redflag-text": closestDay.redFlags.join(" "),
      "day-title-text": closestDay.title,
      "nurse-note-text": closestDay.nurseNote,
      "nurse-name-text": closestDay.nurseName,
    };
  }

  // Ultimate fallback
  return {
    "today-text": "You may feel mild soreness today.",
    "forecast-text": "Comfort improves daily.",
    "redflag-text": "Contact your care team if symptoms worsen or you have concerns.",
    "day-title-text": `Day ${day}`,
  };
}

/**
 * Get metadata for a specific procedure
 */
export function getProcedureMetadata(procedure: string): DatasetMetadata {
  const normalizedProcedure = procedure
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return procedureMetadata[normalizedProcedure] || procedureMetadata["generic"];
}

/**
 * Generate component variant configuration for Figma
 * Maps to variant properties in RecoveryDayCard component
 */
export interface ComponentVariantConfig {
  Procedure: ProcedureType[];
  Day: number[];
  Mood: ["Low", "Neutral", "High"];
  Theme: ["Light", "Dark", "High Contrast"];
  Forecast: ["True", "False"];
  Redflag: ["Expanded", "Collapsed"];
}

export const componentVariants: ComponentVariantConfig = {
  Procedure: [
    "Circumcision",
    "TURP",
    "Varicocele Repair",
    "Hydrocele Repair",
    "Frenuloplasty",
    "Preputioplasty",
    "Micro-TESE",
    "TESE",
    "TURBT",
    "Cystoscopy & Biopsy",
    "TP MRI Fusion Biopsy",
    "Penile Doppler Ultrasound",
    "Other Procedure",
  ],
  Day: Array.from({ length: 29 }, (_, i) => i), // 0-28
  Mood: ["Low", "Neutral", "High"],
  Theme: ["Light", "Dark", "High Contrast"],
  Forecast: ["True", "False"],
  Redflag: ["Expanded", "Collapsed"],
};

/**
 * Helper function to determine card background based on day milestone
 * Usage in Figma: when Day % 7 == 0 → emotion-progress, else emotion-calm-bg
 */
export function getCardBackground(day: number, isToday: boolean): string {
  if (isToday) {
    // Milestone days (7, 14, 21, 28) get gold gradient
    if (day > 0 && day % 7 === 0) {
      return emotionVariables["emotion-milestone-bg"];
    }
    // Regular "today" cards get navy-to-teal gradient
    return emotionVariables["emotion-reassurance-bg"];
  }
  // Future/past days get calm background
  return emotionVariables["emotion-calm-bg"];
}

/**
 * Export data for server-side integration (Prince/Carebit)
 * Returns clean JSON structure for API endpoints
 */
export function exportForServerAPI() {
  return {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    procedures: Object.keys(procedureRecoveryData).map((procedure) => {
      const normalizedProcedure = procedure
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      return {
        id: normalizedProcedure,
        name: procedure,
        metadata: getProcedureMetadata(normalizedProcedure),
        days: (procedureRecoveryData[procedure as ProcedureType] || []).map((day) => ({
          day: day.day,
          title: day.title,
          reassurance: day.reassurance,
          forecast: day.forecast,
          redFlags: day.redFlags,
          nurseNote: day.nurseNote || null,
          nurseName: day.nurseName || null,
          whyThisHappens: day.whyThisHappens || null,
        })),
      };
    }),
    emotionVariables,
    componentVariants,
  };
}

/**
 * Generate variable path for Figma binding
 * Example: "recovery-turp/day-07/today-text"
 */
export function getVariablePath(
  procedure: string,
  day: number,
  field: "today" | "forecast" | "redflag" | "nurse-note" | "day-title"
): string {
  const normalizedProcedure = procedure
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const dayString = day.toString().padStart(2, "0");
  return `recovery-${normalizedProcedure}/day-${dayString}/${field}-text`;
}
