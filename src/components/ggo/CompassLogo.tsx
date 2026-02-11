'use client';

import { motion } from "framer-motion";

interface CompassLogoProps {
  size?: number;
  animated?: boolean;
  needleRotation?: number;
  className?: string;
}

export function CompassLogo({ 
  size = 120, 
  animated = false, 
  needleRotation = 45,
  className = ""
}: CompassLogoProps) {
  // The logo image has the needle at approximately 45 degrees
  // So we subtract 45 from the desired rotation to align it correctly
  const adjustedRotation = needleRotation - 45;
  
  return (
    <motion.div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      initial={animated ? { opacity: 0, scale: 0.8 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.img
        src="/compass-logo.png"
        alt="GGO Compass Logo"
        className="w-full h-full object-contain"
        initial={{ rotate: adjustedRotation }}
        animate={{ rotate: adjustedRotation }}
        transition={{ 
          duration: 0.8, 
          ease: "easeInOut"
        }}
        style={{ transformOrigin: "center" }}
      />
    </motion.div>
  );
}
