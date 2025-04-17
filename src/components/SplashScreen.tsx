
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-monavenir-lightgrey to-white dark:from-monavenir-midnight dark:to-gray-900"
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
            <div className="relative h-28 w-28">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", damping: 12 }}
                className="absolute inset-0 rounded-full bg-gradient-primary shadow-lg"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring", damping: 12 }}
                className="absolute inset-3 rounded-full bg-white dark:bg-gray-800"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6, type: "spring", damping: 12 }}
                className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-transparent bg-gradient-primary bg-clip-text"
              >
                M+
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-3xl font-bold sm:text-4xl md:text-5xl text-foreground"
            >
              MonAvenir<span className="text-transparent bg-gradient-primary bg-clip-text">+</span>
            </motion.h1>

            <div className="h-8 overflow-hidden">
              {slogans.map((slogan, index) => (
                <p
                  key={slogan}
                  className={cn(
                    "text-center text-lg font-medium text-gray-600 dark:text-gray-300 transition-all duration-500",
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
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
