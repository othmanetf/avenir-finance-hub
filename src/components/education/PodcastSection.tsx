import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EyeIcon, ExternalLink, Headphones, Clock, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type PodcastType = {
  id: number;
  title: string;
  description: string;
  category: string;
  host: string;
  duration: string;
  views: number;
  image: string;
  link: string;
};

const podcastCategories = [
  { id: "all", label: "Tous" },
  { id: "économie", label: "Économie" },
  { id: "investissement", label: "Investissement" },
  { id: "épargne", label: "Épargne" },
  { id: "crypto", label: "Crypto" },
  { id: "budget", label: "Budget" },
];

const podcasts: PodcastType[] = [
  {
    id: 1,
    title: "Économie expliquée simplement",
    description: "Discussion sur les principes économiques de base et comment ils affectent votre vie quotidienne.",
    category: "économie",
    host: "Sarah Martin",
    duration: "28 min",
    views: 3452,
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    link: "https://podcasters.spotify.com/pod/show/econome-pratique"
  },
  {
    id: 2,
    title: "Les bases de l'investissement",
    description: "Guide pour débutants sur comment commencer à investir sur les marchés financiers avec un petit budget.",
    category: "investissement",
    host: "Michel Dupont",
    duration: "35 min",
    views: 5621,
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    link: "https://podcasters.spotify.com/pod/show/investir-malin"
  },
  {
    id: 3,
    title: "Épargne intelligente",
    description: "Stratégies d'épargne adaptées à différentes étapes de la vie et conseils pratiques pour augmenter votre capacité d'épargne.",
    category: "épargne",
    host: "Nadia Bensalem",
    duration: "22 min",
    views: 2835,
    image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    link: "https://podcasters.spotify.com/pod/show/epargne-plus"
  },
  {
    id: 4,
    title: "Cryptomonnaies expliquées",
    description: "Tout ce que vous devez savoir sur la blockchain, le Bitcoin et les autres cryptomonnaies sans le jargon technique.",
    category: "crypto",
    host: "Alexandre Tech",
    duration: "42 min",
    views: 6750,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    link: "https://podcasters.spotify.com/pod/show/crypto-pour-tous"
  },
  {
    id: 5,
    title: "Finances personnelles 101",
    description: "Comment gérer votre budget, réduire vos dettes et construire une santé financière solide progressivement.",
    category: "budget",
    host: "Marie Finance",
    duration: "31 min",
    views: 4125,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    link: "https://podcasters.spotify.com/pod/show/finances-pour-tous"
  }
];

export const PodcastSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="mt-8 mb-12">
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col">
          <h2 className="text-lg md:text-xl font-bold">Podcasts financiers</h2>
          <p className="text-xs text-muted-foreground">Apprenez en écoutant des experts</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs rounded-full">
          Voir tout
        </Button>
      </div>
      {/* FILTERING BY CATEGORY NOW WRAPPED IN TABS */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <div className="mb-4 overflow-x-auto pb-2 -mx-1 px-1">
          <TabsList className="flex flex-nowrap overflow-x-auto justify-start gap-1.5 bg-transparent h-auto">
            {podcastCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={cn(
                  "px-3 py-1.5 text-xs rounded-full whitespace-nowrap flex-shrink-0 shadow-sm bg-white border border-gray-100",
                  activeCategory === category.id ? "bg-primary text-white border-primary" : ""
                )}
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {podcastCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="outline-none p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {podcasts
                .filter(
                  (podcast) =>
                    category.id === "all" || podcast.category === category.id
                )
                .map((podcast) => (
                  <PodcastCard key={podcast.id} podcast={podcast} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

interface PodcastCardProps {
  podcast: PodcastType;
}

const PodcastCard = ({ podcast }: PodcastCardProps) => {
  const handleOpen = () => {
    if (podcast.link) {
      window.open(podcast.link, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
        <div className="relative h-40 sm:h-36 md:h-40 overflow-hidden">
          <img 
            src={podcast.image} 
            alt={podcast.title} 
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" 
            loading="lazy"
          />
          <div className="absolute right-2 top-2">
            <Badge 
              variant="secondary" 
              className="bg-[#1F6FEB]/10 text-[#1F6FEB] flex items-center gap-1 font-normal shadow-sm"
            >
              <Headphones className="h-3 w-3" />
              <span>Podcast</span>
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-12"></div>
        </div>
        
        <CardHeader className="flex-grow p-3 sm:p-4">
          <CardTitle className={cn("line-clamp-2 text-base sm:text-base leading-tight")}>
            {podcast.title}
          </CardTitle>
          <div className="text-xs text-[#1F6FEB] font-medium mt-1">
            Par {podcast.host}
          </div>
          <CardDescription className="line-clamp-2 text-xs mt-1.5">
            {podcast.description}
          </CardDescription>
        </CardHeader>
        
        <CardFooter className="flex items-center justify-between border-t pt-3 pb-3 px-3 sm:px-4 bg-gray-50">
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              <span className="text-[10px] sm:text-xs">{podcast.duration}</span>
            </div>
            <div className="flex items-center">
              <EyeIcon className="mr-1 h-3 w-3" />
              <span className="text-[10px] sm:text-xs">{podcast.views}</span>
            </div>
          </div>
          
          <div className="flex gap-1 sm:gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={() => window.alert("Podcast ajouté à vos favoris")}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleOpen}
              className="flex items-center gap-1 text-xs h-8 px-2 rounded-full text-[#1F6FEB] border-[#1F6FEB]/20 hover:bg-[#1F6FEB]/10"
            >
              <span>Écouter</span>
              {podcast.link && <ExternalLink className="h-3 w-3" />}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
