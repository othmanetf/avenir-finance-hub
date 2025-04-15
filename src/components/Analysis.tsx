import { useState } from "react";
import { 
  ArrowUp, 
  Lightbulb, 
  FileText, 
  Trophy, 
  Award, 
  Check, 
  BarChart3,
  AlertTriangle,
  Wallet
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/use-profile";

export const Analysis = () => {
  const [selectedTab, setSelectedTab] = useState<"overview" | "tips" | "reports" | "achievements">("overview");
  const { openProfile } = useProfile();
  
  // Données d'exemple
  const financeScore = 76;
  const previousScore = 68;
  const scoreIncrease = financeScore - previousScore;
  
  const tips = [
    {
      id: 1,
      title: "Réduire les dépenses de restauration",
      description: "Vous avez dépensé 35% de plus en restaurants ce mois-ci que votre moyenne. Essayez de cuisiner plus souvent à la maison.",
      impact: "Élevé",
      impactColor: "text-red-500",
      icon: AlertTriangle
    },
    {
      id: 2,
      title: "Créer un fonds d'urgence",
      description: "Nous avons remarqué que vous n'avez pas de fonds d'urgence dédié. Envisagez d'épargner 3 à 6 mois de dépenses.",
      impact: "Moyen",
      impactColor: "text-amber-500",
      icon: Wallet
    },
    {
      id: 3,
      title: "Automatiser votre épargne",
      description: "Programmez des virements automatiques vers votre compte d'épargne le jour de paie pour constituer une épargne plus régulière.",
      impact: "Moyen",
      impactColor: "text-amber-500",
      icon: ArrowUp
    }
  ];
  
  const reports = [
    { id: 1, name: "Rapport mensuel juin 2025", date: "2 juil. 2025", size: "1,2 Mo" },
    { id: 2, name: "Rapport mensuel mai 2025", date: "3 juin 2025", size: "1,4 Mo" },
    { id: 3, name: "Rapport trimestriel T2 2025", date: "15 juil. 2025", size: "3,2 Mo", status: "En attente" }
  ];
  
  const achievements = [
    { id: 1, name: "Maître du budget", description: "Respecter votre budget pendant 3 mois consécutifs", progress: 100, icon: Check },
    { id: 2, name: "Champion de l'épargne", description: "Épargner 15% de vos revenus pendant 6 mois", progress: 67, icon: Trophy },
    { id: 3, name: "Débutant en investissement", description: "Faire votre premier investissement", progress: 100, icon: Award },
    { id: 4, name: "Destructeur de dettes", description: "Rembourser une dette importante", progress: 0, icon: Check }
  ];
  
  return (
    <div className="flex flex-col p-4 md:p-6 gap-6 md:pl-24">
      {/* En-tête avec Bienvenue et Avatar */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Analyse intelligente</p>
          <h2 className="text-xl font-bold text-foreground">Votre santé financière</h2>
        </div>
        
        <Avatar 
          className="h-12 w-12 border-2 border-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity" 
          onClick={openProfile}
        >
          <AvatarImage src="https://github.com/shadcn.png" alt="Mohamed" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </div>

      {/* Score Financier */}
      <Card className="bg-white shadow-md border-0 rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-purple-500 p-6 text-white">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-base sm:text-lg">Votre Score Financier</h3>
            <Badge className="bg-white/20 hover:bg-white/30 text-white">
              {scoreIncrease > 0 ? `+${scoreIncrease}` : scoreIncrease} pts
            </Badge>
          </div>
          
          <div className="mt-4 flex items-end gap-2">
            <span className="text-3xl sm:text-4xl font-bold">{financeScore}</span>
            <span className="text-sm opacity-80 mb-1">/ 100</span>
          </div>
          
          <div className="mt-2">
            <Progress value={financeScore} className="h-2 bg-white/30" />
          </div>
          
          <p className="mt-2 text-sm opacity-90">
            Votre score est {financeScore >= 75 ? "bon" : "en amélioration"}! 
            {scoreIncrease > 0 
              ? " Vous avez fait de grands progrès depuis le mois dernier."
              : " Continuez à travailler sur vos habitudes financières."}
          </p>
        </div>
        
        <CardContent className="p-0">
          <div className="flex border-b">
            <button 
              className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${selectedTab === "overview" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => setSelectedTab("overview")}
            >
              Aperçu
            </button>
            <button 
              className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${selectedTab === "tips" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => setSelectedTab("tips")}
            >
              Conseils
            </button>
            <button 
              className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${selectedTab === "reports" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => setSelectedTab("reports")}
            >
              Rapports
            </button>
            <button 
              className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${selectedTab === "achievements" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => setSelectedTab("achievements")}
            >
              Réussites
            </button>
          </div>
          
          {/* Contenu des onglets */}
          <div className="p-4">
            {selectedTab === "overview" && (
              <div className="space-y-4">
                <p className="text-muted-foreground">Votre score est calculé en fonction de :</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <span className="text-sm">Respect du budget</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50 hover:text-green-600">
                      Bon
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ArrowUp className="h-4 w-4 text-primary" />
                      <span className="text-sm">Taux d'épargne</span>
                    </div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-50 hover:text-amber-600">
                      Moyen
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-primary" />
                      <span className="text-sm">Gestion des dettes</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50 hover:text-green-600">
                      Bon
                    </Badge>
                  </div>
                </div>
                
                <Button className="w-full mt-4" variant="outline">Voir l'analyse détaillée</Button>
              </div>
            )}
            
            {selectedTab === "tips" && (
              <div className="space-y-4">
                {tips.map((tip) => (
                  <Card key={tip.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <tip.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{tip.title}</h4>
                            <Badge variant="outline" className={`text-xs ${tip.impactColor}`}>
                              Impact {tip.impact}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {selectedTab === "reports" && (
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="flex justify-between items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium text-sm">{report.name}</h4>
                        <p className="text-xs text-muted-foreground">{report.date} • {report.size}</p>
                      </div>
                    </div>
                    
                    {report.status ? (
                      <Badge variant="outline" className="bg-amber-50 text-amber-600">
                        {report.status}
                      </Badge>
                    ) : (
                      <Button variant="ghost" size="sm" className="text-primary">
                        Télécharger
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">Générer un rapport personnalisé</Button>
              </div>
            )}
            
            {selectedTab === "achievements" && (
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${achievement.progress === 100 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        <achievement.icon className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm">{achievement.name}</h4>
                          <span className="text-xs font-medium">{achievement.progress}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                        <Progress value={achievement.progress} className="h-1.5 mt-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analysis;
