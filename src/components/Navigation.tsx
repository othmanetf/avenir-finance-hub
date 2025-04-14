
import { useState } from "react";
import { Home, BookOpen, BarChart3, Brain, Wallet, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", icon: Home, route: "/" },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 z-20 w-full border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 md:hidden">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onRouteChange(item.route)}
              className={cn(
                "flex flex-col items-center justify-center space-y-1",
                currentRoute === item.route
                  ? "text-monavenir-blue dark:text-monavenir-skyblue"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="fixed left-0 top-0 z-30 hidden h-full w-20 flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 md:flex">
        <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary">
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
                  ? "text-monavenir-blue dark:text-monavenir-skyblue"
                  : "text-gray-500 hover:text-monavenir-blue dark:text-gray-400 dark:hover:text-monavenir-skyblue"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="mt-1 text-xs">{item.name}</span>
              {currentRoute === item.route && (
                <div className="absolute left-0 h-8 w-1 rounded-r-md bg-monavenir-blue dark:bg-monavenir-skyblue" />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
