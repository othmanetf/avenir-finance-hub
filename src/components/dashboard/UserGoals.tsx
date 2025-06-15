
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useUserData } from "@/context/UserDataContext";
import { Button } from "@/components/ui/button";

export const UserGoals = () => {
  const { userData } = useUserData();
  
  if (userData.goals.length === 0) {
    return (
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardContent className="p-6 text-center">
          <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucun objectif défini</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Définissez vos objectifs financiers pour un suivi personnalisé
          </p>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un objectif
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Mes Objectifs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {userData.goals.slice(0, 3).map((goal, index) => {
          const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
          const remainingAmount = Math.max(goal.targetAmount - goal.currentAmount, 0);
          
          return (
            <motion.div
              key={goal.id}
              className="space-y-3 p-4 bg-gray-50 rounded-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-sm">{goal.type}</h4>
                  <p className="text-xs text-muted-foreground">{goal.timeHorizon}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    {goal.currentAmount.toLocaleString()} / {goal.targetAmount.toLocaleString()} {userData.preferences.currency}
                  </div>
                  <div className={`text-xs ${
                    goal.priority === 'high' ? 'text-red-600' : 
                    goal.priority === 'medium' ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    Priorité {goal.priority === 'high' ? 'haute' : goal.priority === 'medium' ? 'moyenne' : 'faible'}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{progress.toFixed(1)}% accompli</span>
                  <span>Reste: {remainingAmount.toLocaleString()} {userData.preferences.currency}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {userData.goals.length > 3 && (
          <Button variant="ghost" size="sm" className="w-full">
            Voir tous les objectifs ({userData.goals.length})
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
