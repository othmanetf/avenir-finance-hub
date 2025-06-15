
import { ArrowUp, ArrowDown, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useUserData } from "@/context/UserDataContext";

export const BudgetOverview = () => {
  const { userData, getTotalFixedExpenses, getTotalDebtPayments } = useUserData();
  
  const totalFixedExpenses = getTotalFixedExpenses();
  const totalDebtPayments = getTotalDebtPayments();
  const totalSpent = totalFixedExpenses + totalDebtPayments;
  const remainingBudget = Math.max(userData.monthlyIncome - totalSpent, 0);
  const progressPercentage = userData.monthlyIncome > 0 ? (totalSpent / userData.monthlyIncome) * 100 : 0;
  
  // Calculate days (assuming we're in the middle of the month for demo)
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const remainingDays = daysInMonth - currentDay;
  const dailyBudget = remainingDays > 0 ? remainingBudget / remainingDays : 0;

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Budget Mensuel</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-semibold text-[#1F6FEB]">
                {totalSpent.toLocaleString()} {userData.preferences.currency}
              </span> 
              <span className="text-sm text-muted-foreground">
                sur {userData.monthlyIncome.toLocaleString()} {userData.preferences.currency}
              </span>
            </div>
          </div>
          <Button size="icon" variant="outline" className="rounded-full h-9 w-9 border-[#1F6FEB]/20 shadow-sm flex-shrink-0">
            <Calendar className="h-4 w-4 text-[#1F6FEB]" />
          </Button>
        </div>
        
        <div className="relative pt-2 pb-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>1 {new Date().toLocaleDateString('fr-FR', { month: 'long' })}</span>
            <span>{daysInMonth} {new Date().toLocaleDateString('fr-FR', { month: 'long' })}</span>
          </div>
          
          <div className="relative mb-4">
            <Progress value={Math.min(progressPercentage, 100)} className="h-2.5 rounded-full bg-[#1F6FEB]/10" />
            <motion.div 
              className="absolute top-0 h-5 w-1 bg-[#1F6FEB] rounded-full transform -translate-y-1 shadow-sm"
              style={{ left: `${(currentDay/daysInMonth) * 100}%` }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 20 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-[#1F6FEB] text-white text-[10px] font-medium rounded-lg px-2 py-1 shadow-sm">
                Aujourd'hui
              </div>
            </motion.div>
          </div>
          
          {remainingBudget > 0 && remainingDays > 0 && (
            <motion.div 
              className="bg-[#F7F9FA] rounded-xl p-3 text-center mb-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <p className="text-sm text-foreground">
                Vous pouvez dépenser <span className="font-semibold text-[#1F6FEB]">
                {dailyBudget.toLocaleString()} {userData.preferences.currency}
                </span> par jour pour les <span className="font-semibold text-[#1F6FEB]">{remainingDays}</span> prochains jours
              </p>
            </motion.div>
          )}
          
          {progressPercentage > 100 && (
            <motion.div 
              className="bg-red-50 rounded-xl p-3 text-center mb-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <p className="text-sm text-red-800">
                ⚠️ Vous avez dépassé votre budget mensuel de <span className="font-semibold">
                {(totalSpent - userData.monthlyIncome).toLocaleString()} {userData.preferences.currency}
                </span>
              </p>
            </motion.div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2.5">
          <motion.div 
            className="stat-block flex flex-col items-start p-3.5 rounded-xl shadow-sm bg-[#E6F0FF]"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center space-x-2 mb-1.5">
              <div className="flex items-center justify-center rounded-full bg-white h-8 w-8 shadow-inner">
                <ArrowUp className="h-4 w-4 text-[#1F6FEB]" />
              </div>
              <span className="text-xs text-[#1F6FEB]/80 font-medium">Revenus</span>
            </div>
            <span className="ml-10 font-semibold text-sm">
              {userData.monthlyIncome.toLocaleString()} {userData.preferences.currency}
            </span>
          </motion.div>
          
          <motion.div 
            className="stat-block flex flex-col items-start p-3.5 rounded-xl shadow-sm bg-rose-50"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center space-x-2 mb-1.5">
              <div className="flex items-center justify-center rounded-full bg-white h-8 w-8 shadow-inner">
                <ArrowDown className="h-4 w-4 text-rose-500" />
              </div>
              <span className="text-xs text-rose-600/80 font-medium">Dépenses</span>
            </div>
            <span className="ml-10 font-semibold text-sm">
              {totalSpent.toLocaleString()} {userData.preferences.currency}
            </span>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};
