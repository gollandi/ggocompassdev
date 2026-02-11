'use client';

import { useRouter } from 'next/navigation';
import { PersonaliseScreen, PersonalisePreferences } from '@/components/screens/PersonaliseScreen';

export default function PersonalisePage() {
  const router = useRouter();

  const handlePersonaliseNext = (preferences: PersonalisePreferences) => {
    sessionStorage.setItem('ggo-preferences', JSON.stringify(preferences));
    router.push('/welcome');
  };

  return <PersonaliseScreen onNext={handlePersonaliseNext} />;
}
