
import { 
  ArrowUp, 
  ArrowDown,
  ShoppingBag, 
  Gift, 
  Building, 
  HomeIcon,
  Coffee,
  Car,
  Utensils,
  Plus,
  History,
  Wallet,
  Euro,
  Bitcoin,
  CircleDollarSign
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useRef, useEffect } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import TransactionModal from "@/components/TransactionModal";
import { useProfile } from "@/hooks/use-profile";
import { cn } from "@/lib/utils";
import { SpendingWidget } from "@/components/dashboard/SpendingWidget";
import { WalletCard } from "@/components/dashboard/WalletCard";
import { ExpenseBreakdown } from "@/components/dashboard/ExpenseBreakdown";

export const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"30" | "90" | "180">("30");
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [showAllTransactions, setShowAllTransactions] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"all" | "expense" | "income">("all");
  const isMobile = useIsMobile();
  const { openProfile } = useProfile();

  // Animation for progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(75);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Données d'exemple - dans une application réelle, ces données seraient dynamiques
  const budgetData = {
    totalBudget: 7500,
    spent: 4825,
    income: 8500,
    expenses: 4825,
    remaining: 2675,
    days: 3
  };

  // Wallet data
  const walletData = [
    { id: 'wallet', name: 'Wallet', icon: Wallet, amount: -41.54, currency: 'USD', transactions: 201, color: 'bg-blue-100 text-blue-600', accent: 'bg-blue-500' },
    { id: 'euros', name: 'Euros', icon: Euro, amount: -103, currency: 'EUR', transactions: 5, color: 'bg-sky-100 text-sky-600', accent: 'bg-sky-400' },
    { id: 'bitcoin', name: 'Bitcoin', icon: Bitcoin, amount: 0.01, currency: 'BTC', transactions: 1, color: 'bg-amber-100 text-amber-600', accent: 'bg-amber-500' }
  ];

  // Données pour le graphique d'évolution mensuelle selon la période
  const getChartData = () => {
    if (selectedPeriod === "30") {
      return [
        { jour: '1', dépenses: 0, revenus: 0, budget: 0 },
        { jour: '5', dépenses: 50, revenus: 8000, budget: 1000 },
        { jour: '9', dépenses: 100, revenus: 8000, budget: 2000 },
        { jour: '16', dépenses: 200, revenus: 8200, budget: 3000 },
        { jour: '24', dépenses: 350, revenus: 8350, budget: 4500 },
        { jour: '31', dépenses: 375, revenus: 8500, budget: 5000 },
      ];
    } else if (selectedPeriod === "90") {
      return [
        { jour: 'Jan', dépenses: 4200, revenus: 8000, budget: 7000 },
        { jour: 'Fév', dépenses: 4500, revenus: 8200, budget: 7200 },
        { jour: 'Mars', dépenses: 4825, revenus: 8500, budget: 7500 },
      ];
    } else {
      return [
        { jour: 'Jan', dépenses: 4000, revenus: 7800, budget: 7000 },
        { jour: 'Fév', dépenses: 4100, revenus: 7900, budget: 7100 },
        { jour: 'Mars', dépenses: 4300, revenus: 8100, budget: 7200 },
        { jour: 'Avr', dépenses: 4400, revenus: 8200, budget: 7300 },
        { jour: 'Mai', dépenses: 4600, revenus: 8300, budget: 7400 },
        { jour: 'Juin', dépenses: 4825, revenus: 8500, budget: 7500 },
      ];
    }
  };

  // Chart config for the line chart
  const chartConfig = {
    revenus: { label: "Revenus", theme: { light: "#1F6FEB", dark: "#1F6FEB" } },
    dépenses: { label: "Dépenses", theme: { light: "#00D1FF", dark: "#00D1FF" } },
    budget: { label: "Budget", theme: { light: "#10B981", dark: "#10B981" } }
  };

  const categories = [
    { 
      id: "food", 
      name: "Dining", 
      icon: Utensils, 
      amount: 126.99, 
      budget: 145,
      color: "bg-slate-100 text-slate-600",
      accent: "bg-slate-500",
      progress: 87,
      transactions: [
        { name: "Restaurant", date: "Today, 10:42", amount: 32.50 },
        { name: "Café", date: "Yesterday, 20:30", amount: 45.75 },
        { name: "Lunch", date: "July 18, 15:15", amount: 12.99 },
        { name: "Dinner out", date: "July 16, 11:20", amount: 35.75 }
      ]
    },
    { 
      id: "groceries", 
      name: "Groceries", 
      icon: ShoppingBag, 
      amount: 95.33, 
      budget: 125,
      color: "bg-green-100 text-green-600",
      accent: "bg-green-500",
      progress: 76,
      transactions: [
        { name: "Supermarket", date: "July 15, 14:30", amount: 47.50 },
        { name: "Farmer's Market", date: "July 10, 17:45", amount: 23.45 },
        { name: "Organic Shop", date: "July 7, 11:30", amount: 15.50 },
        { name: "Corner Store", date: "July 3, 19:10", amount: 8.88 }
      ]
    },
    { 
      id: "shopping", 
      name: "Shopping", 
      icon: ShoppingBag, 
      amount: 41.66, 
      budget: 100,
      color: "bg-pink-100 text-pink-600",
      accent: "bg-pink-500",
      progress: 41,
      transactions: [
        { name: "Clothing Store", date: "July 14, 16:20", amount: 41.66 }
      ]
    },
    { 
      id: "gifts", 
      name: "Gifts", 
      icon: Gift, 
      amount: 40.76, 
      budget: 60,
      color: "bg-red-100 text-red-600",
      accent: "bg-red-500",
      progress: 68,
      transactions: [
        { name: "Birthday Gift", date: "July 8, 09:20", amount: 40.76 }
      ]
    }
  ];

  const incomeCategories = [
    { 
      id: "salary", 
      name: "Salary", 
      icon: Building, 
      amount: 8000, 
      color: "bg-emerald-100 text-emerald-600",
      transactions: [
        { name: "Main Job", date: "July 5, 10:00", amount: 8000 }
      ]
    },
    { 
      id: "gifts", 
      name: "Gifts", 
      icon: Gift, 
      amount: 500, 
      color: "bg-pink-100 text-pink-600",
      transactions: [
        { name: "Birthday Gift", date: "July 8, 09:20", amount: 500 }
      ]
    }
  ];

  // Data for pie chart
  const pieData = categories.map(cat => ({
    name: cat.name,
    value: cat.amount,
    color: cat.accent
  }));

  const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

  return (
    <div className="flex flex-col p-4 md:p-6 md:pl-24">
      {/* Header with Title and Avatar */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Home</h1>
        </div>
        
        <Avatar 
          className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity" 
          onClick={openProfile}
        >
          <AvatarImage src="https://github.com/shadcn.png" alt="Mohamed" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </motion.div>

      {/* Wallet Cards Row */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
      >
        {walletData.map((wallet, index) => (
          <WalletCard 
            key={wallet.id}
            wallet={wallet}
            delay={0.1 * (index + 1)}
          />
        ))}
      </motion.div>

      {/* Monthly Spending Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6"
      >
        <SpendingWidget 
          totalBudget={500}
          spent={124.54}
          dailyBudget={24.91}
          daysLeft={3}
          progressValue={progressValue}
        />
      </motion.div>

      {/* Spending Graph */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6"
      >
        <Card className="bg-white shadow-md border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <div className="h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getChartData()}
                  margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="jour" 
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                    axisLine={false}
                    tickLine={false}
                    width={40}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                      padding: '10px 14px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="dépenses" 
                    stroke="#8884d8" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                    activeDot={{ r: 6 }}
                    fillOpacity={1}
                    fill="url(#colorSpend)" 
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mt-4 bg-gray-100 rounded-full p-1">
              <Button 
                variant={selectedTab === "all" ? "default" : "ghost"} 
                size="sm" 
                className={cn(
                  "rounded-full text-sm font-medium flex-1",
                  selectedTab === "all" ? "bg-white shadow-sm" : "hover:bg-gray-200/50"
                )}
                onClick={() => setSelectedTab("all")}
              >
                All
              </Button>
              <Button 
                variant={selectedTab === "expense" ? "default" : "ghost"} 
                size="sm" 
                className={cn(
                  "rounded-full text-sm font-medium flex-1",
                  selectedTab === "expense" ? "bg-white shadow-sm" : "hover:bg-gray-200/50"
                )}
                onClick={() => setSelectedTab("expense")}
              >
                Expense
              </Button>
              <Button 
                variant={selectedTab === "income" ? "default" : "ghost"} 
                size="sm" 
                className={cn(
                  "rounded-full text-sm font-medium flex-1",
                  selectedTab === "income" ? "bg-white shadow-sm" : "hover:bg-gray-200/50"
                )}
                onClick={() => setSelectedTab("income")}
              >
                Income
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expense Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-6"
      >
        <ExpenseBreakdown 
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </motion.div>

      {/* Bouton d'action */}
      <motion.div 
        className="fixed bottom-20 right-4 sm:right-6 z-10 md:bottom-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20, 
          delay: 1 
        }}
      >
        <Button 
          className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg backdrop-blur-sm hover:opacity-90 transition-all border border-white/20" 
          size="icon"
          onClick={() => setIsTransactionModalOpen(true)}
        >
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </motion.div>

      {/* Modal d'ajout de transaction */}
      <TransactionModal 
        isOpen={isTransactionModalOpen} 
        onClose={() => setIsTransactionModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
