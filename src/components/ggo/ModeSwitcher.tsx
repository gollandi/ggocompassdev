import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Compass, MapPin, Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export type NavigationMode = "tracking" | "exploring";

interface ModeSwitcherProps {
  currentMode: NavigationMode;
  onModeChange: (mode: NavigationMode) => void;
  disabled?: boolean;
}

export function ModeSwitcher({ currentMode, onModeChange, disabled }: ModeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingMode, setPendingMode] = useState<NavigationMode | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Keyboard shortcuts: Shift + T (Track) / Shift + E (Explore)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (disabled) return;
      
      if (e.shiftKey && e.key === 'T') {
        e.preventDefault();
        if (currentMode !== 'tracking') {
          handleModeSelect('tracking');
        }
      } else if (e.shiftKey && e.key === 'E') {
        e.preventDefault();
        if (currentMode !== 'exploring') {
          handleModeSelect('exploring');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentMode, disabled]);

  const handleModeClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleModeSelect = (mode: NavigationMode) => {
    if (mode === currentMode) {
      setIsOpen(false);
      return;
    }
    
    setPendingMode(mode);
    setShowConfirm(true);
    setIsOpen(false);
  };

  const handleConfirm = () => {
    if (pendingMode) {
      onModeChange(pendingMode);
    }
    setShowConfirm(false);
    setPendingMode(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setPendingMode(null);
  };

  return (
    <>
      <div className="relative">
        {/* Current Mode Display */}
        <motion.button
          onClick={handleModeClick}
          disabled={disabled}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl border transition-all
            ${currentMode === "tracking" 
              ? "bg-ggo-gold/10 border-ggo-gold/30 text-ggo-navy" 
              : "bg-ggo-teal/10 border-ggo-teal/30 text-ggo-navy"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-md cursor-pointer"}
          `}
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
        >
          {currentMode === "tracking" ? (
            <MapPin className="w-4 h-4" />
          ) : (
            <Compass className="w-4 h-4" />
          )}
          <span className="text-sm capitalize">{currentMode}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
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
              className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-ggo-navy/10 overflow-hidden z-50"
            >
              {/* Tracking Option */}
              <button
                onClick={() => handleModeSelect("tracking")}
                className={`
                  w-full p-4 text-left transition-all
                  ${currentMode === "tracking" 
                    ? "bg-ggo-gold/10" 
                    : "hover:bg-ggo-light"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${currentMode === "tracking" 
                      ? "bg-ggo-gold text-white" 
                      : "bg-ggo-gold/10 text-ggo-navy"
                    }
                  `}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-ggo-navy">Tracking</span>
                      {currentMode === "tracking" && (
                        <Check className="w-4 h-4 text-ggo-gold" />
                      )}
                    </div>
                    <p className="text-xs text-ggo-text-muted">
                      Guide me through each day. Cards unlock as you progress.
                    </p>
                  </div>
                </div>
              </button>

              {/* Exploring Option */}
              <button
                onClick={() => handleModeSelect("exploring")}
                className={`
                  w-full p-4 text-left transition-all border-t border-ggo-navy/10
                  ${currentMode === "exploring" 
                    ? "bg-ggo-teal/10" 
                    : "hover:bg-ggo-light"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${currentMode === "exploring" 
                      ? "bg-ggo-teal text-white" 
                      : "bg-ggo-teal/10 text-ggo-navy"
                    }
                  `}>
                    <Compass className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-ggo-navy">Exploring</span>
                      {currentMode === "exploring" && (
                        <Check className="w-4 h-4 text-ggo-teal" />
                      )}
                    </div>
                    <p className="text-xs text-ggo-text-muted">
                      Show me the map. Browse all days freely.
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirmation Modal */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="rounded-3xl max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-ggo-navy">
              Switch to {pendingMode === "tracking" ? "Tracking" : "Exploring"} Mode?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-ggo-text-muted">
              {pendingMode === "tracking" ? (
                <>
                  Tracking mode links to your surgery date. You'll see daily guidance
                  that unlocks automatically as you progress through recovery.
                  <br /><br />
                  Your browsing won't affect your recovery record.
                </>
              ) : (
                <>
                  Switching to Exploring lets you view all days — this won't affect your recovery record.
                  <br /><br />
                  This is helpful for planning ahead or learning what to expect throughout the journey.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              Stay in {currentMode === "tracking" ? "Tracking" : "Exploring"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={`
                ${pendingMode === "tracking" 
                  ? "bg-ggo-gold hover:bg-ggo-gold/90" 
                  : "bg-ggo-teal hover:bg-ggo-teal/90"
                }
              `}
            >
              Switch to {pendingMode === "tracking" ? "Tracking" : "Exploring"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
