
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { EducationCategories, educationCategories } from "@/components/education/EducationCategories";
import { EducationCard } from "@/components/education/EducationCard";
import { QuizSection } from "@/components/education/QuizSection";
import { educationItems } from "@/components/education/educationData";

export const Education = () => {
  return (
    <div className="p-4 md:p-6 md:pl-24">
      <div className="mb-4 md:mb-6 flex flex-col space-y-2">
        <h1 className="text-2xl font-bold md:text-3xl">Éducation Financière</h1>
        <p className="text-sm md:text-base text-muted-foreground">Apprenez et développez vos connaissances financières</p>
      </div>

      <Tabs defaultValue="all" className="mb-4 md:mb-6">
        <EducationCategories />
        
        {educationCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {educationItems
                .filter((item) => category.id === "all" || item.category === category.id)
                .map((item) => (
                  <EducationCard key={item.id} item={item} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <QuizSection />
    </div>
  );
};

export default Education;
