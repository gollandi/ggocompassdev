import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Phase {
  name: string;
  dayRange: [number, number];
  color: string;
}

const phases: Phase[] = [
  { name: "Surgery Day", dayRange: [0, 0], color: "text-ggo-navy" },
  { name: "Early Recovery", dayRange: [1, 7], color: "text-ggo-teal" },
  { name: "Healing Phase", dayRange: [8, 14], color: "text-ggo-teal" },
  { name: "Strengthening", dayRange: [15, 21], color: "text-ggo-gold" },
  { name: "Final Phase", dayRange: [22, 28], color: "text-ggo-gold" },
];

interface PhaseJumperProps {
  currentDay: number;
  onDaySelect: (day: number) => void;
  totalDays: number;
}

export function PhaseJumper({ currentDay, onDaySelect, totalDays }: PhaseJumperProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Find current phase
  const currentPhase = phases.find(
    (phase) => currentDay >= phase.dayRange[0] && currentDay <= phase.dayRange[1]
  ) || phases[0];

  const handlePhaseSelect = (phase: Phase) => {
    // Jump to the start of the selected phase
    onDaySelect(phase.dayRange[0]);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Current Phase Display */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-ggo-navy/10 rounded-xl hover:shadow-md transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-sm text-ggo-text-muted">Jump to:</span>
        <span className={`text-sm font-medium ${currentPhase.color}`}>
          {currentPhase.name}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-ggo-navy" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-ggo-navy/10 overflow-hidden z-50"
          >
            {phases.map((phase, index) => {
              const isAvailable = phase.dayRange[1] <= totalDays;
              const isCurrent = phase.name === currentPhase.name;

              return (
                <button
                  key={phase.name}
                  onClick={() => isAvailable && handlePhaseSelect(phase)}
                  disabled={!isAvailable}
                  className={`
                    w-full p-4 text-left transition-all
                    ${index > 0 ? "border-t border-ggo-navy/10" : ""}
                    ${isCurrent ? "bg-ggo-teal/10" : "hover:bg-ggo-light"}
                    ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`font-medium ${phase.color}`}>
                        {phase.name}
                      </p>
                      <p className="text-xs text-ggo-text-muted mt-1">
                        {phase.dayRange[0] === phase.dayRange[1]
                          ? `Day ${phase.dayRange[0]}`
                          : `Days ${phase.dayRange[0]}–${phase.dayRange[1]}`}
                      </p>
                    </div>
                    {isCurrent && (
                      <div className="w-2 h-2 rounded-full bg-ggo-teal mt-1.5" />
                    )}
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
