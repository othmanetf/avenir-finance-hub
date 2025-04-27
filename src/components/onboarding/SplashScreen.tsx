
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon-provider";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [showContinue, setShowContinue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    setIsLoading(true);
    const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding") === "true";
    
    // Add a slight delay for smooth transition
    setTimeout(() => {
      navigate(hasCompletedOnboarding ? "/" : "/onboarding");
    }, 800);
  };

  return (
    <motion.div 
      className="h-screen w-full bg-gradient-to-br from-[#1F6FEB] to-[#8E44AD] flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="relative w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center mb-8 overflow-hidden">
          <img 
            src="/lovable-uploads/7fe54294-a4f9-4328-b4c5-837bc792315b.png" 
            alt="MonAvenir+" 
            className="w-28 h-28 object-contain" 
          />
        </div>
        <motion.h1 
          className="text-4xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          MonAvenir+
        </motion.h1>
        <motion.p 
          className="text-white/90 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Votre avenir financier, simplifié
        </motion.p>
      </motion.div>

      {showContinue && (
        <motion.div
          className="absolute bottom-16 w-full flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={handleContinue}
            className="bg-white text-[#1F6FEB] font-medium rounded-full px-8 py-3 shadow-lg flex items-center"
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Chargement...
              </>
            ) : (
              "Commencer"
            )}
          </motion.button>
        </motion.div>
      )}

      <motion.div 
        className="absolute bottom-8 w-full flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="text-white text-sm">v1.0.0</p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
