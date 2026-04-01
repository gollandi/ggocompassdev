import Link from "next/link";
import { Info, AlertTriangle, Shield } from "lucide-react";

interface FooterDisclaimerProps {
  className?: string;
  compact?: boolean;
}

export function FooterDisclaimer({ className = "", compact = false }: FooterDisclaimerProps) {
  return (
    <footer
      className={`w-full bg-ggo-light/80 backdrop-blur-sm border-t border-ggo-navy/10 ${className}`}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 space-y-4">
        {/* Tier 1 — Safety Disclaimer */}
        <div className="flex items-start gap-2.5 text-ggo-text-muted">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" aria-hidden="true" />
          <p style={{ fontSize: '12px', lineHeight: '1.5', fontWeight: 500 }}>
            This guidance is educational and does not constitute medical advice.
            Always follow your clinician&apos;s instructions.
            If you are experiencing a medical emergency, call{" "}
            <a href="tel:999" className="text-red-600 font-bold hover:underline">999</a>.
          </p>
        </div>

        {/* Tier 2 — Prototype Declaration */}
        {!compact && (
          <div className="flex items-start gap-2.5 text-ggo-text-muted">
            <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-ggo-teal" aria-hidden="true" />
            <p style={{ fontSize: '11px', lineHeight: '1.5', fontWeight: 400 }}>
              GGO Compass is a prototype patient journey companion. It is not a registered
              medical device and has not been CE/UKCA marked. Content is provided for
              informational purposes and is subject to ongoing clinical review.
            </p>
          </div>
        )}

        {/* Tier 3 — Credentials & Links */}
        <div className="flex items-start gap-2.5 text-ggo-text-muted border-t border-ggo-navy/5 pt-3">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div style={{ fontSize: '11px', lineHeight: '1.6', fontWeight: 400 }}>
            <p>
              &copy; {new Date().getFullYear()} GGO Med Ltd. Registered in England and Wales. All rights reserved.
            </p>
            <p>
              GGO Med<sup>&reg;</sup> is a registered trademark of GGO Med Ltd.
              Clinical content reviewed under{" "}
              <abbr title="British Association of Urological Surgeons">BAUS</abbr> and{" "}
              <abbr title="European Association of Urology">EAU</abbr> guidelines.
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <Link href="/privacy" className="text-ggo-teal hover:underline underline-offset-2">
                Privacy
              </Link>
              <span aria-hidden="true">&middot;</span>
              <Link href="/settings" className="text-ggo-teal hover:underline underline-offset-2">
                Settings
              </Link>
              <span aria-hidden="true">&middot;</span>
              <a
                href="https://ggomed.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ggo-teal hover:underline underline-offset-2"
              >
                ggomed.co.uk
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
