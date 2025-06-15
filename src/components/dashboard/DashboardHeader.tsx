
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
        className="h-16 w-16 sm:h-18 sm:w-18 border-2 border-white shadow-md cursor-pointer hover:opacity-90 transition-opacity" 
        onClick={openProfile}
      >
        <AvatarImage src="/lovable-uploads/dbddec41-e0a6-473b-8088-5944e5f0ce16.png" alt="Mohamed" />
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
    </motion.div>
  );
};
