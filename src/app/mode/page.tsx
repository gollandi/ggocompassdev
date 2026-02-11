'use client';

import { useRouter } from 'next/navigation';
import { ModeSelectScreen } from '@/components/screens/ModeSelectScreen';

export default function ModePage() {
  const router = useRouter();

  const handleSelectMode = (mode: 'explore' | 'track') => {
    sessionStorage.setItem('ggo-mode', mode);
    router.push('/procedure');
  };

  const handleExportVariables = () => {
    router.push('/export');
  };

  const handleViewMicrocopyStyles = () => {
    router.push('/styles');
  };

  return (
    <ModeSelectScreen
      onSelectMode={handleSelectMode}
      onExportVariables={handleExportVariables}
      onViewMicrocopyStyles={handleViewMicrocopyStyles}
    />
  );
}
