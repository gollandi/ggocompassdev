/**
 * GGO Compass Microcopy Text Styles
 * Structured for Figma Tokens Studio export
 * 
 * All styles use Plus Jakarta Sans font family
 * Line height: 140% (1.4× font size)
 * Paragraph spacing: 1.4× font size
 */

export interface TextStyle {
  name: string;
  font: string;
  size: number;
  weight: number | string;
  lineHeight: string;
  letterSpacing?: string;
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  fontStyle?: "normal" | "italic";
  color: string;
  colorToken: string;
  paragraphSpacing: number;
  description: string;
  example: string;
}

export interface MicrocopyStyleCollection {
  tracking: Record<string, TextStyle>;
  exploring: Record<string, TextStyle>;
  switch: Record<string, TextStyle>;
  safety: Record<string, TextStyle>;
}

/**
 * Font weight mappings
 */
const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

/**
 * Color tokens mapped to CSS variables
 */
const colorTokens = {
  "--color-primary-navy": "#1E3A5B",
  "--color-text-dark": "#2C2C2C",
  "--color-text-muted": "#64748B",
  "--color-accent-teal": "#00BE92",
  "--color-highlight-gold": "#E5C07B",
  "--color-alert-red": "#DC2626",
};

/**
 * 1. TRACKING MODE STYLES
 * For date-anchored, auto-advancing daily guidance
 */
const trackingStyles: Record<string, TextStyle> = {
  "header-morning": {
    name: "tracking/header-morning",
    font: "Plus Jakarta Sans",
    size: 24,
    weight: fontWeights.semibold,
    lineHeight: "140%",
    fontStyle: "normal",
    color: colorTokens["--color-primary-navy"],
    colorToken: "--color-primary-navy",
    paragraphSpacing: 33.6, // 1.4 × 24
    description: "For day-start card headers with time-based greeting",
    example: "Good morning — here's what to expect today.",
  },
  "header-evening": {
    name: "tracking/header-evening",
    font: "Plus Jakarta Sans",
    size: 24,
    weight: fontWeights.medium,
    lineHeight: "140%",
    fontStyle: "normal",
    color: colorTokens["--color-primary-navy"],
    colorToken: "--color-primary-navy",
    paragraphSpacing: 33.6,
    description: "Night closure tone for end-of-day reflection",
    example: "Another day complete.",
  },
  "progress-hint": {
    name: "tracking/progress-hint",
    font: "Plus Jakarta Sans",
    size: 16,
    weight: fontWeights.regular,
    lineHeight: "140%",
    fontStyle: "normal",
    color: colorTokens["--color-accent-teal"],
    colorToken: "--color-accent-teal",
    paragraphSpacing: 22.4, // 1.4 × 16
    description: "Appears above progress rail to signal milestone",
    example: "Your next phase is ready.",
  },
  tooltip: {
    name: "tracking/tooltip",
    font: "Plus Jakarta Sans",
    size: 12,
    weight: fontWeights.regular,
    lineHeight: "140%",
    fontStyle: "normal",
    color: colorTokens["--color-text-muted"],
    colorToken: "--color-text-muted",
    paragraphSpacing: 16.8, // 1.4 × 12
    description: "Compact tooltips for helper information",
    example: "Tap for signs that need attention.",
  },
  encouragement: {
    name: "tracking/encouragement",
    font: "Plus Jakarta Sans",
    size: 14,
    weight: fontWeights.medium,
    lineHeight: "140%",
    fontStyle: "italic",
    color: colorTokens["--color-highlight-gold"],
    colorToken: "--color-highlight-gold",
    paragraphSpacing: 19.6, // 1.4 × 14
    description: "Randomised day note for gentle motivation",
    example: "Small steps count most.",
  },
  "footer-reassure": {
    name: "tracking/footer-reassure",
    font: "Plus Jakarta Sans",
    size: 12,
    weight: fontWeights.regular,
    lineHeight: "140%",
    fontStyle: "normal",
    color: colorTokens["--color-text-muted"],
    colorToken: "--color-text-muted",
    paragraphSpacing: 16.8,
    description: "Fixed footer disclaimer text",
    example: "This guidance is educational. Always follow your clinician's advice.",
  },
};

/**
 * 2. EXPLORING MODE STYLES
 * For manual browsing and free navigation
 */
