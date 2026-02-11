'use client';

import { useRouter } from 'next/navigation';
import { RecoveryScreen } from '@/components/screens/RecoveryScreen';
import { useState, useEffect } from 'react';

export default function RecoveryDayPage() {
  const router = useRouter();
  const [procedure, setProcedure] = useState('');
  const [procedureId, setProcedureId] = useState('');
  const [procedureSlug, setProcedureSlug] = useState('');
  const [site, setSite] = useState('');
  const [siteSlug, setSiteSlug] = useState('');
  const [mode, setMode] = useState<'tracking' | 'exploring'>('exploring');
  const [surgeryDate, setSurgeryDate] = useState<Date | undefined>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProcedure(sessionStorage.getItem('ggo-procedure') || 'Circumcision');
      setProcedureId(sessionStorage.getItem('ggo-procedure-id') || '');
      setProcedureSlug(sessionStorage.getItem('ggo-procedure-slug') || '');
      setSite(sessionStorage.getItem('ggo-site') || 'Chelsea');
      setSiteSlug(sessionStorage.getItem('ggo-site-slug') || '');
      const modeStr = sessionStorage.getItem('ggo-mode') || 'explore';
      setMode(modeStr === 'track' ? 'tracking' : 'exploring');
      
      const dateStr = sessionStorage.getItem('ggo-surgery-date');
      if (dateStr) {
        setSurgeryDate(new Date(dateStr));
      }
    }
  }, []);

  const handleComplete = () => {
    router.push('/feedback');
  };

  if (!procedure) {
    return <div>Loading...</div>;
  }

  return (
    <RecoveryScreen
      procedure={procedure}
      procedureId={procedureId}
      procedureSlug={procedureSlug}
      site={site}
      siteSlug={siteSlug}
      mode={mode}
      surgeryDate={surgeryDate}
      onComplete={handleComplete}
    />
  );
}
