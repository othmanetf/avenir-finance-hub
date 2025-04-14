
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SplashScreenProps = {
  onComplete: () => void;
};

const slogans = [
  "Save for your future",
  "Track your spending and income",
  "Analyze your finances intelligently"
];

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [currentSlogan, setCurrentSlogan] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prevSlogan) => (prevSlogan + 1) % slogans.length);
    }, 2500);

    const timeout = setTimeout(() => {
      onComplete();
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f9f5ff]">
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
            className="absolute inset-0 rounded-full bg-primary shadow-lg"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute inset-3 rounded-full bg-white"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-primary"
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
          MonAvenir<span className="text-primary">+</span>
        </motion.h1>

        <div className="h-8 overflow-hidden">
          {slogans.map((slogan, index) => (
            <p
              key={slogan}
              className={cn(
                "text-center text-lg font-medium text-gray-600 transition-all duration-500",
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
