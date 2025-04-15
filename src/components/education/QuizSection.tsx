
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle, HelpCircle, AlertCircle, ChevronRight, RefreshCw, BookOpen, Video } from "lucide-react";
import { cn } from "@/lib/utils";

// Définition du type de question
type Question = {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    points: number;
  }[];
  explanation: string;
};

// Définition du type de ressource recommandée
type RecommendedResource = {
  id: number;
  title: string;
  category: string;
  type: "article" | "video";
  link: string;
};

// Liste des questions du quiz
const quizQuestions: Question[] = [
  {
    id: 1,
    text: "Disposez-vous d'un fonds d'urgence ?",
    options: [
      { id: "a", text: "Oui, suffisant pour couvrir au moins 3-6 mois de dépenses", points: 20 },
      { id: "b", text: "J'ai quelques économies, mais pas assez pour 3 mois", points: 10 },
      { id: "c", text: "Non, je n'ai pas de fonds d'urgence", points: 0 }
    ],
    explanation: "Un fonds d'urgence couvrant 3 à 6 mois de dépenses est généralement recommandé pour faire face aux imprévus sans avoir à s'endetter."
  },
  {
    id: 2,
    text: "Quel pourcentage de vos revenus épargnez-vous chaque mois ?",
    options: [
      { id: "a", text: "Plus de 20%", points: 20 },
      { id: "b", text: "Entre 10% et 20%", points: 15 },
      { id: "c", text: "Moins de 10%", points: 5 },
      { id: "d", text: "Je n'épargne pas régulièrement", points: 0 }
    ],
    explanation: "La règle des 50/30/20 recommande d'épargner au moins 20% de ses revenus."
  },
  {
    id: 3,
    text: "Comment gérez-vous votre budget mensuel ?",
    options: [
      { id: "a", text: "J'ai un budget détaillé que je suis rigoureusement", points: 20 },
      { id: "b", text: "J'ai un budget approximatif", points: 10 },
      { id: "c", text: "Je n'ai pas de budget établi", points: 0 }
    ],
    explanation: "Un budget détaillé est essentiel pour contrôler ses dépenses et atteindre ses objectifs financiers."
  },
  {
    id: 4,
    text: "Avez-vous des dettes à la consommation (crédits, cartes de crédit) ?",
    options: [
      { id: "a", text: "Non, aucune dette", points: 20 },
      { id: "b", text: "Oui, mais je les rembourse comme prévu", points: 10 },
      { id: "c", text: "Oui, et j'ai du mal à les rembourser", points: 0 }
    ],
    explanation: "Les dettes à la consommation avec des taux d'intérêt élevés peuvent significativement freiner votre santé financière."
  },
  {
    id: 5,
    text: "Avez-vous commencé à investir pour votre retraite ?",
    options: [
      { id: "a", text: "Oui, régulièrement depuis plusieurs années", points: 20 },
      { id: "b", text: "J'ai commencé récemment", points: 15 },
      { id: "c", text: "Non, mais je prévois de commencer bientôt", points: 5 },
      { id: "d", text: "Non, je n'y pense pas encore", points: 0 }
    ],
    explanation: "Plus tôt vous commencez à investir pour votre retraite, plus vous profiterez de l'intérêt composé."
  }
];

// Ressources recommandées selon le score
const recommendedResources: RecommendedResource[] = [
  {
    id: 1,
    title: "Créer un fonds d'urgence solide",
    category: "saving",
    type: "article",
    link: "https://www.lafinancepourtous.com/pratique/vie-perso/epargne-de-precaution/comment-se-constituer-une-epargne-de-precaution/"
  },
  {
    id: 2,
    title: "Budget 101: La règle 50/30/20",
    category: "budgeting",
    type: "video",
    link: "https://www.youtube.com/watch?v=HQzoZfc3GwQ"
  },
  {
    id: 3,
    title: "Comment sortir des dettes efficacement",
    category: "debt",
    type: "article",
    link: "https://www.economie.gouv.fr/particuliers/surendettement"
  },
  {
    id: 4,
    title: "Les bases de l'investissement pour débutants",
    category: "investing",
    type: "video",
    link: "https://www.youtube.com/watch?v=8TJQhQ2GZ0Y"
  },
  {
    id: 5,
    title: "Planifier sa retraite dès maintenant",
    category: "retirement",
    type: "article",
    link: "https://www.amf-france.org/fr/espace-epargnants/preparer-ses-projets/preparer-sa-retraite"
  }
];

