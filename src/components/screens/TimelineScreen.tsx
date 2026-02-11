'use client';

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { PhaseRail, Phase } from "../ggo/PhaseRail";
import { CompassLogo } from "../ggo/CompassLogo";
import { StepPanel } from "../ggo/StepPanel";
import { FooterDisclaimer } from "../ggo/FooterDisclaimer";
import { CheckCircle2, Circle } from "lucide-react";

import { PersonalisePreferences } from "./PersonaliseScreen";
import { getEmergencyContacts, getTimelineSteps, type TimelineStep, type EmergencyContactDetails, getMicrocopyMap } from "@/lib/sanity/queries";
import { microcopyDefaults } from "@/data/microcopyDefaults";

interface TimelineScreenProps {
  procedure: string;
  procedureId?: string;
  procedureSlug?: string;
  site: string;
  siteSlug?: string;
  date?: Date;
  preferences?: PersonalisePreferences;
  onComplete: () => void;
}

type TimelineUiStep = {
  _id: string;
  phase: Phase;
  title: string;
  summary: string;
  completed: boolean;
  timeframe?: string;
  tasks?: string[];
  video?: TimelineStep["video"];
  clinicalGuidance?: TimelineStep["clinicalGuidance"];
  order?: number;
  link?: string;
};

const legacyPhaseSteps: Record<Phase, Array<{ id: string; title: string; description: string; completed: boolean; link?: string }>> = {
  book: [
    { id: "b1", title: "Appointment confirmed", description: "You're booked and ready. Everything starts here.", completed: true },
    { id: "b2", title: "Pre-assessment scheduled", description: "Check your email for details. This ensures you're fit for surgery.", completed: false },
  ],
  prepare: [
    { id: "p1", title: "How to get ready", description: "Learn how to prepare your body and home for recovery.", completed: false, link: "link.preop_guide" },
    { id: "p2", title: "Anaesthesia explained", description: "Understand the different types of anaesthesia and fasting rules.", completed: false, link: "link.anaesthesia_info" },
    { id: "p3", title: "What to bring: Day Case", description: "Loose clothing, medications, and a book. You'll need a driver home.", completed: false },
    { id: "p4", title: "What to bring: Admitted", description: "Overnight bag, toiletries, and all regular medications.", completed: false },
    { id: "p5", title: "Arrange transport home", description: "You'll need a responsible adult to drive you and stay for 24 hours.", completed: false },
  ],
  attend: [
    { id: "a1", title: "Arrive 30 minutes early", description: "Bring your ID and medical records.", completed: false },
    { id: "a2", title: "Check-in at reception", description: "Our team will guide you through the final steps.", completed: false },
    { id: "a3", title: "Meet your surgical team", description: "The surgeon and anaesthetist will perform final checks.", completed: false },
  ],
  recover: [
    { id: "r1", title: "Rest for 24-48 hours", description: "Your body needs time to heal. Sleep is your friend.", completed: false },
    { id: "r2", title: "Follow wound care instructions", description: "Keep it clean and dry. No soaking.", completed: false },
    { id: "r3", title: "Take prescribed medications", description: "Pain management is most effective when taken regularly.", completed: false },
    { id: "r4", title: "Watch for red flags", description: "Know when to call us immediately.", completed: false },
  ],
  review: [
    { id: "rv1", title: "Attend follow-up appointment", description: "Let's check your progress and results.", completed: false },
    { id: "rv2", title: "Share your feedback", description: "Help us improve the journey for others.", completed: false },
  ],
};

const buildEmptyPhases = (): Record<Phase, TimelineUiStep[]> => ({
  book: [],
  prepare: [],
  attend: [],
  recover: [],
  review: [],
});

const buildFallbackSteps = (): Record<Phase, TimelineUiStep[]> => {
  const base = buildEmptyPhases();
  (Object.keys(legacyPhaseSteps) as Phase[]).forEach((phase) => {
    base[phase] = legacyPhaseSteps[phase].map((step, index) => ({
      _id: `${phase}-${step.id || index}`,
      phase,
      title: step.title,
      summary: step.description,
      completed: step.completed,
      tasks: [step.description],
      order: index,
      link: step.link,
    }));
  });
  return base;
};

