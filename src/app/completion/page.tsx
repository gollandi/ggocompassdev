'use client';

import { useRouter } from 'next/navigation';
import { CompletionScreen } from '@/components/screens/CompletionScreen';

export default function CompletionPage() {
  const router = useRouter();

  const handleReset = () => {
    // Clear all session data
    sessionStorage.clear();
    router.push('/');
  };

  return <CompletionScreen onReset={handleReset} />;
}
