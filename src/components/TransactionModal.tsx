
import { useState } from "react";
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, TrendingUp, TrendingDown, PiggyBank, Briefcase } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { fr } from 'date-fns/locale';
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

type TransactionType = "expense" | "income" | "saving" | "investment";

type TransactionCategory = {
  id: string;
  name: string;
};

const expenseCategories: TransactionCategory[] = [
  { id: "food", name: "Alimentation" },
  { id: "transport", name: "Transport" },
  { id: "housing", name: "Logement" },
  { id: "entertainment", name: "Divertissement" },
  { id: "shopping", name: "Shopping" },
  { id: "health", name: "Santé" },
  { id: "education", name: "Éducation" },
  { id: "other", name: "Autre" }
];

const incomeCategories: TransactionCategory[] = [
  { id: "salary", name: "Salaire" },
  { id: "bonus", name: "Prime" },
  { id: "gifts", name: "Cadeaux" },
  { id: "interest", name: "Intérêts" },
  { id: "freelance", name: "Freelance" },
  { id: "other", name: "Autre" }
];

const savingCategories: TransactionCategory[] = [
  { id: "emergency_fund", name: "Fonds d'urgence" },
  { id: "vacation", name: "Vacances" },
  { id: "car", name: "Voiture" },
  { id: "home", name: "Maison" },
  { id: "retirement", name: "Retraite" },
  { id: "other", name: "Autre" }
];

const investmentCategories: TransactionCategory[] = [
  { id: "stocks", name: "Actions" },
  { id: "bonds", name: "Obligations" },
  { id: "real_estate", name: "Immobilier" },
  { id: "cryptocurrency", name: "Cryptomonnaie" },
  { id: "mutual_funds", name: "Fonds communs" },
  { id: "other", name: "Autre" }
];

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransactionModal = ({ isOpen, onClose }: TransactionModalProps) => {
  const isMobile = useIsMobile();
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [comment, setComment] = useState<string>("");

  const getCategories = () => {
    switch (type) {
      case "expense":
        return expenseCategories;
      case "income":
        return incomeCategories;
      case "saving":
        return savingCategories;
      case "investment":
        return investmentCategories;
    }
  };

  const handleSubmit = () => {
    // Ici, on traiterait la soumission du formulaire
    // et on mettrait à jour l'état global de l'application
    console.log({
      type,
      category,
      amount: parseFloat(amount),
      date,
      comment
    });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setType("expense");
    setCategory("");
    setAmount("");
    setDate(new Date());
    setComment("");
  };

  const getTypeIcon = (transactionType: TransactionType) => {
    switch (transactionType) {
      case "expense":
        return <TrendingDown className="h-4 w-4" />;
      case "income":
        return <TrendingUp className="h-4 w-4" />;
      case "saving":
        return <PiggyBank className="h-4 w-4" />;
      case "investment":
        return <Briefcase className="h-4 w-4" />;
    }
  };

  const getTypeColor = (transactionType: TransactionType) => {
    switch (transactionType) {
      case "expense":
        return "bg-red-100 text-red-600 border-red-200";
      case "income":
        return "bg-green-100 text-green-600 border-green-200";
      case "saving":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "investment":
        return "bg-purple-100 text-purple-600 border-purple-200";
    }
  };

  const typeButtons = [
    { type: "expense" as TransactionType, label: "Dépense", icon: TrendingDown },
    { type: "income" as TransactionType, label: "Revenu", icon: TrendingUp },
    { type: "saving" as TransactionType, label: "Épargne", icon: PiggyBank },
    { type: "investment" as TransactionType, label: "Investissement", icon: Briefcase }
  ];

  const content = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {typeButtons.map(({ type: buttonType, label, icon: Icon }) => (
          <Button
            key={buttonType}
            type="button"
            variant="outline"
            className={cn(
              "flex flex-col items-center justify-center h-20 border-2",
              type === buttonType ? getTypeColor(buttonType) : ""
            )}
            onClick={() => {
              setType(buttonType);
              setCategory("");
            }}
          >
            <Icon className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Catégorie</Label>
        <select
          id="category"
          className="w-full h-10 px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Sélectionnez une catégorie
          </option>
          {getCategories().map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Montant (DH)</Label>
        <div className="relative">
          <Input
            id="amount"
            type="number"
            placeholder="0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-3 pr-10 border-2"
            required
          />
          <span className="absolute right-3 top-2.5 text-gray-500">DH</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date de l'opération</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal border-2"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "dd MMMM yyyy", { locale: fr }) : "Sélectionnez une date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
              locale={fr}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Commentaire (optionnel)</Label>
        <Textarea
          id="comment"
          placeholder="Ajouter un commentaire..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border-2"
        />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center text-lg font-bold">
              Nouvelle opération
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4">
            {content}
          </div>
          <DrawerFooter className="pt-4">
            <Button onClick={handleSubmit} className="w-full">Ajouter</Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Annuler</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvelle opération</DialogTitle>
        </DialogHeader>
        {content}
        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Annuler
          </Button>
          <Button onClick={handleSubmit}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
