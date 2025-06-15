
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { investmentTypes } from "./financialProfilingData";

export default function InvestmentStep({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { financialProfile, updateFinancialProfile } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4 mb-4">
        <Target className="h-6 w-6 text-red-500" />
        <div>
          <h1 className="text-2xl font-bold">Investissements</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Quels types d'investissements possédez-vous?
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <Label>Types d'investissements</Label>
        <div className="grid grid-cols-1 gap-3">
          {investmentTypes.map((type) => (
            <div key={type} className="flex items-center space-x-3">
              <Checkbox
                id={type}
                checked={financialProfile.investmentTypes?.includes(type)}
                onCheckedChange={(checked) => {
                  const current = financialProfile.investmentTypes || [];
                  if (checked) {
                    updateFinancialProfile("investmentTypes", [...current, type]);
                  } else {
                    updateFinancialProfile(
                      "investmentTypes",
                      current.filter((t) => t !== type)
                    );
                  }
                }}
              />
              <Label htmlFor={type} className="cursor-pointer">{type}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-4 flex space-x-4">
        <Button onClick={onBack} variant="outline" className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
        <Button onClick={onNext} className="flex-1 bg-gradient-primary">
          Suivant <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
