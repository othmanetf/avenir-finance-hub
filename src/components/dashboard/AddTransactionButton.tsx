
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type AddTransactionButtonProps = {
  onClick: () => void;
};

export const AddTransactionButton = ({ onClick }: AddTransactionButtonProps) => {
  return (
    <motion.div 
      className="fixed bottom-20 right-4 sm:right-5 z-10 md:bottom-6"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button 
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#1F6FEB] shadow-lg hover:shadow-xl hover:bg-[#1F6FEB]/90 transition-all" 
        size="icon"
        onClick={onClick}
      >
        <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </Button>
    </motion.div>
  );
};
