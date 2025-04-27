
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingProvider } from "@/context/OnboardingContext";
import AccountCreation from "@/components/onboarding/AccountCreation";
import FinancialProfiling from "@/components/onboarding/FinancialProfiling";
import BankConnection from "@/components/onboarding/BankConnection";
import { Icon } from "@/components/ui/icon-provider";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarded } from "@/hooks/use-onboarded";
import { Loader2 } from "lucide-react";

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleting, setIsCompleting] = useState(false);
  const navigate = useNavigate();
  const { completeOnboarding } = useOnboarded();

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const skipToStep = (step: number) => {
    setCurrentStep(step);
  };

  const finishOnboarding = () => {
    setIsCompleting(true);
    // Show loading for 1.5 seconds before navigating to home
    setTimeout(() => {
      completeOnboarding();
      navigate("/");
    }, 1500);
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return "profile";
      case 2:
        return "analysis";
      case 3:
        return "transactions";
      default:
        return "profile";
    }
  };

  const getStepName = (step: number) => {
    switch (step) {
      case 1:
        return "Profil";
      case 2:
        return "Finances";
      case 3:
        return "Compte";
      default:
        return "";
    }
  };

  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-background overflow-hidden">
        {/* Progress indicator - Revised for better alignment and no overlapping */}
        <div className="fixed top-0 left-0 w-full z-10 bg-background/95 backdrop-blur-sm shadow-sm pt-4 pb-2">
          <div className="max-w-md mx-auto flex items-center justify-between mb-1 px-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={() => finishOnboarding()}
            >
              Ignorer
            </Button>
            <div className="text-sm font-medium">
              Étape {currentStep}/3
            </div>
          </div>
          <div className="flex justify-between mb-2 max-w-md mx-auto px-4">
            {[1, 2, 3].map((step) => (
              <div 
                key={step} 
                className={`h-1 rounded-full flex-1 mx-1 ${
                  currentStep >= step ? "bg-gradient-to-r from-[#1F6FEB] to-[#8E44AD]" : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between max-w-md mx-auto px-4 pb-1">
            {[1, 2, 3].map((step) => (
              <button 
                key={step}
                onClick={() => skipToStep(step)}
                className="flex flex-col items-center cursor-pointer w-20"
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full mb-1 ${
                  currentStep >= step 
                    ? "bg-gradient-to-r from-[#1F6FEB] to-[#8E44AD] text-white" 
                    : "bg-gray-100 text-gray-400"
                }`}>
                  <Icon 
                    name={getStepIcon(step)}
                    size={18}
                    strokeWidth={currentStep >= step ? 2 : 1.5}
                  />
                </div>
                <span className={`text-xs ${
                  currentStep >= step ? "text-primary font-medium" : "text-gray-400"
                }`}>
                  {getStepName(step)}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="pt-28 pb-4">
          <AnimatePresence mode="wait">
            {isCompleting ? (
              <motion.div 
                key="completing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50"
              >
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg font-medium">Finalisation...</p>
              </motion.div>
            ) : currentStep === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <AccountCreation onComplete={() => handleStepChange(2)} />
              </motion.div>
            ) : currentStep === 2 ? (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <FinancialProfiling onComplete={() => handleStepChange(3)} />
              </motion.div>
            ) : (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <BankConnection onComplete={finishOnboarding} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </OnboardingProvider>
  );
};

export default OnboardingPage;
