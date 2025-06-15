
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, PiggyBank } from "lucide-react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";

export default function DebtStep({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { financialProfile, updateFinancialProfile } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4 mb-4">
        <PiggyBank className="h-6 w-6 text-green-500" />
        <div>
          <h1 className="text-2xl font-bold">Dettes/Prêts</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Avez-vous des dettes ou des prêts en cours?
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <Label>Avez-vous des dettes?</Label>
        <RadioGroup
          value={financialProfile.hasDebt ? "yes" : "no"}
          onValueChange={(value) => updateFinancialProfile("hasDebt", value === "yes")}
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
      </div>
      {financialProfile.hasDebt && (
        <div className="space-y-4">
          <Label htmlFor="debt-amount">Montant total des dettes (MAD)</Label>
          <Input
            id="debt-amount"
            value={financialProfile.debtAmount || ""}
            onChange={(e) => updateFinancialProfile("debtAmount", e.target.value)}
            placeholder="Ex: 100,000 MAD"
          />
          <Label htmlFor="debt-duration">Durée restante (mois)</Label>
          <Input
            id="debt-duration"
            value={financialProfile.debtDuration || ""}
            onChange={(e) => updateFinancialProfile("debtDuration", e.target.value)}
            placeholder="Ex: 36 mois"
          />
        </div>
      )}
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