const exploringStyles: Record<string, TextStyle> = {
  "header-intro": {
    name: "exploring/header-intro",
    font: "Plus Jakarta Sans",
    size: 24,
    weight: fontWeights.semibold,
    lineHeight: "140%",
    fontStyle: "normal",
    color: colorTokens["--color-primary-navy"],
    colorToken: "--color-primary-navy",
    paragraphSpacing: 33.6,
    description: "Top of mode landing page introduction",
    example: "Explore how recovery unfolds, one day at a time.",
  },
  "subheader-procedure": {
    name: "exploring/subheader-procedure",
    font: "Plus Jakarta Sans",
    size: 16,
    weight: fontWeights.medium,
    lineHeight: "140%",
    fontStyle: "normal",
    color: colorTokens["--color-text-dark"],
    colorToken: "--color-text-dark",
    paragraphSpacing: 22.4,
    description: "Under procedure name, invitation to explore",
    example: "Select a day to see what it feels like.",
  },
  "label-normal": {
    name: "exploring/label-normal",
    font: "Plus Jakarta Sans",
    size: 12,
    weight: fontWeights.bold,
    lineHeight: "140%",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontStyle: "normal",
    color: colorTokens["--color-accent-teal"],
    colorToken: "--color-accent-teal",
    paragraphSpacing: 16.8,
    description: "Card section label for common experiences",
    example: "COMMON EXPERIENCES",
  },
  "label-forecast": {
    name: "exploring/label-forecast",
    font: "Plus Jakarta Sans",
    size: 12,
    weight: fontWeights.bold,
    lineHeight: "140%",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontStyle: "normal",
    color: colorTokens["--color-highlight-gold"],
    colorToken: "--color-highlight-gold",
    paragraphSpacing: 16.8,
    description: "Secondary label for forecast section",
    example: "WHAT IMPROVES NEXT",
  },
  "label-redflag": {
    name: "exploring/label-redflag",
    font: "Plus Jakarta Sans",
    size: 12,
    weight: fontWeights.bold,
    lineHeight: "140%",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontStyle: "normal",
    color: colorTokens["--color-alert-red"],
    colorToken: "--color-alert-red",
    paragraphSpacing: 16.8,
    description: "Warning header for red flags",
    example: "WHEN TO CONTACT YOUR TEAM",
  },
  "footer-note": {
    name: "exploring/footer-note",
    font: "Plus Jakarta Sans",
    size: 10,
    weight: fontWeights.regular,
    lineHeight: "140%",
    fontStyle: "normal",
    color: colorTokens["--color-text-muted"],
    colorToken: "--color-text-muted",
    paragraphSpacing: 14, // 1.4 × 10
    description: "Source attribution under cards",
    example: "Based on BAUS patient guidance.",
  },
};

/**
 * 3. MODE SWITCH STYLES
 * For confirmation dialogs and CTAs
 */
const switchStyles: Record<string, TextStyle> = {
  "dialog-title": {
    name: "switch/dialog-title",
    font: "Plus Jakarta Sans",
    size: 20,
    weight: fontWeights.semibold,
    lineHeight: "140%",
    fontStyle: "normal",
    color: colorTokens["--color-primary-navy"],
    colorToken: "--color-primary-navy",
    paragraphSpacing: 28, // 1.4 × 20
    description: "Modal heading for mode switch confirmation",
    example: "Start following your own journey?",
  },
  "dialog-body": {
    name: "switch/dialog-body",
    font: "Plus Jakarta Sans",
    size: 14,
    weight: fontWeights.regular,
    lineHeight: "140%",
    fontStyle: "normal",
    color: colorTokens["--color-text-dark"],
    colorToken: "--color-text-dark",
    paragraphSpacing: 19.6,
    description: "Modal content explaining mode change impact",
    example: "Switching to Exploring lets you view all days — this won't affect your recovery record.",
  },
  "cta-confirm": {
    name: "switch/cta-confirm",
    font: "Plus Jakarta Sans",
    size: 16,
    weight: fontWeights.medium,
    lineHeight: "140%",
    textTransform: "uppercase",
    letterSpacing: "0.025em",
    fontStyle: "normal",
    color: colorTokens["--color-accent-teal"],
    colorToken: "--color-accent-teal",
    paragraphSpacing: 22.4,
    description: "Primary button text for confirmation",
    example: "YES, BEGIN TRACKING",
  },
  "cta-cancel": {
    name: "switch/cta-cancel",
    font: "Plus Jakarta Sans",
    size: 16,
    weight: fontWeights.medium,
    lineHeight: "140%",
    textTransform: "uppercase",
    letterSpacing: "0.025em",
    fontStyle: "normal",
    color: colorTokens["--color-primary-navy"],
    colorToken: "--color-primary-navy",
    paragraphSpacing: 22.4,
    description: "Secondary button text for cancel action",
    example: "STAY IN EXPLORE MODE",
  },
};

