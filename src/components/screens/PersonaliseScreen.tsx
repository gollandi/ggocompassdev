'use client';

import { motion } from "framer-motion";
import { GGOButton } from "../ggo/GGOButton";
import { FooterDisclaimer } from "../ggo/FooterDisclaimer";
import { User, Volume2, Eye, Shield } from "lucide-react";
import {
  loadPreferences,
  loadUserName,
  saveUserName,
  savePronoun,
  saveTone,
  saveAccessibility,
  applyAccessibilityClasses,
  mapPronounToStorage,
  mapToneToStorage,
  mapAccessibilityToStorage
} from "../../utils/preferences";
import { useState, useEffect } from "react";
import { getMicrocopyMap } from "@/lib/sanity/queries";

interface PersonaliseScreenProps {
  onNext: (preferences: PersonalisePreferences) => void;
}

export interface PersonalisePreferences {
  name?: string;
  pronouns: string;
  tone: string;
  accessibility: string[];
}

const pronounOptions = ["He/Him", "She/Her", "They/Them", "Prefer not to say"];
const toneOptions = ["Warm & Friendly", "Professional", "Concise"];
const accessibilityOptions = ["High Contrast", "Reduced Motion", "Larger Text"];

export function PersonaliseScreen({ onNext }: PersonaliseScreenProps) {
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("They/Them");
  const [tone, setTone] = useState("Warm & Friendly");
  const [accessibility, setAccessibility] = useState<string[]>([]);
  const [microcopyMap, setMicrocopyMap] = useState<Record<string, string>>({});

  useEffect(() => {
    getMicrocopyMap().then(setMicrocopyMap).catch(console.error);
    const prefs = loadPreferences();
    setName(loadUserName());
    // ... rest of useEffect

    // Map back to display values
    const pronounMap: Record<string, string> = {
      "he": "He/Him",
      "she": "She/Her",
      "they": "They/Them",
    };
    setPronouns(pronounMap[prefs.pronoun] || "They/Them");

    const toneMap: Record<string, string> = {
      "warm": "Warm & Friendly",
      "pro": "Professional",
      "concise": "Concise",
    };
    setTone(toneMap[prefs.tone] || "Warm & Friendly");

    const a11yOptions = [];
    if (prefs.accessibility.highContrast) a11yOptions.push("High Contrast");
    if (prefs.accessibility.reducedMotion) a11yOptions.push("Reduced Motion");
    if (prefs.accessibility.largeText) a11yOptions.push("Larger Text");
    setAccessibility(a11yOptions);
  }, []);

  const toggleAccessibility = (option: string) => {
    setAccessibility(prev => {
      const updated = prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option];

      // Persist to localStorage immediately
      const key = mapAccessibilityToStorage(option);
      saveAccessibility({ [key]: !prev.includes(option) });

      // Apply classes immediately for instant feedback
      const prefs = loadPreferences();
      applyAccessibilityClasses(prefs.accessibility);

      return updated;
    });
  };

  const handleNameChange = (value: string) => {
    const trimmed = value.slice(0, 40);
    setName(trimmed);
    saveUserName(trimmed.trim());
  };

  const handlePronounChange = (newPronoun: string) => {
    setPronouns(newPronoun);
    // Persist to localStorage immediately
    savePronoun(mapPronounToStorage(newPronoun));
  };

  const handleToneChange = (newTone: string) => {
    setTone(newTone);
    // Persist to localStorage immediately
    saveTone(mapToneToStorage(newTone));
  };

  const handleNext = () => {
    onNext({ name: name.trim(), pronouns, tone, accessibility });
  };

  return (
    <div className="min-h-screen bg-ggo-soft-blue/30 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 md:px-24 py-12">
        <motion.div
          className="max-w-4xl w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="mb-4 text-ggo-black font-bold text-3xl">{microcopyMap["personalise.headline"] || "Make it yours"}</h1>
            <p className="text-ggo-text-muted font-medium">
              {microcopyMap["personalise.subline"] || "Choose how you see and hear your journey."}
            </p>
          </div>

          {/* Name Input */}
          <motion.div
            className="max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <label className="block text-sm font-medium text-ggo-charcoal mb-2">
              {microcopyMap["personalise.name.label"] || "What should we call you?"} <span className="text-ggo-text-muted">{microcopyMap["personalise.name.optional"] || "(optional)"}</span>
            </label>
            <motion.input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder={microcopyMap["personalise.name.placeholder"] || "Enter your name"}
              maxLength={40}
              className="w-full px-4 py-3 rounded-2xl border border-ggo-navy/10 focus:border-ggo-teal focus:ring-2 focus:ring-ggo-teal/30 transition-all bg-white shadow-sm outline-none"
              whileFocus={{ scale: 1.02, boxShadow: "0px 4px 20px rgba(0,0,0,0.1)" }}
            />
            <p className="text-xs text-ggo-text-muted mt-2">
              {microcopyMap["personalise.name.hint"] || "We’ll use this to personalise headers across your journey."}
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Pronouns Card - 24px radius */}
            <motion.div
              className="bg-white p-8 shadow-md hover:shadow-lg transition-all"
              style={{ borderRadius: '24px', transitionDuration: '300ms', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="w-16 h-16 rounded-full bg-ggo-teal/10 flex items-center justify-center mb-6">
                <User className="w-8 h-8 text-ggo-teal" />
              </div>
              <h3 className="mb-2 text-ggo-black font-semibold">{microcopyMap["personalise.pronouns.title"] || "Pronouns"}</h3>
              <p className="text-sm text-ggo-text-muted font-medium mb-4">{microcopyMap["personalise.pronouns.subtitle"] || "Choose how we refer to you."}</p>
              <div className="space-y-2">
                {pronounOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handlePronounChange(option)}
                    aria-pressed={pronouns === option}
                    className={`
                    w-full px-4 py-3 text-left transition-all
                    ${pronouns === option
                        ? 'bg-ggo-teal text-white shadow-md'
                        : 'bg-ggo-light text-ggo-navy hover:bg-ggo-teal/10'
                      }
                  `}
                    style={{
                      borderRadius: '12px',
                      transitionDuration: '250ms',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tone Card - 24px radius */}
            <motion.div
              className="bg-white p-8 shadow-md hover:shadow-lg transition-all"
              style={{ borderRadius: '24px', transitionDuration: '300ms', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="w-16 h-16 rounded-full bg-ggo-teal/10 flex items-center justify-center mb-6">
                <Volume2 className="w-8 h-8 text-ggo-teal" />
              </div>
              <h3 className="mb-2 text-ggo-black font-semibold">{microcopyMap["personalise.tone.title"] || "Tone"}</h3>
              <p className="text-sm text-ggo-text-muted font-medium mb-4">{microcopyMap["personalise.tone.subtitle"] || "Pick a language style that feels right."}</p>
              <div className="space-y-2">
                {toneOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleToneChange(option)}
                    aria-pressed={tone === option}
                    className={`
                    w-full px-4 py-3 text-left transition-all
                    ${tone === option
                        ? 'bg-ggo-teal text-white shadow-md'
                        : 'bg-ggo-light text-ggo-navy hover:bg-ggo-teal/10'
                      }
                  `}
                    style={{
                      borderRadius: '12px',
                      transitionDuration: '250ms',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Accessibility Card - 24px radius */}
            <motion.div
              className="bg-white p-8 shadow-md hover:shadow-lg transition-all"
              style={{ borderRadius: '24px', transitionDuration: '300ms', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="w-16 h-16 rounded-full bg-ggo-teal/10 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-ggo-teal" />
              </div>
              <h3 className="mb-2 text-ggo-black font-semibold">{microcopyMap["personalise.accessibility.title"] || "Accessibility"}</h3>
              <p className="text-sm text-ggo-text-muted font-medium mb-4">{microcopyMap["personalise.accessibility.subtitle"] || "Adjust contrast, motion and readability."}</p>
              <div className="space-y-2">
                {accessibilityOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleAccessibility(option)}
                    aria-pressed={accessibility.includes(option)}
                    className={`
                    w-full px-4 py-3 text-left transition-all
                    ${accessibility.includes(option)
                        ? 'bg-ggo-teal text-white shadow-md'
                        : 'bg-ggo-light text-ggo-navy hover:bg-ggo-teal/10'
                      }
                  `}
                    style={{
                      borderRadius: '12px',
                      transitionDuration: '250ms',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Privacy Notice - elevated to 16px muted-teal font */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-8 text-ggo-teal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Shield className="w-5 h-5" />
            <span style={{ fontSize: '16px', fontWeight: 500 }}>{microcopyMap["personalise.privacy"] || "Compass stores data only on your device."}</span>
          </motion.div>

          {/* Next Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <GGOButton
              variant="gold"
              onClick={handleNext}
              className="min-h-[48px]"
            >
              {microcopyMap["personalise.button"] || "Next"}
            </GGOButton>
          </motion.div>
        </motion.div>
      </div>

      <FooterDisclaimer />
    </div>
  );
}
