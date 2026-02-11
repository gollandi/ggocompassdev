'use client';

import { motion } from "framer-motion";
import { ReactNode, MouseEvent } from "react";

interface GGOButtonProps {
  variant?: "primary" | "secondary" | "gold";
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  style?: React.CSSProperties;
}

export function GGOButton({
  variant = "primary",
  children,
  className = "",
  onClick,
  disabled,
  type = "button",
  icon,
  style,
}: GGOButtonProps) {
  const baseStyles = "px-8 py-4 rounded-2xl transition-all duration-300 shadow-sm font-semibold tracking-wide";

  const variantStyles = {
    primary: "bg-ggo-teal text-ggo-black hover:bg-ggo-teal/90 hover:shadow-lg hover:shadow-ggo-teal/20",
    secondary: "bg-ggo-charcoal text-white hover:bg-ggo-charcoal/90 hover:shadow-lg hover:shadow-ggo-charcoal/20",
    gold: "bg-ggo-soft-blue text-ggo-charcoal hover:bg-ggo-white hover:scale-105 border border-ggo-teal/20",
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${icon ? 'flex items-center gap-2' : ''}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={style}
    >
      {icon}
      {children}
    </motion.button>
  );
}
