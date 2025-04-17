
import { useState } from "react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon-provider";
import { Building, Check, X, ArrowRight } from "lucide-react";
import { useOnboarded } from "@/hooks/use-onboarded";

const bankOptions = [
  {
    id: "attijari",
    name: "Attijariwafa Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Attijariwafa_bank_Logo.svg"
  },
  {
    id: "bmce",
    name: "Bank of Africa (ex-BMCE)",
    logo: "https://upload.wikimedia.org/wikipedia/fr/e/e3/Bank_of_Africa_logo.png"
  },
  {
    id: "cih",
    name: "CIH Bank",
    logo: "https://www.cihbank.ma/sites/all/themes/cih/img/logo.svg"
  },
  {
    id: "sgma",
    name: "Société Générale Maroc",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Soci%C3%A9t%C3%A9_G%C3%A9n%C3%A9rale.svg/2560px-Soci%C3%A9t%C3%A9_G%C3%A9n%C3%A9rale.svg.png"
  },
  {
    id: "bp",
    name: "Banque Populaire",
    logo: "https://www.gbp.ma/Publications/Lists/Carousel/Attachments/44/logo-bcp.png"
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
    <div className="container max-w-md mx-auto px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Icon name="transactions" className="h-8 w-8 text-blue-600" />
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
                <div 
                  key={bank.id}
                  className={`flex items-center space-x-3 border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                    selectedBanks.includes(bank.id) 
                      ? "border-primary bg-primary/5" 
                      : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                  }`}
                  onClick={() => toggleBank(bank.id)}
                >
                  <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center p-1">
                    <img src={bank.logo} alt={bank.name} className="max-h-8 max-w-8 object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{bank.name}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    selectedBanks.includes(bank.id) 
                      ? "bg-primary text-white" 
                      : "bg-gray-100 text-gray-400 dark:bg-gray-700"
                  }`}>
                    {selectedBanks.includes(bank.id) ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <div className="w-3 h-3" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Vos données bancaires sont sécurisées et chiffrées
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4 flex flex-col space-y-3">
            <Button 
              onClick={handleConnect}
              className="w-full bg-gradient-primary"
              disabled={selectedBanks.length === 0 || isLoading}
            >
              {isLoading ? (
                <>
                  <span className="mr-2">Connexion en cours</span>
                  <span className="animate-spin">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                </>
              ) : (
                <>
                  Connecter les comptes <ArrowRight className="ml-2 h-4 w-4" />
                </>
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
