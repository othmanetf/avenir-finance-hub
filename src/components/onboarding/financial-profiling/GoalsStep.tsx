
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { financialGoals, financialConcerns } from "./financialProfilingData";

export default function GoalsStep({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { financialProfile, updateFinancialProfile } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4 mb-4">
        <AlertCircle className="h-6 w-6 text-yellow-500" />
        <div>
          <h1 className="text-2xl font-bold">Objectifs & Inquiétudes</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Quels sont vos objectifs et préoccupations financières?
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <Label>Objectifs financiers principaux</Label>
        <div className="grid grid-cols-1 gap-3">
          {financialGoals.map((goal) => (
            <div key={goal} className="flex items-center space-x-3">
              <Checkbox
                id={`goal-${goal}`}
                checked={financialProfile.financialGoals?.includes(goal)}
                onCheckedChange={(checked) => {
                  const current = financialProfile.financialGoals || [];
                  if (checked) {
                    updateFinancialProfile("financialGoals", [...current, goal]);
                  } else {
                    updateFinancialProfile(
                      "financialGoals",
                      current.filter((g) => g !== goal)
                    );
                  }
                }}
              />
              <Label htmlFor={`goal-${goal}`} className="cursor-pointer">{goal}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Label>Préoccupations financières</Label>
        <div className="grid grid-cols-1 gap-3">
          {financialConcerns.map((concern) => (
            <div key={concern} className="flex items-center space-x-3">
              <Checkbox
                id={`concern-${concern}`}
                checked={financialProfile.financialConcerns?.includes(concern)}
                onCheckedChange={(checked) => {
                  const current = financialProfile.financialConcerns || [];
                  if (checked) {
                    updateFinancialProfile("financialConcerns", [...current, concern]);
                  } else {
                    updateFinancialProfile(
                      "financialConcerns",
                      current.filter((c) => c !== concern)
                    );
                  }
                }}
              />
              <Label htmlFor={`concern-${concern}`} className="cursor-pointer">{concern}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-4 flex space-x-4">
        <Button onClick={onBack} variant="outline" className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
        <Button onClick={onNext} className="flex-1 bg-gradient-primary">
          Terminer <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
