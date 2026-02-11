'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";
import { RecoveryDayCard, MoodVariant, type RecoveryDay as RecoveryDayContent } from "../ggo/RecoveryDayCard";
import { MoodSlider } from "../ggo/MoodSlider";
import { CompassLogo } from "../ggo/CompassLogo";
import { FooterDisclaimer } from "../ggo/FooterDisclaimer";
import { PatientNoteField } from "../ggo/PatientNoteField";
import { ModeSwitcher, NavigationMode } from "../ggo/ModeSwitcher";
import { PhaseJumper } from "../ggo/PhaseJumper";
import {
  TrackingProgressHint,
  TrackingEncouragement,
  SafetyWeekEnd
} from "../ggo/MicrocopyText";
import { getRecoveryTimeline as getStaticRecoveryTimeline } from "../../data/recoveryData";
import { calculateRecoveryDay, getTimeBasedGreeting, formatRelativeDay } from "../../utils/dateCalculations";
import { encouragementMessages, weeklyMessages } from "../../data/microcopyStyles";
import { loadPreferences, showEncouragement, loadSurgeryDate, saveSurgeryDate, clearSurgeryDate } from "../../utils/preferences";
import {
  Pill,
  Bandage,
  Activity,
  Phone,
  ChevronLeft,
  ChevronRight,
  Lock
} from "lucide-react";

import { PersonalisePreferences } from "./PersonaliseScreen";
import { portableTextToPlainText } from "@/lib/sanity/text";
import {
  getEmergencyContacts,
  getRecoveryDaysForProcedure,
  getMicrocopyMap,
  type RecoveryDay as SanityRecoveryDay,
  type EmergencyContactDetails
} from "@/lib/sanity/queries";

const mapSanityDayToPartial = (day: SanityRecoveryDay) => ({
  day: day.dayNumber,
  title: day.title?.trim() ?? "",
  reassurance: portableTextToPlainText(day.normalExperiences)?.trim() ?? "",
  forecast: portableTextToPlainText(day.forecast)?.trim() ?? "",
  redFlags: day.redFlags ?? [],
  nurseNote: day.nurseNote?.trim() ?? "",
  nurseName: day.nurseName?.trim() ?? "",
  whyThisHappens: day.whyThisHappens?.trim() ?? "",
});

const mergeRecoveryDays = (
  fallbackDays: RecoveryDayContent[],
  sanityDays: SanityRecoveryDay[]
): RecoveryDayContent[] => {
  if (!sanityDays?.length) return fallbackDays;

  const sanityByDay = new Map(
    sanityDays.map((day) => [day.dayNumber, mapSanityDayToPartial(day)])
  );

  const merged = fallbackDays.map((fallback) => {
    const sanity = sanityByDay.get(fallback.day);
    if (!sanity) return fallback;

    return {
      ...fallback,
      title: sanity.title || fallback.title,
      reassurance: sanity.reassurance || fallback.reassurance,
      forecast: sanity.forecast || fallback.forecast,
      redFlags: sanity.redFlags?.length ? sanity.redFlags : fallback.redFlags,
      nurseNote: sanity.nurseNote || fallback.nurseNote,
      nurseName: sanity.nurseName || fallback.nurseName,
      whyThisHappens: sanity.whyThisHappens || fallback.whyThisHappens,
    };
  });

  const fallbackDayNumbers = new Set(fallbackDays.map((day) => day.day));
  const sanityOnly = sanityDays
    .filter((day) => !fallbackDayNumbers.has(day.dayNumber))
    .map((day) => {
      const sanity = mapSanityDayToPartial(day);
      return {
        day: day.dayNumber,
        title: sanity.title || `Day ${day.dayNumber}`,
        reassurance:
          sanity.reassurance ||
          "Your care team will add expectations for this day soon.",
        forecast: sanity.forecast,
        redFlags: sanity.redFlags ?? [],
        nurseNote: sanity.nurseNote || undefined,
        nurseName: sanity.nurseName || undefined,
        whyThisHappens: sanity.whyThisHappens || undefined,
      } as RecoveryDayContent;
    });

  return [...merged, ...sanityOnly].sort((a, b) => a.day - b.day);
};

