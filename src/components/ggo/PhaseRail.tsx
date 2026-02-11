import { motion } from "framer-motion";
import { Calendar, ClipboardList, Building2, Heart, CheckCircle2 } from "lucide-react";

export type Phase = "book" | "prepare" | "attend" | "recover" | "review";

interface PhaseRailProps {
  currentPhase: Phase;
  onPhaseClick?: (phase: Phase) => void;
  className?: string;
}

const phases: { 
  id: Phase; 
  label: string; 
  icon: React.ElementType;
  rotation: number;
}[] = [
  { id: "book", label: "Book", icon: Calendar, rotation: 45 },
  { id: "prepare", label: "Prepare", icon: ClipboardList, rotation: 55 },
  { id: "attend", label: "Attend", icon: Building2, rotation: 65 },
  { id: "recover", label: "Recover", icon: Heart, rotation: 75 },
  { id: "review", label: "Review", icon: CheckCircle2, rotation: 85 },
];

export function PhaseRail({ currentPhase, onPhaseClick, className = "" }: PhaseRailProps) {
  const currentIndex = phases.findIndex(p => p.id === currentPhase);
  
  return (
    <div className={`w-full ${className}`}>
      {/* Desktop: Horizontal Rail */}
      <div className="hidden md:flex items-center justify-between relative px-4">
        {/* Connection Line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-ggo-navy/20 mx-16" />
        
        {phases.map((phase, index) => {
          const isActive = phase.id === currentPhase;
          const isCompleted = index < currentIndex;
          const Icon = phase.icon;
          
          return (
            <div key={phase.id} className="relative flex flex-col items-center z-10">
              {/* Progress line fill */}
              {index > 0 && isCompleted && (
                <motion.div
                  className="absolute top-8 right-1/2 h-0.5 bg-ggo-teal"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ transformOrigin: "right" }}
                />
              )}
              
              {/* Phase Node */}
              <motion.button
                onClick={() => onPhaseClick?.(phase.id)}
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  transition-all duration-300 shadow-md
                  ${isActive 
                    ? 'bg-ggo-teal text-white ring-4 ring-ggo-teal/30' 
                    : isCompleted 
                    ? 'bg-white text-ggo-teal border-2 border-ggo-teal' 
                    : 'bg-white text-ggo-navy/40 border-2 border-ggo-navy/20'
                  }
                  ${!isActive && 'hover:scale-110 hover:shadow-lg'}
                `}
                whileHover={!isActive ? { scale: 1.1 } : {}}
                whileTap={!isActive ? { scale: 0.95 } : {}}
              >
                <Icon className="w-7 h-7" />
              </motion.button>
              
              {/* Label */}
              <motion.span
                className={`
                  mt-3 transition-all duration-300
                  ${isActive ? 'text-ggo-teal' : isCompleted ? 'text-ggo-navy' : 'text-ggo-navy/40'}
                `}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {phase.label}
              </motion.span>
            </div>
          );
        })}
      </div>
      
      {/* Mobile: Vertical Rail */}
      <div className="md:hidden flex flex-col space-y-4 px-6">
        {phases.map((phase, index) => {
          const isActive = phase.id === currentPhase;
          const isCompleted = index < currentIndex;
          const Icon = phase.icon;
          
          return (
            <div key={phase.id} className="flex items-center gap-4 relative">
              {/* Connection Line */}
              {index < phases.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-ggo-navy/20">
                  {isCompleted && (
                    <motion.div
                      className="w-full bg-ggo-teal"
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              )}
              
              {/* Phase Node */}
              <motion.button
                onClick={() => onPhaseClick?.(phase.id)}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  transition-all duration-300 shadow-md z-10
                  ${isActive 
                    ? 'bg-ggo-teal text-white ring-4 ring-ggo-teal/30' 
                    : isCompleted 
                    ? 'bg-white text-ggo-teal border-2 border-ggo-teal' 
                    : 'bg-white text-ggo-navy/40 border-2 border-ggo-navy/20'
                  }
                `}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
              </motion.button>
              
              {/* Label */}
              <span
                className={`
                  transition-all duration-300
                  ${isActive ? 'text-ggo-teal' : isCompleted ? 'text-ggo-navy' : 'text-ggo-navy/40'}
                `}
              >
                {phase.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
