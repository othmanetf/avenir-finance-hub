import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, MessageCircle, Target, BookOpen, Users, Coins } from "lucide-react";
import { motion } from "framer-motion";
import ConsultationForm from "./investment/ConsultationForm";
import InvestmentGuides from "./investment/InvestmentGuides";
import { UserGoals } from "./dashboard/UserGoals";
import { useUserData } from "@/context/UserDataContext";

const Investments = () => {
  const [activeTab, setActiveTab] = useState("opportunities");
  const { userData } = useUserData();

  // Savings accounts data
  const savingsAccounts = [
    {
      id: 1,
      name: "Compte Épargne Sécurisé",
      bank: "Banque Populaire",
      interestRate: "2.5%",
      minDeposit: "500 DH",
      liquidity: "Élevée",
      risk: "Très faible",
      recommended: true,
    },
    {
      id: 2,
      name: "Plan Épargne Logement",
      bank: "CIH Bank",
      interestRate: "3.0%",
      minDeposit: "1,000 DH",
      liquidity: "Moyenne",
      risk: "Faible",
      recommended: false,
    },
    {
      id: 3,
      name: "Compte Épargne Jeunes",
      bank: "Attijariwafa Bank",
      interestRate: "2.75%",
      minDeposit: "200 DH",
      liquidity: "Élevée",
      risk: "Très faible",
      recommended: false,
    },
  ];

  // Investment opportunities data
  const investmentOpportunities = [
    {
      id: 1,
      name: "Fonds Diversifié Équilibré",
      provider: "BMCI Asset Management",
      expectedReturn: "5-7%",
      minInvestment: "5,000 DH",
      risk: "Modéré",
      term: "3-5 ans",
      category: "Fonds commun",
      trending: true,
    },
    {
      id: 2,
      name: "ETF Actions Marocaines",
      provider: "Upline Securities",
      expectedReturn: "7-10%",
      minInvestment: "10,000 DH",
      risk: "Élevé",
      term: "5+ ans",
      category: "ETF",
      trending: true,
    },
    {
      id: 3,
      name: "Obligations d'État",
      provider: "Trésor Marocain",
      expectedReturn: "3.5-4%",
      minInvestment: "10,000 DH",
      risk: "Faible",
      term: "2-10 ans",
      category: "Obligations",
      trending: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* User Goals Section */}
      <UserGoals />

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("opportunities")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "opportunities"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          <Coins className="h-4 w-4" />
          <span>Opportunités</span>
        </button>
        <button
          onClick={() => setActiveTab("savings")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "savings"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          <Target className="h-4 w-4" />
          <span>Épargne</span>
        </button>
        <button
          onClick={() => setActiveTab("coaching")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "coaching"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Coaching</span>
        </button>
        <button
          onClick={() => setActiveTab("guides")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "guides"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Guides</span>
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "opportunities" && (
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Opportunités d'Investissement</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Découvrez des options d'investissement adaptées à votre profil
            </p>
          </div>

          {investmentOpportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{opportunity.name}</h3>
                      <p className="text-sm text-muted-foreground">{opportunity.provider}</p>
                    </div>
                    {opportunity.trending && (
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        <TrendingUp className="h-3 w-3 mr-1" /> Tendance
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Rendement estimé</p>
                      <p className="font-medium text-green-600">{opportunity.expectedReturn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Investissement min.</p>
                      <p className="font-medium">{opportunity.minInvestment}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Niveau de risque</p>
                      <p className="font-medium">{opportunity.risk}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Durée recommandée</p>
                      <p className="font-medium">{opportunity.term}</p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Badge variant="outline">{opportunity.category}</Badge>
                    <Button size="sm" variant="outline">
                      En savoir plus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "savings" && (
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Comptes d'Épargne</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sécurisez votre avenir avec nos options d'épargne
            </p>
          </div>

          {savingsAccounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-white shadow-sm border-0 rounded-2xl overflow-hidden ${
                account.recommended ? "ring-2 ring-blue-500 ring-opacity-50" : ""
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{account.name}</h3>
                      <p className="text-sm text-muted-foreground">{account.bank}</p>
                    </div>
                    {account.recommended && (
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        Recommandé
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Taux d'intérêt</p>
                      <p className="font-medium text-green-600">{account.interestRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Dépôt minimum</p>
                      <p className="font-medium">{account.minDeposit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Liquidité</p>
                      <p className="font-medium">{account.liquidity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Niveau de risque</p>
                      <p className="font-medium">{account.risk}</p>
                    </div>
                  </div>

                  <Button size="sm" className="w-full">
                    Ouvrir un compte
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "coaching" && (
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Coaching Personnalisé</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Bénéficiez des conseils de nos experts pour atteindre vos objectifs financiers
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">Consultation Investissement</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Planifiez une séance avec nos conseillers financiers
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Gratuit
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle>Planifier une séance d'investissement</DialogTitle>
              </DialogHeader>
              <ConsultationForm />
            </DialogContent>
          </Dialog>

          {/* Personalized recommendations based on user goals */}
          {userData.goals.length > 0 && (
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Recommandations Personnalisées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userData.goals.slice(0, 2).map((goal, index) => (
                    <div key={goal.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{goal.type}</span>
                        <Badge variant="outline" className="text-xs">
                          {goal.timeHorizon}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {goal.type.includes("voyage") && "Nous recommandons un compte épargne avec liquidité élevée"}
                        {goal.type.includes("immobilier") && "Considérez un plan d'épargne logement ou des investissements à moyen terme"}
                        {goal.type.includes("urgence") && "Un compte épargne sécurisé avec accès immédiat est idéal"}
                        {goal.type.includes("retraite") && "Explorez nos options d'investissement à long terme"}
                        {!goal.type.includes("voyage") && !goal.type.includes("immobilier") && !goal.type.includes("urgence") && !goal.type.includes("retraite") && "Nos conseillers peuvent vous aider à définir la meilleure stratégie"}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "guides" && <InvestmentGuides />}
    </div>
  );
};

export default Investments;
