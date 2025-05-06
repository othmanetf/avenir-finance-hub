
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Transaction = {
  name: string;
  date: string;
  amount: number;
};

type Category = {
  id: string;
  name: string;
  icon: React.ElementType;
  amount: number;
  budget: number;
  color: string;
  pieColor: string;
  progress: number;
  transactions: Transaction[];
};

type CategoryListProps = {
  title: string;
  categories: Category[];
  isIncome?: boolean;
};

export const CategoryList = ({ title, categories, isIncome = false }: CategoryListProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="space-y-2 mb-5">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        <Button variant="ghost" size="sm" className="text-xs text-[#1F6FEB] hover:text-[#1F6FEB]/80 hover:bg-accent/50">
          Voir tout
        </Button>
      </div>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <motion.div 
            key={category.id}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div 
              className="transaction-row cursor-pointer"
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
            >
              <div className="flex items-center gap-2.5">
                <div className={`category-icon ${category.color} h-10 w-10 rounded-xl flex items-center justify-center`}>
                  <category.icon className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{category.name}</span>
                  <span className="text-xs text-muted-foreground">{category.transactions.length} transactions</span>
                </div>
              </div>
              <span className={`font-semibold ${isIncome ? 'text-green-500' : 'text-red-500'} text-sm`}>
                {isIncome ? '+ ' : '- '}{category.amount.toLocaleString()} DH
              </span>
            </div>
            
            {/* Transaction Details */}
            {activeCategory === category.id && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="pl-11 pr-3 py-1.5 space-y-1 bg-gray-50 rounded-xl mt-1 mb-2 overflow-hidden"
              >
                {category.transactions.map((transaction, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <div className="flex flex-col">
                      <span className="text-sm">{transaction.name}</span>
                      <span className="text-xs text-muted-foreground">{transaction.date}</span>
                    </div>
                    <span className={`text-sm font-medium ${isIncome ? 'text-green-500' : 'text-red-500'}`}>
                      {isIncome ? '+ ' : '- '}{transaction.amount} DH
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
