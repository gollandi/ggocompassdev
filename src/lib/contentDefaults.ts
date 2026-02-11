import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

// Types
export interface ProcedureContent {
    _id: string;
    name: string;
    slug: { current: string };
    uiCustomization?: {
        welcomeTitle?: string;
        welcomeBody?: string;
        recoveryIntroTitle?: string;
        recoveryIntroBody?: string;
        completionTitle?: string;
        completionBody?: string;
        checklistOverrides?: Array<{ key: string; text: string }>;
    };
    recoveryType?: 'day-case' | 'overnight' | 'extended';
    videoGuide?: {
        title?: string;
        url?: string;
        thumbnail?: any;
        duration?: number;
    };
    availableLocations?: Array<any>; // Typed as generic for now, ideally Location type
    emergencyContacts?: {
        urgentLine?: string;
        consultantTeam?: string;
        specialistNurse?: string;
    };
}

// Fallback Constants (British English)
const FALLBACK_COPY: Record<string, string> = {
    welcomeTitle: "Welcome to your recovery",
    welcomeBody: "We're here to support you through every step of your recovery journey.",
    recoveryIntroTitle: "Your recovery plan",
    recoveryIntroBody: "Follow these daily steps to ensure the best possible outcome.",
    completionTitle: "Recovery complete",
    completionBody: "You have successfully completed your recovery plan. Well done.",

    // Generic Checklist Items
    meds_check: "Take your prescribed medication",
    wound_check: "Check your wound for any redness",
    rest_check: "Rest for at least 30 minutes",
    hydrate_check: "Drink a glass of water",
};

export async function getProcedureContent(slug: string): Promise<ProcedureContent | null> {
    const query = groq`*[_type == "ggoProcedure" && slug.current == $slug][0] {
    ...,
    availableLocations[]->,
    "uiCustomization": uiCustomization 
  }`;

    try {
        return await client.fetch(query, { slug });
    } catch (error) {
        console.error("Error fetching procedure content:", error);
        return null;
    }
}

/**
 * Graceful Fallback for UI Strings
 * Priority:
 * 1. Procedure-specific override (Sanity)
 * 2. Hardcoded British English Fallback (Code)
 */
export function getUIString(procedure: ProcedureContent | null, key: string): string {
    if (!procedure) return FALLBACK_COPY[key] || "";

    // 1. Check specific procedure override (Top Level UI keys)
    if (procedure.uiCustomization && (key in procedure.uiCustomization)) {
        // @ts-ignore - dynamic access to optional properties
        const val = procedure.uiCustomization[key];
        if (val) return val;
    }

    // 2. Check checklist overrides if key looks like a checklist key (simple heuristic or separate function)
    if (procedure.uiCustomization?.checklistOverrides) {
        const override = procedure.uiCustomization.checklistOverrides.find(o => o.key === key);
        if (override) return override.text;
    }

    // 3. Return generic fallback
    return FALLBACK_COPY[key] || "";
}

/**
 * Get Contact Info with Location Fallback
 * Returns procedure specific contact if available, otherwise location contact
 */
export function getContactInfo(procedure: ProcedureContent | null, locationId?: string) {
    // Logic to select contact based on location would go here
    // For now returning simple object
    const contacts = {
        urgent: procedure?.emergencyContacts?.urgentLine,
        nurse: procedure?.emergencyContacts?.specialistNurse
    };

    // logic to overlay location contacts if procedure ones are empty
    // ...

    return contacts;
}
