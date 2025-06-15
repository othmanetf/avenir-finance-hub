
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { useUserData } from "@/context/UserDataContext";

export const EstimatedBalance = () => {
  const { userData, getEstimatedBalance, getTotalFixedExpenses, getTotalDebtPayments } = useUserData();
  
  const estimatedBalance = getEstimatedBalance();
  const totalFixedExpenses = getTotalFixedExpenses();
  const totalDebtPayments = getTotalDebtPayments();
  const isPositive = estimatedBalance >= 0;

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Solde Estimé</h3>
            <p className="text-sm text-muted-foreground">Revenus - Dépenses fixes</p>
          </div>
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
        
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`text-2xl font-bold ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {estimatedBalance.toLocaleString()} {userData.preferences.currency}
          </div>
          
          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Revenus mensuels:</span>
              <span className="font-medium text-green-600">
                +{userData.monthlyIncome.toLocaleString()} {userData.preferences.currency}
              </span>
            </div>
            
            {totalFixedExpenses > 0 && (
              <div className="flex justify-between">
                <span>Dépenses fixes:</span>
                <span className="font-medium text-red-600">
                  -{totalFixedExpenses.toLocaleString()} {userData.preferences.currency}
                </span>
              </div>
            )}
            
            {totalDebtPayments > 0 && (
              <div className="flex justify-between">
                <span>Remboursements dettes:</span>
                <span className="font-medium text-red-600">
                  -{totalDebtPayments.toLocaleString()} {userData.preferences.currency}
                </span>
              </div>
            )}
          </div>
        </motion.div>
        
        {!isPositive && estimatedBalance < -1000 && (
          <motion.div 
            className="bg-red-50 border border-red-200 rounded-lg p-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <p className="text-sm text-red-800">
              ⚠️ Attention: Vos dépenses dépassent vos revenus. Consultez l'onglet Analyse pour des recommandations.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
