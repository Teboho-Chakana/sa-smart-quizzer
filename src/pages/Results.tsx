import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, RotateCcw, Home, Star, Target } from "lucide-react";

interface QuizResult {
  score: number;
  total: number;
  grade: number;
  subject: string;
  answers: { questionId: string; selected: number; correct: boolean }[];
}

export default function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState<QuizResult | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem("quizResults");
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const percentage = Math.round((results.score / results.total) * 100);
  
  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 90) return { message: "Outstanding! 🌟", variant: "default" as const };
    if (percentage >= 80) return { message: "Excellent work! 🎉", variant: "default" as const };
    if (percentage >= 70) return { message: "Good job! 👍", variant: "secondary" as const };
    if (percentage >= 60) return { message: "Not bad, keep practicing! 📚", variant: "secondary" as const };
    return { message: "Keep studying, you'll improve! 💪", variant: "outline" as const };
  };

  const performance = getPerformanceMessage(percentage);

  const handleRetry = () => {
    const params = new URLSearchParams({
      grade: results.grade.toString(),
      subject: results.subject
    });
    navigate(`/quiz?${params}`);
  };

  const handleHome = () => {
    navigate("/");
  };

  const saveToHistory = () => {
    const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    const newEntry = {
      ...results,
      date: new Date().toISOString(),
      id: Date.now().toString()
    };
    history.unshift(newEntry);
    
    // Keep only last 10 results
    if (history.length > 10) {
      history.splice(10);
    }
    
    localStorage.setItem("quizHistory", JSON.stringify(history));
  };

  useEffect(() => {
    saveToHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="container mx-auto py-8 max-w-2xl">
        {/* Results Card */}
        <Card className="shadow-card animate-scale-in">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Trophy className="h-16 w-16 text-secondary animate-bounce-gentle" />
                {percentage >= 80 && (
                  <Star className="h-6 w-6 text-primary absolute -top-1 -right-1" />
                )}
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">Quiz Complete!</CardTitle>
            <CardDescription className="capitalize text-lg">
              {results.subject.replace("-", " ")} - Grade {results.grade}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Score */}
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {results.score}/{results.total}
              </div>
              <div className="text-2xl text-muted-foreground mb-4">
                {percentage}%
              </div>
              <Badge variant={performance.variant} className="text-lg px-4 py-2">
                {performance.message}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{results.score}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-2">
                    <span className="text-destructive font-bold">✗</span>
                  </div>
                  <div className="text-2xl font-bold text-destructive">{results.total - results.score}</div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button onClick={handleRetry} variant="default" className="flex-1 gap-2">
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
              <Button onClick={handleHome} variant="outline" className="flex-1 gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Message */}
        <Card className="mt-6 border-accent shadow-card animate-fade-in">
          <CardContent className="pt-6 text-center">
            <h3 className="font-semibold mb-2">Keep Learning!</h3>
            <p className="text-muted-foreground">
              {percentage >= 80 
                ? "You're doing great! Try another subject or grade level to continue learning."
                : "Practice makes perfect! Review the topics and try again to improve your score."
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
