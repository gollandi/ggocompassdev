Implement or audit the GDPR/UK GDPR consent and privacy flow for GGO Compass.

## Context

GGO Compass stores the following personal data in `localStorage` on the patient's device:
- Display name (`ggo_userName`) — personal data
- Pronoun preference (`ggo_pronoun`) — personal data
- Surgery date (`ggo_surgeryDate`) — health-related data
- Procedure selection (`ggo_local_procedure_*`) — **special category health data** under UK GDPR
- Mood history (`ggo_moodHistory`) — **special category health data**
- Patient notes (`ggo_patientNote`) — free-text, potentially health data
- Accessibility preferences — not personal data

**Legal basis:** The patient is the data subject and the data controller of their own device. Data does not leave the device. No cookies used (localStorage only, so PECR cookie rules do not apply). Processing basis is likely **legitimate interests** or **vital interests** of the data subject, but explicit **informed consent** is best practice given special category health data is involved.

## Audit Checklist

When running `/consent-flow`:

1. **Privacy notice** — Is there a clear, plain-English statement that:
   - [ ] Data is stored on the device only
   - [ ] No data is sent to GGO Med servers
   - [ ] The patient can delete all data at any time
   - [ ] What data is stored and why

2. **Consent capture** — Is there an explicit acknowledgement before first data write?
   - [ ] PersonaliseScreen shows privacy notice before `saveUserName` / `savePronoun`
   - [ ] Patient must actively proceed (not pre-ticked)

3. **Data deletion** — Can the patient clear all stored data?
   - [ ] Settings or completion screen has a "Clear all my data" option
   - [ ] `clearAllLocalData()` function exists and clears ALL `ggo_*` keys

4. **Privacy policy link** — Is there a link to GGOMed's privacy policy?
   - [ ] Footer or onboarding screen links to `https://ggomed.co.uk/privacy-policy`

## Implementation: clearAllLocalData

If the function does not exist, create it in `src/utils/preferences.ts`:

```typescript
export function clearAllLocalData(): void {
  if (typeof window === 'undefined') return;
  const ggoKeys = Object.keys(localStorage).filter(k => k.startsWith('ggo'));
  ggoKeys.forEach(k => localStorage.removeItem(k));
}
```

## Implementation: Consent Banner

If a consent UI is needed, create `src/components/ggo/ConsentBanner.tsx`:
- Appears on first visit (check `localStorage.getItem('ggo_consentGiven')`)
- Plain-English summary of what's stored
- Single "I understand" CTA (not a cookie wall — data is device-local only)
- Link to privacy policy
- Sets `ggo_consentGiven = 'true'` on accept

## Notes

- This is NOT a standard cookie consent banner — no tracking or analytics cookies are used.
- The GDPR concern is the storage of special category health data (procedure type, mood scores).
- If analytics (e.g. Vercel Analytics, Google Analytics) is ever added, a proper cookie consent mechanism (e.g. CookieYes) MUST be added before deployment.
- Ask JJ to confirm the legal basis used in the GGOMed privacy policy before finalising copy.
