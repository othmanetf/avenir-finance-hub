import React, { createContext, useContext, useState, useEffect } from 'react';
import { FinancialProfile } from './OnboardingContext';

export type UserGoal = {
  id: string;
  type: string;
  targetAmount: number;
  timeHorizon: string;
  currentAmount: number;
  description?: string;
  priority: 'high' | 'medium' | 'low';
};

export type UserDebt = {
  id: string;
  type: string;
  amount: number;
  monthlyPayment: number;
  remainingMonths: number;
  interestRate?: number;
};

export type UserInvestment = {
  id: string;
  type: string;
  amount: number;
  platform?: string;
  riskLevel: 'low' | 'medium' | 'high';
};

export type UserExpense = {
  id: string;
  category: string;
  amount: number;
  isFixed: boolean;
  frequency: 'monthly' | 'yearly';
};

export type UserPreferences = {
  currency: 'MAD' | 'EUR' | 'USD';
  language: 'fr' | 'ar' | 'en';
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  twoFactorEnabled: boolean;
};

export type UserData = {
  // Basic info
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture?: string;
  
  // Financial data
  monthlyIncome: number;
  totalSavings: number;
  expenses: UserExpense[];
  debts: UserDebt[];
  investments: UserInvestment[];
  goals: UserGoal[];
  
  // Preferences and settings
  preferences: UserPreferences;
  
  // Profile insights
  financialConcerns: string[];
  onboardingCompleted: boolean;
};

type UserDataContextType = {
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
  addExpense: (expense: Omit<UserExpense, 'id'>) => void;
  updateExpense: (id: string, updates: Partial<UserExpense>) => void;
  removeExpense: (id: string) => void;
  addDebt: (debt: Omit<UserDebt, 'id'>) => void;
  updateDebt: (id: string, updates: Partial<UserDebt>) => void;
  removeDebt: (id: string) => void;
  addInvestment: (investment: Omit<UserInvestment, 'id'>) => void;
  updateInvestment: (id: string, updates: Partial<UserInvestment>) => void;
  removeInvestment: (id: string) => void;
  addGoal: (goal: Omit<UserGoal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<UserGoal>) => void;
  removeGoal: (id: string) => void;
  getEstimatedBalance: () => number;
  getTotalFixedExpenses: () => number;
  getTotalDebtPayments: () => number;
  saveToStorage: () => void;
};

const defaultUserData: UserData = {
  fullName: '',
  email: '',
  phoneNumber: '',
  monthlyIncome: 0,
  totalSavings: 0,
  expenses: [],
  debts: [],
  investments: [],
  goals: [],
  preferences: {
    currency: 'MAD',
    language: 'fr',
    theme: 'light',
    notifications: true,
    riskTolerance: 'moderate',
    twoFactorEnabled: false
  },
  financialConcerns: [],
  onboardingCompleted: false
};

