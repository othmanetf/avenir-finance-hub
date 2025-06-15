
import { useState } from "react";
import { 
  ShoppingBag, 
  Gift, 
  Building, 
  HomeIcon,
  Coffee,
  Car,
  Utensils
} from "lucide-react";
import { useProfile } from "@/hooks/use-profile";
import { useUserData } from "@/context/UserDataContext";
import { motion } from "framer-motion";
import TransactionModal from "@/components/TransactionModal";

// Import our new components
import { BudgetOverview } from "@/components/dashboard/BudgetOverview";
import { EstimatedBalance } from "@/components/dashboard/EstimatedBalance";
import { MonthlyEvolutionChart } from "@/components/dashboard/MonthlyEvolutionChart";
import { ExpenseDistribution } from "@/components/dashboard/ExpenseDistribution";
import { CategoryList } from "@/components/dashboard/CategoryList";
import { AddTransactionButton } from "@/components/dashboard/AddTransactionButton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"30" | "90" | "180">("30");
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "expenses" | "income">("all");
  const { openProfile } = useProfile();
  const { userData, isDataLoaded } = useUserData();

  // Si les données ne sont pas encore chargées, afficher un état de chargement
  if (!isDataLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement de vos données...</p>
        </div>
      </div>
    );
  }

  // Préparer les données de budget depuis le contexte utilisateur
  const budgetData = {
    totalBudget: userData.totalBudget,
    spent: userData.spent,
    income: userData.monthlyIncome,
    expenses: userData.monthlyExpenses,
    remainingDays: userData.remainingDays,
    dailyBudget: userData.dailyBudget,
    progressPercentage: userData.progressPercentage
  };
  
  const categories = [
    { 
      id: "food", 
      name: "Alimentation", 
      icon: Coffee, 
      amount: Math.round(userData.monthlyExpenses * 0.25),
      budget: Math.round(userData.monthlyExpenses * 0.30), 
      color: "bg-orange-100 text-orange-500",
      pieColor: "#f97316",
      progress: 83,
      transactions: [
        { name: "Supermarché", date: "Aujourd'hui, 10:42", amount: Math.round(userData.monthlyExpenses * 0.08) },
        { name: "Restaurant", date: "Hier, 20:30", amount: Math.round(userData.monthlyExpenses * 0.09) },
        { name: "Café", date: "10 mai, 15:15", amount: Math.round(userData.monthlyExpenses * 0.03) },
        { name: "Épicerie", date: "8 mai, 11:20", amount: Math.round(userData.monthlyExpenses * 0.05) }
      ]
    },
    { 
      id: "shopping", 
      name: "Shopping", 
      icon: ShoppingBag, 
      amount: Math.round(userData.monthlyExpenses * 0.15),
      budget: Math.round(userData.monthlyExpenses * 0.18), 
      color: "bg-blue-100 text-blue-500",
      pieColor: "#1F6FEB",
      progress: 83,
      transactions: [
        { name: "Magasin de vêtements", date: "12 mai, 14:30", amount: Math.round(userData.monthlyExpenses * 0.10) },
        { name: "Électronique", date: "5 mai, 17:45", amount: Math.round(userData.monthlyExpenses * 0.05) }
      ]
    },
    { 
      id: "housing", 
      name: "Logement", 
      icon: HomeIcon, 
      amount: Math.round(userData.monthlyExpenses * 0.35),
      budget: Math.round(userData.monthlyExpenses * 0.35), 
      color: "bg-violet-100 text-violet-500",
      pieColor: "#8E44AD",
      progress: 100,
      transactions: [
        { name: "Loyer", date: "1 mai, 09:00", amount: Math.round(userData.monthlyExpenses * 0.35) }
      ]
    },
    { 
      id: "transport", 
      name: "Transport", 
      icon: Car, 
      amount: Math.round(userData.monthlyExpenses * 0.25),
      budget: Math.round(userData.monthlyExpenses * 0.27), 
      color: "bg-green-100 text-green-500",
      pieColor: "#10b981",
      progress: 93,
      transactions: [
        { name: "Carburant", date: "10 mai, 11:15", amount: Math.round(userData.monthlyExpenses * 0.12) },
        { name: "Taxi", date: "6 mai, 18:40", amount: Math.round(userData.monthlyExpenses * 0.04) },
        { name: "Transport public", date: "3 mai, 08:20", amount: Math.round(userData.monthlyExpenses * 0.05) },
        { name: "Entretien voiture", date: "1 mai, 15:10", amount: Math.round(userData.monthlyExpenses * 0.04) }
      ]
    }
  ];

  const incomeCategories = [
    { 
      id: "salary", 
      name: "Salaire", 
      icon: Building, 
      amount: userData.monthlyIncome,
      budget: userData.monthlyIncome, 
      color: "bg-emerald-100 text-emerald-500",
      pieColor: "#10b981",
      progress: 100,
      transactions: [
        { name: "Emploi principal", date: "1 mai, 10:00", amount: userData.monthlyIncome }
      ]
    }
  ];

  // Animation variants for framer-motion
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
      <DashboardHeader openProfile={openProfile} userName={userData.fullName} />

      {/* Estimated Balance Overview */}
      <motion.div variants={itemVariants} className="mb-5">
        <EstimatedBalance 
          estimatedBalance={userData.estimatedBalance}
          monthlyIncome={userData.monthlyIncome}
          monthlyExpenses={userData.monthlyExpenses}
        />
      </motion.div>

      {/* Monthly Expenses Overview */}
      <motion.div variants={itemVariants} className="mb-5">
        <BudgetOverview 
          budgetData={budgetData} 
          currentDay={userData.currentDay}
          lastDay={userData.lastDay}
        />
      </motion.div>

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
      <motion.div variants={itemVariants} className="mb-5">
        <ExpenseDistribution categories={categories} />
      </motion.div>

      {/* Expense Categories List */}
      <motion.div variants={itemVariants}>
        <CategoryList 
          title="Dépenses par catégorie" 
          categories={categories} 
          isIncome={false}
        />
      </motion.div>
      
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

export default Dashboard;
