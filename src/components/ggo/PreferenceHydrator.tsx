'use client';

import { useEffect } from "react";
import { 
  loadPreferences, 
  applyAccessibilityClasses, 
  loadSurgeryDate 
} from "@/utils/preferences";
import { loadSelection, dispatchSelectionChange } from "@/utils/userPreferences";

const pronounDisplayMap: Record<string, string> = {
  he: "He/Him",
  she: "She/Her",
  they: "They/Them",
};

const accessibilityDisplay = (prefs: { highContrast: boolean; reducedMotion: boolean; largeText: boolean }) => {
  const options: string[] = [];
  if (prefs.highContrast) options.push("High Contrast");
  if (prefs.reducedMotion) options.push("Reduced Motion");
  if (prefs.largeText) options.push("Larger Text");
  return options;
};

export function PreferenceHydrator() {
  useEffect(() => {
    try {
      const prefs = loadPreferences();
      applyAccessibilityClasses(prefs.accessibility);

      const storedPreferences = {
        name: prefs.name,
        pronouns: pronounDisplayMap[prefs.pronoun] || "They/Them",
        tone:
          prefs.tone === "warm"
            ? "Warm & Friendly"
            : prefs.tone === "pro"
            ? "Professional"
            : "Concise",
        accessibility: accessibilityDisplay(prefs.accessibility),
      };
      sessionStorage.setItem("ggo-preferences", JSON.stringify(storedPreferences));

      const storedDate = loadSurgeryDate();
      if (storedDate) {
        const parsed = new Date(storedDate);
        if (!Number.isNaN(parsed.valueOf())) {
          sessionStorage.setItem("ggo-surgery-date", parsed.toISOString());
        }
      }

      const selection = loadSelection();
      if (selection.procedure) {
        sessionStorage.setItem("ggo-procedure", selection.procedure);
        sessionStorage.setItem("ggo-procedure-slug", selection.procedureSlug || "");
        sessionStorage.setItem("ggo-procedure-id", selection.procedureId || "");
      }
      if (selection.site) {
        sessionStorage.setItem("ggo-site", selection.site);
        sessionStorage.setItem("ggo-site-slug", selection.siteSlug || "");
        sessionStorage.setItem("ggo-site-id", selection.siteId || "");
      }
      if (selection.procedure || selection.site) {
        dispatchSelectionChange();
      }
    } catch (error) {
      console.warn("Preference hydration failed", error);
    }
  }, []);

  return null;
}
