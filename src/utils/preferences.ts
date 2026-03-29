/**
 * User Preferences System
 * Handles pronoun, tone, and accessibility preferences with localStorage persistence
 */
import { hasConsent } from '@/lib/consent';

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
  name: string;
  pronoun: Pronoun;
  tone: Tone;
  accessibility: AccessibilityPreferences;
}

// Storage keys
const KEYS = {
  name: "ggo_userName",
  pronoun: "ggo_pronoun",
  tone: "ggo_tone",
  a11yHighContrast: "ggo_a11yHighContrast",
  a11yReducedMotion: "ggo_a11yReducedMotion",
  a11yLargeText: "ggo_a11yLargeText",
  patientNote: "ggo_patientNote",
  surgeryDate: "ggo_surgeryDate",
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
    name: localStorage.getItem(KEYS.name) || "",
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
 * Save user display name
 */
export function saveUserName(name: string): void {
  if (!hasConsent()) return;
  localStorage.setItem(KEYS.name, name);
}

/**
 * Load stored display name
 */
export function loadUserName(): string {
  return localStorage.getItem(KEYS.name) || "";
}

/**
 * Save pronoun preference
 */
export function savePronoun(value: PronounStorage): Pronoun {
  const resolved = resolvePronoun(value);
  if (hasConsent()) {
    localStorage.setItem(KEYS.pronoun, value);
  }
  return resolved;
}

/**
 * Save tone preference
 */
export function saveTone(tone: Tone): void {
  if (!hasConsent()) return;
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

/**
 * Load patient note from localStorage
 */
export function loadPatientNote(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(KEYS.patientNote) || "";
}

/**
 * Save patient note to localStorage
 */
export function savePatientNote(note: string): void {
  if (typeof window === "undefined") return;
  if (!hasConsent()) return;
  localStorage.setItem(KEYS.patientNote, note);
}

/**
 * Clear patient note from localStorage
 */
export function clearPatientNote(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS.patientNote);
}

/**
 * Surgery date persistence (YYYY-MM-DD)
 */
export function loadSurgeryDate(): string | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(KEYS.surgeryDate);
  return v && v.length >= 10 ? v.slice(0, 10) : null;
}

export function saveSurgeryDate(date: string | Date): void {
  if (typeof window === "undefined") return;
  if (!hasConsent()) return;
  const d = typeof date === "string" ? date.slice(0, 10) : new Date(date).toISOString().slice(0, 10);
  localStorage.setItem(KEYS.surgeryDate, d);
}

export function clearSurgeryDate(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS.surgeryDate);
}

/**
 * Mood tracking types and interfaces
 */
export interface MoodEntry {
  date: string; // YYYY-MM-DD format
  mood: number; // 1-10 scale
  day: number; // Recovery day number
}

const MOOD_STORAGE_KEY = "ggo_moodHistory";

/**
 * Load mood history from localStorage
 */
export function loadMoodHistory(): MoodEntry[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(MOOD_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

/**
 * Save mood entry to localStorage for today (backward-compatible helper)
 */
export function saveMoodEntry(mood: number, day: number): void {
  if (typeof window === "undefined") return;
  const today = new Date().toISOString().split('T')[0];
  saveMoodEntryForDate(mood, day, today);
}

/**
 * Internal: normalize a Date|string to YYYY-MM-DD (local timezone)
 */
function normalizeDateString(date: string | Date): string {
  if (typeof date === "string") return date.slice(0, 10);
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Save mood entry for an arbitrary date (keeps only last 30 days)
 */
export function saveMoodEntryForDate(mood: number, day: number, date: string | Date): void {
  if (typeof window === "undefined") return;
  if (!hasConsent()) return;
  const target = normalizeDateString(date);

  const history = loadMoodHistory();
  // Remove any existing entry for this date
  const filtered = history.filter(entry => entry.date !== target);

  const newEntry: MoodEntry = { date: target, mood, day };
  filtered.push(newEntry);

  // Keep only last 30 days relative to today
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setHours(0, 0, 0, 0);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const cutoff = normalizeDateString(thirtyDaysAgo);

  const recent = filtered.filter(entry => entry.date >= cutoff);
  localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(recent));
}

/**
 * Get today's mood entry
 */
export function getTodaysMood(): MoodEntry | null {
  const today = new Date().toISOString().split('T')[0];
  const history = loadMoodHistory();
  return history.find(entry => entry.date === today) || null;
}

/**
 * Get mood entry for a specific date
 */
export function getMoodForDate(date: string | Date): MoodEntry | null {
  const target = normalizeDateString(date);
  const history = loadMoodHistory();
  return history.find(entry => entry.date === target) || null;
}
