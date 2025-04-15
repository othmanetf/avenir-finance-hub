
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
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative h-40 sm:h-32 md:h-40">
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
      <CardHeader className="flex-grow">
        <CardTitle className={cn("line-clamp-1 text-base sm:text-base md:text-lg")}>
          {item.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs sm:text-xs md:text-sm">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between border-t pt-4 px-3 sm:px-4">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
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
          <Button variant="ghost" size="icon" className="h-8 w-8">
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
            className="flex items-center gap-1 text-xs h-8 px-2"
          >
            <span>{item.type === "article" ? "Lire" : "Regarder"}</span>
            {(item.link || item.source) && <ExternalLink className="h-3 w-3" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
