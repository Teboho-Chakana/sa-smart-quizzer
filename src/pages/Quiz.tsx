import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/components/QuizQuestion";
import { getQuestionsByGradeAndSubject, shuffleArray, Question } from "@/data/questions";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const grade = parseInt(searchParams.get("grade") || "10");
  const subject = searchParams.get("subject") || "";
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; selected: number; correct: boolean }[]>([]);

  useEffect(() => {
    const questionPool = getQuestionsByGradeAndSubject(grade, subject);
    if (questionPool.length === 0) {
      toast({
        title: "No questions available",
        description: "Questions for this subject are coming soon!",
        variant: "destructive"
      });
      navigate("/");
      return;
    }
    
    // Shuffle questions and options
    const shuffledQuestions = shuffleArray(questionPool).slice(0, 5); // Take first 5
    const questionsWithShuffledOptions = shuffledQuestions.map(q => ({
      ...q,
      options: shuffleArray([...q.options])
    }));
    
    setQuestions(questionsWithShuffledOptions);
  }, [grade, subject, navigate, toast]);

  const handleAnswer = (selectedOption: number, isCorrect: boolean) => {
    setSelectedOption(selectedOption);
    setShowFeedback(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selected: selectedOption,
      correct: isCorrect
    }]);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      // Quiz finished, navigate to results
      const quizData = {
        score,
        total: questions.length,
        grade,
        subject,
        answers
      };
      
      // Store results in localStorage
      localStorage.setItem("quizResults", JSON.stringify(quizData));
      navigate("/results");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold capitalize">
              {subject.replace("-", " ")} - Grade {grade}
            </h1>
            <p className="text-muted-foreground">Score: {score}/{currentQuestionIndex + (showFeedback ? 1 : 0)}</p>
          </div>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>

        {/* Question */}
        <QuizQuestion
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          showFeedback={showFeedback}
          selectedOption={selectedOption}
        />

        {/* Next Button */}
        {showFeedback && (
          <div className="flex justify-center mt-8 animate-fade-in">
            <Button onClick={handleNext} className="gap-2" size="lg">
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                "View Results"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}