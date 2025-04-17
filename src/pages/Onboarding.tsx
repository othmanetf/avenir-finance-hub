
import { useState } from "react";
import { OnboardingProvider } from "@/context/OnboardingContext";
import AccountCreation from "@/components/onboarding/AccountCreation";
import FinancialProfiling from "@/components/onboarding/FinancialProfiling";
import BankConnection from "@/components/onboarding/BankConnection";

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Progress indicator */}
        <div className="fixed top-0 left-0 w-full z-10 px-4 pt-4">
          <div className="flex justify-between mb-2 max-w-md mx-auto">
            {[1, 2, 3].map((step) => (
              <div 
                key={step} 
                className={`h-1 rounded-full flex-1 mx-1 ${
                  currentStep >= step ? "bg-gradient-primary" : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
        
        {currentStep === 1 && <AccountCreation onComplete={() => handleStepChange(2)} />}
        {currentStep === 2 && <FinancialProfiling onComplete={() => handleStepChange(3)} />}
        {currentStep === 3 && <BankConnection />}
      </div>
    </OnboardingProvider>
  );
};

export default OnboardingPage;
