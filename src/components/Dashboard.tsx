
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
  Calendar,
  Euro,
  Bitcoin,
  Wallet
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
import TransactionModal from "@/components/TransactionModal";
import { useProfile } from "@/hooks/use-profile";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"30" | "90" | "180">("30");
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "expenses" | "income">("all");
  const isMobile = useIsMobile();
  const { openProfile } = useProfile();

  // Données d'exemple - dans une application réelle, ces données seraient dynamiques
  const budgetData = {
    totalBudget: 7500,
    spent: 4825,
    income: 8500,
    expenses: 4825,
    remainingDays: 3,
    dailyBudget: 892,
    progressPercentage: 64
  };

  // Date actuelle pour l'affichage
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  // Données pour les comptes
  const accountsData = [
    { name: "Portefeuille", icon: Wallet, amount: -2354, currency: "DH", transactions: 201, color: "bg-blue-100" },
    { name: "Euro", icon: Euro, amount: -340, currency: "€", transactions: 5, color: "bg-cyan-100" },
    { name: "Bitcoin", icon: Bitcoin, amount: 0.01, currency: "₿", transactions: 1, color: "bg-amber-100" },
  ];

  // Données pour le graphique d'évolution mensuelle selon la période
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

  // Chart config for the line chart
  const chartConfig = {
    revenus: { label: "Revenus", theme: { light: "#1F6FEB", dark: "#1F6FEB" } },
    dépenses: { label: "Dépenses", theme: { light: "#00D1FF", dark: "#00D1FF" } },
    budget: { label: "Budget", theme: { light: "#10B981", dark: "#10B981" } }
  };

  const categories = [
    { 
      id: "food", 
      name: "Alimentation", 
      icon: Coffee, 
      amount: 1250,
      budget: 1600, 
      color: "bg-orange-100 text-orange-500",
      pieColor: "#FF9F7A",
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
      pieColor: "#7AB8FF",
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
      pieColor: "#B57AFF",
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
      pieColor: "#7AFFB5",
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
      pieColor: "#7AFFB5",
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
      pieColor: "#FF7AAE",
      progress: 100,
      transactions: [
        { name: "Cadeau d'anniversaire", date: "8 juin, 09:20", amount: 500 }
      ]
    }
  ];

  // Données pour le graphique circulaire
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
        duration: 0.5
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="flex flex-col p-4 md:p-6 md:pl-24"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* En-tête avec Bienvenue et Avatar */}
      <motion.div className="flex justify-between items-center mb-6" variants={itemVariants}>
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Bienvenue</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground bg-gradient-to-r from-monavenir-blue to-monavenir-cyan bg-clip-text text-transparent">Mohamed</h2>
        </div>
        
        <Avatar 
          className="h-12 w-12 sm:h-14 sm:w-14 border-2 border-white shadow-lg cursor-pointer hover:opacity-90 transition-opacity" 
          onClick={openProfile}
        >
          <AvatarImage src="https://github.com/shadcn.png" alt="Mohamed" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </motion.div>

      {/* Section des comptes */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5" variants={itemVariants}>
        {accountsData.map((account, index) => (
          <motion.div 
            key={index}
            className="overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className={`${account.color} border-0 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-foreground font-semibold text-base">{account.name}</span>
                    <span className="text-foreground text-xl font-bold">
                      {account.amount} {account.currency}
                    </span>
                    <span className="text-muted-foreground text-xs">{account.transactions} transactions</span>
                  </div>
                  <div className="rounded-full bg-white/80 p-2.5 shadow-sm">
                    <account.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Aperçu du budget */}
      <motion.div variants={itemVariants} className="mb-5">
        <Card className="bg-white shadow-md border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-foreground">Dépenses Mensuelles</h3>
                <p className="text-lg font-medium text-foreground">
                  <span className="text-primary">{budgetData.spent.toLocaleString()} DH</span> 
                  <span className="text-sm text-muted-foreground"> sur {budgetData.totalBudget.toLocaleString()} DH</span>
                </p>
              </div>
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9 border-primary/30">
                <Calendar className="h-4 w-4 text-primary" />
              </Button>
            </div>
            
            <div className="relative pt-5 pb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>1 Juin</span>
                <span>Aujourd'hui</span>
                <span>30 Juin</span>
              </div>
              <div className="relative">
                <Progress value={budgetData.progressPercentage} className="h-2.5 rounded-full bg-primary/20" />
                <div 
                  className="absolute top-0 h-5 w-0.5 bg-gray-800 rounded-full transform -translate-y-1.5"
                  style={{ left: `${(currentDay/lastDay) * 100}%` }}
                >
                  <div className="absolute top-0 left-50 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded-md px-2 py-1 shadow-md">
                    Aujourd'hui
                  </div>
                </div>
              </div>
              <p className="text-sm text-center mt-4 text-muted-foreground">
                Vous pouvez dépenser <span className="font-medium text-primary">{budgetData.dailyBudget.toLocaleString()} DH</span> par jour pour les <span className="font-medium text-primary">{budgetData.remainingDays}</span> prochains jours
              </p>
            </div>
            
            {/* Statistiques de revenus et dépenses */}
            <div className="grid grid-cols-2 gap-3">
              <div className="stat-block income-block flex items-center justify-between p-4 rounded-xl shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center rounded-full bg-blue-200/70 h-10 w-10">
                    <ArrowUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs">Revenus</span>
                    <span className="font-semibold text-sm md:text-base">{budgetData.income.toLocaleString()} DH</span>
                  </div>
                </div>
                <div className="hidden md:block h-8 w-0.5 bg-blue-200 rounded-full"></div>
              </div>
              
              <div className="stat-block spend-block flex items-center justify-between p-4 rounded-xl shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center rounded-full bg-red-200/70 h-10 w-10">
                    <ArrowDown className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <span className="block text-xs">Dépenses</span>
                    <span className="font-semibold text-sm md:text-base">{budgetData.expenses.toLocaleString()} DH</span>
                  </div>
                </div>
                <div className="hidden md:block h-8 w-0.5 bg-red-200 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Graphique d'évolution mensuelle */}
      <motion.div variants={itemVariants} className="mb-5">
        <Card className="bg-white shadow-md border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Évolution Mensuelle</h3>
                <p className="text-sm text-muted-foreground">Visualisez vos finances sur la durée</p>
              </div>
              <select 
                className="text-xs border rounded-xl p-2 bg-white border-gray-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-auto"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as "30" | "90" | "180")}
              >
                <option value="30">Derniers 30 jours</option>
                <option value="90">Derniers 90 jours</option>
                <option value="180">Derniers 6 mois</option>
              </select>
            </div>
            
            <div className="h-[200px] sm:h-[240px] mt-4">
              <ChartContainer config={chartConfig} className="[&_.recharts-cartesian-axis-tick]:text-xs">
                <LineChart
                  data={getChartData()}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="revenusGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1F6FEB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1F6FEB" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="depensesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D1FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00D1FF" stopOpacity={0} />
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
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="revenus" 
                    name="revenus"
                    stroke="#1F6FEB" 
                    strokeWidth={2.5}
                    dot={{ r: 2, strokeWidth: 2, fill: "#fff" }}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                    animationDuration={1000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="dépenses" 
                    name="dépenses"
                    stroke="#00D1FF" 
                    strokeWidth={2.5}
                    dot={{ r: 2, strokeWidth: 2, fill: "#fff" }}
                    activeDot={{ r: 4, strokeWidth: 0 }} 
                    animationDuration={1000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="budget" 
                    name="budget"
                    stroke="#10B981" 
                    strokeWidth={2}
                    strokeDasharray="5 5" 
                    dot={{ r: 0 }}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                    animationDuration={1000}
                  />
                </LineChart>
              </ChartContainer>
            </div>
            
            <div className="mt-4 pt-2 flex space-x-3 justify-center border-t border-gray-100">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "expenses" | "income")} className="w-full">
                <TabsList className="grid grid-cols-3 bg-muted/40 rounded-xl p-1">
                  <TabsTrigger value="all" className="rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Tous</TabsTrigger>
                  <TabsTrigger value="expenses" className="rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Dépenses</TabsTrigger>
                  <TabsTrigger value="income" className="rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Revenus</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Répartition des dépenses avec graphique circulaire */}
      <motion.div variants={itemVariants} className="mb-5">
        <Card className="bg-white shadow-md border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-5">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-foreground">Répartition des dépenses</h3>
              <p className="text-sm text-muted-foreground">Visualisation par catégorie</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="h-[200px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1500}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={categories[index].pieColor} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} DH`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: category.pieColor }}></div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="text-sm font-semibold">{category.amount.toLocaleString()} DH</div>
                    </div>
                    <Progress 
                      value={category.progress} 
                      className="h-1.5 rounded-full"
                      style={{ backgroundColor: `${category.pieColor}30` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Catégories de dépenses */}
      <motion.div variants={itemVariants} className="space-y-3 mb-5">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-foreground">Dépenses par catégorie</h3>
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80 hover:bg-accent/50">
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
                className="transaction-row cursor-pointer bg-white rounded-xl shadow-sm"
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`category-icon ${category.color} h-10 w-10`}>
                    <category.icon className="h-5 w-5" />
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
              
              {/* Détail des transactions */}
              {activeCategory === category.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-12 pr-4 py-2 space-y-1 bg-gray-50 rounded-xl mt-1 mb-2 overflow-hidden"
                >
                  {category.transactions.map((transaction, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
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
      
      {/* Catégories de revenus */}
      <motion.div variants={itemVariants} className="space-y-3 mb-24 md:mb-10">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-foreground">Revenus par catégorie</h3>
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80 hover:bg-accent/50">
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
                className="transaction-row cursor-pointer bg-white rounded-xl shadow-sm"
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`category-icon ${category.color} h-10 w-10`}>
                    <category.icon className="h-5 w-5" />
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
              
              {/* Détail des transactions */}
              {activeCategory === category.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-12 pr-4 py-2 space-y-1 bg-gray-50 rounded-xl mt-1 mb-2 overflow-hidden"
                >
                  {category.transactions.map((transaction, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
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

      {/* Bouton d'action */}
      <motion.div 
        className="fixed bottom-20 right-4 sm:right-6 z-10 md:bottom-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-monavenir-blue to-monavenir-cyan shadow-lg hover:shadow-xl backdrop-blur-sm hover:opacity-90 transition-all border border-white/20" 
          size="icon"
          onClick={() => setIsTransactionModalOpen(true)}
        >
          <Plus className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
        </Button>
      </motion.div>

      {/* Modal d'ajout de transaction */}
      <TransactionModal 
        isOpen={isTransactionModalOpen} 
        onClose={() => setIsTransactionModalOpen(false)} 
      />
    </motion.div>
  );
};

export default Dashboard;
