import { motion } from "framer-motion";
import { Sunrise, AlertTriangle, Info, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { CompassMicroProgress } from "./CompassMicroProgress";
import { loadPreferences, showEncouragement } from "../../utils/preferences";

export interface RecoveryDay {
  day: number;
  title: string;
  reassurance: string;
  forecast: string;
  redFlags: string[];
  nurseNote?: string;
  nurseName?: string;
  whyThisHappens?: string;
}

export type CardTheme = "light" | "dark" | "high-contrast";
export type MoodVariant = "low" | "neutral" | "high";

interface RecoveryDayCardProps {
  day: RecoveryDay;
  isToday?: boolean;
  theme?: CardTheme;
  moodState?: MoodVariant;
  totalDays?: number;
  showForecast?: boolean;
  largerText?: boolean;
  reducedMotion?: boolean;
  className?: string;
  supportLine?: string;
}

export function RecoveryDayCard({ 
  day, 
  isToday = false, 
  theme = "light",
  moodState = "neutral",
  totalDays = 28,
  showForecast = true,
  largerText = false,
  reducedMotion = false,
  className = "",
  supportLine,
}: RecoveryDayCardProps) {
  const [showRedFlags, setShowRedFlags] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Load user preferences for tone
  const preferences = loadPreferences();
  const shouldShowEncouragement = showEncouragement(preferences.tone);

  // Theme-based styling
  const getThemeStyles = () => {
    if (theme === "dark") {
      return {
        background: isToday 
          ? "linear-gradient(135deg, #00BE92 0%, #1E3A5B 100%)"
          : "linear-gradient(135deg, #003024 0%, #1E3A5B 100%)",
        textPrimary: "text-white",
        textSecondary: "text-white/80",
        iconBg: "bg-white/10",
      };
    } else if (theme === "high-contrast") {
      return {
        background: "#FFFFFF",
        textPrimary: "text-black",
        textSecondary: "text-gray-700",
        iconBg: "bg-black/10",
      };
    }
    // Default light theme - improved contrast with darker background
    return {
      background: isToday 
        ? "linear-gradient(135deg, #1E3A5B 0%, #00856D 100%)"  // Navy to dark teal for WCAG AA contrast
        : "linear-gradient(135deg, #E5F5F2 0%, #FFFFFF 100%)",
      textPrimary: isToday ? "text-white" : "text-ggo-navy",
      textSecondary: isToday ? "text-white/95" : "text-ggo-text-muted",  // Increased opacity for better contrast
      iconBg: isToday ? "bg-white/20" : "bg-ggo-teal/10",
    };
  };

  const themeStyles = getThemeStyles();

  // Mood-adjusted reassurance message
  const getReassuranceMessage = () => {
    if (moodState === "low") {
      return `This is completely normal. ${day.reassurance}`;
    }
    return day.reassurance;
  };

  // Background intensity based on completion
  const getBackgroundIntensity = () => {
    const progress = day.day / totalDays;
    if (progress > 0.8) {
      // Near completion - add gold accent with better contrast
      return isToday 
        ? "linear-gradient(135deg, #A67C3B 0%, #C9A65C 100%)"  // Dark gold for white text contrast
        : "linear-gradient(135deg, #FFF9E6 0%, #FFFFFF 100%)";
    }
    return themeStyles.background;
  };

  return (
    <motion.div
      className={`
        flex-shrink-0 w-[320px] overflow-hidden shadow-lg
        ${isToday ? 'ring-4 ring-ggo-gold/40' : 'border border-ggo-navy/10'}
        ${className}
      `}
      style={{
        background: typeof getBackgroundIntensity() === 'string' 
          ? getBackgroundIntensity() 
          : themeStyles.background,
        borderRadius: "24px",
        minHeight: "400px",
        boxShadow: "0 2px 8px rgba(30, 58, 91, 0.08), 0 1px 3px rgba(30, 58, 91, 0.06)"
      }}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      whileHover={reducedMotion ? {} : { scale: 1.02 }}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${themeStyles.iconBg}`}>
              <Sunrise className={`w-6 h-6 ${isToday && theme === 'light' ? 'text-white' : 'text-ggo-teal'}`} />
            </div>
            <div>
              <p className={`text-xs uppercase tracking-wide mb-1 ${themeStyles.textSecondary}`}>
                Day {day.day}
              </p>
              <h3 className={`${themeStyles.textPrimary}`}>
                {day.title}
              </h3>
            </div>
          </div>
          {/* Compass micro progress */}
          <CompassMicroProgress day={day.day} totalDays={totalDays} size={32} />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6 space-y-4">
        {/* "Today you may notice..." heading */}
        <div>
          <p className={`text-xs uppercase tracking-wide mb-2 ${themeStyles.textSecondary}`}>
            Today you may notice…
          </p>
          
          {/* Reassurance - Largest (18px base, 22px for larger text) */}
          <div className="relative">
            <p 
              className={`leading-relaxed font-normal ${themeStyles.textPrimary}`}
              style={{ fontSize: largerText ? "22px" : "18px", lineHeight: "1.5", maxWidth: "70ch" }}
            >
              {getReassuranceMessage()}
            </p>
            {day.whyThisHappens && (
              <button
                className={`mt-2 flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 rounded ${
                  isToday 
                    ? 'text-white/90 hover:text-white focus:ring-white' 
                    : 'text-ggo-teal hover:text-ggo-teal/80 focus:ring-ggo-teal'
                }`}
                onClick={() => setShowTooltip(!showTooltip)}
                aria-label="Learn why this happens"
              >
                <Info className="w-4 h-4" />
                Why this happens
              </button>
            )}
            {showTooltip && day.whyThisHappens && (
              <motion.div
                className="mt-2 p-3 bg-white/90 backdrop-blur-sm rounded-lg text-sm text-ggo-text-muted border border-ggo-teal/20"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                {day.whyThisHappens}
              </motion.div>
            )}
          </div>
        </div>

        {/* Forecast - Optional variant */}
        {showForecast && day.forecast && (
          <motion.div 
            className={`p-4 rounded-xl ${isToday ? 'bg-white/20 backdrop-blur-sm' : 'bg-ggo-teal/5'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <p className={`font-medium mb-1 italic ${isToday ? 'text-white' : 'text-ggo-teal'}`} style={{ fontSize: largerText ? "16px" : "14px" }}>Things improving soon…</p>
            <p className={`${themeStyles.textSecondary}`} style={{ fontSize: largerText ? "18px" : "16px" }}>
              {day.forecast}
            </p>
          </motion.div>
        )}

        {/* Nurse Note - Teal, italic per spec */}
        {day.nurseNote && (
          <div className={`p-4 rounded-xl border-l-4 ${isToday && theme === 'light' ? 'border-white bg-white/20 backdrop-blur-sm' : 'border-ggo-teal bg-ggo-teal/5'}`}>
            <p className={`text-sm font-medium mb-2 italic ${isToday && theme === 'light' ? 'text-white' : 'text-ggo-teal'}`}>
              {day.nurseName || "Your care team"} says:
            </p>
            <p className={`text-sm italic ${themeStyles.textSecondary}`}>
              "{day.nurseNote}"
            </p>
          </div>
        )}
      </div>

      {/* Red Flag Strip - Collapsible, WCAG 7:1 contrast */}
      <div className="border-t-2 border-ggo-alert-red/20">
        <button
          onClick={() => setShowRedFlags(!showRedFlags)}
          className="w-full px-6 py-3 flex items-center justify-between bg-ggo-alert-red/10 hover:bg-ggo-alert-red/15 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ggo-teal"
          aria-expanded={showRedFlags}
          aria-label="Toggle red flag warnings"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-ggo-alert-red" />
            <span className="font-bold text-ggo-alert-red" style={{ fontSize: "16px" }}>
              ⚠ Call if…
            </span>
          </div>
          {showRedFlags ? (
            <ChevronUp className="w-5 h-5 text-ggo-alert-red" />
          ) : (
            <ChevronDown className="w-5 h-5 text-ggo-alert-red" />
          )}
        </button>
        
        {showRedFlags && (
          <motion.div
            className="px-6 py-4 bg-[#F9D7D7]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <ul className="space-y-3">
              {day.redFlags.map((flag, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-2"
                  style={{ fontSize: "14px", padding: "0 16px" }}
                >
                  <span className="text-ggo-alert-red mt-0.5 font-bold text-lg">•</span>
                  <span className="text-ggo-text-dark font-medium">{flag}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-ggo-text-muted mt-4 italic font-medium px-4">
              {supportLine
                ? `If concerned, call ${supportLine} or dial 999 for emergencies.`
                : "If concerned, contact your care team or emergency services."}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
