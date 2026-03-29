Implement or audit the GDPR cookie consent flow for GGO Compass.

Usage: `/consent-flow audit` — Check current implementation
Usage: `/consent-flow implement` — Build the consent system
Usage: `/consent-flow privacy-notice` — Generate privacy notice content

## Context

Read CLAUDE.md section "Cookie Consent & GDPR" for the full specification.

GGO Compass stores recovery tracking data in browser cookies. Under UK GDPR and PECR, this requires:
- Explicit, informed consent before setting non-essential cookies
- Clear explanation of what data is stored and why
- Easy withdrawal of consent
- No dark patterns (pre-ticked boxes, confusing double negatives, "accept or leave")

## Audit Mode (`/consent-flow audit`)

### Check 1: Cookie Banner Implementation
- [ ] Banner appears on first visit
- [ ] Banner cannot be dismissed without making a choice
- [ ] Two clear options: "Accept Functional Cookies" / "Continue Without Cookies"
- [ ] No pre-selected option
- [ ] Banner does not use dark patterns (e.g., green for accept, grey for decline)
- [ ] Both buttons have equal visual weight
- [ ] Banner is accessible (keyboard navigable, screen reader compatible)
- [ ] Banner does not obscure critical content

### Check 2: Consent Recording
- [ ] Consent choice stored in `ggo-compass-consent` cookie
- [ ] Consent cookie is: httpOnly, secure, sameSite: strict
- [ ] Consent timestamp recorded
- [ ] Consent version recorded (for re-consent if policy changes)

### Check 3: Data Storage Compliance
- [ ] No functional cookies set before consent is given
- [ ] If consent declined: app works in stateless mode (no cookies except consent cookie itself)
- [ ] If consent given: only declared data is stored
- [ ] Cookie expiry set to 90 days maximum
- [ ] No data sent to third parties
- [ ] No tracking pixels or third-party scripts loaded without consent

### Check 4: Consent Withdrawal
- [ ] Settings page has clear "Withdraw Consent" option
- [ ] Withdrawing consent deletes all functional cookies
- [ ] App gracefully degrades to stateless mode
- [ ] Confirmation dialog before withdrawal ("This will reset your recovery progress")

### Check 5: Privacy Notice
- [ ] Accessible at `/privacy`
- [ ] Written in plain English
- [ ] Lists: what data, why, how long, how to delete
- [ ] Names the data controller (GGO Med Ltd)
- [ ] Provides contact details for data queries
- [ ] Last updated date

### Check 6: Third-Party Services
- [ ] Plausible analytics: confirm it's cookieless (no consent needed)
- [ ] Vercel Analytics: check if cookies are set (if so, needs consent)
- [ ] No Google Analytics, Facebook Pixel, or similar tracking
- [ ] No CDN or font services that set cookies

## Implement Mode (`/consent-flow implement`)

### Step 1: Cookie Consent Banner Component

Create `components/layout/CookieConsent.tsx` (Client Component):
- Full-width banner at bottom of viewport
- Clear copy explaining what cookies are used for
- Two buttons with equal styling (no dark patterns)
- Stores choice and dismisses
- Re-appears if consent cookie expires or is deleted

### Step 2: Consent State Management

Create `lib/consent.ts`:
```typescript
interface ConsentState {
  functional: boolean;
  timestamp: string;
  version: string; // e.g., '1.0'
}
export function getConsent(): ConsentState | null;
export function setConsent(functional: boolean): void;
export function withdrawConsent(): void;
export function hasConsent(): boolean;
```

### Step 3: Conditional Cookie Writing

Update `RecoveryContext` to check consent before writing:
```typescript
function persistState(state: RecoveryState) {
  if (!hasConsent()) return; // Don't persist without consent
  setCookie('ggo-compass-state', encrypt(state), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 90, // 90 days
  });
}
```

### Step 4: Privacy Notice Page

Create `app/privacy/page.tsx` with Sanity-sourced content.

### Step 5: Settings Integration

Add consent management to `app/settings/page.tsx`:
- Show current consent status
- "Withdraw Consent" button with confirmation dialog
- Show what data is currently stored
- "Delete All My Data" option (clears all cookies)

## Privacy Notice Mode (`/consent-flow privacy-notice`)

Generate the privacy notice content for `/privacy`. Must include:

1. **Who we are:** GGO Med Ltd, practice of Mr Giangiacomo Ollandini
2. **What data we collect:** Selected procedure, surgery date, completed milestones, preferences
3. **How we store it:** Browser cookies only, encrypted, never leaves the device
4. **Why we collect it:** To provide personalised recovery tracking
5. **How long we keep it:** 90 days from consent, or until manually deleted
6. **Your rights:** Access, deletion, withdrawal of consent, complaint to ICO
7. **Third parties:** None. No data shared with any third party.
8. **Analytics:** Plausible (cookieless, privacy-first, no personal data collected)
9. **Contact:** Practice email and address for data queries
10. **Changes:** How we'll notify of policy changes (re-consent required)

Mark all content with: `{/* TODO: Legal review required — verify compliance with UK GDPR */}`

Output as Sanity seed data: `data/content/privacy-notice.json`
