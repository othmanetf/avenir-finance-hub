
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { savingsGoals } from "./financialProfilingData";

export default function SavingsStep({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { financialProfile, updateFinancialProfile } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4 mb-4">
        <TrendingUp className="h-6 w-6 text-orange-500" />
        <div>
          <h1 className="text-2xl font-bold">Épargne</h1>
          <p className="text-gray-500 dark:text-gray-400">Parlons de vos habitudes d'épargne</p>
        </div>
      </div>
      <div className="space-y-4">
        <Label htmlFor="monthly-savings">Épargne mensuelle (MAD)</Label>
        <Input
          id="monthly-savings"
          value={financialProfile.monthlySavings || ""}
          onChange={(e) => updateFinancialProfile("monthlySavings", e.target.value)}
          placeholder="Ex: 2,500 MAD"
        />
      </div>
      <div className="space-y-4">
        <Label>Objectifs d'épargne</Label>
        <div className="grid grid-cols-1 gap-3">
          {savingsGoals.map((goal) => (
            <div key={goal} className="flex items-center space-x-3">
              <Checkbox
                id={goal}
                checked={financialProfile.savingsGoals?.includes(goal)}
                onCheckedChange={(checked) => {
                  const current = financialProfile.savingsGoals || [];
                  if (checked) {
                    updateFinancialProfile("savingsGoals", [...current, goal]);
                  } else {
                    updateFinancialProfile(
                      "savingsGoals",
                      current.filter((g) => g !== goal)
                    );
                  }
                }}
              />
              <Label htmlFor={goal} className="cursor-pointer">{goal}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Label htmlFor="total-savings">Épargne totale actuelle (MAD)</Label>
        <Input
          id="total-savings"
          value={financialProfile.totalSavings || ""}
          onChange={(e) => updateFinancialProfile("totalSavings", e.target.value)}
          placeholder="Ex: 50,000 MAD"
        />
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
