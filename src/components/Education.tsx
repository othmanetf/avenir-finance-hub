
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { EducationCategories, educationCategories } from "@/components/education/EducationCategories";
import { EducationCard, EducationItemType } from "@/components/education/EducationCard";
import { QuizSection } from "@/components/education/QuizSection";
import { PodcastSection } from "@/components/education/PodcastSection";
import { educationItems } from "@/components/education/educationData";
import { GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/use-profile";

// Mise à jour des images pour les contenus éducatifs
const updatedEducationItems: EducationItemType[] = [
  {
    id: 1,
    title: "Comprendre les fonds d'urgence",
    description: "Apprenez pourquoi tout le monde a besoin d'un fonds d'urgence et comment en constituer un efficacement",
    category: "saving",
    type: "article",
    readTime: "5 min de lecture",
    views: 1245,
    image: "https://images.unsplash.com/photo-1579621970590-9d624316904b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://www.lafinancepourtous.com/pratique/vie-perso/epargne-de-precaution/",
  },
  {
    id: 2,
    title: "Les bases des ETF: Pour les investisseurs débutants",
    description: "Tout ce que vous devez savoir sur les fonds négociés en bourse et comment commencer à investir facilement",
    category: "investing",
    type: "article",
    readTime: "7 min de lecture",
    views: 2932,
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://www.boursorama.com/bourse/trackers/conseils-trackers/",
  },
  {
    id: 3,
    title: "Comprendre le système fiscal marocain",
    description: "Un guide complet sur les impôts pour les particuliers au Maroc, avec conseils pratiques",
    category: "taxes",
    type: "article",
    readTime: "12 min de lecture",
    views: 978,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://www.tax.gov.ma/wps/portal/",
  },
  {
    id: 4,
    title: "Comment établir un budget familial efficace",
    description: "Stratégies pratiques pour gérer les finances d'un ménage avec enfants et maximiser vos économies",
    category: "budgeting",
    type: "video",
    readTime: "12 min de visionnage",
    views: 4120,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://www.youtube.com/watch?v=HQzoZfc3GwQ",
  },
  {
    id: 5,
    title: "Les meilleures stratégies d'épargne pour 2024",
    description: "Découvrez comment maximiser votre épargne dans le contexte économique actuel avec ces conseils d'experts",
    category: "saving",
    type: "video",
    readTime: "15 min de visionnage",
    views: 2150,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://www.youtube.com/watch?v=kJSfUbi8YGQ",
  },
  {
    id: 6,
    title: "Les biais cognitifs qui affectent vos décisions financières",
    description: "Comment notre cerveau nous trompe quand il s'agit d'argent et comment éviter ces pièges mentaux",
    category: "psychology",
    type: "article",
    readTime: "8 min de lecture",
    views: 1876,
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://www.psychologytoday.com/intl/blog/science-choice/201705/what-is-cognitive-bias-definition-and-examples",
  },
  {
    id: 7,
    title: "Préparer sa retraite: commencer tôt pour finir serein",
    description: "Guide pratique pour planifier votre retraite dès maintenant, quel que soit votre âge",
    category: "retirement",
    type: "article",
    readTime: "10 min de lecture",
    views: 3241,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://www.cnss.ma/fr/content/retraite",
  },
  {
    id: 8,
    title: "Comment sortir des dettes rapidement",
    description: "Stratégies éprouvées pour vous libérer de vos dettes et retrouver une santé financière",
    category: "debt",
    type: "video",
    readTime: "18 min de visionnage",
    views: 5689,
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://www.youtube.com/watch?v=ZflVSNl0pIY",
  },
  {
    id: 9,
    title: "La règle des 50/30/20: simplifier votre budget",
    description: "Comment appliquer cette règle simple pour organiser vos finances personnelles sans prise de tête",
    category: "budgeting",
    type: "article",
    readTime: "6 min de lecture",
    views: 4728,
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0a07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://www.ramsey.com/dave-ramsey-7-baby-steps/",
  }
];

export const Education = () => {
  const { openProfile } = useProfile();

  return (
    <div className="p-4 md:p-6 md:pl-24">
      {/* En-tête unifié */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Éducation Financière</p>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Apprenez les bases de la finance</h2>
        </div>
        
        <Avatar 
          className="h-16 w-16 sm:h-18 sm:w-18 border-2 border-white shadow-md cursor-pointer hover:opacity-90 transition-opacity" 
          onClick={openProfile}
        >
          <AvatarImage src="/lovable-uploads/dbddec41-e0a6-473b-8088-5944e5f0ce16.png" alt="Mohamed" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </div>

      <Tabs defaultValue="all" className="mb-6 md:mb-8 animate-fade-in">
        <EducationCategories />
        
        {educationCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {updatedEducationItems
                .filter((item) => category.id === "all" || item.category === category.id)
                .map((item) => (
                  <EducationCard key={item.id} item={item} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <PodcastSection />

      <div className="mt-6">
        <QuizSection />
      </div>
    </div>
  );
};

export default Education;
