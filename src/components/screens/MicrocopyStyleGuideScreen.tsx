'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Copy, Check } from "lucide-react";
import { FooterDisclaimer } from "../ggo/FooterDisclaimer";
import { GGOButton } from "../ggo/GGOButton";
import { 
  microcopyStyles, 
  generateFigmaTextTokens,
  encouragementMessages,
  weeklyMessages,
  greetingVariations 
} from "../../data/microcopyStyles";
import { MicrocopyText } from "../ggo/MicrocopyText";

interface MicrocopyStyleGuideScreenProps {
  onBack: () => void;
}

export function MicrocopyStyleGuideScreen({ onBack }: MicrocopyStyleGuideScreenProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"tracking" | "exploring" | "switch" | "safety">("tracking");

  const handleCopy = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      // Fallback: create temporary textarea for copying
      const textarea = document.createElement('textarea');
      textarea.value = content;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy:', fallbackErr);
      }
      document.body.removeChild(textarea);
    }
  };

  const handleDownload = () => {
    const tokens = generateFigmaTextTokens();
    const blob = new Blob([JSON.stringify(tokens, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ggo-compass-microcopy-styles.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderStyleCard = (category: string, styleName: string) => {
    const style = microcopyStyles[category as keyof typeof microcopyStyles][styleName];
    const stylePath = `${category}/${styleName}`;
    
    return (
      <motion.div
        key={stylePath}
        className="bg-white rounded-2xl p-6 shadow-sm border border-ggo-navy/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Style Name & Code */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <code className="text-sm bg-ggo-navy/5 text-ggo-navy px-2 py-1 rounded font-mono">
              {stylePath}
            </code>
            <p className="text-xs text-ggo-text-muted mt-2">{style.description}</p>
          </div>
          <button
            onClick={() => handleCopy(stylePath, stylePath)}
            className="p-2 hover:bg-ggo-light rounded-lg transition-colors"
            aria-label="Copy style name"
          >
            {copied === stylePath ? (
              <Check className="w-4 h-4 text-ggo-teal" />
            ) : (
              <Copy className="w-4 h-4 text-ggo-text-muted" />
            )}
          </button>
        </div>

        {/* Visual Example */}
        <div className="mb-4 p-4 bg-ggo-light/50 rounded-xl">
          <MicrocopyText style={stylePath}>
            {style.example}
          </MicrocopyText>
        </div>

        {/* Technical Specs */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-ggo-text-muted">Font Size:</span>
            <span className="ml-2 text-ggo-navy font-medium">{style.size}px</span>
          </div>
          <div>
            <span className="text-ggo-text-muted">Weight:</span>
            <span className="ml-2 text-ggo-navy font-medium">{style.weight}</span>
          </div>
          <div>
            <span className="text-ggo-text-muted">Line Height:</span>
            <span className="ml-2 text-ggo-navy font-medium">{style.lineHeight}</span>
          </div>
          <div>
            <span className="text-ggo-text-muted">Color:</span>
            <div className="inline-flex items-center ml-2">
              <div 
                className="w-3 h-3 rounded-full border border-ggo-navy/20 mr-1"
                style={{ backgroundColor: style.color }}
              />
              <span className="text-ggo-navy font-medium font-mono text-[10px]">
                {style.colorToken}
              </span>
            </div>
          </div>
          {style.textTransform && style.textTransform !== "none" && (
            <div className="col-span-2">
              <span className="text-ggo-text-muted">Transform:</span>
              <span className="ml-2 text-ggo-navy font-medium capitalize">{style.textTransform}</span>
            </div>
          )}
          {style.fontStyle && style.fontStyle !== "normal" && (
            <div className="col-span-2">
              <span className="text-ggo-text-muted">Style:</span>
              <span className="ml-2 text-ggo-navy font-medium capitalize">{style.fontStyle}</span>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 px-6 md:px-24 py-12 pb-32">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={onBack}
              className="mb-6 text-ggo-text-muted hover:text-ggo-navy transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-ggo-navy mb-2">Microcopy Text Styles</h1>
            <p className="text-ggo-text-muted">
              Figma-ready text styles for GGO Compass. All styles use Plus Jakarta Sans 
              with 140% line height and 1.4× paragraph spacing.
            </p>
          </motion.div>

          {/* Export Actions */}
          <div className="flex gap-4">
            <GGOButton
              onClick={handleDownload}
              icon={<Download className="w-4 h-4" />}
            >
              Download Figma Tokens JSON
            </GGOButton>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-4 border-b border-ggo-navy/10 overflow-x-auto">
            {[
              { key: "tracking", label: "Tracking Mode", count: Object.keys(microcopyStyles.tracking).length },
              { key: "exploring", label: "Exploring Mode", count: Object.keys(microcopyStyles.exploring).length },
              { key: "switch", label: "Mode Switch", count: Object.keys(microcopyStyles.switch).length },
              { key: "safety", label: "Safety Messages", count: Object.keys(microcopyStyles.safety).length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? "border-ggo-teal text-ggo-navy"
                    : "border-transparent text-ggo-text-muted hover:text-ggo-navy"
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs bg-ggo-navy/5 px-2 py-0.5 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Style Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.keys(microcopyStyles[activeTab]).map((styleName) =>
              renderStyleCard(activeTab, styleName)
            )}
          </div>

          {/* Additional Resources */}
          {activeTab === "tracking" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-ggo-navy/10"
            >
              <h3 className="text-ggo-navy mb-4">Randomized Encouragement Messages</h3>
              <p className="text-sm text-ggo-text-muted mb-4">
                These messages rotate daily in tracking mode using the <code>tracking/encouragement</code> style:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {encouragementMessages.map((message, index) => (
                  <div key={index} className="p-3 bg-ggo-light/50 rounded-lg">
                    <MicrocopyText style="tracking/encouragement">
                      {message}
                    </MicrocopyText>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "safety" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-ggo-navy/10"
            >
              <h3 className="text-ggo-navy mb-4">Weekly Milestone Messages</h3>
              <p className="text-sm text-ggo-text-muted mb-4">
                Auto-appear on days 7, 14, 21, 28 using <code>safety/week-end</code> style:
              </p>
              <div className="space-y-3">
                {Object.entries(weeklyMessages).map(([day, message]) => (
                  <div key={day} className="p-4 bg-ggo-gold/5 rounded-lg border-l-4 border-ggo-gold">
                    <p className="text-xs text-ggo-text-muted mb-2">Day {day}</p>
                    <MicrocopyText style="safety/week-end">
                      {message}
                    </MicrocopyText>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "tracking" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-ggo-navy/10"
            >
              <h3 className="text-ggo-navy mb-4">Time-Based Greeting Variations</h3>
              <p className="text-sm text-ggo-text-muted mb-4">
                Headers adapt to time of day using <code>tracking/header-morning</code> and <code>tracking/header-evening</code>:
              </p>
              <div className="space-y-4">
                {Object.entries(greetingVariations).map(([time, messages]) => (
                  <div key={time} className="space-y-2">
                    <p className="text-xs text-ggo-text-muted uppercase tracking-wide">{time}</p>
                    {messages.map((message, index) => (
                      <div key={index} className="p-3 bg-ggo-light/50 rounded-lg">
                        <MicrocopyText 
                          style={time === "completion" ? "tracking/header-evening" : "tracking/header-morning"}
                        >
                          {message}
                        </MicrocopyText>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Implementation Guide */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-ggo-navy/5 rounded-3xl p-6"
          >
            <h3 className="text-ggo-navy mb-4">Implementation in Figma</h3>
            <ol className="space-y-3 text-sm text-ggo-text-muted">
              <li className="flex gap-3">
                <span className="text-ggo-teal font-medium">1.</span>
                <span>Open Figma → Text Styles panel → Create Style</span>
              </li>
              <li className="flex gap-3">
                <span className="text-ggo-teal font-medium">2.</span>
                <span>Name using exact format: <code className="bg-white px-2 py-0.5 rounded">category/style-name</code></span>
              </li>
              <li className="flex gap-3">
                <span className="text-ggo-teal font-medium">3.</span>
                <span>Apply specifications from cards above (font, size, weight, color)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-ggo-teal font-medium">4.</span>
                <span>Set line height = 140%, paragraph spacing = 1.4× font size</span>
              </li>
              <li className="flex gap-3">
                <span className="text-ggo-teal font-medium">5.</span>
                <span>Group all under collection: <code className="bg-white px-2 py-0.5 rounded">Microcopy Styles</code></span>
              </li>
            </ol>
          </motion.div>
        </div>
      </div>

      <FooterDisclaimer />
    </div>
  );
}
