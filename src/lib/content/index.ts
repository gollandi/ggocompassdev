import { ProcedureContent, Tone, PronounStyle, getVariationKey } from './types';
import { circumcisionFriendlyYou } from './procedures/circumcision';
import { frenuloplastyFriendlyYou } from './procedures/frenuloplasty';
import { varicoceleSingleFriendlyYou } from './procedures/varicocele-single';
import { varicoceleBilateralFriendlyYou } from './procedures/varicocele-bilateral';
import { teseFriendlyYou } from './procedures/tese';
import { flexibleCystoscopyFriendlyYou } from './procedures/flexible-cystoscopy';
import { rigidCystoscopyFriendlyYou } from './procedures/rigid-cystoscopy';
import { turpFriendlyYou } from './procedures/turp';
import { generateAllVariations } from './utils';
import { getProcedureContent as getSanityProcedureContent } from '../contentDefaults';

/**
 * CONTENT LIBRARY INDEX
 * 
 * This is the main entry point for retrieving procedure content with fallback logic:
 * 1. Try Sanity CMS (custom overrides)
 * 2. Fall back to hardcoded library (clinically accurate defaults)
 * 3. Fall back to generic defaults (basic UI strings)
 * 
 * Architecture: Sanity-first, hardcoded as graceful fallback
 */

// Generate all variations for each procedure
const circumcisionVariations = generateAllVariations(circumcisionFriendlyYou);
const frenuloplastyVariations = generateAllVariations(frenuloplastyFriendlyYou);
const varicoceleSingleVariations = generateAllVariations(varicoceleSingleFriendlyYou);
const varicoceleBilateralVariations = generateAllVariations(varicoceleBilateralFriendlyYou);
const teseVariations = generateAllVariations(teseFriendlyYou);
const flexibleCystoscopyVariations = generateAllVariations(flexibleCystoscopyFriendlyYou);
const rigidCystoscopyVariations = generateAllVariations(rigidCystoscopyFriendlyYou);
const turpVariations = generateAllVariations(turpFriendlyYou);

// Master content library - all 8 procedures with 9 variations each (3 tones × 3 pronouns)
const HARDCODED_LIBRARY: Record<string, Record<string, ProcedureContent>> = {
    'circumcision': circumcisionVariations,
    'frenuloplasty': frenuloplastyVariations,
    'varicocele-single': varicoceleSingleVariations,
    'varicocele-bilateral': varicoceleBilateralVariations,
    'tese': teseVariations,
    'flexible-cystoscopy': flexibleCystoscopyVariations,
    'rigid-cystoscopy-biopsy': rigidCystoscopyVariations,
    'turp': turpVariations,
};

/**
 * User preferences for content personalization
 */
export interface ContentPreferences {
    tone: Tone;
    pronoun: PronounStyle;
}

/**
 * Get procedure content with 3-tier fallback
 * 
 * @param procedureSlug - Procedure identifier (e.g., 'circumcision')
 * @param preferences - User's tone and pronoun preferences
 * @returns ProcedureContent or null if not found
 */
export async function getProcedureContentWithFallback(
    procedureSlug: string,
    preferences: ContentPreferences = { tone: 'friendly', pronoun: 'you' }
): Promise<ProcedureContent | null> {
    // TIER 1: Try Sanity CMS first
    try {
        const sanityContent = await getSanityProcedureContent(procedureSlug);
        if (sanityContent) {
            // TODO: Convert Sanity format to ProcedureContent format
            // For now, continue to fallback
        }
    } catch (error) {
        console.warn(`[Content] Sanity fetch failed for ${procedureSlug}:`, error);
    }

    // TIER 2: Use hardcoded library
    const procedureLibrary = HARDCODED_LIBRARY[procedureSlug];
    if (procedureLibrary) {
        const variationKey = getVariationKey(preferences.tone, preferences.pronoun);
        const content = procedureLibrary[variationKey];

        if (content) {
            return content;
        }
    }

    // TIER 3: No content available
    console.warn(`[Content] No content found for ${procedureSlug}`);
    return null;
}

/**
 * Get specific UI string with fallback
 * Simplified version for checklist items, progress messages, etc.
 */
export async function getUIString(
    procedureSlug: string,
    key: string,
    preferences: ContentPreferences = { tone: 'friendly', pronoun: 'you' }
): Promise<string> {
    const content = await getProcedureContentWithFallback(procedureSlug, preferences);

    if (!content) {
        return getGenericUIString(key);
    }

    // Navigate the content object to find the key
    // This is a simplified implementation - you might need more sophisticated key resolution
    const parts = key.split('.');
    let value: any = content;

    for (const part of parts) {
        value = value?.[part];
    }

    if (typeof value === 'string') {
        return value;
    }

    return getGenericUIString(key);
}

/**
 * Generic UI fallback strings (TIER 3)
 */
function getGenericUIString(key: string): string {
    const GENERIC_STRINGS: Record<string, string> = {
        'welcomeTitle': 'Welcome to your recovery',
        'welcomeBody': 'We are here to support you through every step of your recovery journey.',
        'recoveryIntroTitle': 'Your recovery plan',
        'recoveryIntroBody': 'Follow these daily steps to ensure the best possible outcome.',
        'completionTitle': 'Recovery complete',
        'completionBody': 'You have successfully completed your recovery plan.',
        'progressMessages.dayComplete': 'Well done completing today.',
        'progressMessages.weekComplete': 'Excellent progress this week.',
        'progressMessages.halfwayPoint': 'You are halfway through your recovery.',
        'progressMessages.almostDone': 'Nearly finished with your recovery plan.'
    };

    return GENERIC_STRINGS[key] || '';
}

/**
 * Get available procedures
 */
export function getAvailableProcedures(): string[] {
    return Object.keys(HARDCODED_LIBRARY);
}

/**
 * Check if a procedure has hardcoded content
 */
export function hasHardcodedContent(procedureSlug: string): boolean {
    return procedureSlug in HARDCODED_LIBRARY;
}
