import { ReactNode } from "react";
import { getMicrocopyStyle, TextStyle } from "../../data/microcopyStyles";

interface MicrocopyTextProps {
  /**
   * Style path in format: "category/style-name"
   * Examples: "tracking/header-morning", "exploring/label-normal"
   */
  style: string;
  
  /**
   * Text content or React children
   */
  children: ReactNode;
  
  /**
   * Optional HTML element type
   */
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "label";
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Accessibility label
   */
  "aria-label"?: string;
}

/**
 * Apply Figma microcopy text style to any element
 * Automatically applies font, size, weight, color, and spacing
 */
export function MicrocopyText({ 
  style, 
  children, 
  as: Element = "p",
  className = "",
  "aria-label": ariaLabel,
}: MicrocopyTextProps) {
  const textStyle = getMicrocopyStyle(style);
  
  if (!textStyle) {
    console.warn(`Microcopy style not found: ${style}`);
    return <Element className={className}>{children}</Element>;
  }

  const inlineStyle = buildStyleObject(textStyle);
  
  return (
    <Element 
      className={`microcopy-${style.replace("/", "-")} ${className}`}
      style={inlineStyle}
      aria-label={ariaLabel}
    >
      {children}
    </Element>
  );
}

/**
 * Build inline style object from TextStyle definition
 */
function buildStyleObject(style: TextStyle): React.CSSProperties {
  return {
    fontFamily: style.font,
    fontSize: `${style.size}px`,
    fontWeight: style.weight,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing || "normal",
    textTransform: style.textTransform || "none",
    fontStyle: style.fontStyle || "normal",
    color: style.color,
    marginBottom: `${style.paragraphSpacing}px`,
  };
}

/**
 * Preset components for common microcopy patterns
 */

export function TrackingHeaderMorning({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="tracking/header-morning" as="h2" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function TrackingHeaderEvening({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="tracking/header-evening" as="h2" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function TrackingProgressHint({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="tracking/progress-hint" as="p" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function TrackingTooltip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="tracking/tooltip" as="span" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function TrackingEncouragement({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="tracking/encouragement" as="p" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function TrackingFooterReassure({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="tracking/footer-reassure" as="p" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function ExploringHeaderIntro({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="exploring/header-intro" as="h1" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function ExploringSubheaderProcedure({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="exploring/subheader-procedure" as="p" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function ExploringLabelNormal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="exploring/label-normal" as="label" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function ExploringLabelForecast({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="exploring/label-forecast" as="label" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function ExploringLabelRedflag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="exploring/label-redflag" as="label" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function ExploringFooterNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="exploring/footer-note" as="p" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function SwitchDialogTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="switch/dialog-title" as="h3" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function SwitchDialogBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="switch/dialog-body" as="p" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function SwitchCtaConfirm({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="switch/cta-confirm" as="span" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function SwitchCtaCancel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="switch/cta-cancel" as="span" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function SafetyRedflagOpen({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="safety/redflag-open" as="p" className={className}>
      {children}
    </MicrocopyText>
  );
}

export function SafetyWeekEnd({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MicrocopyText style="safety/week-end" as="p" className={className}>
      {children}
    </MicrocopyText>
  );
}
