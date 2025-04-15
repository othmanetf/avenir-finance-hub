
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const educationCategories = [
  { id: "all", label: "Tous" },
  { id: "budgeting", label: "Budget" },
  { id: "saving", label: "Épargne" },
  { id: "investing", label: "Investissement" },
  { id: "taxes", label: "Impôts" },
  { id: "psychology", label: "Psychologie" },
  { id: "debt", label: "Dette" },
  { id: "retirement", label: "Retraite" },
];

export const EducationCategories = () => {
  return (
    <TabsList className="mb-4 flex flex-wrap overflow-x-auto pb-1 justify-start md:justify-center gap-1 bg-transparent h-auto">
      {educationCategories.map((category) => (
        <TabsTrigger 
          key={category.id} 
          value={category.id}
          className="px-3 py-1 text-xs rounded-full whitespace-nowrap"
        >
          {category.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