/**
 * 4. SAFETY & WEEKLY MESSAGES
 * For reassurance and milestone celebrations
 */
const safetyStyles: Record<string, TextStyle> = {
  "redflag-open": {
    name: "safety/redflag-open",
    font: "Plus Jakarta Sans",
    size: 14,
    weight: fontWeights.medium,
    lineHeight: "140%",
    fontStyle: "normal",
    color: colorTokens["--color-alert-red"],
    colorToken: "--color-alert-red",
    paragraphSpacing: 19.6,
    description: "Visible when red-flag section expanded, reassuring tone",
    example: "If you're unsure, contact your care team — you're never bothering us.",
  },
  "week-end": {
    name: "safety/week-end",
    font: "Plus Jakarta Sans",
    size: 16,
    weight: fontWeights.medium,
    lineHeight: "140%",
    fontStyle: "normal",
    color: colorTokens["--color-highlight-gold"],
    colorToken: "--color-highlight-gold",
    paragraphSpacing: 22.4,
    description: "Auto-appears on days 7, 14, 21, 28 for milestone celebration",
    example: "Another week behind you. Keep the pace gentle.",
  },
};

/**
 * Complete microcopy style collection
 */
export const microcopyStyles: MicrocopyStyleCollection = {
  tracking: trackingStyles,
  exploring: exploringStyles,
  switch: switchStyles,
  safety: safetyStyles,
};

/**
 * Export for Figma Tokens Studio
 */
export function generateFigmaTextTokens() {
  const tokens: any = {
    textStyles: {},
  };

  // Flatten all styles into Figma Tokens format
  Object.entries(microcopyStyles).forEach(([category, styles]) => {
    Object.entries(styles).forEach(([key, style]: [string, any]) => {
      const tokenName = `${category}/${key}`;
      tokens.textStyles[tokenName] = {
        value: {
          fontFamily: style.font,
          fontSize: `${style.size}px`,
          fontWeight: style.weight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing || "normal",
          textTransform: style.textTransform || "none",
          fontStyle: style.fontStyle || "normal",
          paragraphSpacing: `${style.paragraphSpacing}px`,
        },
        type: "typography",
        description: style.description,
      };
    });
  });

  return tokens;
}

/**
 * Get CSS class name for a specific style
 */
export function getMicrocopyClassName(category: string, style: string): string {
  return `microcopy-${category}-${style}`;
}

/**
 * Get style object by path
 */
export function getMicrocopyStyle(path: string): TextStyle | null {
  const [category, styleName] = path.split("/");
  const categoryStyles = microcopyStyles[category as keyof MicrocopyStyleCollection];
  if (!categoryStyles) return null;
  return categoryStyles[styleName] || null;
}

/**
 * Randomized encouragement messages for tracking mode
 */
export const encouragementMessages = [
  "Small steps count most.",
  "You're doing well.",
  "Trust the process.",
  "Rest is part of healing.",
  "Every day adds up.",
  "Be patient with yourself.",
  "Progress isn't always visible.",
  "Healing takes time.",
  "Listen to your body.",
  "You're on track.",
];

/**
 * Weekly milestone messages (days 7, 14, 21, 28)
 */
export const weeklyMessages: Record<number, string> = {
  7: "Another week behind you. Keep the pace gentle.",
  14: "Two weeks done. You're halfway through the key healing phase.",
  21: "Three weeks complete. Your body is rebuilding strength.",
  28: "Four weeks reached. You've come a long way.",
};

/**
 * Time-based greeting variations
 */
export const greetingVariations = {
  morning: [
    "Good morning — here's what to expect today.",
    "Morning — let's see what today brings.",
    "Good morning. Here's your daily guidance.",
  ],
  afternoon: [
    "Good afternoon — here's what to expect today.",
    "Afternoon check-in — here's today's guidance.",
  ],
  evening: [
    "Good evening — here's what to expect tonight.",
    "Evening — time to review today's progress.",
  ],
  completion: [
    "Another day complete.",
    "Today's done. Well navigated.",
    "Day finished. Rest easy.",
  ],
};
