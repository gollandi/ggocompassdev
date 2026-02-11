'use client';

import { CompassLogo } from "../ggo/CompassLogo";
import { GGOButton } from "../ggo/GGOButton";
import { PhaseRail } from "../ggo/PhaseRail";
import { Shield, AlertTriangle } from "lucide-react";

export function StyleGuideScreen() {
  return (
    <div className="min-h-screen bg-background py-12 px-6 md:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-ggo-navy">GGO Compass Style Guide</h1>
          <p className="text-ggo-text-muted">
            Design system tokens, components, and guidelines
          </p>
        </div>

        {/* Brand Identity */}
        <section className="mb-16">
          <h2 className="mb-8 text-ggo-navy">Brand Identity</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-3xl p-8 shadow-md">
              <h3 className="mb-6 text-ggo-navy">Logo</h3>
              <div className="flex justify-center py-8">
                <CompassLogo size={200} needleRotation={45} />
              </div>
              <p className="text-center text-ggo-text-muted mt-6">
                Circular "G" compass mark with gold needle at 45°
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-md">
              <h3 className="mb-6 text-ggo-navy">Typography</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-ggo-text-muted mb-2">Font Family</p>
                  <p className="text-ggo-navy">Plus Jakarta Sans</p>
                </div>
                <div>
                  <p className="text-ggo-text-muted mb-2">Weights</p>
                  <p className="text-ggo-navy">400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)</p>
                </div>
                <div>
                  <p className="text-ggo-text-muted mb-2">Tagline</p>
                  <p className="text-ggo-navy italic">"Guiding you, step by step."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="mb-8 text-ggo-navy">Color Palette</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-4">
              <div className="bg-ggo-navy h-32 rounded-xl shadow-md flex items-end p-4">
                <div className="text-white">
                  <p className="opacity-80">Navy</p>
                  <p>#1E3A5B</p>
                </div>
              </div>
              <p className="text-ggo-text-muted">Trust, structure</p>
            </div>

            <div className="space-y-4">
              <div className="bg-ggo-teal h-32 rounded-xl shadow-md flex items-end p-4">
                <div className="text-white">
                  <p className="opacity-80">Teal</p>
                  <p>#00BE92</p>
                </div>
              </div>
              <p className="text-ggo-text-muted">Action, reassurance</p>
            </div>

            <div className="space-y-4">
              <div className="bg-ggo-gold h-32 rounded-xl shadow-md flex items-end p-4">
                <div className="text-ggo-text-dark">
                  <p className="opacity-80">Gold</p>
                  <p>#E5C07B</p>
                </div>
              </div>
              <p className="text-ggo-text-muted">Progress, highlight</p>
            </div>

            <div className="space-y-4">
              <div className="bg-ggo-light h-32 rounded-xl shadow-md border-2 border-ggo-navy/10 flex items-end p-4">
                <div className="text-ggo-text-dark">
                  <p className="opacity-80">Light</p>
                  <p>#F4F6F8</p>
                </div>
              </div>
              <p className="text-ggo-text-muted">Background</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white h-32 rounded-xl shadow-md border-2 border-ggo-navy/10 flex items-end p-4">
                <div className="text-ggo-text-dark">
                  <p className="opacity-80">White</p>
                  <p>#FFFFFF</p>
                </div>
              </div>
              <p className="text-ggo-text-muted">Cards, panels</p>
            </div>

            <div className="space-y-4">
              <div className="bg-ggo-text-dark h-32 rounded-xl shadow-md flex items-end p-4">
                <div className="text-white">
                  <p className="opacity-80">Text Dark</p>
                  <p>#003024</p>
                </div>
              </div>
              <p className="text-ggo-text-muted">Primary text</p>
            </div>

            <div className="space-y-4">
              <div className="bg-ggo-text-muted h-32 rounded-xl shadow-md flex items-end p-4">
                <div className="text-white">
                  <p className="opacity-80">Text Muted</p>
                  <p>#004737</p>
                </div>
              </div>
              <p className="text-ggo-text-muted">Secondary text</p>
            </div>

            <div className="space-y-4">
              <div className="bg-ggo-alert-red h-32 rounded-xl shadow-md flex items-end p-4">
                <div className="text-white">
                  <p className="opacity-80">Alert Red</p>
                  <p>#EE0000</p>
                </div>
              </div>
              <p className="text-ggo-text-muted">Critical alerts</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="mb-8 text-ggo-navy">Buttons</h2>
          
          <div className="bg-white rounded-3xl p-8 shadow-md">
            <div className="flex flex-wrap gap-4">
              <GGOButton variant="primary">Primary Button</GGOButton>
              <GGOButton variant="secondary">Secondary Button</GGOButton>
              <GGOButton variant="gold">Gold Button</GGOButton>
            </div>
          </div>
        </section>

        {/* Phase Rail */}
        <section className="mb-16">
          <h2 className="mb-8 text-ggo-navy">Phase Rail</h2>
          
          <div className="bg-white rounded-3xl p-8 shadow-md">
            <PhaseRail currentPhase="prepare" />
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="mb-8 text-ggo-navy">Cards</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-md">
              <h3 className="mb-4 text-ggo-navy">Standard Card</h3>
              <p className="text-ggo-text-muted">
                Cards use 24px border radius, 8px padding multiples, and subtle shadows.
              </p>
            </div>

            <div className="bg-ggo-teal/10 rounded-3xl p-8 border-l-4 border-ggo-teal">
              <h3 className="mb-4 text-ggo-navy">Info Card</h3>
              <p className="text-ggo-text-muted">
                Colored background with accent border for highlighting important information.
              </p>
            </div>

            <div className="bg-ggo-alert-red/10 rounded-3xl p-8 border-l-4 border-ggo-alert-red">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-ggo-alert-red flex-shrink-0" />
                <div>
                  <h3 className="mb-2 text-ggo-alert-red">Alert Card</h3>
                  <p className="text-ggo-text-dark">
                    Used for critical warnings and red flags.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="mb-4 text-ggo-navy">Interactive Card</h3>
              <p className="text-ggo-text-muted">
                Hover states add depth with enhanced shadows.
              </p>
            </div>
          </div>
        </section>

        {/* Spacing & Grid */}
        <section className="mb-16">
          <h2 className="mb-8 text-ggo-navy">Spacing & Grid</h2>
          
          <div className="bg-white rounded-3xl p-8 shadow-md">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-32 text-ggo-text-muted">Base Unit</div>
                <div className="flex-1 bg-ggo-light rounded p-2">8px</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-ggo-text-muted">Corner Radius</div>
                <div className="flex-1 bg-ggo-light rounded p-2">12px (cards: 24px)</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-ggo-text-muted">Desktop Gutter</div>
                <div className="flex-1 bg-ggo-light rounded p-2">32px</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-ggo-text-muted">Desktop Margin</div>
                <div className="flex-1 bg-ggo-light rounded p-2">120px</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-ggo-text-muted">Mobile Gutter</div>
                <div className="flex-1 bg-ggo-light rounded p-2">16px</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-ggo-text-muted">Mobile Margin</div>
                <div className="flex-1 bg-ggo-light rounded p-2">24px</div>
              </div>
            </div>
          </div>
        </section>

        {/* Voice & Tone */}
        <section className="mb-16">
          <h2 className="mb-8 text-ggo-navy">Voice & Microcopy</h2>
          
          <div className="bg-white rounded-3xl p-8 shadow-md">
            <p className="text-ggo-text-muted mb-6">
              Plain, assured, patient-centred. Use short phrases that feel clinical yet human.
            </p>
            <div className="space-y-3">
              <div className="bg-ggo-light rounded-xl p-4">
                <p className="text-ggo-navy">"Here's where we begin."</p>
              </div>
              <div className="bg-ggo-light rounded-xl p-4">
                <p className="text-ggo-navy">"Small steps now make recovery smoother."</p>
              </div>
              <div className="bg-ggo-light rounded-xl p-4">
                <p className="text-ggo-navy">"You're exactly where you should be."</p>
              </div>
              <div className="bg-ggo-light rounded-xl p-4">
                <p className="text-ggo-navy">"Healing has its own rhythm — follow your compass."</p>
              </div>
              <div className="bg-ggo-light rounded-xl p-4">
                <p className="text-ggo-navy">"Look how far you've travelled."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="mb-8 text-ggo-navy">Accessibility</h2>
          
          <div className="bg-white rounded-3xl p-8 shadow-md">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-ggo-teal flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-ggo-navy mb-2">WCAG 2.2 AA Compliance</h4>
                  <p className="text-ggo-text-muted">
                    All color combinations meet minimum contrast ratios for readability.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-ggo-teal flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-ggo-navy mb-2">Keyboard Navigation</h4>
                  <p className="text-ggo-text-muted">
                    All interactive elements are keyboard accessible with visible focus states.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-ggo-teal flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-ggo-navy mb-2">Reduced Motion</h4>
                  <p className="text-ggo-text-muted">
                    Respects prefers-reduced-motion for users sensitive to animations.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-ggo-teal flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-ggo-navy mb-2">Plain Language</h4>
                  <p className="text-ggo-text-muted">
                    Medical terminology explained in clear, everyday language.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
