
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useUserData } from "@/context/UserDataContext";

type DashboardHeaderProps = {
  openProfile: () => void;
};

export const DashboardHeader = ({ openProfile }: DashboardHeaderProps) => {
  const { userData } = useUserData();
  
  const firstName = userData.fullName.split(' ')[0] || 'Utilisateur';
  const initials = userData.fullName.split(' ')
    .map(name => name.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2) || 'U';

  return (
    <motion.div 
      className="flex justify-between items-center mb-6" 
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col">
        <p className="text-sm text-muted-foreground">Bienvenue</p>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">{firstName}</h2>
      </div>
      
      <Avatar 
        className="h-16 w-16 sm:h-18 sm:w-18 border-2 border-white shadow-md cursor-pointer hover:opacity-90 transition-opacity" 
        onClick={openProfile}
      >
        {userData.profilePicture ? (
          <AvatarImage src={userData.profilePicture} alt={firstName} />
        ) : (
          <AvatarImage src="/lovable-uploads/dbddec41-e0a6-473b-8088-5944e5f0ce16.png" alt={firstName} />
        )}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </motion.div>
  );
};
