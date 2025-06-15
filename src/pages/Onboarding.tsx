import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/icon-provider";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarded } from "@/hooks/use-onboarded";
import { Loader2 } from "lucide-react";
import AccountCreation from "@/components/onboarding/AccountCreation";
import FinancialProfiling from "@/components/onboarding/FinancialProfiling";
import BankConnection from "@/components/onboarding/BankConnection";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";

const LANGUAGE_LABELS = {
  fr: "Français",
  ar: "العربية (Arabe)",
  en: "English (Anglais)"
};

const LanguageStep = ({ onComplete }: { onComplete: () => void }) => {
  const { language, setLanguage } = useLanguage();

  // Prevent skipping language step, always go forward
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        className="space-y-8"
      >
        <div className="flex flex-col items-center space-y-3">
          <Globe className="h-10 w-10 text-monavenir-blue mb-2" />
          <h1 className="text-3xl font-bold text-center">
            Bienvenue sur MonAvenir+
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Sélectionnez votre langue préférée pour commencer :
          </p>
        </div>
        <form onSubmit={handleNext} className="space-y-6">
          <RadioGroup
            value={language}
            onValueChange={val => setLanguage(val as "fr" | "ar" | "en")}
            className="grid gap-3"
          >
            {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
              <div key={code} className="flex items-center space-x-3 border rounded-lg p-4">
                <RadioGroupItem value={code} id={`lang-sel-${code}`} />
                <Label htmlFor={`lang-sel-${code}`}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
          <Button type="submit" className="w-full bg-gradient-primary">
            {language === "fr" && "Commencer"}
            {language === "ar" && "ابدأ"}
            {language === "en" && "Get started"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleting, setIsCompleting] = useState(false);
  const navigate = useNavigate();
  const { completeOnboarding } = useOnboarded();

  // Order: 1 = language, 2 = account, 3 = profile, 4 = bank
  const stepContent = [
    <LanguageStep key="lang" onComplete={() => setCurrentStep(2)} />,
    <AccountCreation key="account" onComplete={() => setCurrentStep(3)} />,
    <FinancialProfiling key="profile" onComplete={() => setCurrentStep(4)} />,
    <BankConnection key="bank" />
  ];

  const finishOnboarding = () => {
    setIsCompleting(true);
    setTimeout(() => {
      completeOnboarding();
      navigate("/");
    }, 1500);
  };

  return (
    <LanguageProvider>
      <OnboardingProvider>
        <div className="min-h-screen bg-background overflow-hidden">
          {/* Steps bar & skip only after language step */}
          {currentStep > 1 && (
            <>
              <div className="fixed top-0 left-0 w-full z-10 bg-background/95 backdrop-blur-sm shadow-sm pt-4 pb-2">
                <div className="max-w-md mx-auto flex items-center justify-between mb-1 px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={finishOnboarding}
                  >
                    Ignorer
                  </Button>
                  <div className="text-sm font-medium">
                    Étape {currentStep - 1}/3
                  </div>
                </div>
                <div className="flex justify-between mb-2 max-w-md mx-auto px-4">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`h-1 rounded-full flex-1 mx-1 ${
                        currentStep - 1 >= step
                          ? "bg-gradient-to-r from-monavenir-blue to-monavenir-cyan"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between max-w-md mx-auto px-4 pb-1">
                  {["Profil", "Finances", "Compte"].map((label, idx) => (
                    <button
                      key={label}
                      onClick={() => setCurrentStep(idx + 2)}
                      className="flex flex-col items-center cursor-pointer w-20"
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full mb-1 ${
                          currentStep - 1 >= idx + 1
                            ? "bg-gradient-to-r from-monavenir-blue to-monavenir-cyan text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Icon
                          name={
                            idx === 0
                              ? "profile"
                              : idx === 1
                              ? "analysis"
                              : "transactions"
                          }
                          size={18}
                          strokeWidth={currentStep - 1 >= idx + 1 ? 2 : 1.5}
                        />
                      </div>
                      <span
                        className={`text-xs ${
                          currentStep - 1 >= idx + 1
                            ? "text-monavenir-blue font-medium"
                            : "text-gray-400"
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className={`pt-${currentStep > 1 ? "28" : "0"} pb-4 overflow-hidden`}>
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
              ) : (
                stepContent[currentStep - 1]
              )}
            </AnimatePresence>
          </div>
        </div>
      </OnboardingProvider>
    </LanguageProvider>
  );
};

export default OnboardingFlow;
