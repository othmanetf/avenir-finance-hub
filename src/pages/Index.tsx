
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
import { motion, AnimatePresence } from "framer-motion";

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

    // Ignorer l'écran de démarrage pour les utilisateurs qui reviennent
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
        <div className="flex flex-col items-center">
          <div className="loading-spinner"></div>
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  // Animation variants for the view transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      x: 10,
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: -10,
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3
  };

  const renderCurrentView = () => {
    const View = (() => {
      switch (currentRoute) {
        case "/":
          return Dashboard;
        case "/education":
          return Education;
        case "/analysis":
          return Analysis;
        case "/investments":
          return Investments;
        default:
          return Dashboard;
      }
    })();

    return (
      <motion.div
        key={currentRoute}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        <View />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <>
          <Navigation currentRoute={currentRoute} onRouteChange={setCurrentRoute} />
          <AnimatePresence mode="wait">
            <main className="pb-20 md:pb-6 px-0 mx-auto max-w-5xl">
              {renderCurrentView()}
            </main>
          </AnimatePresence>
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
