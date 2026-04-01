import type { Metadata } from 'next';
import './globals.css';
import { BrandBadge } from '@/components/ggo/BrandBadge';
import { PreferenceHydrator } from '@/components/ggo/PreferenceHydrator';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { PrototypeBanner } from '@/components/layout/PrototypeBanner';

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
        <PrototypeBanner />
        <header className="px-4 pt-4 pb-2 print:hidden">
          <BrandBadge />
        </header>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
