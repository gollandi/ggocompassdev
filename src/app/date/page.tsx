'use client';

import { useRouter } from 'next/navigation';
import { DateInputScreen } from '@/components/screens/DateInputScreen';
import { saveSurgeryDate } from '@/utils/preferences';

export default function DatePage() {
  const router = useRouter();

  // Get procedure and site from sessionStorage
  const procedure = typeof window !== 'undefined' ? sessionStorage.getItem('ggo-procedure') || 'Procedure' : 'Procedure';
  const site = typeof window !== 'undefined' ? sessionStorage.getItem('ggo-site') || 'Site' : 'Site';

  const handleDateNext = (date: Date) => {
    sessionStorage.setItem('ggo-surgery-date', date.toISOString());
    saveSurgeryDate(date);
    router.push('/timeline');
  };

  const handleBrowseMode = () => {
    // Switch to explore mode and skip to timeline
    sessionStorage.setItem('ggo-mode', 'explore');
    router.push('/timeline');
  };

  return (
    <DateInputScreen
      procedure={procedure}
      site={site}
      onNext={handleDateNext}
      onBrowseMode={handleBrowseMode}
    />
  );
}
