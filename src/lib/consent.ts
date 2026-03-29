/**
 * Consent state management for GGO Compass
 *
 * Records the patient's cookie/localStorage consent choice as a cookie.
 * The consent record itself is strictly necessary and does not require
 * prior consent to set.
 *
 * Note: We use document.cookie (not httpOnly) because this is a client-side
 * app. A future server-side upgrade should set this via a Next.js route handler
 * with httpOnly: true, secure: true, sameSite: 'strict'.
 */

const CONSENT_COOKIE = 'ggo-compass-consent';
const CONSENT_VERSION = '1.0';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 90; // 90 days

/** Keys that require functional consent to write */
export const FUNCTIONAL_STORAGE_KEYS = [
  'ggo_userName',
  'ggo_pronoun',
  'ggo_tone',
  'ggo_patientNote',
  'ggo_surgeryDate',
  'ggo_moodHistory',
  'ggo_local_procedure_name',
  'ggo_local_procedure_slug',
  'ggo_local_procedure_id',
  'ggo_local_site_name',
  'ggo_local_site_slug',
  'ggo_local_site_id',
] as const;

export interface ConsentState {
  functional: boolean;
  timestamp: string;
  version: string;
}

/**
 * Read the current consent state from cookie.
 * Returns null if no consent choice has been recorded yet.
 */
export function getConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`)
  );
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1])) as ConsentState;
  } catch {
    return null;
  }
}

/**
 * Record the patient's consent choice.
 * Call with functional=true when they accept, functional=false when they decline.
 */
export function setConsent(functional: boolean): void {
  if (typeof document === 'undefined') return;
  const state: ConsentState = {
    functional,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  const value = encodeURIComponent(JSON.stringify(state));
  const secure =
    typeof location !== 'undefined' && location.protocol === 'https:'
      ? '; secure'
      : '';
  document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${MAX_AGE_SECONDS}; path=/; samesite=strict${secure}`;
}

/**
 * Returns true only if the patient has explicitly accepted functional cookies.
 */
export function hasConsent(): boolean {
  return getConsent()?.functional === true;
}

/**
 * Returns true if the patient has made any choice (accept or decline).
 * Used to decide whether to show the consent banner.
 */
export function hasChoicBeenMade(): boolean {
  return getConsent() !== null;
}

/**
 * Withdraw consent: clear the consent cookie and delete all functional data.
 * The app will revert to stateless mode on next load.
 */
export function withdrawConsent(): void {
  if (typeof document === 'undefined') return;

  // Expire the consent cookie
  document.cookie = `${CONSENT_COOKIE}=; max-age=0; path=/`;

  // Clear all functional localStorage keys
  FUNCTIONAL_STORAGE_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // localStorage unavailable — ignore
    }
  });

  // Clear session data
  try {
    sessionStorage.clear();
  } catch {
    // sessionStorage unavailable — ignore
  }
}
