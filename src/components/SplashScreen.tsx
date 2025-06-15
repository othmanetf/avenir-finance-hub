import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type SplashScreenProps = {
  onComplete: () => void;
};

const splashTaglines: Record<"fr" | "ar" | "en", string> = {
  fr: "Votre avenir financier, simplifié",
  ar: "مستقبلك المالي، ببساطة",
  en: "Your financial future, simplified",
};

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const { language } = useLanguage();
  const [isExiting, setIsExiting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Animate and complete splash after some time
    const loaderTimeout = setTimeout(() => setShowLoader(true), 1500);
    const exitTimeout = setTimeout(() => setIsExiting(true), 2400);
    const completeTimeout = setTimeout(() => onComplete(), 2850);

    return () => {
      clearTimeout(loaderTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-monavenir-blue to-monavenir-cyan"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="relative h-36 w-36 mb-4">
              <img 
                src="/lovable-uploads/33b87b94-68e1-451c-96db-4b92477a5d03.png"
                alt="MonAvenir+"
                className="h-full w-full object-contain"
              />
            </div>
            <motion.h1
              className="text-4xl font-bold text-white mb-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              MonAvenir+
            </motion.h1>
            <motion.p
              className="text-white/90 text-lg min-h-[32px]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              style={{ letterSpacing: language === "ar" ? "0.05em" : undefined }}
            >
              {splashTaglines[language]}
            </motion.p>
          </motion.div>
          <motion.div
            className="absolute bottom-16 w-full flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: showLoader ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {showLoader && <Loader2 className="h-8 w-8 animate-spin text-white" />}
          </motion.div>
          <div className="absolute bottom-8 w-full text-center">
            <span className="text-white text-xs opacity-80">v1.0.0</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
