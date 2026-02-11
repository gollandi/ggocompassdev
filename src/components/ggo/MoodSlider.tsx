import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Slider } from "../ui/slider";
import { Heart, Phone, AlertTriangle } from "lucide-react";
import { saveMoodEntryForDate, getMoodForDate, loadSurgeryDate } from "../../utils/preferences";
import { EmergencyContacts } from "./EmergencyContacts";
import "../../styles/mood-slider.css";
import { calculateRecoveryDay } from "../../utils/dateCalculations";

interface MoodSliderProps {
  onMoodChange?: (mood: number) => void;
  recoveryDay?: number;
  procedureSlug?: string;
  locationSlug?: string;
  className?: string;
  /** Optional surgery date to correctly compute recovery day for past dates */
  surgeryDate?: string | Date;
}

const moodMessages = {
  low: {
    message: "It's completely normal to feel uncertain during recovery. You're doing everything right, and healing takes time.",
    tone: "reassuring",
    showEmergencyCTA: true,
  },
  medium: {
    message: "You're moving in the right direction. Keep following your guidance and trust the process.",
    tone: "supportive",
    showEmergencyCTA: false,
  },
  high: {
    message: "Great to hear you're feeling confident! Your positive mindset supports your healing.",
    tone: "celebrating",
    showEmergencyCTA: false,
  },
};

export function MoodSlider({ 
  onMoodChange, 
  recoveryDay = 0, 
  procedureSlug,
  locationSlug,
  className = "",
  surgeryDate,
}: MoodSliderProps) {
  const [mood, setMood] = useState<number>(5);
  const [showMessage, setShowMessage] = useState(false);

  // Track which date we're logging for (default: today)
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // Load stored surgery date if prop is missing
  const [effectiveSurgeryDate, setEffectiveSurgeryDate] = useState<string | null>(null);
  useEffect(() => {
    if (surgeryDate) {
      const d = new Date(surgeryDate);
      d.setHours(0,0,0,0);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      setEffectiveSurgeryDate(`${y}-${m}-${dd}`);
    } else {
      const stored = loadSurgeryDate();
      setEffectiveSurgeryDate(stored);
    }
  }, [surgeryDate]);

  // Derive selectable min/max dates
  const computeMinDateStr = () => {
    const thirtyAgo = new Date();
    thirtyAgo.setHours(0, 0, 0, 0);
    thirtyAgo.setDate(thirtyAgo.getDate() - 30);
    let min = thirtyAgo;
    if (effectiveSurgeryDate) {
      const s = new Date(effectiveSurgeryDate);
      s.setHours(0, 0, 0, 0);
      if (s > min) min = s; // do not allow dates before surgery if provided
    }
    const y = min.getFullYear();
    const m = String(min.getMonth() + 1).padStart(2, '0');
    const d = String(min.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };
  const minDateStr = computeMinDateStr();
  const maxDateStr = todayStr;

  // Load mood for the selected date when it changes
  useEffect(() => {
    const entry = getMoodForDate(selectedDate);
    if (entry) {
      setMood(entry.mood);
    } else {
      setMood(5);
    }
    setShowMessage(false);
  }, [selectedDate]);

  const handleMoodChange = (value: number[]) => {
    const newMood = value[0];
    setMood(newMood);
    setShowMessage(true);

    // Work out recovery day for the selected date
    let dayForSave = recoveryDay;
    try {
      if (effectiveSurgeryDate) {
        dayForSave = calculateRecoveryDay(new Date(effectiveSurgeryDate), new Date(selectedDate));
      } else if (selectedDate !== todayStr) {
        // Best-effort adjust using difference from today
        const sel = new Date(selectedDate);
        sel.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const diff = Math.round((today.getTime() - sel.getTime()) / (1000 * 60 * 60 * 24));
        dayForSave = Math.max(0, recoveryDay - diff);
      }
    } catch {
      // fall back silently
    }

    // Save mood for the chosen date
    saveMoodEntryForDate(newMood, dayForSave, selectedDate);
    onMoodChange?.(newMood);

    // Auto-hide message after 8 seconds (longer for emergency CTA)
    setTimeout(() => {
      setShowMessage(false);
    }, 8000);
  };

  const getMoodLevel = (): "low" | "medium" | "high" => {
    if (mood <= 3) return "low";
    if (mood <= 7) return "medium";
    return "high";
  };

  const moodLevel = getMoodLevel();
  const currentMessage = moodMessages[moodLevel];

  return (
    <div className={`bg-white rounded-xl p-6 shadow-md ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-ggo-teal/10 flex items-center justify-center">
          <Heart className="w-5 h-5 text-ggo-teal" />
        </div>
        <h4 className="text-ggo-navy">How confident do you feel about your recovery today?</h4>
      </div>

      {/* Date selector for backfilling mood entries */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-ggo-text-muted mb-1">
          Select date to record mood
        </label>
        <input
          type="date"
          className="w-full max-w-xs border rounded-md px-3 py-2 text-sm"
          value={selectedDate}
          min={minDateStr}
          max={maxDateStr}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <p className="mt-1 text-[11px] text-ggo-text-muted">You can log for the last 30 days{effectiveSurgeryDate ? " (from your surgery date)" : ""}.</p>
      </div>

      <div className="space-y-4">
        <div className="px-2">
          <Slider
            value={[mood]}
            onValueChange={handleMoodChange}
            min={1}
            max={10}
            step={1}
            className="w-full mood-slider"
          />
        </div>

        <div className="flex justify-between text-xs text-ggo-text-muted font-medium">
          <span className="text-red-600 font-semibold">Uncertain</span>
          <span className="text-green-600 font-semibold">Very confident</span>
        </div>

        <AnimatePresence mode="wait">
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className={`
                p-4 rounded-lg border-l-4
                ${moodLevel === "low" ? "bg-red-50 border-red-400" : ""}
                ${moodLevel === "medium" ? "bg-yellow-50 border-yellow-400" : ""}
                ${moodLevel === "high" ? "bg-green-50 border-green-400" : ""}
              `}>
                <p className="text-sm text-ggo-navy font-medium leading-relaxed">
                  {currentMessage.message}
                </p>
              </div>

              {/* Emergency CTA for low mood/high uncertainty */}
              {currentMessage.showEmergencyCTA && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-3"
                >
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-red-800">
                          If you need immediate help:
                        </p>
                        <div className="space-y-1 text-sm text-red-700">
                          <p>• Call your clinical team if you have concerns</p>
                          <p>• Call NHS 111 for urgent medical advice</p>
                          <p>• Visit A&E if you experience severe symptoms</p>
                          <p>• Call 999 for life-threatening emergencies</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Show detailed emergency contacts if procedure/location available */}
                  {procedureSlug && locationSlug && (
                    <EmergencyContacts 
                      procedureSlug={procedureSlug}
                      locationSlug={locationSlug}
                      compact={true}
                    />
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
