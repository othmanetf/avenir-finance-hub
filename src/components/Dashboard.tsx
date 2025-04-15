
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
  Plus
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
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Données d'exemple - dans une application réelle, ces données seraient dynamiques
  const budgetData = {
    totalBudget: 7500,
    spent: 4825,
    income: 8500,
    expenses: 4825
  };

  // Données pour le graphique d'évolution mensuelle
  const monthlyEvolutionData = [
    { jour: '1', dépenses: 150, revenus: 0, budget: 250 },
    { jour: '5', dépenses: 410, revenus: 8000, budget: 1000 },
    { jour: '10', dépenses: 1200, revenus: 8000, budget: 2500 },
    { jour: '15', dépenses: 2500, revenus: 8200, budget: 3750 },
    { jour: '20', dépenses: 3800, revenus: 8350, budget: 5000 },
    { jour: '25', dépenses: 4500, revenus: 8500, budget: 6250 },
    { jour: '30', dépenses: 4825, revenus: 8500, budget: 7500 },
  ];

  const categories = [
    { 
      id: "food", 
      name: "Alimentation", 
      icon: Coffee, 
      amount: 1250, 
      color: "bg-orange-100 text-orange-500",
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
      color: "bg-blue-100 text-blue-500",
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
      color: "bg-violet-100 text-violet-500",
      transactions: [
        { name: "Loyer", date: "5 juin, 09:00", amount: 1800 }
      ]
    },
    { 
      id: "transport", 
      name: "Transport", 
      icon: Car, 
      amount: 900, 
      color: "bg-green-100 text-green-500",
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
      color: "bg-emerald-100 text-emerald-500",
      transactions: [
        { name: "Emploi principal", date: "5 juin, 10:00", amount: 8000 }
      ]
    },
    { 
      id: "gifts", 
      name: "Cadeaux", 
      icon: Gift, 
      amount: 500, 
      color: "bg-pink-100 text-pink-500",
      transactions: [
        { name: "Cadeau d'anniversaire", date: "8 juin, 09:20", amount: 500 }
      ]
    }
  ];

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6 md:pl-24">
      {/* En-tête avec Bienvenue et Avatar */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Bienvenue</p>
          <h2 className="text-xl font-bold text-foreground">Mohamed</h2>
        </div>
        
        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
          <AvatarImage src="https://github.com/shadcn.png" alt="Mohamed" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </div>

      {/* Aperçu du budget */}
      <Card className="bg-white shadow-md border-0 rounded-3xl">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-foreground">Budget Mensuel</span>
              <Button variant="outline" size="sm" className="rounded-full text-xs border-accent bg-accent/30 text-primary hover:bg-accent/50 hover:text-primary">
                Ajuster
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16">
                <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#f3f4f6" strokeWidth="2"></circle>
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="16" 
                    fill="none" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="2"
                    strokeDasharray={`${(budgetData.spent / budgetData.totalBudget) * 100} 100`}
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                  {Math.round((budgetData.spent / budgetData.totalBudget) * 100)}%
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground">{budgetData.spent.toLocaleString()} DH</h3>
                <p className="text-sm text-muted-foreground">sur {budgetData.totalBudget.toLocaleString()} DH de budget</p>
              </div>
            </div>
            
            {/* Statistiques de revenus et dépenses */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="stat-block income-block">
                <div className="flex items-center justify-center rounded-xl bg-violet-200 h-8 w-8">
                  <ArrowUp className="h-4 w-4 text-violet-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">Revenus</span>
                  <span className="font-medium">{budgetData.income.toLocaleString()} DH</span>
                </div>
              </div>
              
              <div className="stat-block spend-block">
                <div className="flex items-center justify-center rounded-xl bg-red-200 h-8 w-8">
                  <ArrowDown className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">Dépenses</span>
                  <span className="font-medium">{budgetData.expenses.toLocaleString()} DH</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graphique d'évolution mensuelle */}
      <Card className="bg-white shadow-md border-0 rounded-3xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-foreground">Évolution Mensuelle</h3>
            <select className="text-xs border rounded-lg p-1">
              <option>Derniers 30 jours</option>
              <option>Derniers 90 jours</option>
              <option>Derniers 6 mois</option>
            </select>
          </div>
          
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyEvolutionData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jour" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} DH`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="dépenses" 
                  stroke="#EF4444" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="revenus" 
                  stroke="#8B5CF6" 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="budget" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Catégories de dépenses */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-foreground">Dépenses par catégorie</h3>
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80 hover:bg-accent/50">
            Voir tout
          </Button>
        </div>
        
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id}>
              <div 
                className="transaction-row cursor-pointer"
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`category-icon ${category.color}`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{category.name}</span>
                    <span className="text-xs text-muted-foreground">{category.transactions.length} transactions</span>
                  </div>
                </div>
                <span className="font-semibold text-red-500">
                  -{category.amount.toLocaleString()} DH
                </span>
              </div>
              
              {/* Détail des transactions */}
              {activeCategory === category.id && (
                <div className="pl-12 pr-4 py-2 space-y-2 bg-gray-50 rounded-xl mt-1 mb-2">
                  {category.transactions.map((transaction, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <div className="flex flex-col">
                        <span className="text-sm">{transaction.name}</span>
                        <span className="text-xs text-muted-foreground">{transaction.date}</span>
                      </div>
                      <span className="text-sm font-medium text-red-500">-{transaction.amount} DH</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Catégories de revenus */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-foreground">Revenus par catégorie</h3>
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80 hover:bg-accent/50">
            Voir tout
          </Button>
        </div>
        
        <div className="space-y-2">
          {incomeCategories.map((category) => (
            <div key={category.id}>
              <div 
                className="transaction-row cursor-pointer"
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`category-icon ${category.color}`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{category.name}</span>
                    <span className="text-xs text-muted-foreground">{category.transactions.length} transactions</span>
                  </div>
                </div>
                <span className="font-semibold text-green-500">
                  +{category.amount.toLocaleString()} DH
                </span>
              </div>
              
              {/* Détail des transactions */}
              {activeCategory === category.id && (
                <div className="pl-12 pr-4 py-2 space-y-2 bg-gray-50 rounded-xl mt-1 mb-2">
                  {category.transactions.map((transaction, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <div className="flex flex-col">
                        <span className="text-sm">{transaction.name}</span>
                        <span className="text-xs text-muted-foreground">{transaction.date}</span>
                      </div>
                      <span className="text-sm font-medium text-green-500">+{transaction.amount} DH</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bouton d'action */}
      <div className="fixed bottom-20 right-6 z-10 md:bottom-6">
        <Button className="h-14 w-14 rounded-full bg-primary shadow-lg" size="icon">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
