'use client';

import { useRouter } from 'next/navigation';
import { ExportVariablesScreen } from '@/components/screens/ExportVariablesScreen';

export default function ExportPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return <ExportVariablesScreen onBack={handleBack} />;
}
