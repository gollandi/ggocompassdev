import Link from "next/link";
import { Info } from "lucide-react";

interface FooterDisclaimerProps {
  className?: string;
}

export function FooterDisclaimer({ className = "" }: FooterDisclaimerProps) {
  return (
    <footer
      className={`w-full bg-ggo-light/80 backdrop-blur-sm border-t border-ggo-navy/10 py-4 px-6 ${className}`}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto flex items-start gap-3 text-ggo-text-muted">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
        <p style={{ fontSize: '12px', lineHeight: '1.4', fontWeight: 400 }}>
          This guidance is educational. Always follow your clinician&apos;s instructions.
          {" · "}
          <Link href="/privacy" className="text-ggo-teal hover:underline underline-offset-2">
            Privacy
          </Link>
          {" · "}
          <Link href="/settings" className="text-ggo-teal hover:underline underline-offset-2">
            Settings
          </Link>
        </p>
      </div>
    </footer>
  );
}
