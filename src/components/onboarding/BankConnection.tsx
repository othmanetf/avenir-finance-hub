import { useState } from "react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Icon } from "@/components/ui/icon-provider";
import { ArrowRight, Loader2 } from "lucide-react";
import { useOnboarded } from "@/hooks/use-onboarded";
import BankList from "./BankList";
import { Bank } from "./BankList";

// Bank logos are now using the uploaded images
const bankOptions: Bank[] = [
  {
    id: "attijari",
    name: "Attijariwafa Bank",
    logo: "/lovable-uploads/87e0d633-d00c-408e-962c-489327b541ac.png"  // Logo maison rouge et jaune
  },
  {
    id: "bmce",
    name: "Bank of Africa (ex-BMCE)",
    logo: "/lovable-uploads/14ed2c24-9bce-40c2-85f3-7343992d7812.png"  // Logo cercle bleu avec l'Afrique turquoise
  },
  {
    id: "cih",
    name: "CIH Bank",
    logo: "/lovable-uploads/0939d09f-22ce-4088-990d-1afac195a71b.png"  // Logo CIH en noir avec flèches rouge/bleue
  },
  {
    id: "sgma",
    name: "Société Générale Maroc",
    logo: "/lovable-uploads/09f795f9-2422-4b78-8c9c-5b7ac6793d54.png"  // Logo rectangle rouge sur noir
  },
  {
    id: "bp",
    name: "Banque Populaire",
    logo: "/lovable-uploads/fc969314-7d86-4044-b219-98bfa946076a.png"  // Logo cheval marron dans un cercle orange
  }
];

const BankConnection = () => {
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
    <div className="container max-w-md mx-auto px-4 py-8 pt-8 overflow-hidden">
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
            <BankList 
              banks={bankOptions} 
              selectedBanks={selectedBanks} 
              toggleBank={toggleBank} 
            />

            <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
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
