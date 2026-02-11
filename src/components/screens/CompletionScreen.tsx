'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CompassLogo } from "../ggo/CompassLogo";
import { GGOButton } from "../ggo/GGOButton";
import { FooterDisclaimer } from "../ggo/FooterDisclaimer";
import { Download, RotateCcw } from "lucide-react";

interface CompletionScreenProps {
  onExport?: () => void;
  onReset?: () => void;
}

export function CompletionScreen({ onExport, onReset }: CompletionScreenProps) {
  const [needleRotation, setNeedleRotation] = useState(85);

  useEffect(() => {
    // Needle rotation 1s; gold pulse 600ms
    const timer = setTimeout(() => {
      setNeedleRotation(360);
      setTimeout(() => {
        setNeedleRotation(0);
      }, 1000); // 1s rotation
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ggo-light via-ggo-gradient-end to-ggo-light flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 md:px-24 py-12">
        <motion.div
          className="max-w-2xl w-full text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Compass with full rotation and gold pulse */}
          <motion.div
            className="mb-12 flex justify-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Gold pulse behind compass - 600ms */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 0.6, 
                repeat: 5,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <div className="w-64 h-64 rounded-full bg-ggo-gold/40 blur-2xl" />
            </motion.div>
            <div className="relative z-10">
              <CompassLogo size={240} needleRotation={needleRotation} />
            </div>
          </motion.div>

        {/* Completion Message - Board refined copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2 style={{ marginBottom: '16px' }}>You've arrived.</h2>
          <p className="text-ggo-text-muted mb-12 max-w-lg mx-auto" style={{ fontSize: "16px", lineHeight: "1.4", fontWeight: 400 }}>
            Minor changes can continue for months.
          </p>
        </motion.div>

        {/* Achievement Card */}
        <motion.div
          className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-16 h-16 rounded-full bg-ggo-teal/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-ggo-teal">5</span>
              </div>
              <p className="text-ggo-navy">Phases</p>
              <p className="text-ggo-text-muted">Completed</p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-ggo-gold/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-ggo-text-dark">100%</span>
              </div>
              <p className="text-ggo-navy">Journey</p>
              <p className="text-ggo-text-muted">Progress</p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-ggo-navy/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-ggo-navy">✓</span>
              </div>
              <p className="text-ggo-navy">Care</p>
              <p className="text-ggo-text-muted">Delivered</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons - Mobile: stack full-width + 12px gap */}
        <motion.div
          className="flex flex-col gap-3 justify-center w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <button
            onClick={onExport}
            className="w-full px-8 py-4 bg-white text-ggo-navy border-2 border-ggo-navy/20 shadow-md hover:shadow-lg hover:border-ggo-navy/40 transition-all flex items-center justify-center gap-2 font-medium min-h-[48px]"
            style={{ borderRadius: '12px', transitionDuration: '300ms', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <Download className="w-5 h-5" />
            Export PDF
          </button>
          <button
            onClick={onReset}
            className="w-full px-8 py-4 bg-ggo-navy text-white shadow-md hover:shadow-lg hover:bg-ggo-navy/90 transition-all flex items-center justify-center gap-2 font-medium min-h-[48px]"
            style={{ borderRadius: '12px', transitionDuration: '300ms', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <RotateCcw className="w-5 h-5" />
            Clear Data
          </button>
          <button
            className="w-full px-8 py-4 bg-ggo-teal text-white shadow-md hover:shadow-lg hover:bg-ggo-teal/90 transition-all flex items-center justify-center gap-2 font-medium min-h-[48px]"
            style={{ borderRadius: '12px', transitionDuration: '300ms', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            Back to Explore
          </button>
        </motion.div>

        {/* Closing Message */}
        <motion.p
          className="mt-12 text-ggo-text-muted italic font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          "Healing has its own rhythm — and you followed your compass beautifully."
        </motion.p>
        </motion.div>
      </div>
      
      <FooterDisclaimer />
    </div>
  );
}
