import { useState } from "react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Wallet, 
  PiggyBank, 
  CreditCard, 
  Target, 
  TrendingUp, 
  AlertCircle,
  Globe,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

interface FinancialProfilingProps {
  onComplete?: () => void;
}

const incomeRanges = [
  "< 5,000 MAD",
  "5,000 - 10,000 MAD",
  "10,000 - 15,000 MAD",
  "15,000 - 25,000 MAD",
  "> 25,000 MAD"
];

const expenseTypes = [
  "Loyer/Hypothèque",
  "Services (eau, électricité)",
  "Télécommunications",
  "Transports",
  "Alimentation",
  "Santé",
  "Education"
];

const savingsGoals = [
  "Fonds d'urgence",
  "Voyage",
  "Achat immobilier",
  "Mariage",
  "Retraite",
  "Études",
  "Démarrer une entreprise"
];

const investmentTypes = [
  "Compte d'épargne",
  "Actions",
  "ETFs",
  "Obligations",
  "Immobilier",
  "Crypto-monnaies",
  "Aucun pour le moment"
];

const financialGoals = [
  "Acheter un logement",
  "Voyager",
  "Étudier à l'étranger",
  "Indépendance financière",
  "Démarrer une entreprise",
  "Prendre sa retraite tôt",
  "Sécuriser l'avenir de ma famille"
];

const financialConcerns = [
  "Dépenses excessives",
  "Pas assez d'épargne",
  "Manque de visibilité sur mes finances",
  "Peur d'investir",
  "Dette trop élevée",
  "Irrégularité des revenus",
  "Objectifs financiers flous"
];

