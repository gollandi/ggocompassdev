'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { SplashScreen } from '@/components/screens/SplashScreen';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  const handleSplashComplete = () => {
    setShowSplash(false);
    router.replace('/personalise');
  };

  return (
    <AnimatePresence mode="wait">
      {showSplash && <SplashScreen key="splash" onComplete={handleSplashComplete} />}
    </AnimatePresence>
  );
}
