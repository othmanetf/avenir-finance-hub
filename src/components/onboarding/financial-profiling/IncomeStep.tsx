
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { incomeRanges } from "./financialProfilingData";

export default function IncomeStep({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { financialProfile, updateFinancialProfile } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4 mb-4">
        <Wallet className="h-6 w-6 text-blue-500" />
        <div>
          <h1 className="text-2xl font-bold">Revenus Mensuels</h1>
          <p className="text-gray-500 dark:text-gray-400">Parlez-nous de vos revenus</p>
        </div>
      </div>
      <div className="space-y-4">
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
