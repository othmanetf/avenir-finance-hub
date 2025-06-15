
import { useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { motion } from "framer-motion";
import TransactionModal from "@/components/TransactionModal";

// Import our components
import { BudgetOverview } from "@/components/dashboard/BudgetOverview";
import { EstimatedBalance } from "@/components/dashboard/EstimatedBalance";
import { UserGoals } from "@/components/dashboard/UserGoals";
import { MonthlyEvolutionChart } from "@/components/dashboard/MonthlyEvolutionChart";
import { ExpenseDistribution } from "@/components/dashboard/ExpenseDistribution";
import { CategoryList } from "@/components/dashboard/CategoryList";
import { AddTransactionButton } from "@/components/dashboard/AddTransactionButton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useUserData } from "@/context/UserDataContext";

export const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"30" | "90" | "180">("30");
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "expenses" | "income">("all");
  const { openProfile } = useProfile();
  const { userData } = useUserData();

  // Sample categories based on user's actual expenses and data
  const expenseCategories = userData.expenses.map(expense => ({
    id: expense.id,
    name: expense.category,
    icon: getIconForCategory(expense.category),
    amount: expense.amount,
    budget: expense.amount * 1.2, // 20% buffer for budget
    color: getColorForCategory(expense.category),
    pieColor: getPieColorForCategory(expense.category),
    progress: Math.min((expense.amount / (expense.amount * 1.2)) * 100, 100),
    transactions: [
      { name: expense.category, date: "Ce mois", amount: expense.amount }
    ]
  }));

  const incomeCategories = [
    { 
      id: "salary", 
      name: "Salaire", 
      icon: () => null,
      amount: userData.monthlyIncome,
      budget: userData.monthlyIncome, 
      color: "bg-emerald-100 text-emerald-500",
      pieColor: "#10b981",
      progress: 100,
      transactions: [
        { name: "Revenus mensuels", date: "Ce mois", amount: userData.monthlyIncome }
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.1,
        duration: 0.3
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="flex flex-col p-4 md:p-6 md:pl-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header with Welcome and Avatar */}
      <DashboardHeader openProfile={openProfile} />

      {/* Estimated Balance Card */}
      <motion.div variants={itemVariants} className="mb-5">
        <EstimatedBalance />
      </motion.div>

      {/* Monthly Budget Overview */}
      <motion.div variants={itemVariants} className="mb-5">
        <BudgetOverview />
      </motion.div>

      {/* User Goals */}
      {userData.goals.length > 0 && (
        <motion.div variants={itemVariants} className="mb-5">
          <UserGoals />
        </motion.div>
      )}

      {/* Monthly Evolution Chart */}
      <motion.div variants={itemVariants} className="mb-5">
        <MonthlyEvolutionChart 
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </motion.div>

      {/* Expense Distribution with Pie Chart */}
      {expenseCategories.length > 0 && (
        <motion.div variants={itemVariants} className="mb-5">
          <ExpenseDistribution categories={expenseCategories} />
        </motion.div>
      )}

      {/* Expense Categories List */}
      {expenseCategories.length > 0 && (
        <motion.div variants={itemVariants}>
          <CategoryList 
            title="Dépenses par catégorie" 
            categories={expenseCategories} 
            isIncome={false}
          />
        </motion.div>
      )}
      
      {/* Income Categories List */}
      <motion.div variants={itemVariants} className="mb-24 md:mb-10">
        <CategoryList 
          title="Revenus par catégorie" 
          categories={incomeCategories} 
          isIncome={true}
        />
      </motion.div>

      {/* Action Button for adding transactions */}
      <AddTransactionButton onClick={() => setIsTransactionModalOpen(true)} />

      {/* Transaction Modal */}
      <TransactionModal 
        isOpen={isTransactionModalOpen} 
        onClose={() => setIsTransactionModalOpen(false)} 
      />
    </motion.div>
  );
};

// Helper functions
function getIconForCategory(category: string) {
  const iconMap: { [key: string]: any } = {
    'Loyer/Hypothèque': () => null,
    'Services (eau, électricité)': () => null,
    'Télécommunications': () => null,
    'Transports': () => null,
    'Alimentation': () => null,
    'Santé': () => null,
    'Education': () => null
  };
  return iconMap[category] || (() => null);
}

function getColorForCategory(category: string) {
  const colorMap: { [key: string]: string } = {
    'Loyer/Hypothèque': "bg-violet-100 text-violet-500",
    'Services (eau, électricité)': "bg-yellow-100 text-yellow-500",
    'Télécommunications': "bg-blue-100 text-blue-500",
    'Transports': "bg-green-100 text-green-500",
    'Alimentation': "bg-orange-100 text-orange-500",
    'Santé': "bg-red-100 text-red-500",
    'Education': "bg-purple-100 text-purple-500"
  };
  return colorMap[category] || "bg-gray-100 text-gray-500";
}

function getPieColorForCategory(category: string) {
  const colorMap: { [key: string]: string } = {
    'Loyer/Hypothèque': "#8E44AD",
    'Services (eau, électricité)': "#f59e0b",
    'Télécommunications': "#1F6FEB",
    'Transports': "#10b981",
    'Alimentation': "#f97316",
    'Santé': "#ef4444",
    'Education': "#a855f7"
  };
  return colorMap[category] || "#6b7280";
}

export default Dashboard;
