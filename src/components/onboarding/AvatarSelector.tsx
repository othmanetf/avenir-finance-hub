
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface AvatarSelectorProps {
  profilePicture: string | null;
  onSelectPicture: (picture: string) => void;
}

const defaultAvatars = [
  "/lovable-uploads/451a0f05-c9c4-4985-a6a4-d0e441d1e0d2.png",
  "/lovable-uploads/de74a85e-1f8f-433f-bac9-bb3e92a8087a.png",
  // Add more default avatars here
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
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Avatar className="h-24 w-24 cursor-pointer" onClick={() => setShowAvatarOptions(true)}>
          {profilePicture ? (
            <AvatarImage src={profilePicture} alt="Selected avatar" />
          ) : (
            <AvatarFallback className="bg-gradient-to-r from-[#1F6FEB] to-[#8E44AD] text-white text-xl">
              M+
            </AvatarFallback>
          )}
        </Avatar>
        <button 
          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-[#1F6FEB] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setShowAvatarOptions(true)}
        >
          <Camera className="h-4 w-4 text-white" />
        </button>
      </motion.div>

      {showAvatarOptions && (
        <motion.div 
          className="absolute top-full mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-72 z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="text-sm font-medium mb-3">Choisir un avatar</div>
          
          <div className="grid grid-cols-3 gap-2 mb-3">
            {defaultAvatars.map((avatar, index) => (
              <Avatar 
                key={index} 
                className="h-16 w-16 cursor-pointer hover:ring-2 hover:ring-[#1F6FEB] transition-all"
                onClick={() => selectDefaultAvatar(avatar)}
              >
                <AvatarImage src={avatar} alt={`Avatar option ${index + 1}`} />
              </Avatar>
            ))}
          </div>
          
          <div className="flex flex-col space-y-2">
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
      )}
    </div>
  );
};

export default AvatarSelector;
