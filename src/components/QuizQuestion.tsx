import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedOption: number, isCorrect: boolean) => void;
  showFeedback: boolean;
  selectedOption: number | null;
}

export function QuizQuestion({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer, 
  showFeedback, 
  selectedOption 
}: QuizQuestionProps) {
  const progress = (questionNumber / totalQuestions) * 100;

  const handleOptionClick = (optionIndex: number) => {
    if (showFeedback) return; // Prevent clicking after answer
    
    const isCorrect = optionIndex === question.correctAnswer;
    onAnswer(optionIndex, isCorrect);
  };

  const getOptionVariant = (optionIndex: number) => {
    if (!showFeedback) {
      return selectedOption === optionIndex ? "quiz" : "outline";
    }
    
    if (optionIndex === question.correctAnswer) {
      return "default"; // Correct answer in green
    }
    
    if (selectedOption === optionIndex && optionIndex !== question.correctAnswer) {
      return "destructive"; // Wrong selected answer in red
    }
    
    return "outline";
  };

  const getOptionIcon = (optionIndex: number) => {
    if (!showFeedback) return null;
    
    if (optionIndex === question.correctAnswer) {
      return <CheckCircle className="h-5 w-5 text-primary-foreground" />;
    }
    
    if (selectedOption === optionIndex && optionIndex !== question.correctAnswer) {
      return <XCircle className="h-5 w-5 text-destructive-foreground" />;
    }
    
    return null;
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={getOptionVariant(index)}
              onClick={() => handleOptionClick(index)}
              className="w-full h-auto p-4 text-left justify-start relative"
              disabled={showFeedback}
            >
              <div className="flex items-center gap-3 w-full">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {getOptionIcon(index)}
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Explanation */}
      {showFeedback && question.explanation && (
        <Card className="border-accent shadow-card animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Explanation</h4>
                <p className="text-muted-foreground">{question.explanation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}