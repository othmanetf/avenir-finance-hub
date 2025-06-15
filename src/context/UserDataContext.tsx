
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserData = {
  fullName: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  totalBudget: number;
  spent: number;
  remainingDays: number;
  dailyBudget: number;
  progressPercentage: number;
  currentDay: number;
  lastDay: number;
  savingsGoal?: number;
  estimatedBalance: number;
};

type UserDataContextType = {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  isDataLoaded: boolean;
};

const defaultUserData: UserData = {
  fullName: 'Utilisateur',
  monthlyIncome: 0,
  monthlyExpenses: 0,
  totalBudget: 0,
  spent: 0,
  remainingDays: 18,
  dailyBudget: 0,
  progressPercentage: 0,
  currentDay: 13,
  lastDay: 31,
  estimatedBalance: 0,
};

const UserDataContext = createContext<UserDataContextType>({
  userData: defaultUserData,
  updateUserData: () => {},
  isDataLoaded: false,
});

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    // Charger les données depuis localStorage au démarrage
    const savedUserData = localStorage.getItem('userData');
    const onboardingData = localStorage.getItem('onboardingData');
    
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setUserData(prevData => ({ ...prevData, ...parsedData }));
    } else if (onboardingData) {
      // Migration des anciennes données d'onboarding
      const parsedOnboardingData = JSON.parse(onboardingData);
      const migratedData = migrateOnboardingData(parsedOnboardingData);
      setUserData(migratedData);
      localStorage.setItem('userData', JSON.stringify(migratedData));
    }
    
    setIsDataLoaded(true);
  }, []);

  const migrateOnboardingData = (onboardingData: any): UserData => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const remainingDays = lastDay - currentDay;
    
    // Conversion des revenus mensuels depuis les tranches d'onboarding
    const parseMonthlyIncome = (incomeRange: string): number => {
      if (incomeRange.includes('< 5,000')) return 4000;
      if (incomeRange.includes('5,000 - 10,000')) return 7500;
      if (incomeRange.includes('10,000 - 15,000')) return 12500;
      if (incomeRange.includes('15,000 - 25,000')) return 20000;
      if (incomeRange.includes('> 25,000')) return 30000;
      return 8500; // valeur par défaut
    };

    const monthlyIncome = onboardingData.financialProfile?.monthlyIncome 
      ? parseMonthlyIncome(onboardingData.financialProfile.monthlyIncome)
      : 8500;

    // Estimation des dépenses mensuelles basée sur les dépenses fixes
    const estimatedExpenses = Math.round(monthlyIncome * 0.7); // 70% du revenu en dépenses estimées
    const totalBudget = estimatedExpenses;
    const spent = Math.round(estimatedExpenses * (currentDay / lastDay));
    const dailyBudget = remainingDays > 0 ? Math.round((totalBudget - spent) / remainingDays) : 0;
    const progressPercentage = Math.round((spent / totalBudget) * 100);
    const estimatedBalance = monthlyIncome - estimatedExpenses;

    return {
      fullName: onboardingData.fullName || 'Utilisateur',
      monthlyIncome,
      monthlyExpenses: estimatedExpenses,
      totalBudget,
      spent,
      remainingDays,
      dailyBudget,
      progressPercentage,
      currentDay,
      lastDay,
      estimatedBalance,
    };
  };

  const updateUserData = (data: Partial<UserData>) => {
    const updatedData = { ...userData, ...data };
    setUserData(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData));
  };

  return (
    <UserDataContext.Provider value={{
      userData,
      updateUserData,
      isDataLoaded
    }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
