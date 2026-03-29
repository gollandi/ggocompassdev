import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // GGO brand tokens (Notion spec)
        'ggo-teal': '#0D9488',
        'ggo-teal-light': '#14B8A6',
        'ggo-teal-dark': '#0F766E',
        'ggo-navy': '#1E3A5F',
        'ggo-navy-light': '#2D5F8A',
        'ggo-slate': '#64748B',
        'ggo-amber': '#F59E0B',
        'ggo-amber-light': '#FEF3C7',
        'ggo-red': '#EF4444',
        'ggo-red-light': '#FEE2E2',
        'ggo-green': '#10B981',
        'ggo-green-light': '#D1FAE5',
        'ggo-bg': '#FAFBFC',
        'ggo-surface': '#FFFFFF',
        'ggo-border': '#E2E8F0',
        // Legacy aliases (kept for backward compatibility during migration)
        'ggo-soft-blue': '#E3EEFD',
        'ggo-charcoal': '#64748B',
        'ggo-mint': '#D1FAE5',
        'ggo-black': '#1E3A5F',
        'ggo-gold': '#F59E0B',
        'ggo-light': '#FAFBFC',
        'ggo-text-muted': '#64748B',
        'ggo-text-dark': '#1E3A5F',
        'ggo-alert-red': '#EF4444',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '12px',   // cards
        '2xl': '16px',
        '3xl': '24px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
