'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { GGOButton } from "../ggo/GGOButton";
import { FooterDisclaimer } from "../ggo/FooterDisclaimer";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { loadSurgeryDate } from "@/utils/preferences";

interface DateInputScreenProps {
  procedure: string;
  site: string;
  onNext: (date: Date) => void;
  onBrowseMode: () => void;  // New: Allow skipping date for info browsing
}

export function DateInputScreen({ procedure, site, onNext, onBrowseMode }: DateInputScreenProps) {
  const [date, setDate] = useState<Date>();
  const [naturalInput, setNaturalInput] = useState("");

  useEffect(() => {
    const stored = loadSurgeryDate();
    if (stored) {
      const parsed = new Date(stored);
      if (!Number.isNaN(parsed.valueOf())) {
        setDate(parsed);
        setNaturalInput(parsed.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }));
      }
    }
  }, []);

  const handleNext = () => {
    if (date) {
      onNext(date);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 py-12 px-6 md:px-24">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4 text-ggo-navy">When is your appointment?</h1>
            <p className="text-ggo-text-muted font-medium">
              Small steps now make recovery smoother.
            </p>
          </div>

        {/* Natural Language Input */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block mb-3 text-ggo-navy">
            Enter your appointment date
          </label>
          <input
            type="text"
            placeholder="e.g., Next Tuesday, 15th December, Tomorrow..."
            value={naturalInput}
            onChange={(e) => setNaturalInput(e.target.value)}
            className="w-full px-4 py-4 bg-white rounded-xl border-2 border-transparent focus:border-ggo-teal focus:outline-none transition-colors shadow-md"
          />
        </motion.div>

        {/* Calendar Picker */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block mb-3 text-ggo-navy">
            Or pick from calendar
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full px-4 py-4 bg-white rounded-xl border-2 border-transparent hover:border-ggo-teal focus:border-ggo-teal focus:outline-none transition-colors shadow-md text-left flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-ggo-teal" />
                <span className={date ? "text-ggo-navy" : "text-ggo-text-muted"}>
                  {date ? formatDate(date) : "Select a date"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={() => false}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </motion.div>

        {/* Summary Card */}
        {date && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-xl p-8 mb-8 shadow-md">
              <h3 className="mb-6 text-ggo-navy">Confirm your details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-ggo-text-muted mb-1">Procedure</p>
                  <p className="text-ggo-navy">{procedure}</p>
                </div>
                <div>
                  <p className="text-ggo-text-muted mb-1">Site</p>
                  <p className="text-ggo-navy">{site}</p>
                </div>
                <div>
                  <p className="text-ggo-text-muted mb-1">Date</p>
                  <p className="text-ggo-navy">{formatDate(date)}</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <GGOButton 
                variant="primary" 
                onClick={handleNext}
                className="min-h-[48px]"
              >
                Confirm & Continue
              </GGOButton>
            </div>
          </motion.div>
        )}

        {/* Browse Mode - Skip Date Entry */}
        <motion.div
          className="mt-12 pt-8 border-t border-ggo-navy/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-ggo-text-muted mb-4 font-medium">
            Not scheduled yet? You can still explore what to expect.
          </p>
          <button
            onClick={onBrowseMode}
            className="px-6 py-3 text-ggo-teal hover:text-ggo-teal/80 font-medium underline transition-colors focus:outline-none focus:ring-2 focus:ring-ggo-teal rounded"
          >
            Skip date — Just browsing recovery info →
          </button>
        </motion.div>
        </motion.div>
      </div>
      
      <FooterDisclaimer />
    </div>
  );
}
