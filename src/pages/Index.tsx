
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SplashScreen from "@/components/SplashScreen";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import Education from "@/components/Education";
import Analysis from "@/components/Analysis";
import Investments from "@/components/Investments";
import ProfilePage from "@/components/ProfilePage";
import { useProfile } from "@/hooks/use-profile";
import { useOnboarded } from "@/hooks/use-onboarded";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("/");
  const { isProfileOpen, closeProfile } = useProfile();
  const { isOnboarded, isLoading } = useOnboarded();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed onboarding
    if (!isLoading && !isOnboarded) {
      navigate('/onboarding');
      return;
    }

    // Ignore splash screen for returning users
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, [isLoading, isOnboarded, navigate]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem("hasSeenSplash", "true");
  };

  // Show a loading state while checking onboarding status
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const renderCurrentView = () => {
    const views = {
      "/": <Dashboard />,
      "/education": <Education />,
      "/analysis": <Analysis />,
      "/investments": <Investments />
    };
    
    return views[currentRoute as keyof typeof views] || <Dashboard />;
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <>
          <Navigation currentRoute={currentRoute} onRouteChange={setCurrentRoute} />
          <main className="pb-20 md:pb-6 px-0 mx-auto max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRoute}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderCurrentView()}
              </motion.div>
            </AnimatePresence>
          </main>
          <ProfilePage 
            isOpen={isProfileOpen} 
            onClose={closeProfile} 
          />
        </>
      )}
    </div>
  );
};

export default Index;
