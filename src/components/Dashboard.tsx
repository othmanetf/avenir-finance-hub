
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
import { motion } from "framer-motion";
import TransactionModal from "@/components/TransactionModal";

// Import our new components
import { BudgetOverview } from "@/components/dashboard/BudgetOverview";
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

  // Sample data - in a real app, this would be dynamic
  const budgetData = {
    totalBudget: 7500,
    spent: 4825,
    income: 8500,
    expenses: 4825,
    remainingDays: 3,
    dailyBudget: 892,
    progressPercentage: 64
  };

  // Current date for display
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  const categories = [
    { 
      id: "food", 
      name: "Alimentation", 
      icon: Coffee, 
      amount: 1250,
      budget: 1600, 
      color: "bg-orange-100 text-orange-500",
      pieColor: "#f97316",
      progress: 78,
      transactions: [
        { name: "Supermarché", date: "Aujourd'hui, 10:42", amount: 320 },
        { name: "Restaurant", date: "Hier, 20:30", amount: 450 },
        { name: "Café", date: "18 juin, 15:15", amount: 120 },
        { name: "Épicerie", date: "16 juin, 11:20", amount: 360 }
      ]
    },
    { 
      id: "shopping", 
      name: "Shopping", 
      icon: ShoppingBag, 
      amount: 875,
      budget: 1000, 
      color: "bg-blue-100 text-blue-500",
      pieColor: "#1F6FEB",
      progress: 87,
      transactions: [
        { name: "Magasin de vêtements", date: "15 juin, 14:30", amount: 475 },
        { name: "Électronique", date: "10 juin, 17:45", amount: 400 }
      ]
    },
    { 
      id: "housing", 
      name: "Logement", 
      icon: HomeIcon, 
      amount: 1800,
      budget: 1800, 
      color: "bg-violet-100 text-violet-500",
      pieColor: "#8E44AD",
      progress: 100,
      transactions: [
        { name: "Loyer", date: "5 juin, 09:00", amount: 1800 }
      ]
    },
    { 
      id: "transport", 
      name: "Transport", 
      icon: Car, 
      amount: 900,
      budget: 1100, 
      color: "bg-green-100 text-green-500",
      pieColor: "#10b981",
      progress: 82,
      transactions: [
        { name: "Carburant", date: "12 juin, 11:15", amount: 350 },
        { name: "Taxi", date: "8 juin, 18:40", amount: 120 },
        { name: "Transport public", date: "3 juin, 08:20", amount: 160 },
        { name: "Entretien voiture", date: "1 juin, 15:10", amount: 270 }
      ]
    }
  ];

  const incomeCategories = [
    { 
      id: "salary", 
      name: "Salaire", 
      icon: Building, 
      amount: 8000,
      budget: 8000, 
      color: "bg-emerald-100 text-emerald-500",
      pieColor: "#10b981",
      progress: 100,
      transactions: [
        { name: "Emploi principal", date: "5 juin, 10:00", amount: 8000 }
      ]
    },
    { 
      id: "gifts", 
      name: "Cadeaux", 
      icon: Gift, 
      amount: 500,
      budget: 0, 
      color: "bg-pink-100 text-pink-500",
      pieColor: "#ec4899",
      progress: 100,
      transactions: [
        { name: "Cadeau d'anniversaire", date: "8 juin, 09:20", amount: 500 }
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
      <DashboardHeader openProfile={openProfile} />

      {/* Monthly Expenses Overview */}
      <motion.div variants={itemVariants} className="mb-5">
        <BudgetOverview 
          budgetData={budgetData} 
          currentDay={currentDay}
          lastDay={lastDay}
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
