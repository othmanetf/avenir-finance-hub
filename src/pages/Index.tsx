
import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import Education from "@/components/Education";
import Analysis from "@/components/Analysis";
import Investments from "@/components/Investments";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("/");

  useEffect(() => {
    // Skip splash screen for returning users
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem("hasSeenSplash", "true");
  };

  const renderCurrentView = () => {
    switch (currentRoute) {
      case "/":
        return <Dashboard />;
      case "/education":
        return <Education />;
      case "/analysis":
        return <Analysis />;
      case "/investments":
        return <Investments />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <>
          <Navigation currentRoute={currentRoute} onRouteChange={setCurrentRoute} />
          <main className="pb-20 md:pb-6">{renderCurrentView()}</main>
        </>
      )}
    </div>
  );
};

export default Index;
