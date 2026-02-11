'use client';

import { motion } from "framer-motion";
import { CompassLogo } from "../ggo/CompassLogo";
import { GGOButton } from "../ggo/GGOButton";
import { FooterDisclaimer } from "../ggo/FooterDisclaimer";
import { Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { getMicrocopyMap } from "@/lib/sanity/queries";

interface WelcomeScreenProps {
  onBegin: () => void;
}

export function WelcomeScreen({ onBegin }: WelcomeScreenProps) {
  const [microcopyMap, setMicrocopyMap] = useState<Record<string, string>>({});

  useEffect(() => {
    getMicrocopyMap().then(setMicrocopyMap).catch(console.error);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #F4F6F8 0%, #C7E4F6 100%)",
      }}
    >
      <div className="flex-1 flex items-center justify-center px-6 md:px-24 py-12">
        <motion.div
          className="max-w-2xl w-full text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <CompassLogo size={180} animated needleRotation={45} />
          </div>

          {/* Headline */}
          <motion.h1
            className="mb-6 text-ggo-navy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {microcopyMap["welcome.headline"] || "Welcome to GGO Compass"}
          </motion.h1>

          {/* Subline - strengthened weight */}
          <motion.p
            className="mb-12 text-ggo-text-muted max-w-lg mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {microcopyMap["welcome.subline"] || "Your personal guide from booking to recovery."}
          </motion.p>

          {/* CTA - with min height and shadow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <GGOButton
              variant="primary"
              onClick={onBegin}
              className="min-h-[48px]"
              style={{ boxShadow: "var(--shadow-1)" }}
            >
              {microcopyMap["welcome.button"] || "Begin"}
            </GGOButton>
          </motion.div>

          {/* Privacy Footer */}
          <motion.div
            className="mt-16 flex items-center justify-center gap-2 text-ggo-text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">
              {microcopyMap["welcome.privacy"] || "Your data never leaves this device."}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Persistent footer */}
      <FooterDisclaimer />
    </div>
  );
}
