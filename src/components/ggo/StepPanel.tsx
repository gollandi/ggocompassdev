import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, FileText, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { VideoPlayer } from "./VideoPlayer";
import { portableTextToParagraphs, type PortableTextBlock } from "@/lib/sanity/text";
import { useMemo } from "react";
import type { EmergencyContactDetails } from "@/lib/sanity/queries";

interface StepPanelStep {
  _id: string;
  title: string;
  summary: string;
  timeframe?: string;
  tasks?: string[];
  video?: {
    url?: string;
    title?: string;
    duration?: string;
    thumbnail?: string;
  };
  clinicalGuidance?: PortableTextBlock[];
  link?: string;
}

interface StepPanelProps {
  step: StepPanelStep;
  onClose: () => void;
  emergencyContacts?: EmergencyContactDetails | null;
}

export function StepPanel({ step, onClose, emergencyContacts }: StepPanelProps) {
  const guidanceParagraphs = useMemo(
    () => portableTextToParagraphs(step.clinicalGuidance),
    [step.clinicalGuidance]
  );

  const urgentLine =
    emergencyContacts?.procedure.emergencyContacts?.urgentLine ||
    emergencyContacts?.location.contacts?.emergency?.urgentLine;

  const secondaryLines = [
    {
      label: "Out of hours",
      value: emergencyContacts?.location.contacts?.emergency?.outOfHours,
    },
    {
      label: "Consultant team",
      value: emergencyContacts?.procedure.emergencyContacts?.consultantTeam,
    },
    {
      label: "Specialist nurse",
      value: emergencyContacts?.procedure.emergencyContacts?.specialistNurse,
    },
    {
      label: "Main hospital",
      value: emergencyContacts?.location.contacts?.main.phone,
    },
  ].filter((entry) => Boolean(entry.value));

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-ggo-navy/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-ggo-navy mb-2">{step.title}</h2>
              <p className="text-ggo-text-muted">{step.summary}</p>
              {step.timeframe && (
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ggo-light text-xs text-ggo-navy font-medium">
                  <Clock className="w-4 h-4" />
                  {step.timeframe}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-ggo-light rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-ggo-navy" />
            </button>
          </div>

          {/* Tabs */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <Tabs defaultValue="what" className="p-6">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="what">What Happens</TabsTrigger>
                <TabsTrigger value="nurse">Clinical guidance</TabsTrigger>
                <TabsTrigger value="red-flags">How to get help</TabsTrigger>
              </TabsList>

              <TabsContent value="what" className="space-y-6">
                {step.video?.url && (
                  <VideoPlayer
                    url={step.video?.url}
                    title={step.video?.title || "Step overview"}
                    duration={step.video?.duration}
                    thumbnail={step.video?.thumbnail}
                  />
                )}

                {step.tasks?.length ? (
                  <div className="border-l-4 border-ggo-navy pl-4">
                    <h3 className="text-ggo-navy mb-3">Checklist</h3>
                    <ul className="space-y-2 text-ggo-navy list-disc list-inside">
                      {step.tasks.map((task, index) => (
                        <li key={`${step._id}-task-${index}`}>{task}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="border-l-4 border-ggo-navy/40 pl-4">
                    <p className="text-ggo-text-muted">
                      Detailed tasks for this step will appear here once your care team publishes them in the CMS.
                    </p>
                  </div>
                )}

                {step.link && (
                  <div className="pt-4 mt-4 border-t border-ggo-navy/5">
                    <a
                      href={step.link.startsWith('http') ? step.link : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-ggo-navy text-white rounded-xl hover:bg-ggo-navy/90 transition-all font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      View detailed guide on website
                    </a>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="nurse" className="space-y-4">
                <div className="bg-ggo-teal/10 rounded-xl p-6 border-l-4 border-ggo-teal">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-ggo-teal mt-1" />
                    <div className="space-y-3 text-ggo-teal">
                      {guidanceParagraphs.length ? (
                        guidanceParagraphs.map((paragraph, index) => (
                          <p key={`${step._id}-guidance-${index}`} className="italic">
                            {paragraph}
                          </p>
                        ))
                      ) : (
                        <p className="italic">
                          Your clinical team will add the detailed guidance for this step shortly.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="red-flags" className="space-y-4">
                <div className="bg-ggo-alert-red/10 rounded-xl p-6 border-l-4 border-ggo-alert-red">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-ggo-alert-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-ggo-alert-red mb-3">Call immediately if you notice:</h4>
                      <ul className="space-y-2 text-ggo-text-dark">
                        <li className="flex items-start gap-2">
                          <span className="text-ggo-alert-red mt-1">•</span>
                          <span>Severe pain not controlled by prescribed medication</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-ggo-alert-red mt-1">•</span>
                          <span>Heavy bleeding, clots, or rapidly spreading swelling</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-ggo-alert-red mt-1">•</span>
                          <span>Fever above 38°C, chills, or infection signs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-ggo-alert-red mt-1">•</span>
                          <span>Difficulty passing urine, breathing issues, or chest pain</span>
                        </li>
                      </ul>
                      <p className="text-xs text-ggo-text-muted mt-4 italic font-medium">
                        Source — BAUS Clinical Guidelines 2025
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-ggo-teal/10 rounded-xl p-6">
                  <h4 className="text-ggo-navy mb-3">Your care team contacts</h4>
                  {urgentLine ? (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-ggo-navy">Urgent line</p>
                      <p className="text-lg font-semibold text-ggo-teal">{urgentLine}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-ggo-text-muted mb-4">
                      Your location hasn’t published an urgent number yet. Use the NHS 111 advice line or dial 999 in an emergency.
                    </p>
                  )}

                  {secondaryLines.length > 0 && (
                    <ul className="space-y-2 text-sm text-ggo-text-muted mb-4">
                      {secondaryLines.map((entry) => (
                        <li key={entry.label} className="flex items-center justify-between">
                          <span>{entry.label}</span>
                          <span className="font-medium text-ggo-navy">{entry.value}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {urgentLine && (
                      <a
                        href={`tel:${urgentLine.replace(/\s+/g, "")}`}
                        className="inline-flex items-center justify-center px-6 py-3 bg-ggo-teal text-white rounded-lg hover:bg-ggo-teal/90 transition-colors font-medium"
                      >
                        Call urgent line
                      </a>
                    )}
                    <a
                      href="tel:111"
                      className="inline-flex items-center justify-center px-4 py-3 bg-white text-ggo-navy border border-ggo-navy/10 rounded-lg hover:border-ggo-navy/30 transition-colors text-sm font-medium"
                    >
                      NHS 111
                    </a>
                    <a
                      href="tel:999"
                      className="inline-flex items-center justify-center px-4 py-3 bg-white text-ggo-alert-red border border-ggo-alert-red/30 rounded-lg hover:border-ggo-alert-red transition-colors text-sm font-bold"
                    >
                      Emergency 999
                    </a>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
