
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/onboarding/SplashScreen";
import Onboarding from "./pages/Onboarding";
import { useState, useEffect, lazy, Suspense } from "react";
import { useOnboarded } from "./hooks/use-onboarded";

const queryClient = new QueryClient();

// Component to handle routes based on authentication
const ProtectedRoutes = () => {
  const { isOnboarded, isLoading } = useOnboarded();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Only show splash for 8 seconds the first time the app is opened
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center">Chargement...</div>;
  }

  return isOnboarded ? <Index /> : <Navigate to="/onboarding" />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Chargement...</div>}>
            <Routes>
              <Route path="/" element={<ProtectedRoutes />} />
              <Route path="/splash" element={<SplashScreen />} />
              <Route path="/onboarding" element={<Onboarding />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
