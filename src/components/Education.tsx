
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { EducationCategories, educationCategories } from "@/components/education/EducationCategories";
import { EducationCard, EducationItemType } from "@/components/education/EducationCard";
import { QuizSection } from "@/components/education/QuizSection";
import { educationItems } from "@/components/education/educationData";
import { Icon } from "@/components/ui/icon-provider";

export const Education = () => {
  return (
    <div className="p-4 md:p-6 md:pl-24">
      <div className="mb-5 md:mb-6 flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <Icon 
            name="education" 
            className="h-6 w-6" 
            style={{
              stroke: "url(#education-gradient)"
            }}
          />
          <svg width="0" height="0">
            <linearGradient id="education-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1F6FEB" />
              <stop offset="100%" stopColor="#8E44AD" />
            </linearGradient>
          </svg>
          <h1 className="text-2xl font-bold md:text-3xl text-transparent bg-gradient-primary bg-clip-text">Éducation Financière</h1>
        </div>
        <p className="text-sm md:text-base text-muted-foreground">Apprenez et développez vos connaissances financières</p>
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

      <div className="mt-6">
        <QuizSection />
      </div>
    </div>
  );
};

export default Education;
