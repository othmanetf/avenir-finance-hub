
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/onboarding/SplashScreen";
import Onboarding from "./pages/Onboarding";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [showingSplash, setShowingSplash] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the splash screen after 8 seconds
    const timer = setTimeout(() => {
      setShowingSplash(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (showingSplash) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/onboarding" element={<Onboarding />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
