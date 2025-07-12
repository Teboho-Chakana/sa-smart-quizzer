import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GradeSelector } from "@/components/GradeSelector";
import { SubjectSelector } from "@/components/SubjectSelector";
import { BookOpen, Brain, Users, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleStartQuiz = () => {
    if (!selectedGrade || !selectedSubject) {
      toast({
        title: "Selection Required",
        description: "Please select both a grade and subject to start the quiz.",
        variant: "destructive"
      });
      return;
    }

    const params = new URLSearchParams({
      grade: selectedGrade.toString(),
      subject: selectedSubject
    });
    
    navigate(`/quiz?${params}`);
  };

  const features = [
    {
      icon: Brain,
      title: "Smart Learning",
      description: "Questions adapted for South African curriculum"
    },
    {
      icon: Trophy,
      title: "Track Progress",
      description: "Monitor your improvement over time"
    },
    {
      icon: Users,
      title: "Grade Specific", 
      description: "Content tailored for Grades 10, 11, and 12"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <div className="relative">
        <div 
          className="h-64 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-primary/80" />
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center text-primary-foreground">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                SmartQuiz SA
              </h1>
              <p className="text-xl md:text-2xl opacity-90 animate-fade-in">
                Master your studies with South African curriculum quizzes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center shadow-card hover:shadow-lg transition-shadow animate-fade-in">
              <CardContent className="pt-6">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quiz Setup */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Quiz</h2>
            <p className="text-muted-foreground text-lg">
              Choose your grade and subject to begin your learning journey
            </p>
          </div>

          {/* Grade Selection */}
          <div className="animate-fade-in">
            <GradeSelector 
              selectedGrade={selectedGrade}
              onGradeSelect={setSelectedGrade}
            />
          </div>

          {/* Subject Selection */}
          {selectedGrade && (
            <div className="animate-scale-in">
              <SubjectSelector
                selectedSubject={selectedSubject}
                onSubjectSelect={setSelectedSubject}
                grade={selectedGrade}
              />
            </div>
          )}

          {/* Start Quiz Button */}
          {selectedGrade && selectedSubject && (
            <div className="text-center animate-scale-in">
              <Button 
                onClick={handleStartQuiz}
                size="lg"
                className="text-lg px-8 py-6 gap-3 shadow-button hover:scale-105 transform transition-all duration-200"
              >
                <BookOpen className="h-5 w-5" />
                Start Quiz
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
