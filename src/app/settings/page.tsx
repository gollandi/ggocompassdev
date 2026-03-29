'use client';

import { useEffect, useState } from 'react';
import { Shield, Trash2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { getConsent, withdrawConsent, setConsent, hasChoicBeenMade } from '@/lib/consent';
import type { ConsentState } from '@/lib/consent';

// Note: metadata export requires a Server Component — settings page is Client.
// Add metadata via generateMetadata in a wrapper if needed.

export default function SettingsPage() {
  const [consent, setConsentState] = useState<ConsentState | null>(null);
  const [choiceMade, setChoiceMade] = useState(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

  useEffect(() => {
    setConsentState(getConsent());
    setChoiceMade(hasChoicBeenMade());
  }, []);

  function handleWithdraw() {
    withdrawConsent();
    setConsentState(null);
    setChoiceMade(false);
    setShowWithdrawConfirm(false);
    setWithdrawn(true);
  }

  function handleReAccept() {
    setConsent(true);
    setConsentState(getConsent());
    setChoiceMade(true);
    setWithdrawn(false);
  }

  return (
    <main className="min-h-screen bg-ggo-bg py-12 px-4">
      <div className="max-w-xl mx-auto space-y-6">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-ggo-teal/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-ggo-teal" aria-hidden="true" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-ggo-navy">Privacy &amp; Data</h1>
        </div>

        {/* Consent status */}
        <section className="bg-ggo-surface border border-ggo-border rounded-xl p-6">
          <h2 className="font-heading text-base font-semibold text-ggo-navy mb-4">Consent status</h2>

          {withdrawn && (
            <div role="status" className="flex items-start gap-3 bg-ggo-amber-light border border-ggo-amber/30 rounded-lg p-4 mb-4">
              <AlertTriangle className="w-5 h-5 text-ggo-amber mt-0.5 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-ggo-navy">
                Consent withdrawn. All recovery data has been deleted. Your progress will not be saved
                this session.
              </p>
            </div>
          )}

          {!choiceMade && !withdrawn && (
            <div className="flex items-start gap-3 text-sm text-ggo-slate mb-4">
              <XCircle className="w-5 h-5 text-ggo-slate mt-0.5 flex-shrink-0" aria-hidden="true" />
              <p>You have not yet made a consent choice. Your data is not being saved.</p>
            </div>
          )}

          {choiceMade && consent && (
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                {consent.functional ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-ggo-green mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-ggo-navy font-medium">Functional cookies accepted</p>
                      <p className="text-ggo-slate text-xs mt-0.5">
                        Your recovery progress is being saved to this device.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-ggo-slate mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-ggo-navy font-medium">Continuing without cookies</p>
                      <p className="text-ggo-slate text-xs mt-0.5">
                        Your recovery progress is not being saved between sessions.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {consent.timestamp && (
                <p className="text-xs text-ggo-slate">
                  Choice recorded:{' '}
                  {new Date(consent.timestamp).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              )}
            </div>
          )}
        </section>

        {/* What is stored */}
        {consent?.functional && (
          <section className="bg-ggo-surface border border-ggo-border rounded-xl p-6">
            <h2 className="font-heading text-base font-semibold text-ggo-navy mb-3">
              What is stored on this device
            </h2>
            <ul className="space-y-1.5 text-sm text-ggo-slate">
              <li>Selected procedure and surgery date</li>
              <li>Completed recovery milestones</li>
              <li>Daily confidence ratings</li>
              <li>Follow-up appointment notes</li>
              <li>Display name and communication preferences</li>
            </ul>
            <p className="text-xs text-ggo-slate mt-3">
              Data is stored only in this browser. It never leaves your device.
            </p>
          </section>
        )}

        {/* Actions */}
        <section className="bg-ggo-surface border border-ggo-border rounded-xl p-6 space-y-4">
          <h2 className="font-heading text-base font-semibold text-ggo-navy mb-1">Actions</h2>

          {!consent?.functional && choiceMade && !withdrawn && (
            <button
              onClick={handleReAccept}
              className="w-full px-4 py-2.5 rounded-lg bg-ggo-teal text-white text-sm font-semibold hover:bg-ggo-teal-dark transition-colors focus:outline-none focus:ring-2 focus:ring-ggo-teal focus:ring-offset-2"
            >
              Accept functional cookies
            </button>
          )}

          {(consent?.functional || withdrawn) && (
            <>
              {!showWithdrawConfirm ? (
                <button
                  onClick={() => setShowWithdrawConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-ggo-red/40 text-ggo-red text-sm font-semibold hover:bg-ggo-red-light transition-colors focus:outline-none focus:ring-2 focus:ring-ggo-red focus:ring-offset-2"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                  Delete all my data and withdraw consent
                </button>
              ) : (
                <div
                  role="alertdialog"
                  aria-labelledby="withdraw-heading"
                  className="border border-ggo-red/30 bg-ggo-red-light rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-ggo-red mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p id="withdraw-heading" className="text-sm font-semibold text-ggo-navy">
                        This will permanently delete your recovery progress
                      </p>
                      <p className="text-xs text-ggo-slate mt-1">
                        Your surgery date, milestone history, mood entries, and notes will be deleted from
                        this device. This cannot be undone.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleWithdraw}
                      className="flex-1 px-4 py-2 rounded-lg bg-ggo-red text-white text-sm font-semibold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-ggo-red focus:ring-offset-2"
                    >
                      Yes, delete everything
                    </button>
                    <button
                      onClick={() => setShowWithdrawConfirm(false)}
                      className="flex-1 px-4 py-2 rounded-lg border border-ggo-border text-ggo-navy text-sm font-semibold hover:bg-ggo-bg transition-colors focus:outline-none focus:ring-2 focus:ring-ggo-navy focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        <p className="text-xs text-ggo-slate text-center">
          <a href="/privacy" className="underline underline-offset-2 hover:text-ggo-navy">
            Read the full privacy notice
          </a>
        </p>

      </div>
    </main>
  );
}