const UserDataContext = createContext<UserDataContextType>({
  userData: defaultUserData,
  updateUserData: () => {},
  addExpense: () => {},
  updateExpense: () => {},
  removeExpense: () => {},
  addDebt: () => {},
  updateDebt: () => {},
  removeDebt: () => {},
  addInvestment: () => {},
  updateInvestment: () => {},
  removeInvestment: () => {},
  addGoal: () => {},
  updateGoal: () => {},
  removeGoal: () => {},
  getEstimatedBalance: () => 0,
  getTotalFixedExpenses: () => 0,
  getTotalDebtPayments: () => 0,
  saveToStorage: () => {},
});

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData({ ...defaultUserData, ...parsedData });
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }
  }, []);

  const saveToStorage = () => {
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const updateUserData = (updates: Partial<UserData>) => {
    setUserData(prev => {
      const newData = { ...prev, ...updates };
      localStorage.setItem('userData', JSON.stringify(newData));
      return newData;
    });
  };

  // Expense management
  const addExpense = (expense: Omit<UserExpense, 'id'>) => {
    const newExpense: UserExpense = {
      ...expense,
      id: crypto.randomUUID()
    };
    setUserData(prev => ({
      ...prev,
      expenses: [...prev.expenses, newExpense]
    }));
  };

  const updateExpense = (id: string, updates: Partial<UserExpense>) => {
    setUserData(prev => ({
      ...prev,
      expenses: prev.expenses.map(expense => 
        expense.id === id ? { ...expense, ...updates } : expense
      )
    }));
  };

  const removeExpense = (id: string) => {
    setUserData(prev => ({
      ...prev,
      expenses: prev.expenses.filter(expense => expense.id !== id)
    }));
  };

  // Debt management
  const addDebt = (debt: Omit<UserDebt, 'id'>) => {
    const newDebt: UserDebt = {
      ...debt,
      id: crypto.randomUUID()
    };
    setUserData(prev => ({
      ...prev,
      debts: [...prev.debts, newDebt]
    }));
  };

  const updateDebt = (id: string, updates: Partial<UserDebt>) => {
    setUserData(prev => ({
      ...prev,
      debts: prev.debts.map(debt => 
        debt.id === id ? { ...debt, ...updates } : debt
      )
    }));
  };

  const removeDebt = (id: string) => {
    setUserData(prev => ({
      ...prev,
      debts: prev.debts.filter(debt => debt.id !== id)
    }));
  };

  // Investment management
  const addInvestment = (investment: Omit<UserInvestment, 'id'>) => {
    const newInvestment: UserInvestment = {
      ...investment,
      id: crypto.randomUUID()
    };
    setUserData(prev => ({
      ...prev,
      investments: [...prev.investments, newInvestment]
    }));
  };

  const updateInvestment = (id: string, updates: Partial<UserInvestment>) => {
    setUserData(prev => ({
      ...prev,
      investments: prev.investments.map(investment => 
        investment.id === id ? { ...investment, ...updates } : investment
      )
    }));
  };

  const removeInvestment = (id: string) => {
    setUserData(prev => ({
      ...prev,
      investments: prev.investments.filter(investment => investment.id !== id)
    }));
  };

  // Goal management
  const addGoal = (goal: Omit<UserGoal, 'id'>) => {
    const newGoal: UserGoal = {
      ...goal,
      id: crypto.randomUUID()
    };
    setUserData(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  };

  const updateGoal = (id: string, updates: Partial<UserGoal>) => {
    setUserData(prev => ({
      ...prev,
      goals: prev.goals.map(goal => 
        goal.id === id ? { ...goal, ...updates } : goal
      )
    }));
  };

  const removeGoal = (id: string) => {
    setUserData(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal.id !== id)
    }));
  };

  // Calculated values
  const getEstimatedBalance = () => {
    const totalFixedExpenses = getTotalFixedExpenses();
    const totalDebtPayments = getTotalDebtPayments();
    return userData.monthlyIncome - totalFixedExpenses - totalDebtPayments;
  };

  const getTotalFixedExpenses = () => {
    return userData.expenses
      .filter(expense => expense.isFixed)
      .reduce((total, expense) => {
        const monthlyAmount = expense.frequency === 'yearly' ? expense.amount / 12 : expense.amount;
        return total + monthlyAmount;
      }, 0);
  };

  const getTotalDebtPayments = () => {
    return userData.debts.reduce((total, debt) => total + debt.monthlyPayment, 0);
  };

  return (
    <UserDataContext.Provider value={{
      userData,
      updateUserData,
      addExpense,
      updateExpense,
      removeExpense,
      addDebt,
      updateDebt,
      removeDebt,
      addInvestment,
      updateInvestment,
      removeInvestment,
      addGoal,
      updateGoal,
      removeGoal,
      getEstimatedBalance,
      getTotalFixedExpenses,
      getTotalDebtPayments,
      saveToStorage
    }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
