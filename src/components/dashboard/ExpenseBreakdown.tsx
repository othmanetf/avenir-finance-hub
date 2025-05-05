
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type Transaction = {
  name: string;
  date: string;
  amount: number;
}

type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
  amount: number;
  budget?: number;
  color: string;
  accent?: string;
  progress?: number;
  transactions: Transaction[];
}

type ExpenseBreakdownProps = {
  categories: Category[];
  activeCategory: string | null;
  setActiveCategory: (id: string | null) => void;
}

export function ExpenseBreakdown({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}: ExpenseBreakdownProps) {
  return (
    <Card className="bg-white shadow-md border-0 rounded-3xl overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Expense Breakdown</span>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            See All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 px-4 sm:px-6">
        {categories.map((category, idx) => (
          <div key={category.id} className="mb-2">
            <motion.div 
              className="cursor-pointer rounded-2xl hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.01 }}
              onClick={() => setActiveCategory(
                activeCategory === category.id ? null : category.id
              )}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`${category.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-sm`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-xs text-gray-500">
                      {category.transactions.length} transaction{category.transactions.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-500">
                    ${category.amount.toFixed(2)}
                  </p>
                  {category.budget && (
                    <p className="text-xs text-gray-500">
                      / ${category.budget}
                    </p>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              {category.progress && (
                <div className="px-4 pb-3">
                  <Progress 
                    value={category.progress} 
                    className="h-1.5 bg-gray-100"
                    indicatorClassName={category.accent ? category.accent : "bg-blue-500"}
                  />
                </div>
              )}
            </motion.div>

            {/* Expanded transactions */}
            <AnimatePresence>
              {activeCategory === category.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-50 rounded-xl mx-2 mb-2">
                    <div className="px-4 py-1 space-y-2">
                      {category.transactions.map((transaction, idx) => (
                        <div 
                          key={`${category.id}-transaction-${idx}`}
                          className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                        >
                          <div>
                            <p className="text-sm font-medium">{transaction.name}</p>
                            <p className="text-xs text-gray-500">{transaction.date}</p>
                          </div>
                          <p className="text-sm font-medium text-red-500">
                            -${transaction.amount.toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
