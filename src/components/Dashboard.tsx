
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

export const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Sample data - in a real app, this would be dynamic
  const budgetData = {
    totalBudget: 7500,
    spent: 4825,
    income: 8500,
    expenses: 4825
  };

  const categories = [
    { 
      id: "food", 
      name: "Food & Drinks", 
      icon: Coffee, 
      amount: 1250, 
      color: "bg-orange-100 text-orange-500",
      transactions: [
        { name: "Supermarket", date: "Today, 10:42 AM", amount: 320 },
        { name: "Restaurant", date: "Yesterday, 8:30 PM", amount: 450 },
        { name: "Coffee Shop", date: "Jun 18, 3:15 PM", amount: 120 },
        { name: "Grocery Store", date: "Jun 16, 11:20 AM", amount: 360 }
      ]
    },
    { 
      id: "shopping", 
      name: "Shopping", 
      icon: ShoppingBag, 
      amount: 875, 
      color: "bg-blue-100 text-blue-500",
      transactions: [
        { name: "Clothing Store", date: "Jun 15, 2:30 PM", amount: 475 },
        { name: "Electronics", date: "Jun 10, 5:45 PM", amount: 400 }
      ]
    },
    { 
      id: "housing", 
      name: "Housing", 
      icon: HomeIcon, 
      amount: 1800, 
      color: "bg-violet-100 text-violet-500",
      transactions: [
        { name: "Rent", date: "Jun 5, 9:00 AM", amount: 1800 }
      ]
    },
    { 
      id: "transport", 
      name: "Transportation", 
      icon: Car, 
      amount: 900, 
      color: "bg-green-100 text-green-500",
      transactions: [
        { name: "Fuel", date: "Jun 12, 11:15 AM", amount: 350 },
        { name: "Taxi", date: "Jun 8, 6:40 PM", amount: 120 },
        { name: "Public Transport", date: "Jun 3, 8:20 AM", amount: 160 },
        { name: "Car Maintenance", date: "Jun 1, 3:10 PM", amount: 270 }
      ]
    }
  ];

  const incomeCategories = [
    { 
      id: "salary", 
      name: "Salary", 
      icon: Building, 
      amount: 8000, 
      color: "bg-emerald-100 text-emerald-500",
      transactions: [
        { name: "Main Job", date: "Jun 5, 10:00 AM", amount: 8000 }
      ]
    },
    { 
      id: "gifts", 
      name: "Gifts", 
      icon: Gift, 
      amount: 500, 
      color: "bg-pink-100 text-pink-500",
      transactions: [
        { name: "Birthday Gift", date: "Jun 8, 9:20 AM", amount: 500 }
      ]
    }
  ];

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6 md:pl-24">
      {/* Header with Welcome and Avatar */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h2 className="text-xl font-bold text-foreground">Mohamed</h2>
        </div>
        
        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
          <AvatarImage src="https://github.com/shadcn.png" alt="Mohamed" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </div>

      {/* Budget Overview */}
      <Card className="bg-white shadow-md border-0 rounded-3xl">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-foreground">Monthly Budget</span>
              <Button variant="outline" size="sm" className="rounded-full text-xs border-accent bg-accent/30 text-primary hover:bg-accent/50 hover:text-primary">
                Adjust
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
                <h3 className="text-2xl font-bold text-foreground">DH {budgetData.spent.toLocaleString()}</h3>
                <p className="text-sm text-muted-foreground">of DH {budgetData.totalBudget.toLocaleString()} budget</p>
              </div>
            </div>
            
            {/* Income and Spend Stats */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="stat-block income-block">
                <div className="flex items-center justify-center rounded-xl bg-violet-200 h-8 w-8">
                  <ArrowUp className="h-4 w-4 text-violet-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">Income</span>
                  <span className="font-medium">DH {budgetData.income.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="stat-block spend-block">
                <div className="flex items-center justify-center rounded-xl bg-red-200 h-8 w-8">
                  <ArrowDown className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">Expenses</span>
                  <span className="font-medium">DH {budgetData.expenses.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Evolution Graph */}
      <Card className="bg-white shadow-md border-0 rounded-3xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-foreground">Monthly Evolution</h3>
            <select className="text-xs border rounded-lg p-1">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 6 months</option>
            </select>
          </div>
          
          {/* Placeholder for chart - in a real implementation, you'd use a chart library like recharts */}
          <div className="h-40 bg-gray-50 rounded-xl flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Chart visualization would go here</p>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Categories */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-foreground">Expenses by Category</h3>
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80 hover:bg-accent/50">
            View all
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
                  -DH {category.amount.toLocaleString()}
                </span>
              </div>
              
              {/* Transactions breakdown */}
              {activeCategory === category.id && (
                <div className="pl-12 pr-4 py-2 space-y-2 bg-gray-50 rounded-xl mt-1 mb-2">
                  {category.transactions.map((transaction, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <div className="flex flex-col">
                        <span className="text-sm">{transaction.name}</span>
                        <span className="text-xs text-muted-foreground">{transaction.date}</span>
                      </div>
                      <span className="text-sm font-medium text-red-500">-DH {transaction.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Income Categories */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-foreground">Income by Category</h3>
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80 hover:bg-accent/50">
            View all
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
                  +DH {category.amount.toLocaleString()}
                </span>
              </div>
              
              {/* Transactions breakdown */}
              {activeCategory === category.id && (
                <div className="pl-12 pr-4 py-2 space-y-2 bg-gray-50 rounded-xl mt-1 mb-2">
                  {category.transactions.map((transaction, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <div className="flex flex-col">
                        <span className="text-sm">{transaction.name}</span>
                        <span className="text-xs text-muted-foreground">{transaction.date}</span>
                      </div>
                      <span className="text-sm font-medium text-green-500">+DH {transaction.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="fixed bottom-20 right-6 z-10 md:bottom-6">
        <Button className="h-14 w-14 rounded-full bg-primary shadow-lg" size="icon">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