export const QuizSection = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; optionId: string; points: number }[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizCompleted(false);
    setScore(0);
  };

  const handleOptionSelect = (questionId: number, optionId: string, points: number) => {
    setAnswers([...answers, { questionId, optionId, points }]);
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const totalScore = [...answers, { questionId, optionId, points }].reduce(
        (total, answer) => total + answer.points, 
        0
      );
      setScore(Math.round((totalScore / (quizQuestions.length * 20)) * 100));
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizCompleted(false);
    setScore(0);
  };

  const getScoreCategory = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Bon";
    if (score >= 40) return "Moyen";
    return "À améliorer";
  };

  const getScoreColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-emerald-500";
    if (score >= 40) return "text-amber-500";
    return "text-red-500";
  };

  const getRecommendedResources = () => {
    if (score >= 80) return recommendedResources.slice(3, 5);
    if (score >= 60) return recommendedResources.slice(1, 4);
    if (score >= 40) return recommendedResources.slice(0, 3);
    return recommendedResources.slice(0, 4);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <Card className="mt-8 mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
          <Award className="h-6 w-6 text-primary" /> Quiz Financier
        </CardTitle>
        <CardDescription className="text-sm">
          Testez vos connaissances et obtenez des recommandations personnalisées
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!quizStarted && !quizCompleted && (
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="max-w-md">
              <p className="mb-4 text-sm md:text-base">
                Complétez ce quiz pour évaluer votre santé financière et recevoir des recommandations personnalisées pour améliorer votre situation.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <Badge variant="outline" className="bg-accent/50 px-3 py-1 text-xs">Maître du Budget</Badge>
                <Badge variant="outline" className="bg-accent/50 px-3 py-1 text-xs">Expert en Épargne</Badge>
                <Badge variant="outline" className="bg-accent/50 px-3 py-1 text-xs">Gourou de l'Investissement</Badge>
              </div>
              <Button onClick={startQuiz} className="w-full sm:w-auto">
                Commencer le Quiz
              </Button>
            </div>
          </div>
        )}

        {quizStarted && !quizCompleted && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestionIndex + 1}/{quizQuestions.length}
              </span>
              <span className="text-xs text-muted-foreground">
                {Math.round(((currentQuestionIndex) / quizQuestions.length) * 100)}% complété
              </span>
            </div>
            
            <div className="w-full bg-accent/30 rounded-full h-2 mb-4">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentQuestionIndex / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
            
            <div className="bg-accent/10 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-base mb-2">{currentQuestion.text}</h3>
              <div className="space-y-2">
                {currentQuestion.options.map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => handleOptionSelect(currentQuestion.id, option.id, option.points)}
                  >
                    <span className="mr-2 bg-accent/50 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                      {option.id.toUpperCase()}
                    </span>
                    <span className="text-sm">{option.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {quizCompleted && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center bg-accent/30 rounded-full w-24 h-24 mb-4">
                <span className={cn("text-2xl font-bold", getScoreColor())}>
                  {score}%
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-1">
                Votre niveau: <span className={getScoreColor()}>{getScoreCategory()}</span>
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {score >= 80 
                  ? "Félicitations ! Vous avez une excellente gestion financière."
                  : score >= 60 
                  ? "Bonne gestion financière. Quelques améliorations sont possibles."
                  : score >= 40 
                  ? "Vous êtes sur la bonne voie, mais il y a des points à améliorer."
                  : "Votre situation financière nécessite une attention particulière."
                }
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-base font-medium flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Ressources recommandées pour vous:
              </h4>
              
              <div className="space-y-2">
                {getRecommendedResources().map((resource) => (
                  <div 
                    key={resource.id}
                    className="flex items-center justify-between p-3 bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {resource.type === "article" ? (
                        <BookOpen className="h-4 w-4 text-primary/80" />
                      ) : (
                        <Video className="h-4 w-4 text-primary/80" />
                      )}
                      <span className="text-sm font-medium">{resource.title}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => window.open(resource.link, "_blank")}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center pt-2">
              <Button 
                onClick={resetQuiz} 
                variant="outline"
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                Refaire le Quiz
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
