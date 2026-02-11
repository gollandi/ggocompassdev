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
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p style={{ fontSize: '12px', lineHeight: '1.4', fontWeight: 400 }}>
          This guidance is educational. Always follow your clinician's instructions.
          {" "}
          <a 
            href="#safety" 
            className="text-ggo-teal hover:underline"
            style={{ transitionDuration: '250ms', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            Safety & Accessibility
          </a>
        </p>
      </div>
    </footer>
  );
}
