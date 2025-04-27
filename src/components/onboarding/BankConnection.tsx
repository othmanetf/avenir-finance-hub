
import { useState } from "react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon-provider";
import { Check, X, ArrowRight, Loader2 } from "lucide-react";
import { useOnboarded } from "@/hooks/use-onboarded";
import { cn } from "@/lib/utils";

// Bank logos stored locally to ensure they load properly
const bankOptions = [
  {
    id: "attijari",
    name: "Attijariwafa Bank",
    logo: "/lovable-uploads/451a0f05-c9c4-4985-a6a4-d0e441d1e0d2.png"
  },
  {
    id: "bmce",
    name: "Bank of Africa (ex-BMCE)",
    logo: "/lovable-uploads/de74a85e-1f8f-433f-bac9-bb3e92a8087a.png"
  },
  {
    id: "cih",
    name: "CIH Bank",
    logo: "/lovable-uploads/69b09907-4fdb-4696-8de1-ac20da10f2bc.png"
  },
  {
    id: "sgma",
    name: "Société Générale Maroc",
    logo: "/lovable-uploads/ab549ad1-6498-4f4c-9b7e-632c48c3f72b.png"
  },
  {
    id: "bp",
    name: "Banque Populaire",
    logo: "/lovable-uploads/f0ec1277-c7c9-4a7f-8544-0789cdc4eb4b.png"
  }
];

export const BankConnection = () => {
  const { setBankConnected, completeOnboarding } = useOnboarding();
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { completeOnboarding: finishOnboarding } = useOnboarded();

  const toggleBank = (bankId: string) => {
    setSelectedBanks(prev => 
      prev.includes(bankId) 
        ? prev.filter(id => id !== bankId)
        : [...prev, bankId]
    );
  };

  const handleConnect = () => {
    setIsLoading(true);
    setBankConnected(selectedBanks.length > 0);
    completeOnboarding();
    
    // Show loading state for a short duration before redirecting
    setTimeout(() => {
      finishOnboarding();
      navigate('/');
    }, 1500);
  };

  const handleSkip = () => {
    setIsLoading(true);
    setBankConnected(false);
    completeOnboarding();
    
    // Show loading state for a short duration before redirecting
    setTimeout(() => {
      finishOnboarding();
      navigate('/');
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-8 pt-24">
      <div className="w-full max-w-md mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#1F6FEB] to-[#8E44AD] flex items-center justify-center">
              <Icon name="bank" className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Connectez vos comptes bancaires</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Connectez vos comptes pour un suivi automatique de vos finances
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {bankOptions.map((bank) => (
                <motion.div 
                  key={bank.id}
                  className={cn(
                    "flex items-center space-x-3 border rounded-xl p-4 cursor-pointer transition-all duration-200",
                    selectedBanks.includes(bank.id) 
                      ? "border-[#1F6FEB] bg-[#1F6FEB]/5" 
                      : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                  )}
                  onClick={() => toggleBank(bank.id)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center p-1 overflow-hidden">
                    <img src={bank.logo} alt={bank.name} className="max-h-8 max-w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{bank.name}</p>
                  </div>
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center", 
                    selectedBanks.includes(bank.id) 
                      ? "bg-[#1F6FEB] text-white" 
                      : "bg-gray-100 text-gray-400 dark:bg-gray-700"
                  )}>
                    {selectedBanks.includes(bank.id) ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <div className="w-3 h-3" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Vos données bancaires sont sécurisées et chiffrées
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4 flex flex-col space-y-3">
            <Button 
              onClick={handleConnect}
              className="w-full bg-gradient-to-r from-[#1F6FEB] to-[#8E44AD] text-white"
              disabled={selectedBanks.length === 0 || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Connexion en cours</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Connecter les comptes</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              )}
            </Button>
            <Button 
              onClick={handleSkip}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Finalisation..." : "Ignorer pour l'instant"}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BankConnection;
