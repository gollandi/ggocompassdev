/**
 * User Preferences System
 * Handles pronoun, tone, and accessibility preferences with localStorage persistence
 */

export type Pronoun = "he" | "she" | "they";
export type PronounStorage = "he" | "she" | "they" | "unspecified";
export type Tone = "warm" | "pro" | "concise";
export type Verbosity = "concise" | "explanatory";

export interface AccessibilityPreferences {
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
}

export interface UserPreferences {
  pronoun: Pronoun;
  tone: Tone;
  accessibility: AccessibilityPreferences;
}

// Storage keys
const KEYS = {
  pronoun: "ggo_pronoun",
  tone: "ggo_tone",
  a11yHighContrast: "ggo_a11yHighContrast",
  a11yReducedMotion: "ggo_a11yReducedMotion",
  a11yLargeText: "ggo_a11yLargeText",
};

/**
 * Resolve pronoun storage value to runtime pronoun
 * Treats "unspecified" as "they" for copy selection
 */
export function resolvePronoun(p: PronounStorage | null): Pronoun {
  if (p === "he" || p === "she") return p;
  return "they";
}

/**
 * Convert tone to verbosity level for content selection
 */
export function toneToVerbosity(tone: Tone): Verbosity {
  return tone === "concise" ? "concise" : "explanatory";
}

/**
 * Determine if encouragement lines should be shown
 */
export function showEncouragement(tone: Tone): boolean {
  return tone === "warm";
}

/**
 * Load preferences from localStorage
 */
export function loadPreferences(): UserPreferences {
  const storedPronoun = localStorage.getItem(KEYS.pronoun) as PronounStorage | null;
  const storedTone = localStorage.getItem(KEYS.tone) as Tone | null;

  return {
    pronoun: resolvePronoun(storedPronoun),
    tone: storedTone || "warm",
    accessibility: {
      highContrast: localStorage.getItem(KEYS.a11yHighContrast) === "true",
      reducedMotion: localStorage.getItem(KEYS.a11yReducedMotion) === "true",
      largeText: localStorage.getItem(KEYS.a11yLargeText) === "true",
    },
  };
}

/**
 * Save pronoun preference
 */
export function savePronoun(value: PronounStorage): Pronoun {
  const resolved = resolvePronoun(value);
  localStorage.setItem(KEYS.pronoun, value);
  return resolved;
}

/**
 * Save tone preference
 */
export function saveTone(tone: Tone): void {
  localStorage.setItem(KEYS.tone, tone);
}

/**
 * Save accessibility preferences
 */
export function saveAccessibility(a11y: Partial<AccessibilityPreferences>): void {
  if (a11y.highContrast !== undefined) {
    localStorage.setItem(KEYS.a11yHighContrast, String(a11y.highContrast));
  }
  if (a11y.reducedMotion !== undefined) {
    localStorage.setItem(KEYS.a11yReducedMotion, String(a11y.reducedMotion));
  }
  if (a11y.largeText !== undefined) {
    localStorage.setItem(KEYS.a11yLargeText, String(a11y.largeText));
  }
}

/**
 * Apply accessibility classes to document element
 */
export function applyAccessibilityClasses(a11y: AccessibilityPreferences): void {
  document.documentElement.classList.toggle("hc", a11y.highContrast);
  document.documentElement.classList.toggle("rm", a11y.reducedMotion);
  document.documentElement.classList.toggle("lg", a11y.largeText);
}

/**
 * Map UI display values to storage values
 */
export function mapPronounToStorage(display: string): PronounStorage {
  const map: Record<string, PronounStorage> = {
    "He/Him": "he",
    "She/Her": "she",
    "They/Them": "they",
    "Prefer not to say": "unspecified",
  };
  return map[display] || "unspecified";
}

export function mapToneToStorage(display: string): Tone {
  const map: Record<string, Tone> = {
    "Warm & Friendly": "warm",
    "Professional": "pro",
    "Concise": "concise",
  };
  return map[display] || "warm";
}

export function mapAccessibilityToStorage(display: string): keyof AccessibilityPreferences {
  const map: Record<string, keyof AccessibilityPreferences> = {
    "High Contrast": "highContrast",
    "Reduced Motion": "reducedMotion",
    "Larger Text": "largeText",
  };
  return map[display] || "highContrast";
}
