
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Target, Calendar, TrendingUp, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useUserData } from "@/context/UserDataContext";

export const UserGoals = () => {
  const { userData, addGoal } = useUserData();
  const { goals, preferences } = userData;

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ${preferences.currency}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Priorité élevée';
      case 'medium': return 'Priorité moyenne';
      case 'low': return 'Priorité faible';
      default: return 'Non définie';
    }
  };

  // Calculate progress based on current savings vs target
  const calculateProgress = (goal: any) => {
    if (!goal.targetAmount) return 0;
    const currentSavings = userData.estimatedBalance > 0 ? userData.estimatedBalance : 0;
    return Math.min((currentSavings / goal.targetAmount) * 100, 100);
  };

  if (goals.length === 0) {
    return (
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Vos Objectifs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Aucun objectif défini pour le moment</p>
            <Button 
              variant="outline" 
              onClick={() => {
                // Add a default goal for demo purposes
                addGoal({
                  id: `goal-${Date.now()}`,
                  type: "Fonds d'urgence",
                  targetAmount: 30000,
                  timeHorizon: "1 an",
                  priority: "high"
                });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un objectif
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Vos Objectifs en Cours
        </h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            // Add a new goal
            addGoal({
              id: `goal-${Date.now()}`,
              type: "Nouvel objectif",
              targetAmount: 10000,
              timeHorizon: "1 an",
              priority: "medium"
            });
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>

      {goals.map((goal, index) => (
        <motion.div
          key={goal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{goal.type}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{goal.timeHorizon}</span>
                  </div>
                </div>
                <Badge variant="secondary" className={getPriorityColor(goal.priority)}>
                  {getPriorityLabel(goal.priority)}
                </Badge>
              </div>

              {goal.targetAmount && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Objectif</span>
                    <span className="font-medium">{formatCurrency(goal.targetAmount)}</span>
                  </div>
                  
                  <Progress 
                    value={calculateProgress(goal)} 
                    className="h-2"
                  />
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{calculateProgress(goal).toFixed(0)}% atteint</span>
                    <span className="text-green-600">
                      +{formatCurrency(Math.min(userData.estimatedBalance > 0 ? userData.estimatedBalance : 0, goal.targetAmount))}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-3 pt-3 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progression mensuelle</span>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+{formatCurrency(userData.estimatedBalance > 0 ? Math.round(userData.estimatedBalance / 12) : 0)}/mois</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
