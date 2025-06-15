import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer";
import { 
  User, 
  Mail, 
  Globe, 
  Moon, 
  Sun, 
  DollarSign, 
  Bell, 
  Fingerprint,
  Lock, 
  Shield, 
  History, 
  HelpCircle, 
  MessageCircle, 
  Save, 
  Trash2, 
  FileText,
  LogOut,
  Check
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserData } from "@/context/UserDataContext";

interface ProfilePageProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfilePage = ({ isOpen, onClose }: ProfilePageProps) => {
  const isMobile = useIsMobile();
  const { userData, updateUserData } = useUserData();
  const [localPreferences, setLocalPreferences] = useState(userData.preferences);

  const updatePreference = (key: keyof typeof userData.preferences, value: any) => {
    const newPreferences = { ...localPreferences, [key]: value };
    setLocalPreferences(newPreferences);
    updateUserData({ preferences: newPreferences });
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'fr': return 'Français';
      case 'ar': return 'العربية';
      case 'en': return 'English';
      default: return 'Français';
    }
  };

  const getCurrencyLabel = (currency: string) => {
    switch (currency) {
      case 'MAD': return 'MAD (Dirham Marocain)';
      case 'EUR': return 'EUR (Euro)';
      case 'USD': return 'USD (Dollar)';
      default: return 'MAD (Dirham Marocain)';
    }
  };

  const sections = [
    {
      title: "Préférences",
      items: [
        {
          id: "language",
          label: "Langue",
          icon: Globe,
          value: getLanguageLabel(localPreferences.language),
          action: "Modifier",
          onClick: () => console.log("Changer la langue")
        },
        {
          id: "theme",
          label: "Thème",
          icon: localPreferences.theme === "light" ? Sun : Moon,
          value: localPreferences.theme === "light" ? "Clair" : "Sombre",
          toggle: true,
          checked: localPreferences.theme === "dark",
          onChange: () => updatePreference('theme', localPreferences.theme === "light" ? "dark" : "light")
        },
        {
          id: "currency",
          label: "Devise",
          icon: DollarSign,
          value: getCurrencyLabel(localPreferences.currency),
          action: "Modifier",
          onClick: () => console.log("Changer la devise")
        },
        {
          id: "notifications",
          label: "Notifications intelligentes",
          icon: Bell,
          value: localPreferences.notifications ? "Activées" : "Désactivées",
          toggle: true,
          checked: localPreferences.notifications,
          onChange: () => updatePreference('notifications', !localPreferences.notifications)
        }
      ]
    },
    {
      title: "Sécurité",
      items: [
        {
          id: "password",
          label: "Modifier le mot de passe",
          icon: Lock,
          action: "Modifier",
          onClick: () => console.log("Modifier le mot de passe")
        },
        {
          id: "2fa",
          label: "Double authentification (2FA)",
          icon: Shield,
          value: localPreferences.twoFactorEnabled ? "Activée" : "Désactivée",
          toggle: true,
          checked: localPreferences.twoFactorEnabled,
          onChange: () => updatePreference('twoFactorEnabled', !localPreferences.twoFactorEnabled)
        },
        {
          id: "connections",
          label: "Historique des connexions",
          icon: History,
          action: "Voir",
          onClick: () => console.log("Voir l'historique")
        }
      ]
    },
    {
      title: "Assistance",
      items: [
        {
          id: "faq",
          label: "Questions fréquentes",
          icon: HelpCircle,
          action: "Consulter",
          onClick: () => console.log("Consulter la FAQ")
        },
        {
          id: "chatbot",
          label: "Chatbot d'assistance",
          icon: MessageCircle,
          action: "Démarrer",
          onClick: () => console.log("Démarrer le chatbot")
        },
        {
          id: "contact",
          label: "Contacter le support",
          icon: Mail,
          value: "support@monavenir.ma",
          action: "Envoyer",
          onClick: () => console.log("Contacter le support")
        }
      ]
    },
    {
      title: "Autres",
      items: [
        {
          id: "export",
          label: "Exporter mes données",
          icon: Save,
          action: "Exporter",
          onClick: () => console.log("Exporter les données")
        },
        {
          id: "delete",
          label: "Supprimer mon compte",
          icon: Trash2,
          action: "Supprimer",
          danger: true,
          onClick: () => console.log("Supprimer le compte")
        },
        {
          id: "legal",
          label: "Mentions légales",
          icon: FileText,
          action: "Lire",
          onClick: () => console.log("Lire les mentions légales")
        }
      ]
    }
  ];

  const firstName = userData.fullName.split(' ')[0] || 'Utilisateur';
  const initials = userData.fullName.split(' ')
    .map(name => name.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2) || 'U';

  const profileContent = (
    <div className="space-y-6">
      {/* User Card */}
      <div className="flex flex-col items-center p-4 bg-primary/5 rounded-2xl">
        <div className="relative mb-4">
          <Avatar className="h-24 w-24 border-2 border-primary/20">
            {userData.profilePicture ? (
              <AvatarImage src={userData.profilePicture} alt={firstName} />
            ) : (
              <AvatarImage src="/lovable-uploads/dbddec41-e0a6-473b-8088-5944e5f0ce16.png" alt={firstName} />
            )}
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="icon" className="absolute right-0 bottom-0 rounded-full bg-white h-8 w-8">
            <User className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="text-xl font-bold">{userData.fullName || 'Nom non défini'}</h2>
        <p className="text-sm text-muted-foreground">{userData.email || 'Email non défini'}</p>
        <div className="mt-2 text-xs text-muted-foreground">
          Revenus: {userData.monthlyIncome.toLocaleString()} {userData.preferences.currency}/mois
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div key={section.title} className="space-y-3">
          <h3 className="font-medium text-lg text-primary">{section.title}</h3>
          <div className="space-y-2 rounded-xl border overflow-hidden">
            {section.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3.5 bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    {item.value && <p className="text-xs text-muted-foreground">{item.value}</p>}
                  </div>
                </div>
                {item.toggle ? (
                  <Switch
                    checked={item.checked}
                    onCheckedChange={item.onChange}
                  />
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={item.onClick}
                    className={item.danger ? "text-red-500 hover:text-red-600 hover:bg-red-50" : ""}
                  >
                    {item.action}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button className="w-full mt-4" variant="outline">
        <LogOut className="mr-2 h-4 w-4" />
        Déconnexion
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="max-h-[90%] overflow-auto">
          <DrawerHeader className="border-b pb-4">
            <DrawerTitle className="text-center text-lg font-bold">
              Mon Compte
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 py-4 overflow-y-auto">
            {profileContent}
          </div>
          <DrawerFooter className="border-t pt-4">
            <DrawerClose asChild>
              <Button variant="default" className="w-full">
                <Check className="mr-2 h-4 w-4" />
                Fermer
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Mon Compte</DialogTitle>
        </DialogHeader>
        {profileContent}
        <DialogFooter className="sm:justify-end border-t pt-4 mt-4">
          <Button onClick={onClose}>
            <Check className="mr-2 h-4 w-4" />
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePage;
