
import { useState } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { useLanguage } from "@/context/LanguageContext";
import IncomeStep from "./financial-profiling/IncomeStep";
import ExpensesStep from "./financial-profiling/ExpensesStep";
import DebtStep from "./financial-profiling/DebtStep";
import SavingsStep from "./financial-profiling/SavingsStep";
import InvestmentStep from "./financial-profiling/InvestmentStep";
import GoalsStep from "./financial-profiling/GoalsStep";

interface FinancialProfilingProps {
  onComplete?: () => void;
}

const subStepComponents = [
  IncomeStep,
  ExpensesStep,
  DebtStep,
  SavingsStep,
  InvestmentStep,
  GoalsStep
];

export const FinancialProfiling = ({ onComplete }: FinancialProfilingProps) => {
  const [subStep, setSubStep] = useState(0);
  const { setStep } = useOnboarding();
  const { language } = useLanguage();

  const totalSteps = subStepComponents.length;

  const handleNext = () => {
    if (subStep < totalSteps - 1) {
      setSubStep(subStep + 1);
    } else if (onComplete) {
      onComplete();
    } else {
      setStep(4);
    }
  };

  const handleBack = () => {
    if (subStep > 0) {
      setSubStep(subStep - 1);
    } else {
      setStep(2);
    }
  };

  const StepComponent = subStepComponents[subStep];

  return (
    <div>
      <StepComponent onBack={handleBack} onNext={handleNext} />
    </div>
  );
};

export default FinancialProfiling;
