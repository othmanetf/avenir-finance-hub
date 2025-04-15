
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { BookOpen, FileText, Play, Download, ExternalLink } from "lucide-react";

interface InvestmentGuidesProps {
  onClose: () => void;
}

export const InvestmentGuides = ({ onClose }: InvestmentGuidesProps) => {
  const [activeTab, setActiveTab] = useState("debutant");

  // Guides d'investissement pour différents niveaux
  const guides = {
    debutant: [
      {
        id: "g1",
        title: "Les bases de l'investissement au Maroc",
        description: "Un guide complet pour comprendre le système financier marocain et les options d'investissement disponibles.",
        type: "pdf",
        size: "2.4 MB",
        pages: 24,
        image: "/lovable-uploads/f0ec1277-c7c9-4a7f-8544-0789cdc4eb4b.png"
      },
      {
        id: "g2",
        title: "Comment démarrer avec les ETFs au Maroc",
        description: "Découvrez pourquoi les ETFs sont idéaux pour les débutants et comment commencer à investir.",
        type: "video",
        duration: "18:24",
        image: "https://i.ytimg.com/vi/XsE0yuJ9Ql4/hqdefault.jpg"
      },
      {
        id: "g3",
        title: "Comprendre les risques d'investissement",
        description: "Un guide simple pour évaluer et comprendre les différents niveaux de risque des produits financiers.",
        type: "pdf",
        size: "1.8 MB",
        pages: 16,
        image: "/lovable-uploads/f0ec1277-c7c9-4a7f-8544-0789cdc4eb4b.png"
      }
    ],
    intermediaire: [
      {
        id: "g4",
        title: "Stratégies d'allocation d'actifs",
        description: "Comment optimiser votre portefeuille avec une allocation diversifiée et adaptée à vos objectifs.",
        type: "pdf",
        size: "3.2 MB",
        pages: 32,
        image: "/lovable-uploads/f0ec1277-c7c9-4a7f-8544-0789cdc4eb4b.png"
      },
      {
        id: "g5",
        title: "Analyse technique pour les marchés marocains",
        description: "Maîtrisez les bases de l'analyse technique pour mieux timing vos investissements.",
        type: "video",
        duration: "32:15",
        image: "https://i.ytimg.com/vi/rlZRtQkfK04/hqdefault.jpg"
      }
    ],
    avance: [
      {
        id: "g6",
        title: "Stratégies avancées de couverture",
        description: "Techniques pour protéger votre portefeuille contre les risques de marché.",
        type: "pdf",
        size: "4.5 MB",
        pages: 42,
        image: "/lovable-uploads/f0ec1277-c7c9-4a7f-8544-0789cdc4eb4b.png"
      },
      {
        id: "g7",
        title: "Investir dans les marchés internationaux depuis le Maroc",
        description: "Guide complet sur l'accès aux marchés internationaux et la diversification globale.",
        type: "video",
        duration: "45:18",
        image: "https://i.ytimg.com/vi/XJgwJ0R8YNY/hqdefault.jpg"
      }
    ]
  };

  const handleOpenGuide = (guide: any) => {
    if (guide.type === "pdf") {
      toast.info(`Téléchargement de "${guide.title}"`, {
        description: `Fichier PDF (${guide.size}, ${guide.pages} pages)`,
        action: {
          label: "Consulter en ligne",
          onClick: () => toast.success("Guide ouvert dans un nouvel onglet")
        }
      });
    } else if (guide.type === "video") {
      toast.info(`Lecture de "${guide.title}"`, {
        description: `Vidéo (${guide.duration})`,
        action: {
          label: "Voir en plein écran",
          onClick: () => toast.success("Vidéo ouverte en plein écran")
        }
      });
    }
  };

  return (
    <div className="space-y-4 pt-2">
      <Tabs defaultValue="debutant" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="debutant">Débutant</TabsTrigger>
          <TabsTrigger value="intermediaire">Intermédiaire</TabsTrigger>
          <TabsTrigger value="avance">Avancé</TabsTrigger>
        </TabsList>
        
        {Object.keys(guides).map((level) => (
          <TabsContent key={level} value={level} className="space-y-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides[level as keyof typeof guides].map((guide) => (
                <div 
                  key={guide.id} 
                  className="flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <div className="h-40 overflow-hidden bg-gray-100">
                    <img 
                      src={guide.image} 
                      alt={guide.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className={`${guide.type === 'pdf' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                        {guide.type === 'pdf' ? 'Guide PDF' : 'Tutoriel vidéo'}
                      </Badge>
                      
                      {guide.type === 'pdf' ? (
                        <span className="text-xs text-muted-foreground">{guide.pages} pages</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">{guide.duration}</span>
                      )}
                    </div>
                    
                    <h4 className="font-medium">{guide.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                  </div>
                  
                  <div className="p-4 pt-0 flex justify-end gap-2 mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleOpenGuide(guide)}
                    >
                      {guide.type === 'pdf' ? (
                        <>
                          <Download className="h-4 w-4 mr-1" />
                          Télécharger
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-1" />
                          Regarder
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 text-primary mr-2" />
          <span className="text-sm font-medium">Parcourir tous nos {Object.values(guides).flat().length} guides d'investissement</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="gap-1"
          onClick={() => toast.info("Consultez notre bibliothèque complète de ressources financières", {
            action: {
              label: "Explorer",
              onClick: () => toast.success("Redirection vers la bibliothèque financière")
            }
          })}
        >
          Voir tout
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
