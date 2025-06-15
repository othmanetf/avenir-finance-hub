
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
    <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
      <div className="flex flex-wrap md:flex-nowrap overflow-x-auto pb-1 justify-start md:justify-center gap-1.5 bg-transparent h-auto">
        {educationCategories.map((category) => (
          <button 
            key={category.id} 
            value={category.id}
            className="px-3 py-1.5 text-xs sm:text-sm rounded-full whitespace-nowrap flex-shrink-0 shadow-sm bg-white border border-gray-100 hover:bg-gray-50 transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};
