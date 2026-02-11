import type { Metadata } from 'next';
import './globals.css';
import { BrandBadge } from '@/components/ggo/BrandBadge';
import { PreferenceHydrator } from '@/components/ggo/PreferenceHydrator';

export const metadata: Metadata = {
  title: 'GGO Compass - Patient Journey Companion',
  description: 'Digital patient-journey companion app for post-surgery recovery tracking and guidance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <PreferenceHydrator />
        {/* Persistent small GGOMED brand badge across the app */}
        <BrandBadge className="print:hidden" />
        {children}
      </body>
    </html>
  );
}
