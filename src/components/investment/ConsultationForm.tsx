
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, Check } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ConsultationFormProps {
  onClose: () => void;
}

export const ConsultationForm = ({ onClose }: ConsultationFormProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consultationType, setConsultationType] = useState("epargne");
  const [timeSlot, setTimeSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot || !name || !phone || !email) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSubmitting(true);
    
    // Simuler une API call
    setTimeout(() => {
      toast.success("Consultation planifiée avec succès", {
        description: `Rendez-vous le ${format(date, 'P', { locale: fr })} à ${timeSlot}`,
        icon: <Check className="h-4 w-4 text-green-500" />,
      });
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 neuro-card p-6 dark:bg-gray-800">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground/90">Nom complet</Label>
        <Input 
          id="name" 
          placeholder="Mohamed El Fassi" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded-xl shadow-neuro-sm dark:shadow-neuro-sm-dark focus:shadow-none transition-all duration-300"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground/90">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="mohamed@example.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-xl shadow-neuro-sm dark:shadow-neuro-sm-dark focus:shadow-none transition-all duration-300"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-foreground/90">Téléphone</Label>
        <Input 
          id="phone" 
          placeholder="06 XX XX XX XX" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)}
          required
          className="rounded-xl shadow-neuro-sm dark:shadow-neuro-sm-dark focus:shadow-none transition-all duration-300"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-foreground/90">Type de consultation</Label>
        <Select value={consultationType} onValueChange={setConsultationType}>
          <SelectTrigger className="rounded-xl shadow-neuro-sm dark:shadow-neuro-sm-dark focus:shadow-none transition-all duration-300">
            <SelectValue placeholder="Sélectionnez le type de consultation" />
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-md">
            <SelectItem value="epargne">Épargne</SelectItem>
            <SelectItem value="investissement">Investissement</SelectItem>
            <SelectItem value="retraite">Planification de retraite</SelectItem>
            <SelectItem value="impots">Optimisation fiscale</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-foreground/90">Date du rendez-vous</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal rounded-xl shadow-neuro-sm dark:shadow-neuro-sm-dark hover:shadow-none transition-all duration-300"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-monavenir-blue" />
                {date ? format(date, 'P', { locale: fr }) : <span>Choisir une date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-xl shadow-md">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => 
                  date < new Date() || 
                  date.getDay() === 0 || 
                  date.getDay() === 6
                }
                initialFocus
                className="rounded-xl"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label className="text-foreground/90">Heure</Label>
          <Select value={timeSlot} onValueChange={setTimeSlot}>
            <SelectTrigger className="rounded-xl shadow-neuro-sm dark:shadow-neuro-sm-dark focus:shadow-none transition-all duration-300">
              <SelectValue placeholder="Choisir l'heure">
                {timeSlot ? (
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-monavenir-blue" />
                    {timeSlot}
                  </div>
                ) : (
                  "Choisir l'heure"
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-md">
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          className="rounded-xl shadow-neuro-sm dark:shadow-neuro-sm-dark hover:shadow-none transition-all duration-300"
        >
          Annuler
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="rounded-xl bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          {isSubmitting ? "Confirmation en cours..." : "Confirmer le rendez-vous"}
        </Button>
      </div>
    </form>
  );
};
