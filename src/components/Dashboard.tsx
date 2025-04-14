
import { 
  CreditCard, 
  Plus, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  DollarSign, 
  ShoppingBag, 
  Gift, 
  Building, 
  TrendingUp,
  MoreHorizontal 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  return (
    <div className="flex flex-col p-4 md:p-6 gap-6 md:pl-24">
      {/* Header with User and Card */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
            <AvatarImage src="https://github.com/shadcn.png" alt="Mohamed" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Welcome back</span>
            <h2 className="text-xl font-bold">Mohamed</h2>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <div className="card-gradient-primary rounded-2xl p-3 pr-5 text-white w-full md:w-auto flex justify-between items-center shadow-lg">
            <div className="flex gap-3 items-center">
              <div className="rounded-xl h-12 w-12 bg-white/20 flex items-center justify-center">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white/80">**** 8453</span>
                <span className="text-white font-medium">Visa Card</span>
              </div>
            </div>
            <Button size="sm" variant="ghost" className="rounded-full bg-white/20 hover:bg-white/30 p-1">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Total Wallet */}
      <Card className="bg-white shadow-md border-0">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-muted-foreground">Total wallet</span>
              <Button variant="outline" size="sm" className="rounded-full text-xs">
                More
              </Button>
            </div>
            
            <h1 className="text-3xl font-bold flex items-center">
              <span className="text-foreground">DH 34,206</span>
              <span className="text-sm text-muted-foreground ml-1">.50</span>
            </h1>
            
            {/* Income and Spend Stats */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="stat-card bg-primary rounded-2xl">
                <span className="text-xs text-white/80">Income</span>
                <div className="flex items-center">
                  <ArrowUpCircle className="h-4 w-4 mr-1 text-white/80" />
                  <span className="font-semibold">DH 4,353</span>
                </div>
              </div>
              
              <div className="stat-card bg-secondary rounded-2xl">
                <span className="text-xs text-white/80">Spend</span>
                <div className="flex items-center">
                  <ArrowDownCircle className="h-4 w-4 mr-1 text-white/80" />
                  <span className="font-semibold">DH 1,872</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-white shadow-md border-0">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Recent transactions</h3>
            <Button variant="ghost" size="sm" className="text-xs text-primary">
              View all
            </Button>
          </div>
          
          <div className="space-y-1">
            {[
              { icon: ShoppingBag, name: "Food & Drink", date: "Today, 10:42 AM", amount: -23, color: "bg-orange-100" },
              { icon: Gift, name: "Investment", date: "Yesterday, 2:30 PM", amount: -120, color: "bg-violet-100" },
              { icon: Building, name: "Insurance bill", date: "Jun 18, 11:28 AM", amount: -97, color: "bg-blue-100" },
            ].map((transaction, idx) => (
              <div key={idx} className="transaction-item">
                <div className="flex items-center gap-3">
                  <div className={`${transaction.color} p-2 rounded-xl`}>
                    <transaction.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{transaction.name}</span>
                    <span className="text-xs text-muted-foreground">{transaction.date}</span>
                  </div>
                </div>
                <span className={`font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="fixed bottom-20 right-6 z-10 md:bottom-6">
        <Button className="h-14 w-14 rounded-full card-gradient-primary shadow-lg" size="icon">
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 z-20 w-full border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 md:hidden">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-6">
          <button className="flex flex-col items-center justify-center rounded-md p-2 text-primary">
            <DollarSign className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center rounded-md p-2 text-gray-500">
            <CreditCard className="h-5 w-5" />
            <span className="text-xs mt-1">Cards</span>
          </button>
          <div className="h-12 w-12"></div> {/* Placeholder for center button */}
          <button className="flex flex-col items-center justify-center rounded-md p-2 text-gray-500">
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs mt-1">Stats</span>
          </button>
          <button className="flex flex-col items-center justify-center rounded-md p-2 text-gray-500">
            <MoreHorizontal className="h-5 w-5" />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
