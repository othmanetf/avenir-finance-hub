
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { History } from "lucide-react";

type SpendingWidgetProps = {
  totalBudget: number;
  spent: number;
  dailyBudget: number;
  daysLeft: number;
  progressValue: number;
}

export function SpendingWidget({
  totalBudget,
  spent,
  dailyBudget,
  daysLeft,
  progressValue
}: SpendingWidgetProps) {
  return (
    <Card className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 shadow-md border-0 rounded-3xl overflow-hidden">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Monthly Spending</h2>
          <Badge variant="outline" className="bg-gray-800 text-white border-0 flex gap-1 items-center">
            <History className="h-3 w-3" /> History
          </Badge>
        </div>
        
        <motion.div 
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-3xl font-bold">${spent.toFixed(2)}</span>
          <span className="text-gray-500">left of ${totalBudget}</span>
        </motion.div>

        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Jul. 1</span>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-black text-white text-xs px-2 py-0.5 rounded-full"
            >
              Today
            </motion.div>
            <span>Jul. 31</span>
          </div>
          
          <div className="relative">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progressValue}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Progress value={progressValue} className="h-4 rounded-full" />
            </motion.div>
          </div>
        </div>
        
        <motion.p 
          className="text-gray-500 text-center text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          You can keep spending ${dailyBudget.toFixed(2)} for {daysLeft} more days
        </motion.p>
      </CardContent>
    </Card>
  );
}
