
import { useState, useEffect } from 'react';

export const useOnboarded = () => {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    setIsOnboarded(hasCompletedOnboarding);
    setIsLoading(false);
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setIsOnboarded(true);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('hasCompletedOnboarding');
    localStorage.removeItem('userData');
    setIsOnboarded(false);
  };

  return { isOnboarded, isLoading, completeOnboarding, resetOnboarding };
};

export default useOnboarded;
