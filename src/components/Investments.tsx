import { useState } from "react";
import { 
  PiggyBank, 
  TrendingUp, 
  ChevronRight, 
  Building, 
  LineChart,
  BarChart,
  Tag,
  Info,
  ExternalLink,
  Plus,
  DollarSign,
  Calculator,
  Calendar,
  Phone,
  FileText,
  BookOpen,
  BookText,
  BadgePercent
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { useProfile } from "@/hooks/use-profile";
import { toast } from "sonner";
import { ConsultationForm } from "./investment/ConsultationForm";
import { InvestmentGuides } from "./investment/InvestmentGuides";
import { Icon } from "@/components/ui/icon-provider";
import { AddTransactionButton } from "./dashboard/AddTransactionButton";

export const Investments = () => {
  const [activeTab, setActiveTab] = useState<"save" | "invest">("save");
  const { openProfile } = useProfile();
  const [showConsultation, setShowConsultation] = useState(false);
  const [showGuides, setShowGuides] = useState(false);
  
  // Données réelles de banques et produits d'épargne marocains
  const savingOptions = [
    {
      id: 1,
      bank: "Attijariwafa Bank",
      logo: "/lovable-uploads/ab549ad1-6498-4f4c-9b7e-632c48c3f72b.png",
      name: "Compte sur Carnet",
      interest: 2.25,
      minDeposit: 500,
      term: "Sans durée fixe",
      features: ["Pas de frais de tenue de compte", "Retraits à tout moment", "Versements libres"]
    },
    {
      id: 2,
      bank: "BMCE Bank of Africa",
      logo: "🏦",
      name: "Plan Épargne Logement",
      interest: 3.5,
      minDeposit: 500,
      term: "3 à 5 ans",
      features: ["Constituer une épargne pour acquérir un logement", "Possibilité de crédit immobilier préférentiel"]
    },
    {
      id: 3,
      bank: "Banque Populaire",
      logo: "🏦",
      name: "Compte d'Épargne",
      interest: 2.4,
      minDeposit: 200,
      term: "Sans durée fixe",
      features: ["Intérêts calculés quotidiennement", "Versés semestriellement", "Retraits flexibles"]
    },
    {
      id: 4,
      bank: "CIH Bank",
      logo: "🏦",
      name: "e-Épargne",
      interest: 2.8,
      minDeposit: 100,
      term: "Sans durée fixe",
      features: ["Gestion 100% digitale", "Alimentations automatiques programmées", "Intérêts calculés quotidiennement"]
    },
    {
      id: 5,
      bank: "Crédit Agricole",
      logo: "🏦",
      name: "Plan Épargne Éducation",
      interest: 3.2,
      minDeposit: 300,
      term: "5 à 10 ans",
      features: ["Financer les études de vos enfants", "Garantie en cas de décès", "Versements flexibles"]
    }
  ];
  
  // Données réelles d'investissements marocains
  const investmentOptions = [
    {
      id: 1,
      type: "ETF",
      name: "AMMC MASI Tracker",
      ticker: "MASI",
      price: 13252,
      change: 2.1,
      description: "Réplique l'indice MASI de la Bourse de Casablanca",
      level: "Débutant",
      levelColor: "bg-green-100 text-green-600"
    },
    {
      id: 2,
      type: "ETF",
      name: "Casablanca Dividendes",
      ticker: "DIVS",
      price: 4380,
      change: 1.8,
      description: "ETF concentré sur les sociétés marocaines versant des dividendes élevés",
      level: "Débutant",
      levelColor: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      type: "ETF",
      name: "Immobilier Coté Marocain",
      ticker: "REIT",
      price: 885,
      change: -0.7,
      description: "Exposition aux sociétés immobilières cotées au Maroc",
      level: "Intermédiaire",
      levelColor: "bg-amber-100 text-amber-600"
    },
    {
      id: 4,
      type: "Obligation",
      name: "Bons du Trésor 5 ans",
      ticker: "BDT5Y",
      price: 10000,
      change: 0.5,
      description: "Bons du Trésor marocain avec un taux fixe sur 5 ans",
      level: "Débutant",
      levelColor: "bg-green-100 text-green-600"
    },
    {
      id: 5,
      type: "Obligation",
      name: "Sukuk Souverain",
      ticker: "SKMAR",
      price: 5000,
      change: 0.9,
      description: "Certificats d'investissement conformes à la finance islamique",
      level: "Débutant",
      levelColor: "bg-green-100 text-green-600"
    },
    {
      id: 6,
      type: "ETF",
      name: "Afrique MSCI",
      ticker: "AFMSCI",
      price: 2780,
      change: 3.2,
      description: "Exposition aux marchés africains en croissance",
      level: "Intermédiaire",
      levelColor: "bg-amber-100 text-amber-600"
    },
    {
      id: 7,
      type: "ETF",
      name: "Maroc Énergie Renouvelable",
      ticker: "ENRMAR",
      price: 1950,
      change: 5.3,
      description: "Exposition aux entreprises marocaines du secteur des énergies renouvelables",
      level: "Intermédiaire",
      levelColor: "bg-amber-100 text-amber-600"
    }
  ];

  const handleBookConsultation = () => {
    setShowConsultation(true);
  };

  const handleExploreGuides = () => {
    setShowGuides(true);
  };

  const handleAddTransaction = () => {
    toast.info("Créez un nouvel objectif d'épargne ou d'investissement", {
      description: "Cette fonctionnalité sera bientôt disponible",
      action: {
        label: "Rappel",
        onClick: () => toast.success("Nous vous préviendrons dès que cette fonctionnalité sera disponible")
      }
    })
  };
  
  return (
    <div className="flex flex-col p-4 md:p-6 gap-4 md:gap-6 md:pl-24 mb-20 md:mb-6">
      {/* En-tête avec Bienvenue et Avatar */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Épargne & Investissements</p>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Développez votre patrimoine</h2>
        </div>
        
        <Avatar 
          className="h-10 w-10 md:h-12 md:w-12 border-2 border-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity" 
          onClick={openProfile}
        >
          <AvatarImage src="/lovable-uploads/69b09907-4fdb-4696-8de1-ac20da10f2bc.png" alt="Mohamed" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </div>

      {/* Onglets principaux */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "save" | "invest")} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 md:mb-6 w-full max-w-md mx-auto bg-muted/80 p-1 rounded-full">
          <TabsTrigger 
            value="save" 
            className="flex items-center gap-2 py-3 px-4 rounded-full transition-all data-[state=active]:shadow-sm"
          >
            <PiggyBank className="h-4 w-4" />
            <span>Épargner</span>
          </TabsTrigger>
          <TabsTrigger 
            value="invest" 
            className="flex items-center gap-2 py-3 px-4 rounded-full transition-all data-[state=active]:shadow-sm"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Investir</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="save" className="space-y-4 md:space-y-6 animate-fade-in">
          <Card className="bg-white shadow-md border-0 rounded-3xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg md:text-xl">Comptes d'épargne</CardTitle>
              <CardDescription>Comparez les options d'épargne des banques marocaines</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {savingOptions.map((option) => (
                  <Card key={option.id} className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="flex p-4 border-b items-center">
                      <div className="flex-shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                        <PiggyBank className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 ml-3 md:ml-4">
                        <p className="text-xs text-muted-foreground">{option.bank}</p>
                        <h4 className="font-medium">{option.name}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-base md:text-lg font-bold text-primary">{option.interest}%</span>
                        <div className="flex items-center gap-1 justify-end">
                          <Info className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Intérêt annuel</p>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 pt-3 space-y-3">
                      <div className="flex flex-wrap gap-2 text-xs">
                        <Badge variant="outline" className="bg-gray-50">
                          Min: {option.minDeposit} DH
                        </Badge>
                        <Badge variant="outline" className="bg-gray-50">
                          Durée: {option.term}
                        </Badge>
                      </div>
                      
                      <ul className="space-y-1">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="text-xs flex items-start gap-1.5">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter className="p-3 pt-0 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => toast.info(`Découvrez plus sur ${option.name} de ${option.bank}`)}
                      >
                        Voir détails
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-primary to-secondary text-white shadow-md border-0 rounded-3xl">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Besoin de conseils sur l'épargne?</h3>
                  <p className="text-sm text-white/80 mt-1">Nos conseillers financiers peuvent vous aider à choisir le meilleur compte d'épargne pour vos besoins.</p>
                </div>
              </div>
              
              <Button 
                className="mt-4 w-full bg-white text-primary hover:bg-white/90 hover:text-primary"
                onClick={handleBookConsultation}
              >
                <Phone className="h-4 w-4 mr-2" />
                Planifier une consultation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invest" className="space-y-4 md:space-y-6 animate-fade-in">
          <Card className="bg-white shadow-md border-0 rounded-3xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg md:text-xl">Opportunités d'investissement</CardTitle>
              <CardDescription>Explorez les options d'investissement sur le marché marocain</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {investmentOptions.map((option) => (
                  <Card key={option.id} className="shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                          {option.type === "ETF" ? (
                            <LineChart className="h-6 w-6 text-primary" />
                          ) : option.type === "Action" ? (
                            <BarChart className="h-6 w-6 text-primary" />
                          ) : (
                            <BadgePercent className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        
                        <div className="flex-1 ml-3 md:ml-4">
                          <div className="flex items-center flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              {option.type}
                            </Badge>
                            <Badge variant="outline" className={`text-xs ${option.levelColor}`}>
                              {option.level}
                            </Badge>
                          </div>
                          <h4 className="font-medium mt-1">{option.name}</h4>
                          <p className="text-xs text-muted-foreground">{option.ticker}</p>
                        </div>
                        
                        <div className="text-right">
                          <span className="font-bold">{option.price.toLocaleString()} DH</span>
                          <p className={`text-xs ${option.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {option.change >= 0 ? '+' : ''}{option.change}%
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-2">{option.description}</p>
                      
                      <div className="mt-3 pt-3 border-t flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <Tag className="h-4 w-4 text-primary" />
                          <span className="text-xs text-muted-foreground">Niveau de risque: {option.level}</span>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => toast.info(`Plus d'informations sur ${option.name} (${option.ticker})`)}
                        >
                          En savoir plus
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-primary to-secondary text-white shadow-md border-0 rounded-3xl">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <BookText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Nouveau dans l'investissement?</h3>
                  <p className="text-sm text-white/80 mt-1">Commencez avec nos guides d'investissement adaptés aux débutants et nos ressources éducatives.</p>
                </div>
              </div>
              
              <Button 
                className="mt-4 w-full bg-white text-primary hover:bg-white/90 hover:text-primary"
                onClick={handleExploreGuides}
              >
                <FileText className="h-4 w-4 mr-2" />
                Explorer les guides d'investissement
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Composants de dialogue pour les fonctionnalités */}
      <Dialog open={showConsultation} onOpenChange={setShowConsultation}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle>Planifier une consultation financière</DialogTitle>
            <DialogDescription>
              Prenez rendez-vous avec l'un de nos conseillers financiers pour discuter de vos objectifs d'épargne.
            </DialogDescription>
          </DialogHeader>
          <ConsultationForm onClose={() => setShowConsultation(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showGuides} onOpenChange={setShowGuides}>
        <DialogContent className="max-w-4xl rounded-xl">
          <DialogHeader>
            <DialogTitle>Guides d'investissement</DialogTitle>
            <DialogDescription>
              Ressources pour comprendre et maîtriser l'investissement au Maroc
            </DialogDescription>
          </DialogHeader>
          <InvestmentGuides onClose={() => setShowGuides(false)} />
        </DialogContent>
      </Dialog>
      
      {/* Bouton d'action */}
      <AddTransactionButton onClick={handleAddTransaction} />
    </div>
  );
};

export default Investments;
