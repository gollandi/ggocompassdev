'use client';

import { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { hasChoicBeenMade, setConsent } from '@/lib/consent';

/**
 * GDPR/PECR compliant cookie consent banner.
 *
 * Shown on first visit. Cannot be dismissed without making a choice.
 * Both options have equal visual weight — no dark patterns.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasChoicBeenMade()) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    setConsent(true);
    setVisible(false);
  }

  function handleDecline() {
    setConsent(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
    >
      <div className="max-w-2xl mx-auto bg-ggo-surface border border-ggo-border rounded-xl shadow-xl p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-ggo-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Shield className="w-5 h-5 text-ggo-teal" aria-hidden="true" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-heading text-base font-semibold text-ggo-navy mb-1">
              Your data stays on your device
            </h2>
            <p className="text-sm text-ggo-slate leading-relaxed mb-4">
              GGO Compass saves your selected procedure, surgery date, and
              recovery progress in your browser. This data never leaves your
              device and is not shared with anyone. You can delete it at any
              time.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-ggo-teal text-white text-sm font-semibold hover:bg-ggo-teal-dark transition-colors focus:outline-none focus:ring-2 focus:ring-ggo-teal focus:ring-offset-2"
              >
                Accept functional cookies
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-transparent border border-ggo-border text-ggo-navy text-sm font-semibold hover:bg-ggo-bg transition-colors focus:outline-none focus:ring-2 focus:ring-ggo-navy focus:ring-offset-2"
              >
                Continue without cookies
              </button>
            </div>

            <p className="text-xs text-ggo-slate mt-3">
              <a
                href="/privacy"
                className="underline underline-offset-2 hover:text-ggo-navy"
              >
                Privacy notice
              </a>
              {' — '}
              you can change this choice at any time in Settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
