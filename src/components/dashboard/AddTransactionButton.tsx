
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
        className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg backdrop-blur-sm hover:opacity-90 transition-all border border-white/20" 
        size="icon"
        onClick={onClick}
      >
        <Plus className="h-7 w-7" />
      </Button>
    </motion.div>
  );
};
