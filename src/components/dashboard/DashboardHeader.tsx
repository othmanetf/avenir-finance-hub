
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

type DashboardHeaderProps = {
  openProfile: () => void;
};

export const DashboardHeader = ({ openProfile }: DashboardHeaderProps) => {
  return (
    <motion.div 
      className="flex justify-between items-center mb-6" 
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col">
        <p className="text-sm text-muted-foreground">Bienvenue</p>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Mohamed</h2>
      </div>
      
      <Avatar 
        className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-white shadow-md cursor-pointer hover:opacity-90 transition-opacity" 
        onClick={openProfile}
      >
        <AvatarImage src="https://github.com/shadcn.png" alt="Mohamed" />
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
    </motion.div>
  );
};
