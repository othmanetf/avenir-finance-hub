
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { EducationCategories, educationCategories } from "@/components/education/EducationCategories";
import { EducationCard, EducationItemType } from "@/components/education/EducationCard";
import { QuizSection } from "@/components/education/QuizSection";
import { PodcastSection } from "@/components/education/PodcastSection";
import { educationItems } from "@/components/education/educationData";
import { GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/use-profile";

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
              {educationItems
                .filter((item) => category.id === "all" || item.category === category.id)
                .map((item: EducationItemType) => (
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
