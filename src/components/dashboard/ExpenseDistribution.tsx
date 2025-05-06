
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';

type Category = {
  id: string;
  name: string;
  icon: React.ElementType;
  amount: number;
  budget: number;
  color: string;
  pieColor: string;
  progress: number;
  transactions: { name: string; date: string; amount: number }[];
};

type ExpenseDistributionProps = {
  categories: Category[];
};

export const ExpenseDistribution = ({ categories }: ExpenseDistributionProps) => {
  // Pie chart data
  const pieData = categories.map(category => ({
    name: category.name,
    value: category.amount
  }));

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-foreground">Répartition des dépenses</h3>
          <p className="text-sm text-muted-foreground">Visualisation par catégorie</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <div className="h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={75}
                  innerRadius={45}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                  paddingAngle={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={categories[index].pieColor} 
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value.toLocaleString()} DH`, ""]}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                    borderRadius: '14px', 
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)',
                    padding: '10px 14px'
                  }}
                  itemStyle={{
                    padding: '4px 0',
                    fontSize: '12px'
                  }}
                  labelStyle={{
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3">
            {categories.map((category, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: category.pieColor }}></div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <div className="text-xs font-semibold bg-gray-50 px-2.5 py-1 rounded-full shadow-sm amount-tag">
                    {category.amount.toLocaleString()} DH
                  </div>
                </div>
                <Progress 
                  value={category.progress} 
                  className="h-1.5 rounded-full"
                  style={{ 
                    backgroundColor: `${category.pieColor}20`,
                    "--tw-progress-value": category.pieColor 
                  } as React.CSSProperties}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
