
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AvatarSelectorProps {
  profilePicture: string | null;
  onSelectPicture: (picture: string) => void;
}

const defaultAvatars = [
  "/lovable-uploads/dbddec41-e0a6-473b-8088-5944e5f0ce16.png",
  "/lovable-uploads/de74a85e-1f8f-433f-bac9-bb3e92a8087a.png",
  "/lovable-uploads/69b09907-4fdb-4696-8de1-ac20da10f2bc.png",
  "/lovable-uploads/ab549ad1-6498-4f4c-9b7e-632c48c3f72b.png",
  "/lovable-uploads/f0ec1277-c7c9-4a7f-8544-0789cdc4eb4b.png",
];

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ profilePicture, onSelectPicture }) => {
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);

  const handleUploadPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onSelectPicture(event.target.result as string);
          setShowAvatarOptions(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const selectDefaultAvatar = (avatarUrl: string) => {
    onSelectPicture(avatarUrl);
    setShowAvatarOptions(false);
  };

  return (
    <div className="flex flex-col items-center relative">
      <motion.div 
        className="relative"
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Avatar className="h-24 w-24 cursor-pointer border-2 border-white shadow-md" onClick={() => setShowAvatarOptions(true)}>
          {profilePicture ? (
            <AvatarImage src={profilePicture} alt="Selected avatar" />
          ) : (
            <AvatarFallback className="bg-gradient-to-r from-[#1F6FEB] to-[#8E44AD] text-white text-xl">
              M+
            </AvatarFallback>
          )}
        </Avatar>
        <button 
          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-[#1F6FEB] flex items-center justify-center cursor-pointer hover:bg-[#1a5fd0] transition-colors shadow-md"
          onClick={() => setShowAvatarOptions(true)}
          type="button"
        >
          <Camera className="h-4 w-4 text-white" />
        </button>
      </motion.div>

      <AnimatePresence>
        {showAvatarOptions && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 md:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAvatarOptions(false)}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 w-full max-w-sm"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-lg font-medium mb-3">Choisir un avatar</div>
              
              <div className="grid grid-cols-5 gap-3 mb-5">
                {defaultAvatars.map((avatar, index) => (
                  <Avatar 
                    key={index} 
                    className={cn(
                      "h-12 w-12 cursor-pointer transition-all",
                      "hover:scale-110 hover:shadow-md",
                      "focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:ring-offset-2"
                    )}
                    onClick={() => selectDefaultAvatar(avatar)}
                  >
                    <AvatarImage src={avatar} alt={`Avatar option ${index + 1}`} />
                  </Avatar>
                ))}
              </div>
              
              <div className="flex flex-col space-y-3">
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                  >
                    Télécharger une photo
                  </Button>
                  <input 
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadPicture}
                  />
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setShowAvatarOptions(false)}
                >
                  Annuler
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarSelector;
