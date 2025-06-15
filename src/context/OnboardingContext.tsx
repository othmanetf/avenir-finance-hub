
import React, { createContext, useContext, useState } from 'react';

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
    // In a real app, this would send the data to an API
    // For now, we'll just store it in localStorage
    const userData = {
      fullName,
      email,
      phoneNumber,
      username,
      profilePicture,
      financialProfile,
      bankConnected
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
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
