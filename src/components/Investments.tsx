import { useState } from "react";
import { 
  Wallet, 
  PiggyBank, 
  TrendingUp, 
  ChevronRight, 
  Building, 
  LineChart,
  BarChart,
  Tag,
  Info,
  ExternalLink,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfile } from "@/hooks/use-profile";

export const Investments = () => {
  const [activeTab, setActiveTab] = useState<"save" | "invest">("save");
  const { openProfile } = useProfile();
  
  // Données d'exemple
  const savingOptions = [
    {
      id: 1,
      bank: "Bank Al-Maghrib",
      logo: "🏦",
      name: "Épargne Premium",
      interest: 2.8,
      minDeposit: 1000,
      term: "1 an",
      features: ["Pas de frais de retrait", "Versements d'intérêts mensuels"]
    },
    {
      id: 2,
      bank: "Attijariwafa Bank",
      logo: "🏦",
      name: "Épargne Flexible",
      interest: 2.1,
      minDeposit: 500,
      term: "Sans durée fixe",
      features: ["Retraits illimités", "Intérêts trimestriels"]
    },
    {
      id: 3,
      bank: "BMCE Bank",
      logo: "🏦",
      name: "Compte à haut rendement",
      interest: 3.2,
      minDeposit: 5000,
      term: "2 ans",
      features: ["Pénalité de retrait anticipé", "Taux d'intérêt le plus élevé"]
    }
  ];
  
  const investmentOptions = [
    {
      id: 1,
      type: "Action",
      name: "Fonds d'indice MASI",
      ticker: "MASI",
      price: 12500,
      change: 2.4,
      graph: "📈",
      level: "Débutant",
      levelColor: "bg-green-100 text-green-600"
    },
    {
      id: 2,
      type: "ETF",
      name: "Immobilier Marocain",
      ticker: "REIT",
      price: 856,
      change: -0.8,
      graph: "📉",
      level: "Intermédiaire",
      levelColor: "bg-amber-100 text-amber-600"
    },
    {
      id: 3,
      type: "Obligation",
      name: "Trésor Public",
      ticker: "TBOND",
      price: 10000,
      change: 0.5,
      graph: "📈",
      level: "Débutant",
      levelColor: "bg-green-100 text-green-600"
    },
    {
      id: 4,
      type: "Action",
      name: "Fonds Innovation Tech",
      ticker: "TECH",
      price: 2350,
      change: 5.7,
      graph: "📈",
      level: "Avancé",
      levelColor: "bg-red-100 text-red-600"
    }
  ];
  
  return (
    <div className="flex flex-col p-4 md:p-6 gap-6 md:pl-24">
      {/* En-tête avec Bienvenue et Avatar */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Épargne & Investissements</p>
          <h2 className="text-xl font-bold text-foreground">Développez votre patrimoine</h2>
        </div>
        
        <Avatar 
          className="h-12 w-12 border-2 border-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity" 
          onClick={openProfile}
        >
          <AvatarImage src="https://github.com/shadcn.png" alt="Mohamed" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </div>

      {/* Onglets principaux */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "save" | "invest")} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="save" className="flex items-center gap-2 py-3">
            <PiggyBank className="h-4 w-4" />
            <span>Épargner</span>
          </TabsTrigger>
          <TabsTrigger value="invest" className="flex items-center gap-2 py-3">
            <TrendingUp className="h-4 w-4" />
            <span>Investir</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="save" className="space-y-6">
          <Card className="bg-white shadow-md border-0 rounded-3xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Comptes d'épargne</CardTitle>
              <CardDescription>Comparez les options d'épargne des banques marocaines</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {savingOptions.map((option) => (
                  <Card key={option.id} className="shadow-sm overflow-hidden">
                    <div className="flex p-4 border-b">
                      <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                        {option.logo}
                      </div>
                      <div className="flex-1 ml-4">
                        <p className="text-xs text-muted-foreground">{option.bank}</p>
                        <h4 className="font-medium">{option.name}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-primary">{option.interest}%</span>
                        <p className="text-xs text-muted-foreground">Intérêt annuel</p>
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
                      <Button variant="outline" size="sm" className="text-xs">
                        Voir détails
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-primary to-purple-500 text-white shadow-md border-0 rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Info className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Besoin de conseils sur l'épargne?</h3>
                  <p className="text-sm text-white/80 mt-1">Nos conseillers financiers peuvent vous aider à choisir le meilleur compte d'épargne pour vos besoins.</p>
                </div>
              </div>
              
              <Button className="mt-4 w-full bg-white text-primary hover:bg-white/90 hover:text-primary">
                Planifier une consultation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invest" className="space-y-6">
          <Card className="bg-white shadow-md border-0 rounded-3xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Opportunités d'investissement</CardTitle>
              <CardDescription>Explorez les options d'investissement sur le marché marocain</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {investmentOptions.map((option) => (
                  <Card key={option.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                          {option.type === "Action" ? (
                            <BarChart className="h-6 w-6 text-primary" />
                          ) : option.type === "ETF" ? (
                            <LineChart className="h-6 w-6 text-primary" />
                          ) : (
                            <Building className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        
                        <div className="flex-1 ml-4">
                          <div className="flex items-center gap-2">
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
                      
                      <div className="mt-3 pt-3 border-t flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <Tag className="h-4 w-4 text-primary" />
                          <span className="text-xs text-muted-foreground">Niveau de risque: {option.level}</span>
                        </div>
                        
                        <Button variant="outline" size="sm" className="text-xs">
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
          
          <Card className="bg-gradient-to-r from-secondary to-pink-500 text-white shadow-md border-0 rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Nouveau dans l'investissement?</h3>
                  <p className="text-sm text-white/80 mt-1">Commencez avec nos guides d'investissement adaptés aux débutants et nos ressources éducatives.</p>
                </div>
              </div>
              
              <Button className="mt-4 w-full bg-white text-secondary hover:bg-white/90 hover:text-secondary">
                Explorer les guides d'investissement
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Bouton d'action */}
      <div className="fixed bottom-20 right-6 z-10 md:bottom-6">
        <Button className="h-16 w-16 rounded-full bg-primary/90 shadow-lg backdrop-blur-sm hover:bg-primary transition-all border border-white/20" size="icon">
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
};

export default Investments;