const normalisePhase = (phase?: string | null): Phase => {
  const lower = (phase || "").toLowerCase();
  if (lower.includes("prepare") || lower === "pre-assessment") return "prepare";
  if (lower.includes("attend") || lower.includes("day-of") || lower === "surgery") return "attend";
  if (lower.includes("recover") || lower.includes("healing")) return "recover";
  if (lower.includes("review") || lower.includes("follow")) return "review";
  return "book";
};

const toUiSteps = (steps: TimelineStep[]): Record<Phase, TimelineUiStep[]> => {
  const grouped = buildEmptyPhases();
  steps.forEach((step) => {
    const phase = normalisePhase(step.phase);
    grouped[phase].push({
      _id: step._id,
      phase,
      title: step.title,
      summary: step.tasks?.[0] || step.timeframe || "Tap to view the details",
      completed: step.isCompleted ?? false,
      timeframe: step.timeframe,
      tasks: step.tasks,
      video: step.video,
      clinicalGuidance: step.clinicalGuidance,
      order: step.order,
    });
  });

  (Object.keys(grouped) as Phase[]).forEach((phase) => {
    grouped[phase].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  });

  return grouped;
};

const phaseNeedleRotation: Record<Phase, number> = {
  book: 45,
  prepare: 55,
  attend: 65,
  recover: 75,
  review: 85,
};

