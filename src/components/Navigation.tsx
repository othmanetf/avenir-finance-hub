
import { useState } from "react";
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  Brain, 
  Wallet 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Accueil", icon: Home, route: "/" },
  { name: "Éducation", icon: BookOpen, route: "/education" },
  { name: "Analyse", icon: Brain, route: "/analysis" },
  { name: "Investissements", icon: Wallet, route: "/investments" },
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
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <span className="text-lg font-bold text-white">M+</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center space-y-4 py-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onRouteChange(item.route)}
              className={cn(
                "group flex w-full flex-col items-center p-2 transition-colors rounded-xl",
                currentRoute === item.route
                  ? "text-primary bg-accent"
                  : "text-gray-500 hover:text-primary hover:bg-accent/50"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="mt-1 text-[10px]">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 z-20 w-full border-t border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-900 md:hidden">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-6">
          {navItems.map((item) => (
            <button 
              key={item.name}
              onClick={() => onRouteChange(item.route)}
              className={cn(
                "flex flex-col items-center justify-center rounded-md p-2",
                currentRoute === item.route
                  ? "text-primary"
                  : "text-gray-500"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
