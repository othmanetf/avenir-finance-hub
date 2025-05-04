
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon, IconName } from "@/components/ui/icon-provider";

const navItems = [
  { name: "Accueil", icon: "home" as IconName, route: "/" },
  { name: "Éducation", icon: "education" as IconName, route: "/education" },
  { name: "Analyse", icon: "analysis" as IconName, route: "/analysis" },
  { name: "Avenir+", icon: "investments" as IconName, route: "/investments" },
];

type NavigationProps = {
  currentRoute: string;
  onRouteChange: (route: string) => void;
};

export const Navigation = ({ currentRoute, onRouteChange }: NavigationProps) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="fixed left-0 top-0 z-30 hidden h-full w-16 flex-col border-r border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80 md:flex">
        <div className="flex h-16 items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary shadow-md">
            <span className="text-lg font-bold text-white">M+</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center space-y-4 py-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onRouteChange(item.route)}
              className={cn(
                "group flex w-full flex-col items-center p-2 transition-all duration-200 rounded-xl",
                currentRoute === item.route
                  ? "text-white bg-gradient-primary"
                  : "text-gray-500 hover:text-monavenir-blue hover:bg-accent/50"
              )}
            >
              <Icon 
                name={item.icon} 
                className="h-5 w-5" 
                strokeWidth={currentRoute === item.route ? 2.5 : 1.5}
              />
              <span className="mt-1 text-[10px]">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation - Improved for better touch targets and visibility */}
      <div className="fixed bottom-0 left-0 z-20 w-full border-t border-gray-100 bg-white/90 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/90 md:hidden">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
          {navItems.map((item) => (
            <button 
              key={item.name}
              onClick={() => onRouteChange(item.route)}
              className={cn(
                "flex flex-col items-center justify-center rounded-md p-2 transition-all duration-200 w-full mx-1",
                currentRoute === item.route
                  ? "text-gradient font-medium"
                  : "text-gray-500 hover:text-monavenir-blue"
              )}
            >
              {currentRoute === item.route ? (
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    className="h-5 w-5" 
                    strokeWidth={2}
                    style={{
                      stroke: "url(#nav-gradient)"
                    }}
                  />
                  <svg width="0" height="0">
                    <linearGradient id="nav-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1F6FEB" />
                      <stop offset="100%" stopColor="#8E44AD" />
                    </linearGradient>
                  </svg>
                </div>
              ) : (
                <Icon name={item.icon} className="h-5 w-5" strokeWidth={1.5} />
              )}
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
