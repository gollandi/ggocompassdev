'use client';

import { useRouter } from 'next/navigation';
import { MicrocopyStyleGuideScreen } from '@/components/screens/MicrocopyStyleGuideScreen';

export default function StylesPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return <MicrocopyStyleGuideScreen onBack={handleBack} />;
}
