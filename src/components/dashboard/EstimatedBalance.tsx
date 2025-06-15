
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

type EstimatedBalanceProps = {
  estimatedBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
};

export const EstimatedBalance = ({ 
  estimatedBalance, 
  monthlyIncome, 
  monthlyExpenses 
}: EstimatedBalanceProps) => {
  const isPositive = estimatedBalance >= 0;
  const balancePercentage = monthlyIncome > 0 ? Math.abs((estimatedBalance / monthlyIncome) * 100) : 0;

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">Solde Estimé</h3>
          <div className={`flex items-center justify-center rounded-full h-10 w-10 ${
            isPositive ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {isPositive ? (
              <TrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Revenus mensuels</span>
            <span className="font-medium text-green-600">+{monthlyIncome.toLocaleString()} DH</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Dépenses mensuelles</span>
            <span className="font-medium text-red-600">-{monthlyExpenses.toLocaleString()} DH</span>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Solde restant</span>
              <span className={`text-lg font-bold ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositive ? '+' : ''}{estimatedBalance.toLocaleString()} DH
              </span>
            </div>
          </div>

          <motion.div 
            className={`rounded-lg p-3 text-center text-sm ${
              isPositive 
                ? 'bg-green-50 text-green-700' 
                : 'bg-red-50 text-red-700'
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {isPositive ? (
              <>
                Excellent ! Vous économisez{' '}
                <span className="font-semibold">{balancePercentage.toFixed(0)}%</span>{' '}
                de vos revenus ce mois-ci.
              </>
            ) : (
              <>
                Attention : Vos dépenses dépassent vos revenus de{' '}
                <span className="font-semibold">{balancePercentage.toFixed(0)}%</span>.
              </>
            )}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};
