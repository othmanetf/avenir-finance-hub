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
  Wallet,
  Download,
  FileBarChart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/use-profile";
import { cn } from "@/lib/utils";

export const Analysis = () => {
  const [selectedTab, setSelectedTab] = useState<"overview" | "tips" | "reports" | "achievements">("overview");
  const { openProfile } = useProfile();
  
  // Données d'exemple
  const financeScore = 76;
  const previousScore = 68;
  const scoreIncrease = financeScore - previousScore;

  // Fonction pour générer la couleur du gradient en fonction du score
  const getScoreColor = (score: number) => {
    // Du rouge (0) au jaune (50) au vert (100)
    if (score < 50) {
      // Rouge à jaune
      const redValue = 255;
      const greenValue = Math.round((score / 50) * 255);
      return `rgb(${redValue}, ${greenValue}, 60)`;
    } else {
      // Jaune à vert
      const redValue = Math.round(255 - ((score - 50) / 50) * 255);
      const greenValue = 255;
      return `rgb(${redValue}, ${greenValue}, 60)`;
    }
  };

  const gradientStyle = {
    background: `linear-gradient(90deg, #ff5757 0%, #ffbd59 50%, #7ed957 100%)`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
  };
  
  const tips = [
    {
      id: 1,
      title: "Réduire les dépenses de restauration",
      description: "Vous avez dépensé 35% de plus en restaurants ce mois-ci que votre moyenne. Essayez de cuisiner plus souvent à la maison.",
      impact: "Élevé",
      impactColor: "text-red-500 bg-red-50",
      icon: AlertTriangle
    },
    {
      id: 2,
      title: "Créer un fonds d'urgence",
      description: "Nous avons remarqué que vous n'avez pas de fonds d'urgence dédié. Envisagez d'épargner 3 à 6 mois de dépenses.",
      impact: "Moyen",
      impactColor: "text-amber-500 bg-amber-50",
      icon: Wallet
    },
    {
      id: 3,
      title: "Automatiser votre épargne",
      description: "Programmez des virements automatiques vers votre compte d'épargne le jour de paie pour constituer une épargne plus régulière.",
      impact: "Moyen",
      impactColor: "text-amber-500 bg-amber-50",
      icon: ArrowUp
    }
  ];
  
  const reports = [
    { id: 1, name: "Rapport mensuel juin 2025", date: "2 juil. 2025", size: "1,2 Mo", status: "" },
    { id: 2, name: "Rapport mensuel mai 2025", date: "3 juin 2025", size: "1,4 Mo", status: "" },
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
          className="h-16 w-16 sm:h-18 sm:w-18 border-2 border-white shadow-md cursor-pointer hover:opacity-90 transition-opacity" 
          onClick={openProfile}
        >
          <AvatarImage src="/lovable-uploads/dbddec41-e0a6-473b-8088-5944e5f0ce16.png" alt="Mohamed" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </div>

      {/* Score Financier - Maintenant avec une couleur unie au lieu du dégradé */}
      <Card className="bg-white shadow-md border-0 rounded-3xl overflow-hidden animate-fade-in">
        <div className="bg-primary p-4 sm:p-6 text-white">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-base sm:text-lg">Votre Score Financier</h3>
            <Badge className="bg-white/20 hover:bg-white/30 text-white">
              {scoreIncrease > 0 ? `+${scoreIncrease}` : scoreIncrease} pts
            </Badge>
          </div>
          
          <div className="mt-4 flex flex-col">
            <div className="flex items-center justify-center mb-2">
              <span className="text-4xl sm:text-5xl font-bold text-white">{financeScore}</span>
              <span className="text-sm opacity-80 ml-2 self-end mb-2">/&nbsp;100</span>
            </div>
            
            <div className="relative w-full h-4 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${financeScore}%`,
                  background: `linear-gradient(90deg, #ff5757 0%, #ffbd59 50%, #7ed957 100%)`
                }}
              ></div>
            </div>
          </div>
          
          <p className="mt-3 text-sm opacity-90 text-center">
            Votre score est {financeScore >= 75 ? "bon" : "en amélioration"}! 
            {scoreIncrease > 0 
              ? " Vous avez fait de bons progrès depuis le mois dernier."
              : " Continuez à travailler sur vos habitudes financières."}
          </p>
        </div>
        
        <CardContent className="p-0">
          <div className="flex flex-wrap border-b">
            {[
              { id: "overview", label: "Aperçu" },
              { id: "tips", label: "Conseils" },
              { id: "reports", label: "Rapports" },
              { id: "achievements", label: "Réussites" }
            ].map((tab) => (
              <button 
                key={tab.id}
                className={`flex-1 py-3 text-center text-xs sm:text-sm font-medium transition-colors ${
                  selectedTab === tab.id 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setSelectedTab(tab.id as any)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Contenu des onglets */}
          <div className="p-4 animate-fade-in">
            {selectedTab === "overview" && (
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm text-center mb-4">Votre score est calculé en fonction de :</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Respect du budget</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50 hover:text-green-600">
                      Bon
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <ArrowUp className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Taux d'épargne</span>
                    </div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-50 hover:text-amber-600">
                      Moyen
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Wallet className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Gestion des dettes</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50 hover:text-green-600">
                      Bon
                    </Badge>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  variant="outline"
                  onClick={() => setSelectedTab("tips")}
                >
                  Voir l'analyse détaillée
                </Button>
              </div>
            )}
            
            {selectedTab === "tips" && (
              <div className="space-y-4">
                {tips.map((tip) => (
                  <Card key={tip.id} className="shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <tip.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                            <h4 className="font-medium text-sm">{tip.title}</h4>
                            <Badge variant="outline" className={cn("text-xs px-2 py-0.5 rounded-full", tip.impactColor)}>
                              Impact {tip.impact}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button 
                  className="w-full mt-2" 
                  variant="outline"
                  onClick={() => window.open("https://www.lafinancepourtous.com/", "_blank")}
                >
                  Voir plus de conseils
                </Button>
              </div>
            )}
            
            {selectedTab === "reports" && (
              <div className="space-y-4">
                {reports.map((report) => (
                  <div 
                    key={report.id} 
                    className="flex justify-between items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{report.name}</h4>
                        <p className="text-xs text-muted-foreground">{report.date} • {report.size}</p>
                      </div>
                    </div>
                    
                    {report.status ? (
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-50 hover:text-amber-600 border-amber-200">
                        {report.status}
                      </Badge>
                    ) : (
                      <Button variant="ghost" size="sm" className="text-primary flex gap-1.5 items-center">
                        <span className="text-violet-500">Télécharger</span>
                        <Download className="h-3.5 w-3.5 text-violet-500" />
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => window.alert("Génération d'un rapport personnalisé en cours...")}
                >
                  <FileBarChart className="h-4 w-4" />
                  <span>Générer un rapport personnalisé</span>
                </Button>
              </div>
            )}
            
            {selectedTab === "achievements" && (
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        achievement.progress === 100 
                          ? 'bg-green-100 text-green-600' 
                          : achievement.progress > 0 
                            ? 'bg-amber-100 text-amber-600' 
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        <achievement.icon className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm">{achievement.name}</h4>
                          <span className="text-xs font-medium">{achievement.progress}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                        <div className="mt-2 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${
                              achievement.progress === 100 
                                ? 'bg-green-500' 
                                : achievement.progress > 0 
                                  ? 'bg-amber-500' 
                                  : 'bg-gray-300'
                            }`}
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.alert("Découvrez plus de défis pour améliorer vos finances !")}
                >
                  Découvrir plus de défis
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analysis;
