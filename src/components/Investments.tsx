
import { useState } from "react";
import { 
  Wallet, 
  PiggyBank, 
  TrendingUp, 
  ChevronRight, 
  Building, 
  LineChart,
  BarChart,
  Tag,
  Info,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Investments = () => {
  const [activeTab, setActiveTab] = useState<"save" | "invest">("save");
  
  // Sample data
  const savingOptions = [
    {
      id: 1,
      bank: "Bank Al-Maghrib",
      logo: "🏦",
      name: "Premium Savings",
      interest: 2.8,
      minDeposit: 1000,
      term: "1 year",
      features: ["No withdrawal fees", "Monthly interest payments"]
    },
    {
      id: 2,
      bank: "Attijariwafa Bank",
      logo: "🏦",
      name: "Flexible Savings",
      interest: 2.1,
      minDeposit: 500,
      term: "No fixed term",
      features: ["Unlimited withdrawals", "Quarterly interest"]
    },
    {
      id: 3,
      bank: "BMCE Bank",
      logo: "🏦",
      name: "High Yield Account",
      interest: 3.2,
      minDeposit: 5000,
      term: "2 years",
      features: ["Early withdrawal penalty", "Highest interest rate"]
    }
  ];
  
  const investmentOptions = [
    {
      id: 1,
      type: "Stock",
      name: "MASI Index Fund",
      ticker: "MASI",
      price: 12500,
      change: 2.4,
      graph: "📈",
      level: "Beginner",
      levelColor: "bg-green-100 text-green-600"
    },
    {
      id: 2,
      type: "ETF",
      name: "Moroccan Real Estate",
      ticker: "REIT",
      price: 856,
      change: -0.8,
      graph: "📉",
      level: "Intermediate",
      levelColor: "bg-amber-100 text-amber-600"
    },
    {
      id: 3,
      type: "Bond",
      name: "Government Treasury",
      ticker: "TBOND",
      price: 10000,
      change: 0.5,
      graph: "📈",
      level: "Beginner",
      levelColor: "bg-green-100 text-green-600"
    },
    {
      id: 4,
      type: "Stock",
      name: "Tech Innovation Fund",
      ticker: "TECH",
      price: 2350,
      change: 5.7,
      graph: "📈",
      level: "Advanced",
      levelColor: "bg-red-100 text-red-600"
    }
  ];
  
  return (
    <div className="flex flex-col p-4 md:p-6 gap-6 md:pl-24">
      {/* Header with Welcome and Avatar */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Investments & Savings</p>
          <h2 className="text-xl font-bold text-foreground">Grow Your Wealth</h2>
        </div>
        
        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
          <AvatarImage src="https://github.com/shadcn.png" alt="Mohamed" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "save" | "invest")} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="save" className="flex items-center gap-2 py-3">
            <PiggyBank className="h-4 w-4" />
            <span>Save</span>
          </TabsTrigger>
          <TabsTrigger value="invest" className="flex items-center gap-2 py-3">
            <TrendingUp className="h-4 w-4" />
            <span>Invest</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="save" className="space-y-6">
          <Card className="bg-white shadow-md border-0 rounded-3xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Savings Accounts</CardTitle>
              <CardDescription>Compare savings options from Moroccan banks</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {savingOptions.map((option) => (
                  <Card key={option.id} className="shadow-sm overflow-hidden">
                    <div className="flex p-4 border-b">
                      <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                        {option.logo}
                      </div>
                      <div className="flex-1 ml-4">
                        <p className="text-xs text-muted-foreground">{option.bank}</p>
                        <h4 className="font-medium">{option.name}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-primary">{option.interest}%</span>
                        <p className="text-xs text-muted-foreground">Interest p.a.</p>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 pt-3 space-y-3">
                      <div className="flex flex-wrap gap-2 text-xs">
                        <Badge variant="outline" className="bg-gray-50">
                          Min: DH {option.minDeposit}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-50">
                          Term: {option.term}
                        </Badge>
                      </div>
                      
                      <ul className="space-y-1">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="text-xs flex items-start gap-1.5">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter className="p-3 pt-0 flex justify-end">
                      <Button variant="outline" size="sm" className="text-xs">
                        View Details
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-primary to-purple-500 text-white shadow-md border-0 rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Info className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Need guidance on savings?</h3>
                  <p className="text-sm text-white/80 mt-1">Our financial advisors can help you choose the best savings account for your needs.</p>
                </div>
              </div>
              
              <Button className="mt-4 w-full bg-white text-primary hover:bg-white/90 hover:text-primary">
                Schedule a Consultation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invest" className="space-y-6">
          <Card className="bg-white shadow-md border-0 rounded-3xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Investment Opportunities</CardTitle>
              <CardDescription>Explore investment options in the Moroccan market</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {investmentOptions.map((option) => (
                  <Card key={option.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                          {option.type === "Stock" ? (
                            <BarChart className="h-6 w-6 text-primary" />
                          ) : option.type === "ETF" ? (
                            <LineChart className="h-6 w-6 text-primary" />
                          ) : (
                            <Building className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        
                        <div className="flex-1 ml-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {option.type}
                            </Badge>
                            <Badge variant="outline" className={`text-xs ${option.levelColor}`}>
                              {option.level}
                            </Badge>
                          </div>
                          <h4 className="font-medium mt-1">{option.name}</h4>
                          <p className="text-xs text-muted-foreground">{option.ticker}</p>
                        </div>
                        
                        <div className="text-right">
                          <span className="font-bold">DH {option.price.toLocaleString()}</span>
                          <p className={`text-xs ${option.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {option.change >= 0 ? '+' : ''}{option.change}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <Tag className="h-4 w-4 text-primary" />
                          <span className="text-xs text-muted-foreground">Risk Level: {option.level}</span>
                        </div>
                        
                        <Button variant="outline" size="sm" className="text-xs">
                          Learn More
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-secondary to-pink-500 text-white shadow-md border-0 rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">New to investing?</h3>
                  <p className="text-sm text-white/80 mt-1">Start with our beginner-friendly investment guides and educational resources.</p>
                </div>
              </div>
              
              <Button className="mt-4 w-full bg-white text-secondary hover:bg-white/90 hover:text-secondary">
                Explore Investment Guides
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Investments;
