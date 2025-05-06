
import { ArrowUp, ArrowDown, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

type BudgetOverviewProps = {
  budgetData: {
    totalBudget: number;
    spent: number;
    income: number;
    expenses: number;
    remainingDays: number;
    dailyBudget: number;
    progressPercentage: number;
  };
  currentDay: number;
  lastDay: number;
};

export const BudgetOverview = ({ budgetData, currentDay, lastDay }: BudgetOverviewProps) => {
  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Dépenses Mensuelles</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-semibold text-[#1F6FEB]">{budgetData.spent.toLocaleString()} DH</span> 
              <span className="text-sm text-muted-foreground">sur {budgetData.totalBudget.toLocaleString()} DH</span>
            </div>
          </div>
          <Button size="icon" variant="outline" className="rounded-full h-9 w-9 border-[#1F6FEB]/20 shadow-sm">
            <Calendar className="h-4 w-4 text-[#1F6FEB]" />
          </Button>
        </div>
        
        <div className="relative pt-4 pb-3">
          {/* Progress Bar with Clean Design */}
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>1 Juin</span>
            <span>30 Juin</span>
          </div>
          
          <div className="relative mb-5">
            <Progress value={budgetData.progressPercentage} className="h-2.5 rounded-full bg-[#1F6FEB]/10" />
            <motion.div 
              className="absolute top-0 h-5 w-1 bg-[#1F6FEB] rounded-full transform -translate-y-1 shadow-sm"
              style={{ left: `${(currentDay/lastDay) * 100}%` }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 20 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-[#1F6FEB] text-white text-[10px] font-medium rounded-lg px-2 py-1 shadow-sm">
                Aujourd'hui
              </div>
            </motion.div>
          </div>
          
          {/* Daily Budget Message */}
          <motion.div 
            className="bg-[#F7F9FA] rounded-xl p-3.5 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <p className="text-sm text-foreground">
              Vous pouvez dépenser <span className="font-semibold text-[#1F6FEB]">{budgetData.dailyBudget.toLocaleString()} DH</span> par jour pour les <span className="font-semibold text-[#1F6FEB]">{budgetData.remainingDays}</span> prochains jours
            </p>
          </motion.div>
        </div>
        
        {/* Revenue and Expense Stats - Mobile optimized */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div 
            className="stat-block flex items-center justify-between p-4 rounded-xl shadow-sm bg-[#E6F0FF]"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center rounded-full bg-white h-10 w-10 shadow-inner">
                <ArrowUp className="h-4 w-4 text-[#1F6FEB]" />
              </div>
              <div>
                <span className="block text-xs text-[#1F6FEB]/80 font-medium mb-0.5">Revenus</span>
                <span className="font-semibold text-sm md:text-base">{budgetData.income.toLocaleString()} DH</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="stat-block flex items-center justify-between p-4 rounded-xl shadow-sm bg-rose-50"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center rounded-full bg-white h-10 w-10 shadow-inner">
                <ArrowDown className="h-4 w-4 text-rose-500" />
              </div>
              <div>
                <span className="block text-xs text-rose-600/80 font-medium mb-0.5">Dépenses</span>
                <span className="font-semibold text-sm md:text-base">{budgetData.expenses.toLocaleString()} DH</span>
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};