type QuickAccessKey = "pain" | "wound" | "activity" | "call";
interface QuickAccessContentEntry {
  title: string;
  content: string;
  contacts?: Array<{ label: string; value: string }>;
}

interface RecoveryScreenProps {
  procedure: string;
  procedureId?: string;
  procedureSlug?: string;
  site: string;
  siteSlug?: string;
  preferences?: PersonalisePreferences;
  mode: NavigationMode;
  surgeryDate?: Date;
  onComplete: () => void;
  onModeChange?: (mode: NavigationMode) => void;
}

export function RecoveryScreen({
  procedure,
  procedureId,
  procedureSlug,
  site,
  siteSlug,
  preferences,
  mode: initialMode,
  surgeryDate,
  onComplete,
  onModeChange
}: RecoveryScreenProps) {
  const [recoveryDays, setRecoveryDays] = useState<RecoveryDayContent[]>([]);
  const [isRecoveryLoading, setIsRecoveryLoading] = useState(true);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContactDetails | null>(null);
  const [mode, setMode] = useState<NavigationMode>(initialMode);
  const [microcopyMap, setMicrocopyMap] = useState<Record<string, string>>({});
  const storedPrefs = useMemo(() => loadPreferences(), []);
  const userName = storedPrefs.name?.trim();
  const namePrefix = userName ? `${userName}, ` : "";
  const fallbackAccessibility = useMemo(() => {
    const options: string[] = [];
    if (storedPrefs.accessibility.highContrast) options.push("High Contrast");
    if (storedPrefs.accessibility.reducedMotion) options.push("Reduced Motion");
    if (storedPrefs.accessibility.largeText) options.push("Larger Text");
    return options;
  }, [storedPrefs]);
  const accessibilityChoices = preferences?.accessibility ?? fallbackAccessibility;

  useEffect(() => {
    let cancelled = false;
    const fallback = getStaticRecoveryTimeline(procedure);

    if (!procedureId) {
      setRecoveryDays(fallback);
      setIsRecoveryLoading(false);
      return () => {
        cancelled = true;
      };
    }

    setIsRecoveryLoading(true);
    getRecoveryDaysForProcedure(procedureId)
      .then((days) => {
        if (cancelled) return;
        if (!days?.length) {
          setRecoveryDays(fallback);
        } else {
          setRecoveryDays(mergeRecoveryDays(fallback, days));
        }
      })
      .catch(() => {
        if (!cancelled) setRecoveryDays(fallback);
      })
      .finally(() => {
        if (!cancelled) setIsRecoveryLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [procedureId, procedure]);

  useEffect(() => {
    let cancelled = false;
    if (!procedureSlug || !siteSlug) {
      setEmergencyContacts(null);
      return () => {
        cancelled = true;
      };
    }

    getEmergencyContacts(procedureSlug, siteSlug)
      .then((details) => {
        if (!cancelled) setEmergencyContacts(details);
      })
      .catch(() => {
        if (!cancelled) setEmergencyContacts(null);
      });

    return () => {
      cancelled = true;
    };
  }, [procedureSlug, siteSlug]);

  useEffect(() => {
    let cancelled = false;
    getMicrocopyMap()
      .then((map) => {
        if (!cancelled) setMicrocopyMap(map);
      })
      .catch((err) => {
        console.error("Failed to fetch microcopy map", err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Persisted surgery date state (prop wins; otherwise load from localStorage)
  const [surgeryDateState, setSurgeryDateState] = useState<Date | null>(surgeryDate ?? null);
  useEffect(() => {
    if (!surgeryDate) {
      const stored = loadSurgeryDate();
      if (stored) {
        const d = new Date(stored);
        d.setHours(0, 0, 0, 0);
        setSurgeryDateState(d);
      }
    } else {
      const d = new Date(surgeryDate);
      d.setHours(0, 0, 0, 0);
      setSurgeryDateState(d);
    }
  }, [surgeryDate]);

  const trackingDay = useMemo(() => {
    if (!surgeryDateState) return 0;
    const calculated = calculateRecoveryDay(surgeryDateState);
    if (!recoveryDays.length) return calculated;
    return Math.min(calculated, recoveryDays.length - 1);
  }, [surgeryDateState, recoveryDays.length]);

  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [patientNote, setPatientNote] = useState("");
  const [showQuickAccess, setShowQuickAccess] = useState<QuickAccessKey | null>(null);
  const [moodState, setMoodState] = useState<MoodVariant>("neutral");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!recoveryDays.length) return;
    if (mode === "tracking" && surgeryDateState) {
      setCurrentDayIndex(trackingDay);
    } else if (currentDayIndex > recoveryDays.length - 1) {
      setCurrentDayIndex(recoveryDays.length - 1);
    }
  }, [mode, surgeryDateState, trackingDay, recoveryDays.length, currentDayIndex]);

  // Surgery date editor UI state
  const [isEditingSurgeryDate, setIsEditingSurgeryDate] = useState(false);
  const toYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = toYMD(today);
  const [draftSurgeryDate, setDraftSurgeryDate] = useState<string>(surgeryDateState ? toYMD(surgeryDateState) : "");
  useEffect(() => {
    setDraftSurgeryDate(surgeryDateState ? toYMD(surgeryDateState) : "");
  }, [surgeryDateState]);

  // Feedback banner state
  const [surgeryFeedback, setSurgeryFeedback] = useState<null | 'saved' | 'cleared'>(null);
  useEffect(() => {
    if (!surgeryFeedback) return;
    const t = setTimeout(() => setSurgeryFeedback(null), 2500);
    return () => clearTimeout(t);
  }, [surgeryFeedback]);

  const handleSaveSurgery = () => {
    if (!draftSurgeryDate) return;
    const d = new Date(draftSurgeryDate);
    d.setHours(0, 0, 0, 0);
    if (d > today) return; // prevent future dates
    saveSurgeryDate(draftSurgeryDate);
    setSurgeryDateState(d);
    setIsEditingSurgeryDate(false);
    setSurgeryFeedback('saved');
    if (mode === "tracking") {
      const dayIndex = Math.min(calculateRecoveryDay(d), recoveryDays.length - 1);
      setCurrentDayIndex(dayIndex);
    }
  };

  const handleClearSurgery = () => {
    // confirm to avoid accidental clear
    if (!confirm('Clear surgery date?')) return;
    clearSurgeryDate();
    setSurgeryDateState(null);
    setIsEditingSurgeryDate(false);
    setSurgeryFeedback('cleared');
    if (mode === "tracking") setCurrentDayIndex(0);
  };

  // Apply accessibility preferences
  const hasReducedMotion = accessibilityChoices.includes("Reduced Motion");
  const hasHighContrast = accessibilityChoices.includes("High Contrast");
  const hasLargerText = accessibilityChoices.includes("Larger Text");

  // Handle mode change
  const handleModeChange = (newMode: NavigationMode) => {
    setMode(newMode);
    if (onModeChange) {
      onModeChange(newMode);
    }

    // If switching to tracking, jump to current day
    if (newMode === "tracking" && surgeryDateState && recoveryDays.length) {
      setCurrentDayIndex(trackingDay);
    }
  };

  // Handle mood changes
  const handleMoodChange = (mood: number) => {
    if (mood <= 3) setMoodState("low");
    else if (mood <= 7) setMoodState("neutral");
    else setMoodState("high");
  };

  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to current day
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = 320 + 16; // card width + gap
      scrollRef.current.scrollTo({
        left: currentDayIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentDayIndex]);

  // Normalise contact lines once (runs even during initial loading to preserve hook order)
  const contactLines = useMemo(() => {
    if (!emergencyContacts) return null;
    return {
      urgentLine:
        emergencyContacts.procedure.emergencyContacts?.urgentLine ||
        emergencyContacts.location.contacts?.emergency?.urgentLine,
      outOfHours: emergencyContacts.location.contacts?.emergency?.outOfHours,
      consultant: emergencyContacts.procedure.emergencyContacts?.consultantTeam,
      nurse: emergencyContacts.procedure.emergencyContacts?.specialistNurse,
      main: emergencyContacts.location.contacts?.main.phone,
    };
  }, [emergencyContacts]);

  const quickAccessContent = useMemo<Record<QuickAccessKey, QuickAccessContentEntry>>(
    () => ({
      pain: {
        title: microcopyMap["quick.pain.title"] || "Pain Control",
        content: microcopyMap["quick.pain.content"] || "Take paracetamol (1g) every 6 hours. Ibuprofen (400mg) can be added if needed. Always take with food. Avoid aspirin unless prescribed.",
      },
      wound: {
        title: microcopyMap["quick.wound.title"] || "Wound Care",
        content: microcopyMap["quick.wound.content"] || "Keep clean and dry for 7 days. After dressing removal, gentle shower is fine. Pat dry, don't rub. No swimming or baths until follow-up.",
      },
      activity: {
        title: microcopyMap["quick.activity.title"] || "Activity Guide",
        content: microcopyMap["quick.activity.content"] || "Week 1: Rest, short walks only. Week 2: Light activities, no lifting >5kg. Week 3-4: Gradual return and avoid contact sports.",
      },
      call: {
        title: microcopyMap["quick.call.title"] || "When to Call Us",
        content: contactLines?.urgentLine
          ? (microcopyMap["quick.call.urgent_prefix"] || "Urgent line: {phone}. Call immediately for severe pain, heavy bleeding, fever, breathing issues, or spreading infection.")
            .replace("{phone}", contactLines.urgentLine)
            .replace("{name}", userName || "") +
          (contactLines?.outOfHours
            ? (microcopyMap["quick.call.ooh_suffix"] || " Out of hours: {phone}.").replace("{phone}", contactLines.outOfHours)
            : (microcopyMap["quick.call.ooh_fallback"] || " Out of hours support: NHS 111."))
          : microcopyMap["quick.call.fallback"] || "Call NHS 111 for urgent medical advice or 999 for life-threatening emergencies while we publish your site-specific number.",
        contacts: contactLines
          ? [
            { label: "Urgent line", value: contactLines.urgentLine },
            { label: "Out of hours", value: contactLines.outOfHours },
            { label: "Consultant team", value: contactLines.consultant },
            { label: "Specialist nurse", value: contactLines.nurse },
            { label: "Main hospital", value: contactLines.main },
          ].filter((entry) => Boolean(entry.value)) as Array<{ label: string; value: string }>
          : undefined,
      },
    }),
    [contactLines, namePrefix, microcopyMap, userName]
  );

  if (isRecoveryLoading && recoveryDays.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center space-y-3">
          <p className="text-ggo-text-muted font-medium">Loading your recovery plan…</p>
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-ggo-teal mx-auto" />
        </div>
      </div>
    );
  }

  if (!recoveryDays.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <p className="text-ggo-text-muted font-medium">
          We couldn’t load this recovery plan yet. Please try again or choose another procedure.
        </p>
      </div>
    );
  }

  const progressPercentage = ((currentDayIndex + 1) / recoveryDays.length) * 100;
  const needleRotation = 45 + (progressPercentage / 100) * 40; // 45° to 85°

  // Dynamic header text based on mode
  const greetingKey = `greeting.${getTimeBasedGreeting().toLowerCase().split(' ')[1] || 'morning'}`;
  const greetingBase = microcopyMap[greetingKey] || `${getTimeBasedGreeting()} — here's what to expect today`;

  const headerText = mode === "tracking"
    ? greetingBase.replace("{name}", userName || "")
    : microcopyMap["greeting.exploring"] || (userName ? `${userName}, select a day to see what recovery feels like` : "Select a day to see what recovery feels like");

  // Get weekly milestone message if applicable
  const currentDay = recoveryDays[currentDayIndex].day;
  const weeklyMessage = microcopyMap[`milestone.${currentDay}`] || weeklyMessages[currentDay as keyof typeof weeklyMessages];
  const personalisedWeeklyMessage = weeklyMessage && namePrefix ? `${namePrefix}${weeklyMessage}` : weeklyMessage;

  // Get random encouragement for tracking mode (only if tone is "warm")
  const shouldShowEncouragement = showEncouragement(storedPrefs.tone);
  const encouragementIndex = currentDay % 10;
  const dailyEncouragement = mode === "tracking" && shouldShowEncouragement
    ? microcopyMap[`encouragement.${encouragementIndex}`] || encouragementMessages[encouragementIndex]
    : null;
  const personalisedEncouragement = dailyEncouragement && namePrefix ? `${namePrefix}${dailyEncouragement}` : dailyEncouragement;

  const progressHintCopy = mode === "tracking"
    ? (microcopyMap["progress.tracking"] || "You're {progress}% through your recovery plan. Keep listening to your body today.")
      .replace("{progress}", Math.round(progressPercentage).toString())
    : microcopyMap["progress.exploring"] || "Tap any card below to preview what recovery feels like.";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm py-6 px-6 md:px-24">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CompassLogo size={48} needleRotation={needleRotation} />
            <div>
              <h2 className="text-ggo-navy">{procedure}</h2>
              <p className="text-ggo-text-muted font-medium">{site} · Recovery Journey</p>
            </div>
          </div>

          {/* Mode Switcher */}
          {onModeChange && (
            <ModeSwitcher
              currentMode={mode}
              onModeChange={handleModeChange}
            />
          )}
        </div>
      </div>

      {/* Progress Tracker & Mode Context */}
      <div className="bg-white border-b py-6 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Feedback banner */}
          <AnimatePresence>
            {surgeryFeedback && (
              <motion.div
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`mb-3 px-3 py-2 rounded-md text-xs font-medium inline-flex items-center gap-2 shadow-sm ${surgeryFeedback === 'saved' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
              >
                {surgeryFeedback === 'saved' ? 'Surgery date saved' : 'Surgery date cleared'}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Weekly milestone message */}
          {personalisedWeeklyMessage && (
            <SafetyWeekEnd className="mb-4">
              {personalisedWeeklyMessage}
            </SafetyWeekEnd>
          )}

          {/* Mode-specific message */}
          <p className="text-ggo-text-muted text-sm mb-4 font-medium">
            {headerText}
          </p>

          {/* Daily encouragement in tracking mode */}
          {personalisedEncouragement && !personalisedWeeklyMessage && (
            <TrackingEncouragement className="mb-4">
              {personalisedEncouragement}
            </TrackingEncouragement>
          )}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-ggo-navy">
                {mode === "exploring"
                  ? formatRelativeDay(recoveryDays[currentDayIndex].day)
                  : `Day ${recoveryDays[currentDayIndex].day} of ${recoveryDays[recoveryDays.length - 1].day}`
                }
              </span>

              {mode === "tracking" && surgeryDateState && (
                <span className="text-xs text-ggo-text-muted">
                  {new Date(surgeryDateState).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              )}
            </div>

            {/* Surgery date set/update control */}
            <div className="flex items-center gap-2">
              {!isEditingSurgeryDate ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-ggo-text-muted">{microcopyMap["recovery.surgery_date.label"] || "Surgery date:"}</span>
                  <span className="text-xs font-medium text-ggo-navy">
                    {surgeryDateState ? new Date(surgeryDateState).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : (microcopyMap["recovery.surgery_date.not_set"] || "Not set")}
                  </span>
                  <button
                    onClick={() => setIsEditingSurgeryDate(true)}
                    className="text-xs px-2 py-1 rounded-md border border-ggo-navy/20 hover:border-ggo-navy/40 bg-white text-ggo-navy shadow-sm"
                  >
                    {surgeryDateState ? (microcopyMap["recovery.surgery_date.change"] || "Change") : (microcopyMap["recovery.surgery_date.set"] || "Set")}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    className="border rounded-md px-2 py-1 text-xs"
                    value={draftSurgeryDate}
                    max={todayStr}
                    onChange={(e) => setDraftSurgeryDate(e.target.value)}
                  />
                  <button
                    onClick={handleSaveSurgery}
                    disabled={!draftSurgeryDate}
                    className="text-xs px-2 py-1 rounded-md bg-ggo-teal text-white disabled:opacity-40"
                  >
                    {microcopyMap["recovery.surgery_date.save"] || "Save"}
                  </button>
                  <button
                    onClick={() => { setIsEditingSurgeryDate(false); setDraftSurgeryDate(surgeryDateState ? toYMD(surgeryDateState) : ""); }}
                    className="text-xs px-2 py-1 rounded-md border border-ggo-navy/20 bg-white text-ggo-navy"
                  >
                    {microcopyMap["recovery.surgery_date.cancel"] || "Cancel"}
                  </button>
                  {surgeryDateState && (
                    <button
                      onClick={handleClearSurgery}
                      className="text-xs px-2 py-1 rounded-md border border-red-300 text-red-700 bg-white"
                    >
                      {microcopyMap["recovery.surgery_date.clear"] || "Clear"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="h-2 bg-ggo-light rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-ggo-teal to-ggo-gold relative"
              initial={mode === "exploring" ? false : { width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{
                duration: mode === "exploring" ? 0.3 : 0.6,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {/* Gold pulse - only in tracking mode */}
              {mode === "tracking" && (
                <motion.div
                  className="absolute inset-0 bg-ggo-gold/40"
                  animate={{ opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
                />
              )}
            </motion.div>
          </div>

          <p className="text-xs text-ggo-text-muted mt-2 font-medium">
            {mode === "tracking"
              ? (microcopyMap["recovery.progress.label"] || "Recovery progress: {progress}%").replace("{progress}", Math.round(progressPercentage).toString())
              : `Viewing day ${recoveryDays[currentDayIndex].day} of ${recoveryDays[recoveryDays.length - 1].day}`
            }
          </p>
          <TrackingProgressHint className="mt-2 text-ggo-text-muted">
            {progressHintCopy}
          </TrackingProgressHint>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-12 px-6 md:px-24 pb-32">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Day Cards Carousel */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-ggo-navy">Your Daily Guidance</h3>
              <div className="flex gap-3">
                {/* Phase Jumper - only in exploring mode */}
                {mode === "exploring" && (
                  <PhaseJumper
                    currentDay={recoveryDays[currentDayIndex].day}
                    onDaySelect={(day) => {
                      const index = recoveryDays.findIndex(d => d.day === day);
                      if (index !== -1) setCurrentDayIndex(index);
                    }}
                    totalDays={recoveryDays[recoveryDays.length - 1].day}
                  />
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentDayIndex(Math.max(0, currentDayIndex - 1))}
                    disabled={currentDayIndex === 0}
                    className="p-2 rounded-lg bg-white border border-ggo-navy/10 shadow-sm hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    aria-label="Previous day"
                  >
                    <ChevronLeft className="w-5 h-5 text-ggo-navy" />
                  </button>
                  <button
                    onClick={() => {
                      const maxDay = mode === "tracking" ? trackingDay : recoveryDays.length - 1;
                      setCurrentDayIndex(Math.min(maxDay, currentDayIndex + 1));
                    }}
                    disabled={
                      mode === "tracking"
                        ? currentDayIndex >= trackingDay
                        : currentDayIndex === recoveryDays.length - 1
                    }
                    className="p-2 rounded-lg bg-white border border-ggo-navy/10 shadow-sm hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    aria-label="Next day"
                  >
                    <ChevronRight className="w-5 h-5 text-ggo-navy" />
                  </button>
                </div>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {recoveryDays.map((day, index) => {
                const isLocked = mode === "tracking" && index > trackingDay;
                const isTomorrow = mode === "tracking" && index === trackingDay + 1;

                return (
                  <div key={day.day} className="relative snap-start">
                    <RecoveryDayCard
                      day={day}
                      isToday={index === currentDayIndex}
                      moodState={moodState}
                      totalDays={recoveryDays[recoveryDays.length - 1].day}
                      showForecast={preferences?.tone !== "Concise"}
                      theme={hasHighContrast ? "high-contrast" : "light"}
                      largerText={hasLargerText}
                      reducedMotion={hasReducedMotion}
                      supportLine={contactLines?.urgentLine || contactLines?.main}
                      className={`
                        ${isLocked ? "opacity-60 pointer-events-none" : ""}
                        ${index === currentDayIndex && mode === "exploring" ? "ring-2 ring-ggo-teal" : ""}
                      `}
                    />

                    {/* Lock overlay for future days in tracking mode */}
                    {isLocked && (
                      <motion.div
                        className="absolute inset-0 bg-ggo-navy/10 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`
                          px-4 py-2 rounded-xl flex items-center gap-2
                          ${isTomorrow
                            ? "bg-ggo-gold/90 text-white"
                            : "bg-white/90 text-ggo-navy"
                          }
                        `}>
                          <Lock className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {isTomorrow ? (microcopyMap["recovery.locked.tomorrow"] || "Unlocks tomorrow") : (microcopyMap["recovery.locked.general"] || "Locked")}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mood Check - with callback */}
          <div>
            <h3 className="text-ggo-navy text-lg font-semibold mb-6 flex items-center justify-between">
              {microcopyMap["recovery.mood.title"] || "Mood & Feeling"}
              <span className="text-xs font-medium text-ggo-text-muted px-2 py-1 bg-ggo-light rounded-full">
                {currentTime}
              </span>
            </h3>
            <MoodSlider onMoodChange={handleMoodChange} recoveryDay={recoveryDays[currentDayIndex].day} surgeryDate={surgeryDateState ?? undefined} />
          </div>

          {/* Quick Access Buttons */}
          <div>
            <h4 className="text-ggo-navy mb-4">Quick Access</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => setShowQuickAccess(showQuickAccess === "pain" ? null : "pain")}
                className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-left group"
              >
                <Pill className="w-6 h-6 text-ggo-teal mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-ggo-navy">
                  {microcopyMap["quick.pain.title"] || "Pain Control"}
                </p>
              </button>
              <button
                onClick={() => setShowQuickAccess(showQuickAccess === "wound" ? null : "wound")}
                className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-left group"
              >
                <Bandage className="w-6 h-6 text-ggo-teal mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-ggo-navy">
                  {microcopyMap["quick.wound.title"] || "Wound Care"}
                </p>
              </button>
              <button
                onClick={() => setShowQuickAccess(showQuickAccess === "activity" ? null : "activity")}
                className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-left group"
              >
                <Activity className="w-6 h-6 text-ggo-teal mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-ggo-navy">
                  {microcopyMap["quick.activity.title"] || "Activity"}
                </p>
              </button>
              <button
                onClick={() => setShowQuickAccess(showQuickAccess === "call" ? null : "call")}
                className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-left group"
              >
                <Phone className="w-6 h-6 text-ggo-alert-red mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-ggo-navy">
                  {microcopyMap["quick.call.title"] || "When to Call"}
                </p>
              </button>
            </div>

            {/* Quick Access Content */}
            {showQuickAccess && quickAccessContent[showQuickAccess] && (
              <motion.div
                className="mt-4 p-6 bg-white rounded-xl shadow-md border-l-4 border-ggo-teal"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-ggo-navy mb-3">
                  {quickAccessContent[showQuickAccess].title}
                </h4>
                <p className="text-ggo-text-muted font-medium leading-relaxed">
                  {quickAccessContent[showQuickAccess].content}
                </p>
                {quickAccessContent[showQuickAccess].contacts && (
                  <ul className="mt-4 space-y-2 text-sm text-ggo-navy">
                    {quickAccessContent[showQuickAccess].contacts!.map((entry) => (
                      <li key={`${showQuickAccess}-${entry.label}`} className="flex items-center justify-between">
                        <span>{entry.label}</span>
                        <span className="font-semibold">{entry.value}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </div>

          {/* Patient Note Section - enhanced component */}
          <PatientNoteField
            value={patientNote}
            onChange={setPatientNote}
            placeholder={microcopyMap["recovery.note.placeholder"] || "Any questions or concerns to discuss at your review? This stays private on your device."}
          />

          {/* Complete Recovery Button */}
          {currentDayIndex === recoveryDays.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <button
                onClick={onComplete}
                className="px-8 py-4 bg-ggo-teal text-white rounded-xl shadow-lg hover:shadow-xl hover:bg-ggo-teal/90 transition-all min-h-[48px] font-medium"
              >
                Complete Recovery Journey
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <FooterDisclaimer />
      </div>
    </div>
  );
}
