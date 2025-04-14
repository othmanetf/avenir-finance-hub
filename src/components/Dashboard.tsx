
import { ArrowDownCircle, ArrowUpCircle, PlusCircle, TrendingUp, Wallet, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  return (
    <div className="flex flex-col space-y-6 p-6 md:pl-24">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold md:text-3xl">Welcome back, Mohamed!</h1>
        <p className="text-muted-foreground">Here's your financial overview for this month</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₩ 8,500</div>
              <div className="text-xs text-muted-foreground">/ ₩ 10,000</div>
            </div>
            <Progress value={85} className="mt-3 h-2" />
            <p className="mt-2 text-xs text-muted-foreground">85% of monthly budget used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩ 12,500</div>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩ 8,500</div>
            <div className="mt-2 flex items-center text-xs text-red-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
          <CardDescription>Your spending by category this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Housing", amount: 3500, percentage: 41, color: "bg-blue-500" },
              { name: "Food", amount: 2200, percentage: 26, color: "bg-green-500" },
              { name: "Transport", amount: 1300, percentage: 15, color: "bg-yellow-500" },
              { name: "Entertainment", amount: 900, percentage: 11, color: "bg-purple-500" },
              { name: "Other", amount: 600, percentage: 7, color: "bg-gray-500" },
            ].map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">₩ {category.amount} ({category.percentage}%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className={`h-2 rounded-full ${category.color}`} style={{ width: `${category.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="fixed bottom-20 right-6 z-10 md:bottom-6">
        <Button className="h-14 w-14 rounded-full" size="icon">
          <PlusCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Financial Tip */}
      <Card className="border-l-4 border-l-monavenir-blue bg-monavenir-lightgrey dark:bg-gray-800">
        <CardContent className="flex gap-4 py-4">
          <Lightbulb className="h-10 w-10 flex-shrink-0 text-monavenir-blue" />
          <div>
            <h3 className="font-semibold">Financial Tip</h3>
            <p className="text-sm text-muted-foreground">Try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings or debt payment.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
