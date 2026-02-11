'use client';

import { motion } from "framer-motion";
import { Compass, ClipboardCheck, FileJson, Type } from "lucide-react";
import { FooterDisclaimer } from "../ggo/FooterDisclaimer";
import { useState, useEffect } from "react";
import { getMicrocopyMap } from "@/lib/sanity/queries";

interface ModeSelectScreenProps {
  onSelectMode: (mode: "explore" | "track") => void;
  onExportVariables?: () => void;
  onViewMicrocopyStyles?: () => void;
}

export function ModeSelectScreen({ onSelectMode, onExportVariables, onViewMicrocopyStyles }: ModeSelectScreenProps) {
  const [microcopyMap, setMicrocopyMap] = useState<Record<string, string>>({});

  useEffect(() => {
    getMicrocopyMap().then(setMicrocopyMap).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Developer Tools Buttons */}
      {(onExportVariables || onViewMicrocopyStyles) && (
        <div className="absolute top-6 right-6 flex gap-3">
          {onViewMicrocopyStyles && (
            <motion.button
              onClick={onViewMicrocopyStyles}
              className="flex items-center gap-2 px-4 py-2 bg-white text-ggo-navy border border-ggo-navy/10 rounded-xl hover:shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Type className="w-4 h-4" />
              <span className="text-sm">Text Styles</span>
            </motion.button>
          )}
          {onExportVariables && (
            <motion.button
              onClick={onExportVariables}
              className="flex items-center gap-2 px-4 py-2 bg-white text-ggo-navy border border-ggo-navy/10 rounded-xl hover:shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileJson className="w-4 h-4" />
              <span className="text-sm">Export Variables</span>
            </motion.button>
          )}
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-6 md:px-24 py-12">
        <motion.div
          className="max-w-5xl w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="mb-4 text-ggo-navy">{microcopyMap["mode.headline"] || "How would you like to begin?"}</h1>
            <p className="text-ggo-text-muted font-medium">
              {microcopyMap["mode.subline"] || "Choose your path forward."}
            </p>
          </div>

          {/* Mode Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Explore Journey Card */}
            <motion.button
              onClick={() => onSelectMode("explore")}
              className="bg-ggo-teal text-white p-12 shadow-lg hover:shadow-xl transition-all duration-300 text-left group relative overflow-hidden min-h-[320px] border-4 border-transparent hover:border-ggo-teal/30"
              style={{ borderRadius: "24px" }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              <div className="relative">
                <motion.div
                  className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-8"
                  whileHover={{ rotate: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Compass className="w-8 h-8" />
                </motion.div>

                <h2 className="mb-2" style={{ lineHeight: "1.2" }}>{microcopyMap["mode.explore.title"] || "Explore a Journey"}</h2>
                <p className="text-white/90 mb-6" style={{ fontSize: '16px', fontWeight: 500 }}>{microcopyMap["mode.explore.subtitle"] || "Learn about the process."}</p>

                <p className="text-white/90 mb-8" style={{ lineHeight: "1.4" }}>
                  {microcopyMap["mode.explore.description"] || "Browse all days freely. See what to expect at each phase — perfect for planning ahead or understanding the full journey."}
                </p>

                <span className="inline-block px-4 py-2 bg-white/20 text-sm font-medium" style={{ borderRadius: '12px' }}>
                  {microcopyMap["mode.explore.button"] || "Learn more"}
                </span>
              </div>
            </motion.button>

            {/* Track Journey Card */}
            <motion.button
              onClick={() => onSelectMode("track")}
              className="bg-ggo-gold text-ggo-text-dark p-12 shadow-lg hover:shadow-xl transition-all duration-300 text-left group relative overflow-hidden min-h-[320px] border-4 border-transparent hover:border-ggo-gold/50"
              style={{ borderRadius: "24px" }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-ggo-navy/0 to-ggo-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              <div className="relative">
                <motion.div
                  className="w-16 h-16 rounded-full bg-ggo-text-dark/10 flex items-center justify-center mb-8"
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <ClipboardCheck className="w-8 h-8" />
                </motion.div>

                <h2 className="mb-2" style={{ lineHeight: "1.2" }}>{microcopyMap["mode.track.title"] || "Track My Journey"}</h2>
                <p className="text-ggo-text-dark/90 mb-6" style={{ fontSize: '16px', fontWeight: 500 }}>{microcopyMap["mode.track.subtitle"] || "Follow your own path."}</p>

                <p className="text-ggo-text-dark/90 mb-8" style={{ lineHeight: "1.4" }}>
                  {microcopyMap["mode.track.description"] || "You're booked and ready. See today's guidance and unlock each day automatically as you progress through recovery."}
                </p>

                <span className="inline-block px-4 py-2 bg-ggo-text-dark/15 text-sm font-medium" style={{ borderRadius: '12px' }}>
                  {microcopyMap["mode.track.button"] || "Start my journey"}
                </span>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <FooterDisclaimer />
    </div>
  );
}
