import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, Check } from "lucide-react";

interface PatientNoteFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function PatientNoteField({ 
  value, 
  onChange, 
  placeholder = "Add a note for your next review.",
  className = "" 
}: PatientNoteFieldProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (newValue: string) => {
    onChange(newValue);
    setIsSaved(false);
    
    // Auto-save indicator after 1 second of no typing
    setTimeout(() => {
      if (newValue) {
        setIsSaved(true);
      }
    }, 1000);
  };

  return (
    <motion.div
      className={`bg-white rounded-xl p-6 shadow-md ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-4 text-left focus:outline-none focus:ring-2 focus:ring-ggo-teal rounded p-2 -m-2"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-ggo-teal/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-ggo-teal" />
          </div>
          <div>
            <h4 className="text-ggo-navy font-medium">Note for Your Follow-Up</h4>
            <p className="text-xs text-ggo-text-muted">
              {isExpanded ? "Collapse" : value ? "View note" : "Add a private note"}
            </p>
          </div>
        </div>
        {isSaved && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 text-ggo-teal text-sm"
          >
            <Check className="w-4 h-4" />
            <span className="font-medium">Saved</span>
          </motion.div>
        )}
      </button>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 border-2 border-ggo-light rounded-lg focus:border-ggo-teal focus:outline-none transition-colors resize-none font-medium text-ggo-text-dark"
          rows={4}
          style={{ fontSize: "15px", lineHeight: "1.5" }}
        />
        <div className="flex items-start gap-2 mt-2">
          <div className="w-4 h-4 rounded-full bg-ggo-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 rounded-full bg-ggo-teal" />
          </div>
          <p className="text-xs text-ggo-text-muted font-medium leading-relaxed">
            Your notes are stored locally on this device and will be available at your follow-up appointment. 
            They never leave your device unless you choose to share them.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
