
import { BookOpen, Video, Bookmark, Award, EyeIcon, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const educationCategories = [
  { id: "all", label: "Tous" },
  { id: "budgeting", label: "Budget" },
  { id: "saving", label: "Épargne" },
  { id: "investing", label: "Investissement" },
  { id: "taxes", label: "Impôts" },
  { id: "psychology", label: "Psychologie" },
];

const educationItems = [
  {
    id: 1,
    title: "Comprendre les fonds d'urgence",
    description: "Apprenez pourquoi tout le monde a besoin d'un fonds d'urgence et comment en constituer un.",
    category: "saving",
    type: "article",
    readTime: "5 min de lecture",
    views: 1245,
    image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    source: "https://www.lafinancepourtous.com/",
  },
  {
    id: 2,
    title: "Budget 101: La règle 50/30/20",
    description: "Un cadre de budgétisation simple que tout le monde peut utiliser pour gérer son argent.",
    category: "budgeting",
    type: "video",
    readTime: "8 min de visionnage",
    views: 3280,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    link: "https://www.youtube.com/watch?v=HQzoZfc3GwQ",
  },
  {
    id: 3,
    title: "Introduction à la bourse",
    description: "Les bases de l'investissement en bourse pour les débutants complets.",
    category: "investing",
    type: "article",
    readTime: "10 min de lecture",
    views: 4521,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    source: "https://www.amf-france.org/",
  },
  {
    id: 4,
    title: "Comprendre le système fiscal marocain",
    description: "Un guide complet sur les impôts pour les particuliers au Maroc.",
    category: "taxes",
    type: "article",
    readTime: "12 min de lecture",
    views: 978,
    image: "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    source: "https://www.tax.gov.ma/",
  },
  {
    id: 5,
    title: "Les meilleures stratégies d'épargne pour 2024",
    description: "Découvrez comment maximiser votre épargne dans le contexte économique actuel.",
    category: "saving",
    type: "video",
    readTime: "15 min de visionnage",
    views: 2150,
    image: "https://images.unsplash.com/photo-1621252179027-95c3e9900d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    link: "https://www.youtube.com/watch?v=fVToMS2Q3XQ",
  },
  {
    id: 6,
    title: "Comment investir dans l'immobilier avec un petit budget",
    description: "Les différentes options pour entrer sur le marché immobilier sans gros capital.",
    category: "investing",
    type: "article",
    readTime: "8 min de lecture",
    views: 3467,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    source: "https://www.challenges.fr/",
  },
  {
    id: 7,
    title: "La psychologie derrière les dépenses impulsives",
    description: "Comprendre les facteurs psychologiques qui influencent nos habitudes de dépense.",
    category: "psychology",
    type: "video",
    readTime: "10 min de visionnage",
    views: 1876,
    image: "https://images.unsplash.com/photo-1593672715438-d88a70629abe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    link: "https://www.youtube.com/watch?v=PsihkFWDt3Y",
  },
  {
    id: 8,
    title: "Les bases des ETF: Pour les investisseurs débutants",
    description: "Tout ce que vous devez savoir sur les fonds négociés en bourse et comment commencer.",
    category: "investing",
    type: "article",
    readTime: "7 min de lecture",
    views: 2932,
    image: "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    source: "https://www.boursorama.com/",
  },
  {
    id: 9,
    title: "Comment établir un budget familial efficace",
    description: "Stratégies pratiques pour gérer les finances d'un ménage avec enfants.",
    category: "budgeting",
    type: "video",
    readTime: "12 min de visionnage",
    views: 4120,
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80",
    link: "https://www.youtube.com/watch?v=bpNx7xKHGZ0",
  },
  {
    id: 10,
    title: "Les biais cognitifs qui affectent vos décisions financières",
    description: "Identifier et surmonter les préjugés mentaux qui peuvent nuire à votre santé financière.",
    category: "psychology",
    type: "article",
    readTime: "9 min de lecture",
    views: 1543,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    source: "https://www.lemonde.fr/",
  },
  {
    id: 11,
    title: "Optimisation fiscale légale pour particuliers",
    description: "Comment réduire légalement votre impôt sur le revenu grâce à différents dispositifs.",
    category: "taxes",
    type: "video",
    readTime: "14 min de visionnage",
    views: 2670,
    image: "https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    link: "https://www.youtube.com/watch?v=OvAEQhbuvMI",
  },
  {
    id: 12,
    title: "Guide des placements pour jeunes professionnels",
    description: "Les meilleures options d'investissement quand on débute sa carrière.",
    category: "investing",
    type: "article",
    readTime: "11 min de lecture",
    views: 3290,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    source: "https://www.lesechos.fr/",
  },
];

export const Education = () => {
  return (
    <div className="p-6 md:pl-24">
      <div className="mb-6 flex flex-col space-y-2">
        <h1 className="text-2xl font-bold md:text-3xl">Éducation Financière</h1>
        <p className="text-muted-foreground">Apprenez et développez vos connaissances financières</p>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="mb-4 flex flex-wrap">
          {educationCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {educationCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {educationItems
                .filter((item) => category.id === "all" || item.category === category.id)
                .map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-40">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      <div className="absolute right-2 top-2">
                        <Badge variant="secondary" className="flex items-center gap-1 font-normal">
                          {item.type === "article" ? (
                            <BookOpen className="h-3 w-3" />
                          ) : (
                            <Video className="h-3 w-3" />
                          )}
                          <span>{item.type === "article" ? "Article" : "Vidéo"}</span>
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between border-t pt-4">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{item.readTime}</span>
                        </div>
                        <div className="flex items-center">
                          <EyeIcon className="mr-1 h-3 w-3" />
                          <span>{item.views}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            if (item.link) {
                              window.open(item.link, "_blank");
                            } else if (item.source) {
                              window.open(item.source, "_blank");
                            }
                          }}
                          className="flex items-center gap-1"
                        >
                          <span>{item.type === "article" ? "Lire" : "Regarder"}</span>
                          {(item.link || item.source) && <ExternalLink className="h-3 w-3" />}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" /> Quiz Financier
          </CardTitle>
          <CardDescription>Testez vos connaissances et gagnez des badges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4 text-center">
            <p>Complétez des quiz pour tester vos connaissances financières et gagner des badges !</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="bg-gray-100 px-3 py-1 text-xs dark:bg-gray-800">Maître du Budget</Badge>
              <Badge variant="outline" className="bg-gray-100 px-3 py-1 text-xs dark:bg-gray-800">Expert en Épargne</Badge>
              <Badge variant="outline" className="bg-gray-100 px-3 py-1 text-xs dark:bg-gray-800">Gourou de l'Investissement</Badge>
            </div>
            <Button>Commencer un Quiz</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Education;
