
import { motion } from "framer-motion";
import BankOption from "./BankOption";

export interface Bank {
  id: string;
  name: string;
  logo: string;
}

interface BankListProps {
  banks: Bank[];
  selectedBanks: string[];
  toggleBank: (bankId: string) => void;
}

const BankList = ({ banks, selectedBanks, toggleBank }: BankListProps) => {
  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };

  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3"
    >
      {banks.map((bank) => (
        <BankOption
          key={bank.id}
          id={bank.id}
          name={bank.name}
          logo={bank.logo}
          isSelected={selectedBanks.includes(bank.id)}
          onToggle={toggleBank}
        />
      ))}
    </motion.div>
  );
};

export default BankList;
