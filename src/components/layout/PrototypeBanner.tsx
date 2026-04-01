"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

const DISMISSED_KEY = "ggo-prototype-banner-dismissed";

export function PrototypeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 bg-amber-50 border-b border-amber-200 print:hidden"
      role="status"
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" aria-hidden="true" />
          <p className="text-[11px] font-medium text-amber-800 truncate">
            <span className="font-bold">Prototype</span> — This app is in development and not yet approved for clinical use.
          </p>
        </div>
        <button
          onClick={dismiss}
          className="flex-shrink-0 p-1 rounded hover:bg-amber-100 transition-colors"
          aria-label="Dismiss prototype notice"
        >
          <X className="w-3.5 h-3.5 text-amber-600" />
        </button>
      </div>
    </div>
  );
}
