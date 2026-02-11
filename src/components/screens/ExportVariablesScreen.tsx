'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Copy, Check, FileJson, Server, Layers } from "lucide-react";
import { GGOButton } from "../ggo/GGOButton";
import { FooterDisclaimer } from "../ggo/FooterDisclaimer";
import {
  generateFigmaTokensJSON,
  exportForServerAPI,
  getVariablePath,
  getProcedureMetadata,
} from "../../data/figmaVariables";

interface ExportVariablesScreenProps {
  onBack: () => void;
}

export function ExportVariablesScreen({ onBack }: ExportVariablesScreenProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"figma" | "server">("figma");

  const figmaTokens = generateFigmaTokensJSON();
  const serverAPI = exportForServerAPI();

  const handleCopy = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(content, null, 2));
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      // Fallback: create temporary textarea for copying
      const textarea = document.createElement('textarea');
      textarea.value = JSON.stringify(content, null, 2);
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy:', fallbackErr);
      }
      document.body.removeChild(textarea);
    }
  };

  const handleDownload = (content: any, filename: string) => {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const examplePaths = [
    getVariablePath("TURP", 7, "today"),
    getVariablePath("Circumcision", 14, "forecast"),
    getVariablePath("TURP", 0, "redflag"),
  ];

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
              ← Back to Recovery
            </button>
            <h1 className="text-ggo-navy mb-2">Recovery Data Exports</h1>
            <p className="text-ggo-text-muted">
              Export recovery data for Figma Tokens, CMS integration, or Carebit
              server-side logic.
            </p>
          </motion.div>

          {/* Tab Selector */}
          <div className="flex gap-4 border-b border-ggo-navy/10">
            <button
              onClick={() => setActiveTab("figma")}
              className={`px-6 py-3 border-b-2 transition-colors ${
                activeTab === "figma"
                  ? "border-ggo-teal text-ggo-navy"
                  : "border-transparent text-ggo-text-muted hover:text-ggo-navy"
              }`}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Figma Tokens
              </div>
            </button>
            <button
              onClick={() => setActiveTab("server")}
              className={`px-6 py-3 border-b-2 transition-colors ${
                activeTab === "server"
                  ? "border-ggo-teal text-ggo-navy"
                  : "border-transparent text-ggo-text-muted hover:text-ggo-navy"
              }`}
            >
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4" />
                Server API
              </div>
            </button>
          </div>

          {/* Figma Tokens Tab */}
          {activeTab === "figma" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Naming Convention Guide */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-ggo-navy/10">
                <h3 className="text-ggo-navy mb-4">Variable Naming Structure</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-ggo-text-muted mb-1">Collection</p>
                      <code className="text-sm bg-ggo-teal/10 text-ggo-teal px-2 py-1 rounded">
                        recovery-[procedure]
                      </code>
                    </div>
                    <div>
                      <p className="text-sm text-ggo-text-muted mb-1">Group</p>
                      <code className="text-sm bg-ggo-teal/10 text-ggo-teal px-2 py-1 rounded">
                        day-[number]
                      </code>
                    </div>
                    <div>
                      <p className="text-sm text-ggo-text-muted mb-1">Variable</p>
                      <code className="text-sm bg-ggo-teal/10 text-ggo-teal px-2 py-1 rounded">
                        [field]-text
                      </code>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-ggo-navy/10">
                    <p className="text-sm text-ggo-text-muted mb-3">
                      Example variable paths:
                    </p>
                    <div className="space-y-2">
                      {examplePaths.map((path, index) => (
                        <div
                          key={index}
                          className="bg-ggo-navy/5 px-4 py-2 rounded-lg font-mono text-sm text-ggo-navy"
                        >
                          {path}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metadata Example */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-ggo-navy/10">
                <h3 className="text-ggo-navy mb-4">Governance Metadata</h3>
                <div className="space-y-3">
                  {Object.entries(getProcedureMetadata("turp")).map(
                    ([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-ggo-text-muted capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </span>
                        <span className="text-ggo-navy">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Export Actions */}
              <div className="flex gap-4">
                <GGOButton
                  onClick={() =>
                    handleDownload(figmaTokens, "ggo-compass-figma-tokens.json")
                  }
                  icon={<Download className="w-4 h-4" />}
                >
                  Download Figma Tokens JSON
                </GGOButton>
                <GGOButton
                  variant="secondary"
                  onClick={() => handleCopy(figmaTokens, "figma")}
                  icon={
                    copied === "figma" ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )
                  }
                >
                  {copied === "figma" ? "Copied!" : "Copy to Clipboard"}
                </GGOButton>
              </div>

              {/* JSON Preview */}
              <div className="bg-ggo-navy/5 rounded-2xl p-6 overflow-auto max-h-96">
                <pre className="text-xs text-ggo-navy font-mono">
                  {JSON.stringify(figmaTokens, null, 2).slice(0, 1000)}...
                </pre>
              </div>
            </motion.div>
          )}

          {/* Server API Tab */}
          {activeTab === "server" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* API Structure Info */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-ggo-navy/10">
                <h3 className="text-ggo-navy mb-4">Server API Structure</h3>
                <p className="text-ggo-text-muted mb-4">
                  Clean JSON structure for Prince's Carebit integration. Includes
                  procedure metadata, all recovery days, and emotion variables.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FileJson className="w-4 h-4 text-ggo-teal" />
                    <span className="text-ggo-text-muted">
                      Total Procedures:{" "}
                      <span className="text-ggo-navy">
                        {serverAPI.procedures.length}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileJson className="w-4 h-4 text-ggo-teal" />
                    <span className="text-ggo-text-muted">
                      Generated:{" "}
                      <span className="text-ggo-navy">
                        {new Date(serverAPI.generatedAt).toLocaleString()}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileJson className="w-4 h-4 text-ggo-teal" />
                    <span className="text-ggo-text-muted">
                      Version:{" "}
                      <span className="text-ggo-navy">{serverAPI.version}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Fallback Logic Example */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-ggo-navy/10">
                <h3 className="text-ggo-navy mb-4">Smart Fallback Logic</h3>
                <pre className="bg-ggo-navy/5 p-4 rounded-lg text-xs font-mono text-ggo-navy overflow-auto">
{`function getRecoveryText(procedure, day) {
  const data = recovery[procedure]?.days[day];
  if (!data) {
    return recovery["generic"].days[day] 
      || recovery["generic"].days["default"];
  }
  return data;
}`}
                </pre>
                <p className="mt-3 text-sm text-ggo-text-muted">
                  Ensures Compass always delivers calm, generic reassurance even
                  when specific procedure or day data is missing.
                </p>
              </div>

              {/* Export Actions */}
              <div className="flex gap-4">
                <GGOButton
                  onClick={() =>
                    handleDownload(serverAPI, "ggo-compass-server-api.json")
                  }
                  icon={<Download className="w-4 h-4" />}
                >
                  Download Server API JSON
                </GGOButton>
                <GGOButton
                  variant="secondary"
                  onClick={() => handleCopy(JSON.stringify(serverAPI, null, 2), "server")}
                  icon={
                    copied === "server" ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )
                  }
                >
                  {copied === "server" ? "Copied!" : "Copy to Clipboard"}
                </GGOButton>
              </div>

              {/* JSON Preview */}
              <div className="bg-ggo-navy/5 rounded-2xl p-6 overflow-auto max-h-96">
                <pre className="text-xs text-ggo-navy font-mono">
                  {JSON.stringify(serverAPI, null, 2).slice(0, 1000)}...
                </pre>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <FooterDisclaimer />
    </div>
  );
}
