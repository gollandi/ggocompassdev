import type { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Notice — GGO Compass',
  description: 'How GGO Compass stores and protects your recovery data.',
};

/* TODO: Legal review required — verify compliance with UK GDPR */

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ggo-bg py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-ggo-teal/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-ggo-teal" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-ggo-navy">Privacy Notice</h1>
            <p className="text-sm text-ggo-slate">Last updated: March 2026</p>
          </div>
        </div>

        <div className="space-y-8 text-ggo-slate leading-relaxed">

          <section>
            <h2 className="font-heading text-lg font-semibold text-ggo-navy mb-3">Who we are</h2>
            <p>
              {/* TODO: Legal review required — confirm registered address and ICO registration number */}
              GGO Compass is operated by <strong className="text-ggo-navy">GGO Med Ltd</strong>, the
              practice of Mr Giangiacomo Ollandini, Consultant Urological Surgeon and Andrologist. We are
              registered in England and Wales.
            </p>
            <p className="mt-2">
              For data queries, contact us at:{' '}
              <a href="mailto:admin@ggomed.co.uk" className="text-ggo-teal underline underline-offset-2">
                admin@ggomed.co.uk
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-ggo-navy mb-3">What data we store</h2>
            <p>If you accept functional cookies, GGO Compass stores the following in your browser:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Your selected surgical procedure</li>
              <li>Your surgery date</li>
              <li>Your completed recovery milestones</li>
              <li>Your daily confidence ratings (mood tracking)</li>
              <li>Any notes you write for your follow-up appointment</li>
              <li>Your display name and pronoun preference</li>
              <li>Your communication tone preference</li>
            </ul>
            <p className="mt-3">
              Accessibility preferences (high contrast, reduced motion, large text) are stored without
              consent as they are strictly necessary for the app to function correctly for you.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-ggo-navy mb-3">How we store it</h2>
            <p>
              All data is stored exclusively in your browser&apos;s local storage.{' '}
              <strong className="text-ggo-navy">Your data never leaves your device.</strong> We have no
              server-side database. No data is transmitted to GGO Med Ltd or any third party.
            </p>
            <p className="mt-2">
              Data stored in your browser expires after 90 days from the date you give consent.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-ggo-navy mb-3">Why we collect it</h2>
            <p>
              To provide you with a personalised day-by-day recovery companion that tracks your progress,
              reminds you of milestones, and allows you to prepare notes for your follow-up appointment.
              Without consent, the app functions in stateless mode: you can still read all recovery content,
              but your progress will not be saved between sessions.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-ggo-navy mb-3">Your rights</h2>
            <p>Under UK GDPR, you have the right to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-ggo-navy">Access</strong> — your data is stored in your own browser;
                you can inspect it directly via your browser&apos;s developer tools.
              </li>
              <li>
                <strong className="text-ggo-navy">Erasure</strong> — use the &ldquo;Delete all my data&rdquo;
                option in Settings, or clear your browser&apos;s local storage.
              </li>
              <li>
                <strong className="text-ggo-navy">Withdraw consent</strong> — at any time via Settings. This
                immediately deletes all stored recovery data.
              </li>
              <li>
                <strong className="text-ggo-navy">Complain</strong> — you have the right to lodge a complaint
                with the Information Commissioner&apos;s Office (ICO) at{' '}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ggo-teal underline underline-offset-2"
                >
                  ico.org.uk
                </a>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-ggo-navy mb-3">Third parties</h2>
            <p>
              <strong className="text-ggo-navy">No data is shared with any third party.</strong> GGO
              Compass uses{' '}
              <a
                href="https://plausible.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ggo-teal underline underline-offset-2"
              >
                Plausible Analytics
              </a>{' '}
              for anonymous, cookieless usage statistics. Plausible does not use cookies, does not collect
              personal data, and does not track you across sites. No consent is required for Plausible.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-ggo-navy mb-3">Policy changes</h2>
            <p>
              {/* TODO: Legal review required — confirm re-consent mechanism */}
              If we make material changes to how we store or use your data, we will update the version
              number of this notice and prompt you to review and re-confirm your consent on your next visit.
            </p>
          </section>

          <div className="border-t border-ggo-border pt-6">
            <p className="text-sm text-ggo-slate">
              {/* TODO: Legal review required — verify compliance with UK GDPR and PECR */}
              This privacy notice has been drafted for UK GDPR and PECR compliance and requires review by a
              qualified data protection solicitor before publication.
            </p>
            <a
              href="/settings"
              className="inline-block mt-4 text-sm text-ggo-teal underline underline-offset-2 hover:text-ggo-teal-dark"
            >
              Manage your consent &rarr;
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
