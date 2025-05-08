
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend
} from 'recharts';

type MonthlyEvolutionChartProps = {
  selectedPeriod: "30" | "90" | "180";
  setSelectedPeriod: (period: "30" | "90" | "180") => void;
  activeTab: "all" | "expenses" | "income";
  setActiveTab: (tab: "all" | "expenses" | "income") => void;
};

export const MonthlyEvolutionChart = ({ 
  selectedPeriod, 
  setSelectedPeriod,
  activeTab,
  setActiveTab
}: MonthlyEvolutionChartProps) => {
  
  // Chart data based on selected period
  const getChartData = () => {
    if (selectedPeriod === "30") {
      return [
        { jour: '1', dépenses: 150, revenus: 0, budget: 250 },
        { jour: '5', dépenses: 410, revenus: 8000, budget: 1000 },
        { jour: '10', dépenses: 1200, revenus: 8000, budget: 2500 },
        { jour: '15', dépenses: 2500, revenus: 8200, budget: 3750 },
        { jour: '20', dépenses: 3800, revenus: 8350, budget: 5000 },
        { jour: '25', dépenses: 4500, revenus: 8500, budget: 6250 },
        { jour: '30', dépenses: 4825, revenus: 8500, budget: 7500 },
      ];
    } else if (selectedPeriod === "90") {
      return [
        { jour: 'Jan', dépenses: 4200, revenus: 8000, budget: 7000 },
        { jour: 'Fév', dépenses: 4500, revenus: 8200, budget: 7200 },
        { jour: 'Mars', dépenses: 4825, revenus: 8500, budget: 7500 },
      ];
    } else {
      return [
        { jour: 'Jan', dépenses: 4000, revenus: 7800, budget: 7000 },
        { jour: 'Fév', dépenses: 4100, revenus: 7900, budget: 7100 },
        { jour: 'Mars', dépenses: 4300, revenus: 8100, budget: 7200 },
        { jour: 'Avr', dépenses: 4400, revenus: 8200, budget: 7300 },
        { jour: 'Mai', dépenses: 4600, revenus: 8300, budget: 7400 },
        { jour: 'Juin', dépenses: 4825, revenus: 8500, budget: 7500 },
      ];
    }
  };

  // Format number with spaces for thousands
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Custom tooltip formatter to remove ":" and format numbers
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-md border border-gray-100">
          <p className="font-medium mb-1">{`Jour ${label}`}</p>
          {activeTab === "all" || activeTab === "expenses" ? (
            payload[0] && (
              <p className="text-[#1F6FEB]">
                <span>Dépenses </span>
                <span className="font-medium">{`${formatNumber(payload[0].value)} DH`}</span>
              </p>
            )
          ) : null}
          {activeTab === "all" || activeTab === "income" ? (
            payload[activeTab === "all" ? 1 : 0] && (
              <p className="text-[#0EA5E9]">
                <span>Revenus </span>
                <span className="font-medium">{`${formatNumber(payload[activeTab === "all" ? 1 : 0].value)} DH`}</span>
              </p>
            )
          ) : null}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Évolution Mensuelle</h3>
            <p className="text-sm text-muted-foreground">Visualisez vos finances sur la durée</p>
          </div>
          <Select
            value={selectedPeriod}
            onValueChange={(value) => setSelectedPeriod(value as "30" | "90" | "180")}
          >
            <SelectTrigger className="w-full sm:w-[170px] h-9 text-xs rounded-xl bg-gray-50 border-gray-100 shadow-sm">
              <SelectValue placeholder="Derniers 30 jours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Derniers 30 jours</SelectItem>
              <SelectItem value="90">Derniers 90 jours</SelectItem>
              <SelectItem value="180">Derniers 6 mois</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="h-[220px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={getChartData()}
              margin={{ top: 10, right: 5, left: -15, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorDepenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1F6FEB" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#1F6FEB" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="jour" 
                tick={{ fontSize: 10 }}
                tickMargin={8}
                axisLine={false}
                tickLine={false}
                padding={{ left: 5, right: 5 }}
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `${value / 1000}k DH`}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {(activeTab === "all" || activeTab === "expenses") && (
                <Area
                  type="monotone"
                  dataKey="dépenses"
                  name="Dépenses"
                  stroke="#1F6FEB"
                  fillOpacity={1}
                  fill="url(#colorDepenses)"
                  strokeWidth={2}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  dot={{ r: 2.5, strokeWidth: 2, fill: "#fff" }}
                />
              )}
              
              {(activeTab === "all" || activeTab === "income") && (
                <Area
                  type="monotone"
                  dataKey="revenus"
                  name="Revenus"
                  stroke="#0EA5E9"
                  fillOpacity={1}
                  fill="url(#colorRevenus)"
                  strokeWidth={2}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  dot={{ r: 2.5, strokeWidth: 2, fill: "#fff" }}
                />
              )}
              
              <Legend 
                wrapperStyle={{ bottom: 0 }} 
                formatter={(value) => <span className="text-xs">{value}</span>}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-3 pt-2 flex space-x-3 justify-center border-t border-gray-100">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "expenses" | "income")} className="w-full">
            <TabsList className="grid grid-cols-3 bg-muted/40 rounded-xl p-1">
              <TabsTrigger value="all" className="rounded-lg text-xs py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">Tous</TabsTrigger>
              <TabsTrigger value="expenses" className="rounded-lg text-xs py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">Dépenses</TabsTrigger>
              <TabsTrigger value="income" className="rounded-lg text-xs py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">Revenus</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};
