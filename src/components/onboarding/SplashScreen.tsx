
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const slogans = [
  "Épargnez pour votre avenir",
  "Suivez vos dépenses et revenus",
  "Analysez vos finances intelligemment"
];

export const SplashScreen = () => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prevSlogan) => (prevSlogan + 1) % slogans.length);
    }, 2500);

    const timeout = setTimeout(() => {
      const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
      
      if (hasCompletedOnboarding) {
        navigate('/');
      } else {
        navigate('/onboarding');
      }
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-monavenir-lightgrey to-white dark:from-monavenir-midnight dark:to-gray-900">
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
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-0 rounded-full bg-gradient-primary shadow-lg"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute inset-3 rounded-full bg-white dark:bg-gray-800"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
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
      </motion.div>
    </div>
  );
};

export default SplashScreen;
