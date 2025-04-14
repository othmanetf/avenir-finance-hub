
import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import Education from "@/components/Education";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("/");

  useEffect(() => {
    // You could check local storage here to skip splash screen for returning users
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
      case "/budget":
        return <Dashboard />;  // For MVP we'll reuse Dashboard for Budget route
      case "/analysis":
        return <Dashboard />;  // For MVP we'll reuse Dashboard for Analysis route
      case "/investments":
        return <Education />;  // For MVP we'll reuse Education for Investments route
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
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
