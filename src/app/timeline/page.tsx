'use client';

import { useRouter } from 'next/navigation';
import { TimelineScreen } from '@/components/screens/TimelineScreen';
import { useState, useEffect } from 'react';

export default function TimelinePage() {
  const router = useRouter();
  const [procedure, setProcedure] = useState('');
  const [procedureId, setProcedureId] = useState('');
  const [procedureSlug, setProcedureSlug] = useState('');
  const [site, setSite] = useState('');
  const [siteSlug, setSiteSlug] = useState('');
  const [surgeryDate, setSurgeryDate] = useState<Date | undefined>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProcedure(sessionStorage.getItem('ggo-procedure') || 'Circumcision');
      setProcedureId(sessionStorage.getItem('ggo-procedure-id') || '');
      setProcedureSlug(sessionStorage.getItem('ggo-procedure-slug') || '');
      setSite(sessionStorage.getItem('ggo-site') || 'Chelsea');
      setSiteSlug(sessionStorage.getItem('ggo-site-slug') || '');
      
      const dateStr = sessionStorage.getItem('ggo-surgery-date');
      if (dateStr) {
        setSurgeryDate(new Date(dateStr));
      }
    }
  }, []);

  const handleComplete = () => {
    // Navigate to recovery day 0
    router.push('/recovery/0');
  };

  if (!procedure) {
    return <div>Loading...</div>;
  }

  return (
    <TimelineScreen
      procedure={procedure}
      procedureId={procedureId}
      procedureSlug={procedureSlug}
      site={site}
      siteSlug={siteSlug}
      date={surgeryDate}
      onComplete={handleComplete}
    />
  );
}
