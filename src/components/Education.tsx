
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { EducationCategories, educationCategories } from "@/components/education/EducationCategories";
import { EducationCard, EducationItemType } from "@/components/education/EducationCard";
import { QuizSection } from "@/components/education/QuizSection";
import { educationItems } from "@/components/education/educationData";

export const Education = () => {
  return (
    <div className="p-4 md:p-6 md:pl-24">
      <div className="mb-5 md:mb-6 flex flex-col space-y-1">
        <h1 className="text-2xl font-bold md:text-3xl">Éducation Financière</h1>
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
