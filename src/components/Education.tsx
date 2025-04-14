
import { BookOpen, Video, Bookmark, Award, EyeIcon, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const educationCategories = [
  { id: "all", label: "All" },
  { id: "budgeting", label: "Budgeting" },
  { id: "saving", label: "Saving" },
  { id: "investing", label: "Investing" },
  { id: "taxes", label: "Taxes" },
];

const educationItems = [
  {
    id: 1,
    title: "Understanding Emergency Funds",
    description: "Learn why everyone needs an emergency fund and how to build one.",
    category: "saving",
    type: "article",
    readTime: "5 min read",
    views: 1245,
    image: "https://source.unsplash.com/random/300x200/?money",
  },
  {
    id: 2,
    title: "Budgeting 101: The 50/30/20 Rule",
    description: "A simple budgeting framework that anyone can use to manage their money.",
    category: "budgeting",
    type: "video",
    readTime: "8 min watch",
    views: 3280,
    image: "https://source.unsplash.com/random/300x200/?budget",
  },
  {
    id: 3,
    title: "Introduction to Stock Market",
    description: "The basics of stock market investing for complete beginners.",
    category: "investing",
    type: "article",
    readTime: "10 min read",
    views: 4521,
    image: "https://source.unsplash.com/random/300x200/?stocks",
  },
  {
    id: 4,
    title: "Understanding Moroccan Tax System",
    description: "A comprehensive guide to taxes for individuals in Morocco.",
    category: "taxes",
    type: "article",
    readTime: "12 min read",
    views: 978,
    image: "https://source.unsplash.com/random/300x200/?documents",
  },
];

export const Education = () => {
  return (
    <div className="p-6 md:pl-24">
      <div className="mb-6 flex flex-col space-y-2">
        <h1 className="text-2xl font-bold md:text-3xl">Financial Education</h1>
        <p className="text-muted-foreground">Learn and grow your financial knowledge</p>
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
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-40">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      <div className="absolute right-2 top-2">
                        <Badge variant="secondary" className="flex items-center gap-1 font-normal">
                          {item.type === "article" ? (
                            <BookOpen className="h-3 w-3" />
                          ) : (
                            <Video className="h-3 w-3" />
                          )}
                          <span>{item.type}</span>
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
                        <Button variant="outline" size="sm">
                          Read
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
            <Award className="h-6 w-6 text-monavenir-purple" /> Financial Quiz Challenge
          </CardTitle>
          <CardDescription>Test your knowledge and earn badges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4 text-center">
            <p>Complete quizzes to test your financial knowledge and earn badges!</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="bg-gray-100 px-3 py-1 text-xs dark:bg-gray-800">Budget Master</Badge>
              <Badge variant="outline" className="bg-gray-100 px-3 py-1 text-xs dark:bg-gray-800">Saving Expert</Badge>
              <Badge variant="outline" className="bg-gray-100 px-3 py-1 text-xs dark:bg-gray-800">Investment Guru</Badge>
            </div>
            <Button>Start a Quiz</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Education;
