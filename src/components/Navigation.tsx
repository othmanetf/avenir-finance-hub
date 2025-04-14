
import { useState } from "react";
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  Brain, 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  MoreHorizontal 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", icon: Home, route: "/" },
  { name: "Education", icon: BookOpen, route: "/education" },
  { name: "Budget", icon: BarChart3, route: "/budget" },
  { name: "Analysis", icon: Brain, route: "/analysis" },
  { name: "Investments", icon: Wallet, route: "/investments" },
];

type NavigationProps = {
  currentRoute: string;
  onRouteChange: (route: string) => void;
};

export const Navigation = ({ currentRoute, onRouteChange }: NavigationProps) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="fixed left-0 top-0 z-30 hidden h-full w-16 flex-col border-r border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 md:flex">
        <div className="flex h-16 items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full card-gradient-primary">
            <span className="text-lg font-bold text-white">M+</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center space-y-4 py-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onRouteChange(item.route)}
              className={cn(
                "group flex w-full flex-col items-center p-2 transition-colors",
                currentRoute === item.route
                  ? "text-primary"
                  : "text-gray-500 hover:text-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="mt-1 text-[10px]">{item.name}</span>
              {currentRoute === item.route && (
                <div className="absolute left-0 h-10 w-1 rounded-r-md bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation rendered in Dashboard component */}
    </>
  );
};

export default Navigation;
