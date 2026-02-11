'use client';

import { useRouter } from 'next/navigation';
import { FeedbackScreen } from '@/components/screens/FeedbackScreen';

export default function FeedbackPage() {
  const router = useRouter();

  const handleNext = (rating: number, comments: string) => {
    // Store feedback in sessionStorage (could be sent to API)
    sessionStorage.setItem('ggo-feedback-rating', rating.toString());
    sessionStorage.setItem('ggo-feedback-comments', comments);
    router.push('/completion');
  };

  return <FeedbackScreen onNext={handleNext} />;
}
