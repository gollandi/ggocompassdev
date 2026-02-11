import { Tone, PronounStyle, ProcedureContent } from './types';

/**
 * Transformation utilities for tone and pronoun variations
 * Converts base content (friendly-you) to other variations
 */

interface TransformRules {
    toneAdjustments: {
        contractions: boolean; // "you'll" vs "you will"
        informalWords: Map<string, string>; // "brilliant" -> "excellent"
        warmth: 'high' | 'medium' | 'low'; // affects phrases like "we're here to support"
    };
    pronounReplacements: Map<string, string>;
}

const TONE_RULES: Record<Tone, TransformRules['toneAdjustments']> = {
    friendly: {
        contractions: true,
        informalWords: new Map([
            // Friendly uses informal words as-is
        ]),
        warmth: 'high'
    },
    neutral: {
        contractions: false,
        informalWords: new Map([
            ["We're here to support you", "This guide will assist you"],
            ["You're doing brilliantly", "You are progressing well"],
            ["Well done", "Task completed"],
            ["brilliant", "excellent"],
            ["fantastic", "good"],
            ["nearly there", "approaching completion"]
        ]),
        warmth: 'medium'
    },
    formal: {
        contractions: false,
        informalWords: new Map([
            ["We're here to support you", "We provide comprehensive guidance"],
            ["You're doing brilliantly", "Your recovery is progressing satisfactorily"],
            ["Well done", "Completed"],
            ["brilliant", "excellent"],
            ["fantastic", "satisfactory"],
            ["nearly there", "approaching the conclusion"],
            ["got through", "completed"]
        ]),
        warmth: 'low'
    }
};

const PRONOUN_RULES: Record<PronounStyle, Map<string, string>> = {
    you: new Map([
        // Base case - no transformation needed
    ]),
    one: new Map([
        ["you", "one"],
        ["You", "One"],
        ["your", "one's"],
        ["Your", "One's"],
        ["you're", "one is"],
        ["You're", "One is"],
        ["you've", "one has"],
        ["You've", "One has"],
        ["you'll", "one will"],
        ["You'll", "One will"]
    ]),
    they: new Map([
        ["you", "they"],
        ["You", "They"],
        ["your", "their"],
        ["Your", "Their"],
        ["you're", "they are"],
        ["You're", "They are"],
        ["you've", "they have"],
        ["You've", "They have"],
        ["you'll", "they will"],
        ["You'll", "They will"]
    ])
};

/**
 * Transform text based on tone
 */
function transformToneInText(text: string, fromTone: Tone, toTone: Tone): string {
    if (fromTone === toTone) return text;

    let result = text;
    const rules = TONE_RULES[toTone];

    // Apply word replacements
    rules.informalWords.forEach((replacement, original) => {
        const regex = new RegExp(original, 'gi');
        result = result.replace(regex, replacement);
    });

    // Handle contractions
    if (!rules.contractions) {
        result = result
            .replace(/you're/gi, 'you are')
            .replace(/we're/gi, 'we are')
            .replace(/you'll/gi, 'you will')
            .replace(/you've/gi, 'you have')
            .replace(/don't/gi, 'do not')
            .replace(/doesn't/gi, 'does not')
            .replace(/won't/gi, 'will not')
            .replace(/can't/gi, 'cannot')
            .replace(/shouldn't/gi, 'should not')
            .replace(/isn't/gi, 'is not');
    }

    return result;
}

/**
 * Transform text based on pronoun style
 */
function transformPronounsInText(text: string, fromPronoun: PronounStyle, toPronoun: PronounStyle): string {
    if (fromPronoun === toPronoun) return text;

    let result = text;
    const replacements = PRONOUN_RULES[toPronoun];

    // Apply pronoun replacements
    // Sort by length (longest first) to avoid partial replacements
    const sortedReplacements = Array.from(replacements.entries())
        .sort((a, b) => b[0].length - a[0].length);

    for (const [original, replacement] of sortedReplacements) {
        // Use word boundary to avoid partial word replacements
        const regex = new RegExp(`\\b${original}\\b`, 'g');
        result = result.replace(regex, replacement);
    }

    return result;
}

/**
 * Deep clone and transform procedure content
 */
export function transformProcedureContent(
    baseContent: ProcedureContent,
    targetTone: Tone,
    targetPronoun: PronounStyle
): ProcedureContent {
    // Create a deep clone
    const cloned = JSON.parse(JSON.stringify(baseContent)) as ProcedureContent;

    // Transform all text fields recursively
    function transformObject(obj: any): any {
        if (typeof obj === 'string') {
            let transformed = transformToneInText(obj, 'friendly', targetTone);
            transformed = transformPronounsInText(transformed, 'you', targetPronoun);
            return transformed;
        }

        if (Array.isArray(obj)) {
            return obj.map(transformObject);
        }

        if (obj && typeof obj === 'object') {
            const result: any = {};
            for (const [key, value] of Object.entries(obj)) {
                result[key] = transformObject(value);
            }
            return result;
        }

        return obj;
    }

    return transformObject(cloned);
}

/**
 * Generate all variations of a procedure content
 */
export function generateAllVariations(
    baseProcedure: ProcedureContent
): Record<string, ProcedureContent> {
    const variations: Record<string, ProcedureContent> = {};

    const tones: Tone[] = ['friendly', 'neutral', 'formal'];
    const pronouns: PronounStyle[] = ['you', 'one', 'they'];

    for (const tone of tones) {
        for (const pronoun of pronouns) {
            const key = `${tone}-${pronoun}`;
            variations[key] = transformProcedureContent(baseProcedure, tone, pronoun);
        }
    }

    return variations;
}
