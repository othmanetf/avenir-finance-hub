
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { expenseTypes } from "./financialProfilingData";

export default function ExpensesStep({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { financialProfile, updateFinancialProfile } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4 mb-4">
        <CreditCard className="h-6 w-6 text-purple-500" />
        <div>
          <h1 className="text-2xl font-bold">Dépenses Fixes</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Quelles sont vos dépenses mensuelles fixes?
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <Label>Types de dépenses</Label>
        <div className="grid grid-cols-1 gap-3">
          {expenseTypes.map((expense) => (
            <div key={expense} className="flex items-center space-x-3">
              <Checkbox
                id={expense}
                checked={financialProfile.fixedExpenses?.includes(expense)}
                onCheckedChange={(checked) => {
                  const current = financialProfile.fixedExpenses || [];
                  if (checked) {
                    updateFinancialProfile("fixedExpenses", [...current, expense]);
                  } else {
                    updateFinancialProfile("fixedExpenses", current.filter(e => e !== expense));
                  }
                }}
              />
              <Label htmlFor={expense} className="cursor-pointer">{expense}</Label>
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
