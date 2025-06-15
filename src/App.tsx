
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";
import Onboarding from "./pages/Onboarding";
import { useState, useEffect, lazy, Suspense } from "react";
import { useOnboarded } from "./hooks/use-onboarded";
import { Loader2 } from "lucide-react";
import { LanguageProvider } from "@/context/LanguageContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading component
const LoadingSpinner = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-gray-500">Chargement...</p>
    </div>
  </div>
);

// Preload app logo
const preloadAppLogo = () => {
  const img = new Image();
  img.src = "/lovable-uploads/33b87b94-68e1-451c-96db-4b92477a5d03.png";
};

// Component to handle routes based on authentication
const ProtectedRoutes = () => {
  const { isOnboarded, isLoading } = useOnboarded();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Preload the logo
    preloadAppLogo();
    // Only show splash for 3 seconds the first time the app is opened
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isOnboarded ? <Index /> : <Navigate to="/onboarding" />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<ProtectedRoutes />} />
                <Route path="/education" element={<ProtectedRoutes />} />
                <Route path="/analysis" element={<ProtectedRoutes />} />
                <Route path="/investments" element={<ProtectedRoutes />} />
                <Route path="/splash" element={<SplashScreen onComplete={() => {}} />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
