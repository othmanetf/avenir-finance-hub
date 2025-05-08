
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
        className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-white shadow-md cursor-pointer hover:opacity-90 transition-opacity" 
        onClick={openProfile}
      >
        <AvatarImage src="/lovable-uploads/00f8cbcf-bc0c-4f7a-b176-88f2c04a328a.png" alt="Mohamed" />
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
    </motion.div>
  );
};
