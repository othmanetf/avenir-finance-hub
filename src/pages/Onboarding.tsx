
import { useState } from "react";
import { OnboardingProvider } from "@/context/OnboardingContext";
import AccountCreation from "@/components/onboarding/AccountCreation";
import FinancialProfiling from "@/components/onboarding/FinancialProfiling";
import BankConnection from "@/components/onboarding/BankConnection";

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        {currentStep === 1 && <AccountCreation />}
        {currentStep === 2 && <FinancialProfiling />}
        {currentStep === 3 && <BankConnection />}
      </div>
    </OnboardingProvider>
  );
};

export default OnboardingPage;
