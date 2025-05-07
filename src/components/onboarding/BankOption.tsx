
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BankOptionProps {
  id: string;
  name: string;
  logo: string;
  isSelected: boolean;
  onToggle: (bankId: string) => void;
}

const BankOption = ({ id, name, logo, isSelected, onToggle }: BankOptionProps) => {
  return (
    <motion.div 
      className={cn(
        "flex items-center space-x-3 border rounded-xl p-3 cursor-pointer transition-all duration-200",
        isSelected 
          ? "border-[#1F6FEB] bg-[#1F6FEB]/5" 
          : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
      )}
      onClick={() => onToggle(id)}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center p-1 overflow-hidden">
        <img src={logo} alt={name} className="max-h-10 max-w-full object-contain" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm md:text-base">{name}</p>
      </div>
      <div className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center", 
        isSelected 
          ? "bg-[#1F6FEB] text-white" 
          : "bg-gray-100 text-gray-400 dark:bg-gray-700"
      )}>
        {isSelected ? (
          <Check className="h-4 w-4" />
        ) : (
          <div className="w-3 h-3" />
        )}
      </div>
    </motion.div>
  );
};

export default BankOption;
