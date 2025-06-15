
import React, { createContext, useContext, useState } from 'react';
import { useUserData } from './UserDataContext';

// Define the types for our financial profile
export type FinancialProfile = {
  monthlyIncome: string;
  incomeSources?: string[];
  fixedExpenses: string[];
  hasDebt: boolean;
  debtAmount?: string;
  debtDuration?: string;
  monthlySavings: string;
  savingsGoals: string[];
  totalSavings: string;
  investmentTypes: string[];
  financialGoals: string[];
  financialConcerns: string[];
  preferredLanguage: 'fr' | 'ar' | 'en';
};

// Define the context type
type OnboardingContextType = {
  step: number;
  setStep: (step: number) => void;
  fullName: string;
  setFullName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  profilePicture: string | null;
  setProfilePicture: (pic: string | null) => void;
  username: string;
  setUsername: (username: string) => void;
  financialProfile: FinancialProfile;
  updateFinancialProfile: (field: keyof FinancialProfile, value: any) => void;
  bankConnected: boolean;
  setBankConnected: (connected: boolean) => void;
  completeOnboarding: () => void;
};

const defaultFinancialProfile: FinancialProfile = {
  monthlyIncome: '',
  incomeSources: [],
  fixedExpenses: [],
  hasDebt: false,
  monthlySavings: '',
  savingsGoals: [],
  totalSavings: '',
  investmentTypes: [],
  financialGoals: [],
  financialConcerns: [],
  preferredLanguage: 'fr',
};

// Create the context with default values
const OnboardingContext = createContext<OnboardingContextType>({
  step: 1,
  setStep: () => {},
  fullName: '',
  setFullName: () => {},
  email: '',
  setEmail: () => {},
  password: '',
  setPassword: () => {},
  confirmPassword: '',
  setConfirmPassword: () => {},
  phoneNumber: '',
  setPhoneNumber: () => {},
  verificationCode: '',
  setVerificationCode: () => {},
  profilePicture: null,
  setProfilePicture: () => {},
  username: '',
  setUsername: () => {},
  financialProfile: defaultFinancialProfile,
  updateFinancialProfile: () => {},
  bankConnected: false,
  setBankConnected: () => {},
  completeOnboarding: () => {},
});

// Create a provider component
export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { updateUserData, addExpense, addDebt, addGoal, addInvestment } = useUserData();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [financialProfile, setFinancialProfile] = useState<FinancialProfile>(defaultFinancialProfile);
  const [bankConnected, setBankConnected] = useState(false);

  // Update a specific field in the financial profile
  const updateFinancialProfile = (field: keyof FinancialProfile, value: any) => {
    setFinancialProfile(prevProfile => ({
      ...prevProfile,
      [field]: value
    }));
  };

  // Function to save all onboarding data and complete the process
  const completeOnboarding = () => {
    // Convert onboarding data to UserData format
    const monthlyIncomeAmount = parseFloat(financialProfile.monthlyIncome.replace(/[^\d.]/g, '')) || 0;
    const totalSavingsAmount = parseFloat(financialProfile.totalSavings.replace(/[^\d.]/g, '')) || 0;
    const monthlySavingsAmount = parseFloat(financialProfile.monthlySavings.replace(/[^\d.]/g, '')) || 0;

    // Create expenses from fixed expenses
    financialProfile.fixedExpenses.forEach(expenseType => {
      const defaultAmounts: { [key: string]: number } = {
        'Loyer/Hypothèque': 3000,
        'Services (eau, électricité)': 300,
        'Télécommunications': 200,
        'Transports': 800,
        'Alimentation': 1500,
        'Santé': 400,
        'Education': 500
      };

      addExpense({
        category: expenseType,
        amount: defaultAmounts[expenseType] || 500,
        isFixed: true,
        frequency: 'monthly'
      });
    });

    // Create debt if exists
    if (financialProfile.hasDebt && financialProfile.debtAmount && financialProfile.debtDuration) {
      const debtAmount = parseFloat(financialProfile.debtAmount.replace(/[^\d.]/g, '')) || 0;
      const remainingMonths = parseInt(financialProfile.debtDuration) || 12;
      
      addDebt({
        type: 'Prêt général',
        amount: debtAmount,
        monthlyPayment: debtAmount / remainingMonths,
        remainingMonths: remainingMonths,
        interestRate: 5
      });
    }

    // Create goals from savings goals
    financialProfile.savingsGoals.forEach((goalType, index) => {
      const defaultTargets: { [key: string]: { amount: number, months: string } } = {
        'Fonds d\'urgence': { amount: monthlyIncomeAmount * 6, months: '12 mois' },
        'Voyage': { amount: 15000, months: '6 mois' },
        'Achat immobilier': { amount: 200000, months: '60 mois' },
        'Mariage': { amount: 50000, months: '18 mois' },
        'Retraite': { amount: 500000, months: '240 mois' },
        'Études': { amount: 80000, months: '24 mois' },
        'Démarrer une entreprise': { amount: 100000, months: '36 mois' }
      };

      const goalData = defaultTargets[goalType] || { amount: 20000, months: '12 mois' };
      
      addGoal({
        type: goalType,
        targetAmount: goalData.amount,
        timeHorizon: goalData.months,
        currentAmount: index === 0 ? monthlySavingsAmount * 3 : 0,
        priority: index === 0 ? 'high' : 'medium'
      });
    });

    // Create investments from investment types
    financialProfile.investmentTypes.forEach(investmentType => {
      if (investmentType !== 'Aucun pour le moment') {
        const defaultAmounts: { [key: string]: { amount: number, risk: 'low' | 'medium' | 'high' } } = {
          'Compte d\'épargne': { amount: totalSavingsAmount * 0.6, risk: 'low' },
          'Actions': { amount: totalSavingsAmount * 0.3, risk: 'high' },
          'ETFs': { amount: totalSavingsAmount * 0.2, risk: 'medium' },
          'Obligations': { amount: totalSavingsAmount * 0.4, risk: 'low' },
          'Immobilier': { amount: totalSavingsAmount * 0.5, risk: 'medium' },
          'Crypto-monnaies': { amount: totalSavingsAmount * 0.1, risk: 'high' }
        };

        const investmentData = defaultAmounts[investmentType] || { amount: 5000, risk: 'medium' as const };
        
        addInvestment({
          type: investmentType,
          amount: investmentData.amount,
          riskLevel: investmentData.risk
        });
      }
    });

    // Update user data with all information
    updateUserData({
      fullName,
      email,
      phoneNumber,
      profilePicture: profilePicture || undefined,
      monthlyIncome: monthlyIncomeAmount,
      totalSavings: totalSavingsAmount,
      financialConcerns: financialProfile.financialConcerns,
      preferences: {
        currency: 'MAD',
        language: financialProfile.preferredLanguage,
        theme: 'light',
        notifications: true,
        riskTolerance: 'moderate'
      },
      onboardingCompleted: true
    });
    
    localStorage.setItem('hasCompletedOnboarding', 'true');
  };

  return (
    <OnboardingContext.Provider value={{
      step,
      setStep,
      fullName,
      setFullName,
      email,
      setEmail,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      phoneNumber,
      setPhoneNumber,
      verificationCode,
      setVerificationCode,
      profilePicture,
      setProfilePicture,
      username,
      setUsername,
      financialProfile,
      updateFinancialProfile,
      bankConnected,
      setBankConnected,
      completeOnboarding
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Custom hook to use the onboarding context
export const useOnboarding = () => useContext(OnboardingContext);