export const FinancialProfiling = ({ onComplete }: FinancialProfilingProps) => {
  const { updateFinancialProfile, financialProfile, setStep } = useOnboarding();
  const [subStep, setSubStep] = useState(1);
  const totalSubSteps = 7;

  const handleNext = () => {
    if (subStep < totalSubSteps) {
      setSubStep(subStep + 1);
    } else {
      if (onComplete) {
        onComplete();
      } else {
        setStep(4);
      }
    }
  };

  const handleBack = () => {
    if (subStep > 1) {
      setSubStep(subStep - 1);
    } else {
      setStep(2);
    }
  };

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

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <Wallet className="h-6 w-6 text-blue-500" />;
      case 2: return <CreditCard className="h-6 w-6 text-purple-500" />;
      case 3: return <PiggyBank className="h-6 w-6 text-green-500" />;
      case 4: return <TrendingUp className="h-6 w-6 text-orange-500" />;
      case 5: return <Target className="h-6 w-6 text-red-500" />;
      case 6: return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case 7: return <Globe className="h-6 w-6 text-indigo-500" />;
      default: return <Wallet className="h-6 w-6" />;
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-between mb-8">
          {Array.from({ length: totalSubSteps }).map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full flex-1 mx-1 ${
                subStep > i ? "bg-gradient-primary" : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>

        {subStep === 1 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              {getStepIcon(1)}
              <div>
                <h1 className="text-2xl font-bold">Revenus Mensuels</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Parlez-nous de vos revenus
                </p>
              </div>
            </div>

            <motion.div variants={itemVariants} className="space-y-4">
              <Label htmlFor="income-range">Tranche de revenus mensuels</Label>
              <Select 
                defaultValue={financialProfile.monthlyIncome || ""}
                onValueChange={(value) => updateFinancialProfile("monthlyIncome", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une tranche" />
                </SelectTrigger>
                <SelectContent>
                  {incomeRanges.map((range) => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4 flex space-x-4">
              <Button onClick={handleBack} variant="outline" className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-gradient-primary">
                Suivant <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {subStep === 2 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              {getStepIcon(2)}
              <div>
                <h1 className="text-2xl font-bold">Dépenses Fixes</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Quelles sont vos dépenses mensuelles fixes?
                </p>
              </div>
            </div>

            <motion.div variants={itemVariants} className="space-y-4">
              <Label>Types de dépenses</Label>
              <div className="grid grid-cols-1 gap-3">
                {expenseTypes.map((expense) => (
                  <div key={expense} className="flex items-center space-x-3">
                    <Checkbox 
                      id={expense} 
                      checked={financialProfile.fixedExpenses?.includes(expense)}
                      onCheckedChange={(checked) => {
                        const currentExpenses = financialProfile.fixedExpenses || [];
                        if (checked) {
                          updateFinancialProfile("fixedExpenses", [...currentExpenses, expense]);
                        } else {
                          updateFinancialProfile(
                            "fixedExpenses", 
                            currentExpenses.filter(e => e !== expense)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={expense} className="cursor-pointer">{expense}</Label>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4 flex space-x-4">
              <Button onClick={handleBack} variant="outline" className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-gradient-primary">
                Suivant <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {subStep === 3 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              {getStepIcon(3)}
              <div>
                <h1 className="text-2xl font-bold">Dettes/Prêts</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Avez-vous des dettes ou des prêts en cours?
                </p>
              </div>
            </div>

            <motion.div variants={itemVariants} className="space-y-4">
              <Label>Avez-vous des dettes?</Label>
              <RadioGroup 
                value={financialProfile.hasDebt ? "yes" : "no"}
                onValueChange={(value) => {
                  updateFinancialProfile("hasDebt", value === "yes");
                }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="yes" id="debt-yes" />
                  <Label htmlFor="debt-yes">Oui</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="no" id="debt-no" />
                  <Label htmlFor="debt-no">Non</Label>
                </div>
              </RadioGroup>
            </motion.div>

            {financialProfile.hasDebt && (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <motion.div variants={itemVariants}>
                  <Label htmlFor="debt-amount">Montant total des dettes (MAD)</Label>
                  <Input 
                    id="debt-amount"
                    value={financialProfile.debtAmount || ""}
                    onChange={(e) => updateFinancialProfile("debtAmount", e.target.value)}
                    placeholder="Ex: 100,000 MAD"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Label htmlFor="debt-duration">Durée restante (mois)</Label>
                  <Input 
                    id="debt-duration"
                    value={financialProfile.debtDuration || ""}
                    onChange={(e) => updateFinancialProfile("debtDuration", e.target.value)}
                    placeholder="Ex: 36 mois"
                  />
                </motion.div>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="pt-4 flex space-x-4">
              <Button onClick={handleBack} variant="outline" className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-gradient-primary">
                Suivant <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {subStep === 4 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              {getStepIcon(4)}
              <div>
                <h1 className="text-2xl font-bold">Épargne</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Parlons de vos habitudes d'épargne
                </p>
              </div>
            </div>

            <motion.div variants={itemVariants} className="space-y-4">
              <Label htmlFor="monthly-savings">Épargne mensuelle (MAD)</Label>
              <Input 
                id="monthly-savings"
                value={financialProfile.monthlySavings || ""}
                onChange={(e) => updateFinancialProfile("monthlySavings", e.target.value)}
                placeholder="Ex: 2,500 MAD"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <Label>Objectifs d'épargne</Label>
              <div className="grid grid-cols-1 gap-3">
                {savingsGoals.map((goal) => (
                  <div key={goal} className="flex items-center space-x-3">
                    <Checkbox 
                      id={goal} 
                      checked={financialProfile.savingsGoals?.includes(goal)}
                      onCheckedChange={(checked) => {
                        const currentGoals = financialProfile.savingsGoals || [];
                        if (checked) {
                          updateFinancialProfile("savingsGoals", [...currentGoals, goal]);
                        } else {
                          updateFinancialProfile(
                            "savingsGoals", 
                            currentGoals.filter(g => g !== goal)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={goal} className="cursor-pointer">{goal}</Label>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <Label htmlFor="total-savings">Épargne totale actuelle (MAD)</Label>
              <Input 
                id="total-savings"
                value={financialProfile.totalSavings || ""}
                onChange={(e) => updateFinancialProfile("totalSavings", e.target.value)}
                placeholder="Ex: 50,000 MAD"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4 flex space-x-4">
              <Button onClick={handleBack} variant="outline" className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-gradient-primary">
                Suivant <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {subStep === 5 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              {getStepIcon(5)}
              <div>
                <h1 className="text-2xl font-bold">Investissements</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Quels types d'investissements possédez-vous?
                </p>
              </div>
            </div>

            <motion.div variants={itemVariants} className="space-y-4">
              <Label>Types d'investissements</Label>
              <div className="grid grid-cols-1 gap-3">
                {investmentTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-3">
                    <Checkbox 
                      id={type} 
                      checked={financialProfile.investmentTypes?.includes(type)}
                      onCheckedChange={(checked) => {
                        const currentTypes = financialProfile.investmentTypes || [];
                        if (checked) {
                          updateFinancialProfile("investmentTypes", [...currentTypes, type]);
                        } else {
                          updateFinancialProfile(
                            "investmentTypes", 
                            currentTypes.filter(t => t !== type)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={type} className="cursor-pointer">{type}</Label>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4 flex space-x-4">
              <Button onClick={handleBack} variant="outline" className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-gradient-primary">
                Suivant <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {subStep === 6 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              {getStepIcon(6)}
              <div>
                <h1 className="text-2xl font-bold">Objectifs & Inquiétudes</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Quels sont vos objectifs et préoccupations financières?
                </p>
              </div>
            </div>

            <motion.div variants={itemVariants} className="space-y-4">
              <Label>Objectifs financiers principaux</Label>
              <div className="grid grid-cols-1 gap-3">
                {financialGoals.map((goal) => (
                  <div key={goal} className="flex items-center space-x-3">
                    <Checkbox 
                      id={`goal-${goal}`} 
                      checked={financialProfile.financialGoals?.includes(goal)}
                      onCheckedChange={(checked) => {
                        const currentGoals = financialProfile.financialGoals || [];
                        if (checked) {
                          updateFinancialProfile("financialGoals", [...currentGoals, goal]);
                        } else {
                          updateFinancialProfile(
                            "financialGoals", 
                            currentGoals.filter(g => g !== goal)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`goal-${goal}`} className="cursor-pointer">{goal}</Label>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <Label>Préoccupations financières</Label>
              <div className="grid grid-cols-1 gap-3">
                {financialConcerns.map((concern) => (
                  <div key={concern} className="flex items-center space-x-3">
                    <Checkbox 
                      id={`concern-${concern}`} 
                      checked={financialProfile.financialConcerns?.includes(concern)}
                      onCheckedChange={(checked) => {
                        const currentConcerns = financialProfile.financialConcerns || [];
                        if (checked) {
                          updateFinancialProfile("financialConcerns", [...currentConcerns, concern]);
                        } else {
                          updateFinancialProfile(
                            "financialConcerns", 
                            currentConcerns.filter(c => c !== concern)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`concern-${concern}`} className="cursor-pointer">{concern}</Label>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4 flex space-x-4">
              <Button onClick={handleBack} variant="outline" className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-gradient-primary">
                Suivant <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {subStep === 7 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              {getStepIcon(7)}
              <div>
                <h1 className="text-2xl font-bold">Préférence de langue</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Dans quelle langue préférez-vous utiliser MonAvenir+?
                </p>
              </div>
            </div>

            <motion.div variants={itemVariants} className="space-y-4">
              <RadioGroup 
                value={financialProfile.preferredLanguage || "fr"}
                onValueChange={(value: 'fr' | 'ar' | 'en') => {
                  updateFinancialProfile("preferredLanguage", value);
                }}
                className="grid grid-cols-1 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="fr" id="lang-fr" />
                  <Label htmlFor="lang-fr">Français</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="ar" id="lang-ar" />
                  <Label htmlFor="lang-ar">العربية (Arabe)</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="en" id="lang-en" />
                  <Label htmlFor="lang-en">English (Anglais)</Label>
                </div>
              </RadioGroup>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4 flex space-x-4">
              <Button onClick={handleBack} variant="outline" className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-gradient-primary">
                Terminer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FinancialProfiling;
