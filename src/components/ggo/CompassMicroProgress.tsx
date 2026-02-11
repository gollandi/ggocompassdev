import { motion } from "framer-motion";

interface CompassMicroProgressProps {
  day: number;
  totalDays: number;
  size?: number;
  className?: string;
}

export function CompassMicroProgress({ 
  day, 
  totalDays, 
  size = 32, 
  className = "" 
}: CompassMicroProgressProps) {
  // Calculate needle rotation based on day (5° per day, starting at 45°)
  const needleRotation = 45 + (day * 5);
  const progressPercentage = (day / totalDays) * 100;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Circular background */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="#F4F6F8"
          strokeWidth="2"
          fill="white"
        />
        
        {/* Progress arc */}
        <motion.circle
          cx="16"
          cy="16"
          r="14"
          stroke="#00BE92"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 14}`}
          initial={{ strokeDashoffset: 2 * Math.PI * 14 }}
          animate={{ 
            strokeDashoffset: 2 * Math.PI * 14 * (1 - progressPercentage / 100)
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
        />

        {/* Center G */}
        <text
          x="16"
          y="20"
          textAnchor="middle"
          fill="#1E3A5B"
          fontSize="14"
          fontWeight="600"
          fontFamily="Plus Jakarta Sans"
        >
          G
        </text>
      </svg>

      {/* Rotating needle indicator */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        style={{
          width: 2,
          height: 8,
          backgroundColor: "#E5C07B",
          transformOrigin: "bottom center",
          marginLeft: -1,
          marginTop: -8,
        }}
        initial={{ rotate: 45 }}
        animate={{ rotate: needleRotation }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}