export function TimelineScreen({
  procedure,
  procedureId,
  procedureSlug,
  site,
  siteSlug,
  date,
  preferences,
  onComplete,
}: TimelineScreenProps) {
  const [currentPhase, setCurrentPhase] = useState<Phase>("book");
  const [selectedStep, setSelectedStep] = useState<TimelineUiStep | null>(null);
  const [stepsByPhase, setStepsByPhase] = useState<Record<Phase, TimelineUiStep[]>>(() => buildFallbackSteps());
  const [isLoadingSteps, setIsLoadingSteps] = useState(() => Boolean(procedureId));
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContactDetails | null>(null);
  const [microcopyMap, setMicrocopyMap] = useState<Record<string, string>>(microcopyDefaults);

  useEffect(() => {
    getMicrocopyMap().then((map) => {
      setMicrocopyMap((prev) => ({ ...prev, ...map }));
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!procedureId) {
      setStepsByPhase(buildFallbackSteps());
      setIsLoadingSteps(false);
      return () => {
        cancelled = true;
      };
    }

    setIsLoadingSteps(true);
    getTimelineSteps(procedureId)
      .then((data) => {
        if (cancelled) return;
        if (!data?.length) {
          setStepsByPhase(buildFallbackSteps());
        } else {
          setStepsByPhase(toUiSteps(data));
        }
      })
      .catch(() => {
        if (cancelled) return;
        setStepsByPhase(buildFallbackSteps());
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoadingSteps(false);
      });

    return () => {
      cancelled = true;
    };
  }, [procedureId]);

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

  const toggleStepComplete = (stepId: string) => {
    setStepsByPhase((prev) => {
      const next = { ...prev };
      (Object.keys(next) as Phase[]).forEach((phase) => {
        next[phase] = next[phase].map((step) =>
          step._id === stepId ? { ...step, completed: !step.completed } : step
        );
      });
      return next;
    });
  };

  const currentSteps = stepsByPhase[currentPhase] ?? [];
  const completedSteps = currentSteps.filter(s => s.completed).length;
  const totalSteps = currentSteps.length;
  const noStepsAvailable = !isLoadingSteps && totalSteps === 0;

  const contactSummary = useMemo(() => {
    if (!emergencyContacts) return null;
    const urgentLine =
      emergencyContacts.procedure.emergencyContacts?.urgentLine ||
      emergencyContacts.location.contacts?.emergency?.urgentLine ||
      emergencyContacts.location.contacts?.main.phone;
    return urgentLine;
  }, [emergencyContacts]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm py-6 px-6 md:px-24">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CompassLogo size={48} needleRotation={phaseNeedleRotation[currentPhase]} />
            <div>
              <h2 className="text-ggo-navy">{procedure}</h2>
              <p className="text-ggo-text-muted">
                {site}
                {date && ` · ${date.toLocaleDateString()}`}
              </p>
            </div>
          </div>
          <button
            onClick={onComplete}
            className="px-6 py-2 text-sm bg-ggo-teal text-white rounded-xl hover:bg-ggo-teal/90 transition-all font-medium"
          >
            Skip to Recovery →
          </button>
        </div>
      </div>

      {/* Phase Rail */}
      <div className="py-12 px-6 md:px-24 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <PhaseRail currentPhase={currentPhase} onPhaseClick={setCurrentPhase} />
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-6 md:px-24 pb-24">
        <motion.div
          className="max-w-4xl mx-auto"
          key={currentPhase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Phase Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-ggo-navy capitalize">{currentPhase}</h1>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-ggo-light rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-ggo-teal relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Gold glow for current phase */}
                  <motion.div
                    className="absolute inset-0 bg-ggo-gold/40"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
                  />
                </motion.div>
              </div>
              <span className="text-ggo-text-muted font-medium">
                {completedSteps} of {totalSteps}
              </span>
            </div>
          </div>

          {/* Steps List */}
          {isLoadingSteps ? (
            <p className="text-ggo-text-muted">Loading your personalised plan…</p>
          ) : (
            <div className="space-y-4">
              {currentSteps.map((step, index) => (
                <motion.div
                  key={step._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="w-full bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 group">
                    <div className="flex items-start gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStepComplete(step._id);
                        }}
                        className="mt-1 flex-shrink-0"
                        aria-label={step.completed ? "Mark as incomplete" : "Mark as complete"}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-ggo-teal" />
                        ) : (
                          <Circle className="w-6 h-6 text-ggo-navy/30 group-hover:text-ggo-teal transition-colors" />
                        )}
                      </button>
                      <button
                        onClick={() => setSelectedStep(step)}
                        className="flex-1 text-left"
                      >
                        <h4 className={`mb-1 ${step.completed ? 'text-ggo-navy/60 line-through' : 'text-ggo-navy'}`}>
                          {step.title}
                        </h4>
                        <p className="text-ggo-text-muted">
                          {step.summary}
                        </p>
                        {step.timeframe && (
                          <p className="text-xs text-ggo-text-muted mt-1">{step.timeframe}</p>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {noStepsAvailable && (
                <p className="text-ggo-text-muted italic">
                  We’re still preparing the content for this phase. Check back soon or contact your care team.
                </p>
              )}
            </div>
          )}

          {/* Helpful Message */}
          <motion.div
            className="mt-12 bg-ggo-teal/10 rounded-xl p-6 border-l-4 border-ggo-teal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-ggo-navy font-medium">
              You're exactly where you should be.{" "}
              {currentPhase === "recover" && "Healing has its own rhythm — follow your compass."}
              {contactSummary && ` Need us? Call ${contactSummary}.`}
            </p>
          </motion.div>

          {/* Begin Recovery Journey Button - appears when on recover phase */}
          {currentPhase === "recover" && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <button
                onClick={onComplete}
                className="px-8 py-4 bg-ggo-teal text-white rounded-xl shadow-lg hover:shadow-xl hover:bg-ggo-teal/90 transition-all min-h-[48px] font-medium"
              >
                Begin Daily Recovery Guidance →
              </button>
              <p className="text-xs text-ggo-text-muted mt-3 font-medium">
                Get personalized day-by-day support from your care team
              </p>
            </motion.div>
          )}

          {/* Website Resources */}
          <motion.div
            className="mt-16 pt-8 border-t border-ggo-navy/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-ggo-navy mb-6">Additional Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href={microcopyMap["link.patient_info"] || "https://ggomedical.co.uk/patient-information"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white rounded-2xl border border-ggo-navy/5 shadow-sm hover:shadow-md transition-all group"
              >
                <h4 className="text-ggo-navy mb-1 group-hover:text-ggo-teal transition-colors">Patient Information Hub</h4>
                <p className="text-sm text-ggo-text-muted">A full library of leaflets and guides for all procedures.</p>
              </a>
              <a
                href={microcopyMap["link.preop_guide"] || "https://ggomedical.co.uk/preparing-for-surgery"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white rounded-2xl border border-ggo-navy/5 shadow-sm hover:shadow-md transition-all group"
              >
                <h4 className="text-ggo-navy mb-1 group-hover:text-ggo-teal transition-colors">Preparing for Surgery</h4>
                <p className="text-sm text-ggo-text-muted">Detailed guidance on fasting, medications, and transport.</p>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <FooterDisclaimer />
      </div>

      {/* Step Detail Panel */}
      {selectedStep && (
        <StepPanel
          step={{
            ...selectedStep,
            link: selectedStep.link ? (microcopyMap[selectedStep.link] || selectedStep.link) : undefined
          }}
          onClose={() => setSelectedStep(null)}
          emergencyContacts={emergencyContacts}
        />
      )}
    </div>
  );
}
