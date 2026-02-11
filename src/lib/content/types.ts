/**
 * Content Library Type Definitions
 * Defines the structure for hardcoded procedure content with tone and pronoun variations
 */

export type Tone = 'friendly' | 'formal' | 'neutral';
export type PronounStyle = 'you' | 'one' | 'they';

export interface ContentVariation {
    tone: Tone;
    pronoun: PronounStyle;
}

export interface PreOperativeContent {
    welcomeTitle: string;
    welcomeBody: string;
    procedureDescription: string;
    preparationInstructions: string[];
    faqs: Array<{
        question: string;
        answer: string;
    }>;
}

export interface RecoveryDayContent {
    dayNumber: number;
    phase: 'surgery' | 'early' | 'healing' | 'strengthening' | 'final';
    title: string;
    normalExperiences: string[];
    forecast?: string;
    activities: Array<{
        label: string;
        status: 'allowed' | 'caution' | 'avoid';
        icon: string;
    }>;
    redFlags?: string[];
    nurseNote?: string;
    whyThisHappens?: string;
}

export interface PostOperativeContent {
    recoveryIntroTitle: string;
    recoveryIntroBody: string;
    recoveryTimeline: RecoveryDayContent[];
    generalRedFlags: string[];
    activityRestrictions: {
        driving: string;
        work: string;
        exercise: string;
        sexualActivity: string;
    };
}

export interface ChecklistItem {
    key: string;
    text: string;
    category: 'medication' | 'wound-care' | 'activity' | 'monitoring';
}

export interface UIMicrocopy {
    checklistItems: ChecklistItem[];
    progressMessages: {
        dayComplete: string;
        weekComplete: string;
        halfwayPoint: string;
        almostDone: string;
    };
    completionTitle: string;
    completionBody: string;
}

export interface ProcedureContent {
    procedureId: string;
    procedureName: string;
    recoveryType: 'day-case' | 'overnight' | 'extended';
    totalRecoveryDays: number;
    preOperative: PreOperativeContent;
    postOperative: PostOperativeContent;
    uiMicrocopy: UIMicrocopy;
}

export interface ProcedureContentLibrary {
    [procedureId: string]: {
        [key: string]: ProcedureContent; // Key is "tone-pronoun" e.g., "friendly-you"
    };
}

/**
 * Helper type for content variation key
 */
export function getVariationKey(tone: Tone, pronoun: PronounStyle): string {
    return `${tone}-${pronoun}`;
}
