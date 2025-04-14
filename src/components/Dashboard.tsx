
import { 
  CreditCard, 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  Search,
  Calendar,
  ShoppingBag, 
  Gift,
  Building, 
  Home as HomeIcon,
  Wallet,
  BarChart3, 
  MoreHorizontal,
  ChevronDown
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Dashboard = () => {
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    { 
      type: "Visa", 
      gradient: "visa-card", 
      number: "5643 7453 **** 1234", 
      name: "Mohamed", 
      balance: 12000, 
      expires: "04/25" 
    },
    { 
      type: "Mastercard", 
      gradient: "mastercard", 
      number: "7658 5643 **** 4321", 
      name: "Mohamed", 
      balance: 8500, 
      expires: "06/27" 
    }
  ];

  const selectedCard = cards[activeCard];

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

      {/* Card Carousel */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className={`wallet-card ${card.gradient} flex-shrink-0 w-full max-w-[280px] snap-center ${index === activeCard ? 'ring-2 ring-white/50' : 'opacity-80'}`}
              onClick={() => setActiveCard(index)}
            >
              <div className="flex justify-between items-start">
                <div className="rounded-full bg-white/20 p-2">
                  {card.type === "Visa" ? (
                    <CreditCard className="h-5 w-5 text-white" />
                  ) : (
                    <CreditCard className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="text-white/90 text-right">
                  <p className="text-xs font-light">CARD HOLDER</p>
                  <p className="font-medium">{card.name}</p>
                </div>
              </div>
              
              <div className="mt-auto">
                <p className="text-white/80 text-xs mb-1">CARD NUMBER</p>
                <p className="text-white font-medium tracking-wider">{card.number}</p>
                
                <div className="flex justify-between mt-2">
                  <div>
                    <p className="text-white/80 text-[10px]">EXPIRES</p>
                    <p className="text-white text-sm">{card.expires}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-[10px]">BALANCE</p>
                    <p className="text-white font-medium">DH {card.balance.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button className="flex flex-col items-center justify-center h-44 w-16 rounded-2xl bg-accent flex-shrink-0 snap-center">
            <div className="rounded-full bg-white p-2 mb-2">
              <Plus className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Add Card</span>
          </button>
        </div>
        
        {/* Indicator dots */}
        <div className="flex justify-center gap-1 mt-2">
          {cards.map((_, index) => (
            <div 
              key={index} 
              className={`h-1.5 rounded-full ${index === activeCard ? 'w-4 bg-primary' : 'w-1.5 bg-muted'}`}
              onClick={() => setActiveCard(index)}
            />
          ))}
        </div>
      </div>

      {/* Total Wallet */}
      <Card className="bg-white shadow-md border-0 rounded-3xl">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-foreground">Total wallet</span>
              <Button variant="outline" size="sm" className="rounded-full text-xs border-accent bg-accent/30 text-primary hover:bg-accent/50 hover:text-primary">
                Allocate
              </Button>
            </div>
            
            <h1 className="text-3xl font-bold flex items-center">
              <span className="text-foreground">DH 34,206</span>
              <span className="text-sm text-muted-foreground ml-1">.50</span>
            </h1>
            
            {/* Income and Spend Stats */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="stat-block income-block">
                <div className="flex items-center justify-center rounded-xl bg-violet-200 h-8 w-8">
                  <ArrowUp className="h-4 w-4 text-violet-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">Income</span>
                  <span className="font-medium">+ DH 4,353</span>
                </div>
              </div>
              
              <div className="stat-block spend-block">
                <div className="flex items-center justify-center rounded-xl bg-red-200 h-8 w-8">
                  <ArrowDown className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">Spend</span>
                  <span className="font-medium">- DH 1,872</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-foreground">Recent transactions</h3>
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80 hover:bg-accent/50">
            View all
          </Button>
        </div>
        
        <div className="space-y-2">
          {[
            { 
              icon: ShoppingBag, 
              name: "Food & Drink", 
              date: "Today, 10:42 AM", 
              amount: -23, 
              color: "bg-orange-100 text-orange-500" 
            },
            { 
              icon: Gift, 
              name: "Investment", 
              date: "Yesterday, 2:30 PM", 
              amount: -120, 
              color: "bg-violet-100 text-violet-500" 
            },
            { 
              icon: Building, 
              name: "Insurance bill", 
              date: "Jun 18, 11:28 AM", 
              amount: -97, 
              color: "bg-blue-100 text-blue-500" 
            },
          ].map((transaction, idx) => (
            <div key={idx} className="transaction-row">
              <div className="flex items-center gap-3">
                <div className={`category-icon ${transaction.color}`}>
                  <transaction.icon className="h-5 w-5" />
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
      </div>

      {/* Action Button */}
      <div className="fixed bottom-20 right-6 z-10 md:bottom-6">
        <Button className="h-14 w-14 rounded-full bg-primary shadow-lg" size="icon">
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 z-20 w-full border-t border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-900 md:hidden">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-6">
          <button className="flex flex-col items-center justify-center rounded-md p-2 text-primary">
            <HomeIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center rounded-md p-2 text-gray-500">
            <Wallet className="h-5 w-5" />
            <span className="text-xs mt-1">Cards</span>
          </button>
          <div className="h-12 w-12"></div> {/* Placeholder for center button */}
          <button className="flex flex-col items-center justify-center rounded-md p-2 text-gray-500">
            <BarChart3 className="h-5 w-5" />
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
