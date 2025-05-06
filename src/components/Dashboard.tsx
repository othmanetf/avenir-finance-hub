
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
  Calendar
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { useIsMobile } from "@/hooks/use-mobile";
import TransactionModal from "@/components/TransactionModal";
import { useProfile } from "@/hooks/use-profile";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"30" | "90" | "180">("30");
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "expenses" | "income">("all");
  const isMobile = useIsMobile();
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
  
  // Chart data based on selected period
  const getChartData = () => {
    if (selectedPeriod === "30") {
      return [
        { jour: '1', dépenses: 150, revenus: 0, budget: 250 },
        { jour: '5', dépenses: 410, revenus: 8000, budget: 1000 },
        { jour: '10', dépenses: 1200, revenus: 8000, budget: 2500 },
        { jour: '15', dépenses: 2500, revenus: 8200, budget: 3750 },
        { jour: '20', dépenses: 3800, revenus: 8350, budget: 5000 },
        { jour: '25', dépenses: 4500, revenus: 8500, budget: 6250 },
        { jour: '30', dépenses: 4825, revenus: 8500, budget: 7500 },
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

  // Chart configuration
  const chartConfig = {
    revenus: { label: "Revenus", color: "#1F6FEB" },
    dépenses: { label: "Dépenses", color: "#8E44AD" },
    budget: { label: "Budget", color: "#10b981" }
  };

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

  // Pie chart data
  const pieData = categories.map(category => ({
    name: category.name,
    value: category.amount
  }));

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
      <motion.div className="flex justify-between items-center mb-6" variants={itemVariants}>
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Bienvenue</p>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Mohamed</h2>
        </div>
        
        <Avatar 
          className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-white shadow-md cursor-pointer hover:opacity-90 transition-opacity" 
          onClick={openProfile}
        >
          <AvatarImage src="https://github.com/shadcn.png" alt="Mohamed" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </motion.div>

      {/* Monthly Expenses Overview - Mobile optimized */}
      <motion.div variants={itemVariants} className="mb-5">
        <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Dépenses Mensuelles</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-semibold text-[#1F6FEB]">{budgetData.spent.toLocaleString()} DH</span> 
                  <span className="text-sm text-muted-foreground">sur {budgetData.totalBudget.toLocaleString()} DH</span>
                </div>
              </div>
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9 border-[#1F6FEB]/20 shadow-sm">
                <Calendar className="h-4 w-4 text-[#1F6FEB]" />
              </Button>
            </div>
            
            <div className="relative pt-4 pb-3">
              {/* Progress Bar with Clean Design */}
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>1 Juin</span>
                <span>30 Juin</span>
              </div>
              
              <div className="relative mb-5">
                <Progress value={budgetData.progressPercentage} className="h-2.5 rounded-full bg-[#1F6FEB]/10" />
                <motion.div 
                  className="absolute top-0 h-5 w-1 bg-[#1F6FEB] rounded-full transform -translate-y-1 shadow-sm"
                  style={{ left: `${(currentDay/lastDay) * 100}%` }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 20 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-[#1F6FEB] text-white text-[10px] font-medium rounded-lg px-2 py-1 shadow-sm">
                    Aujourd'hui
                  </div>
                </motion.div>
              </div>
              
              {/* Daily Budget Message */}
              <motion.div 
                className="bg-[#F7F9FA] rounded-xl p-3.5 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <p className="text-sm text-foreground">
                  Vous pouvez dépenser <span className="font-semibold text-[#1F6FEB]">{budgetData.dailyBudget.toLocaleString()} DH</span> par jour pour les <span className="font-semibold text-[#1F6FEB]">{budgetData.remainingDays}</span> prochains jours
                </p>
              </motion.div>
            </div>
            
            {/* Revenue and Expense Stats - Mobile optimized */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div 
                className="stat-block flex items-center justify-between p-4 rounded-xl shadow-sm bg-[#E6F0FF]"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center rounded-full bg-white h-10 w-10 shadow-inner">
                    <ArrowUp className="h-4 w-4 text-[#1F6FEB]" />
                  </div>
                  <div>
                    <span className="block text-xs text-[#1F6FEB]/80 font-medium mb-0.5">Revenus</span>
                    <span className="font-semibold text-sm md:text-base">{budgetData.income.toLocaleString()} DH</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="stat-block flex items-center justify-between p-4 rounded-xl shadow-sm bg-rose-50"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center rounded-full bg-white h-10 w-10 shadow-inner">
                    <ArrowDown className="h-4 w-4 text-rose-500" />
                  </div>
                  <div>
                    <span className="block text-xs text-rose-600/80 font-medium mb-0.5">Dépenses</span>
                    <span className="font-semibold text-sm md:text-base">{budgetData.expenses.toLocaleString()} DH</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Monthly Evolution Chart - Mobile optimized */}
      <motion.div variants={itemVariants} className="mb-5">
        <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Évolution Mensuelle</h3>
                <p className="text-sm text-muted-foreground">Visualisez vos finances sur la durée</p>
              </div>
              <Select
                value={selectedPeriod}
                onValueChange={(value) => setSelectedPeriod(value as "30" | "90" | "180")}
              >
                <SelectTrigger className="w-full sm:w-[170px] h-9 text-xs rounded-xl bg-gray-50 border-gray-100 shadow-sm">
                  <SelectValue placeholder="Derniers 30 jours" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">Derniers 30 jours</SelectItem>
                  <SelectItem value="90">Derniers 90 jours</SelectItem>
                  <SelectItem value="180">Derniers 6 mois</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="h-[220px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getChartData()}
                  margin={{ top: 10, right: 5, left: -15, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="colorDepenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1F6FEB" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#1F6FEB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="jour" 
                    tick={{ fontSize: 10 }}
                    tickMargin={8}
                    axisLine={false}
                    tickLine={false}
                    padding={{ left: 5, right: 5 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => `${value / 1000}k`}
                    axisLine={false}
                    tickLine={false}
                    width={25}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                      borderRadius: '14px', 
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                      padding: '10px 14px'
                    }}
                    formatter={(value) => [`${value.toLocaleString()} DH`, ""]}
                    labelFormatter={(label) => `Jour ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="dépenses"
                    name="Dépenses"
                    stroke="#1F6FEB"
                    fillOpacity={1}
                    fill="url(#colorDepenses)"
                    strokeWidth={2}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                    dot={{ r: 2.5, strokeWidth: 2, fill: "#fff" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-3 pt-2 flex space-x-3 justify-center border-t border-gray-100">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "expenses" | "income")} className="w-full">
                <TabsList className="grid grid-cols-3 bg-muted/40 rounded-xl p-1">
                  <TabsTrigger value="all" className="rounded-lg text-xs py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">Tous</TabsTrigger>
                  <TabsTrigger value="expenses" className="rounded-lg text-xs py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">Dépenses</TabsTrigger>
                  <TabsTrigger value="income" className="rounded-lg text-xs py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">Revenus</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expense Distribution with Pie Chart - Mobile optimized */}
      <motion.div variants={itemVariants} className="mb-5">
        <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-5">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-foreground">Répartition des dépenses</h3>
              <p className="text-sm text-muted-foreground">Visualisation par catégorie</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              <div className="h-[200px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={75}
                      innerRadius={45}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1500}
                      paddingAngle={2}
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={categories[index].pieColor} 
                          stroke="white"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value.toLocaleString()} DH`, ""]}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                        borderRadius: '14px', 
                        border: 'none',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)',
                        padding: '10px 14px'
                      }}
                      itemStyle={{
                        padding: '4px 0',
                        fontSize: '12px'
                      }}
                      labelStyle={{
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <motion.div 
                    key={index} 
                    className="flex flex-col"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: category.pieColor }}></div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="text-xs font-semibold bg-gray-50 px-2.5 py-1 rounded-full shadow-sm amount-tag">
                        {category.amount.toLocaleString()} DH
                      </div>
                    </div>
                    <Progress 
                      value={category.progress} 
                      className="h-1.5 rounded-full"
                      style={{ 
                        backgroundColor: `${category.pieColor}20`,
                        "--tw-progress-value": category.pieColor 
                      } as React.CSSProperties}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expense Categories - Mobile optimized */}
      <motion.div variants={itemVariants} className="space-y-2 mb-5">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg text-foreground">Dépenses par catégorie</h3>
          <Button variant="ghost" size="sm" className="text-xs text-[#1F6FEB] hover:text-[#1F6FEB]/80 hover:bg-accent/50">
            Voir tout
          </Button>
        </div>
        
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div 
                className="transaction-row cursor-pointer"
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`category-icon ${category.color} h-10 w-10 rounded-xl flex items-center justify-center`}>
                    <category.icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{category.name}</span>
                    <span className="text-xs text-muted-foreground">{category.transactions.length} transactions</span>
                  </div>
                </div>
                <span className="font-semibold text-red-500 text-sm">
                  - {category.amount.toLocaleString()} DH
                </span>
              </div>
              
              {/* Transaction Details */}
              {activeCategory === category.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-11 pr-3 py-1.5 space-y-1 bg-gray-50 rounded-xl mt-1 mb-2 overflow-hidden"
                >
                  {category.transactions.map((transaction, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <div className="flex flex-col">
                        <span className="text-sm">{transaction.name}</span>
                        <span className="text-xs text-muted-foreground">{transaction.date}</span>
                      </div>
                      <span className="text-sm font-medium text-red-500">- {transaction.amount} DH</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Income Categories - Mobile optimized */}
      <motion.div variants={itemVariants} className="space-y-2 mb-24 md:mb-10">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg text-foreground">Revenus par catégorie</h3>
          <Button variant="ghost" size="sm" className="text-xs text-[#1F6FEB] hover:text-[#1F6FEB]/80 hover:bg-accent/50">
            Voir tout
          </Button>
        </div>
        
        <div className="space-y-2">
          {incomeCategories.map((category) => (
            <motion.div 
              key={category.id}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div 
                className="transaction-row cursor-pointer"
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`category-icon ${category.color} h-10 w-10 rounded-xl flex items-center justify-center`}>
                    <category.icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{category.name}</span>
                    <span className="text-xs text-muted-foreground">{category.transactions.length} transactions</span>
                  </div>
                </div>
                <span className="font-semibold text-green-500 text-sm">
                  + {category.amount.toLocaleString()} DH
                </span>
              </div>
              
              {/* Transaction Details */}
              {activeCategory === category.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-11 pr-3 py-1.5 space-y-1 bg-gray-50 rounded-xl mt-1 mb-2 overflow-hidden"
                >
                  {category.transactions.map((transaction, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <div className="flex flex-col">
                        <span className="text-sm">{transaction.name}</span>
                        <span className="text-xs text-muted-foreground">{transaction.date}</span>
                      </div>
                      <span className="text-sm font-medium text-green-500">+ {transaction.amount} DH</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Button - Enhanced for mobile touch */}
      <motion.div 
        className="fixed bottom-20 right-4 sm:right-5 z-10 md:bottom-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#1F6FEB] shadow-lg hover:shadow-xl hover:bg-[#1F6FEB]/90 transition-all" 
          size="icon"
          onClick={() => setIsTransactionModalOpen(true)}
        >
          <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </Button>
      </motion.div>

      {/* Transaction Modal */}
      <TransactionModal 
        isOpen={isTransactionModalOpen} 
        onClose={() => setIsTransactionModalOpen(false)} 
      />
    </motion.div>
  );
};

export default Dashboard;
