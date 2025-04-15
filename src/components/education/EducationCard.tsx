
import { BookOpen, Video, Bookmark, Clock, EyeIcon, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type EducationItemType = {
  id: number;
  title: string;
  description: string;
  category: string;
  type: "article" | "video";
  readTime: string;
  views: number;
  image: string;
  link?: string;
  source?: string;
};

interface EducationCardProps {
  item: EducationItemType;
}

export const EducationCard = ({ item }: EducationCardProps) => {
  const handleOpen = () => {
    if (item.link) {
      window.open(item.link, "_blank");
    } else if (item.source) {
      window.open(item.source, "_blank");
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
      <div className="relative h-40 sm:h-36 md:h-44 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" 
          loading="lazy"
        />
        <div className="absolute right-2 top-2">
          <Badge 
            variant="secondary" 
            className={cn(
              "flex items-center gap-1 font-normal shadow-sm",
              item.type === "article" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
            )}
          >
            {item.type === "article" ? (
              <BookOpen className="h-3 w-3" />
            ) : (
              <Video className="h-3 w-3" />
            )}
            <span>{item.type === "article" ? "Article" : "Vidéo"}</span>
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-12"></div>
      </div>
      
      <CardHeader className="flex-grow p-3 sm:p-4">
        <CardTitle className={cn("line-clamp-2 text-base sm:text-base md:text-lg text-foreground leading-tight")}>
          {item.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs sm:text-xs md:text-sm mt-1.5">
          {item.description}
        </CardDescription>
      </CardHeader>
      
      <CardFooter className="flex items-center justify-between border-t pt-3 pb-3 px-3 sm:px-4 bg-gray-50">
        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            <span className="text-[10px] sm:text-xs">{item.readTime}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon className="mr-1 h-3 w-3" />
            <span className="text-[10px] sm:text-xs">{item.views}</span>
          </div>
        </div>
        
        <div className="flex gap-1 sm:gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={() => window.alert("Article ajouté à vos favoris")}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleOpen}
            className={cn(
              "flex items-center gap-1 text-xs h-8 px-2 rounded-full",
              item.type === "article" ? "text-blue-600 border-blue-200 hover:bg-blue-50" : "text-red-600 border-red-200 hover:bg-red-50"
            )}
          >
            <span>{item.type === "article" ? "Lire" : "Regarder"}</span>
            {(item.link || item.source) && <ExternalLink className="h-3 w-3" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
