import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const taglines = [
  { lang: "Français", text: "Votre avenir financier, simplifié" },
  { lang: "العربية", text: "مستقبلك المالي، ببساطة" },
  { lang: "English", text: "Your financial future, simplified" },
];

const SplashScreen = () => {
  const navigate = useNavigate();
  const [showContinue, setShowContinue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    setIsLoading(true);
    const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding") === "true";
    setTimeout(() => {
      navigate(hasCompletedOnboarding ? "/" : "/onboarding");
    }, 800);
  };

  return <motion.div className="h-screen w-full bg-gradient-to-br from-monavenir-blue to-monavenir-cyan flex flex-col items-center justify-center" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }}>
      <motion.div className="flex flex-col items-center justify-center" initial={{
      scale: 0.8,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} transition={{
      delay: 0.3,
      duration: 0.5
    }}>
        <div className="relative w-52 h-52 rounded-full flex items-center justify-center mb-8 -mt-8">
          <img alt="MonAvenir+" src="/lovable-uploads/8e15a96a-8b34-436d-8a40-d685476e7163.png" className="w-full h-full object-contain" />
        </div>
        <motion.h1 className="text-4xl font-bold text-white mb-2" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.5,
        duration: 0.5
      }}>
          MonAvenir+
        </motion.h1>
        <motion.p
          className="text-white/90 text-lg min-h-7 mt-1"
          key={taglineIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          dir={taglineIndex === 1 ? "rtl" : "ltr"}
          style={{
            fontFamily: taglineIndex === 1 ? "Tahoma, Arial, sans-serif" : undefined,
            letterSpacing: taglineIndex === 1 ? "0.5px" : undefined
          }}
        >
          <span className="block">
            {taglines[taglineIndex].lang !== "English" && (
              <span className="font-semibold mr-2">{taglines[taglineIndex].lang}:</span>
            )}
            <span>{taglines[taglineIndex].text}</span>
          </span>
        </motion.p>
      </motion.div>

      {showContinue && <motion.div className="absolute bottom-16 w-full flex justify-center" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
          <motion.button onClick={handleContinue} className="bg-white text-monavenir-blue font-medium rounded-full px-8 py-3 shadow-lg flex items-center" whileTap={{
        scale: 0.95
      }} disabled={isLoading}>
            {isLoading ? <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Chargement...
              </> : "Commencer"}
          </motion.button>
        </motion.div>}

      <motion.div className="absolute bottom-8 w-full flex justify-center" initial={{
      opacity: 0
    }} animate={{
      opacity: 0.7
    }} transition={{
      delay: 1,
      duration: 0.5
    }}>
        <p className="text-white text-sm">v1.0.0</p>
      </motion.div>
    </motion.div>;
};
export default SplashScreen;
