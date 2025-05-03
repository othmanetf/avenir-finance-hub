
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type SplashScreenProps = {
  onComplete: () => void;
};

const slogans = [
  "Épargnez pour votre avenir",
  "Suivez vos dépenses et revenus",
  "Analysez vos finances intelligemment"
];

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prevSlogan) => (prevSlogan + 1) % slogans.length);
    }, 2500);

    // Show the loading indicator after 5.5 seconds
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 5500);

    // Start exit animation after 7 seconds
    const exitTimeout = setTimeout(() => {
      setIsExiting(true);
    }, 7000);
    
    // Complete after 7.5 seconds to allow for exit animation
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 7500);

    return () => {
      clearInterval(interval);
      clearTimeout(loaderTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-monavenir-blue to-monavenir-cyan dark:from-gray-900 dark:to-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-8"
          >
            <div className="relative h-36 w-36">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", damping: 12 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img 
                  src="/lovable-uploads/44d3ffe5-d8e6-4397-b688-da7ec5d0d013.png" 
                  alt="MonAvenir+" 
                  className="h-full w-full object-contain" 
                />
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-3xl font-bold sm:text-4xl md:text-5xl text-white"
            >
              MonAvenir<span className="text-transparent bg-gradient-to-r from-white to-white/80 bg-clip-text">+</span>
            </motion.h1>

            <div className="h-8 overflow-hidden">
              {slogans.map((slogan, index) => (
                <p
                  key={slogan}
                  className={cn(
                    "text-center text-lg font-medium text-white/90 transition-all duration-500",
                    currentSlogan === index ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  )}
                >
                  {slogan}
                </p>
              ))}
            </div>

            {showLoader && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8"
              >
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
