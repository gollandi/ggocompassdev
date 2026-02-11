'use client';

import { motion } from "framer-motion";
import { CompassLogo } from "../ggo/CompassLogo";
import { useEffect, useState } from "react";
import { getMicrocopyMap } from "@/lib/sanity/queries";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [microcopyMap, setMicrocopyMap] = useState<Record<string, string>>({});

  useEffect(() => {
    getMicrocopyMap().then(setMicrocopyMap).catch(console.error);

    const timer = setTimeout(() => {
      onComplete();
    }, 1500); // Trim animation to 1.5s total
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 cursor-pointer"
      style={{
        background: "radial-gradient(circle at center, #E3EEFD 0%, #FFFFFF 100%)",
      }}
      onClick={onComplete}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Compass Logo with gentle rotation */}
      <motion.div
        className="w-full max-w-[200px]"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: [0.4, 0, 0.2, 1],
          delay: 0.2
        }}
      >
        <CompassLogo size={200} animated />
      </motion.div>

      {/* Tagline - increased weight (+1) for legibility at 375px width */}
      <motion.p
        className="mt-8 text-ggo-text-muted px-4 text-center"
        style={{ fontWeight: 600 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {microcopyMap["splash.tagline"] || "Guiding you, step by step."}
      </motion.p>
    </motion.div>
  );
}
