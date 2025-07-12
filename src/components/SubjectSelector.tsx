import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calculator, Microscope, Globe, Palette, Music } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  icon: typeof BookOpen;
  description: string;
}

interface SubjectSelectorProps {
  selectedSubject: string | null;
  onSubjectSelect: (subject: string) => void;
  grade: number;
}

export function SubjectSelector({ selectedSubject, onSubjectSelect, grade }: SubjectSelectorProps) {
  const subjects: Subject[] = [
    {
      id: "mathematics",
      name: "Mathematics",
      icon: Calculator,
      description: "Numbers, algebra, and problem solving"
    },
    {
      id: "life-sciences",
      name: "Life Sciences", 
      icon: Microscope,
      description: "Biology and living organisms"
    },
    {
      id: "geography",
      name: "Geography",
      icon: Globe,
      description: "Earth, places, and environments"
    },
    {
      id: "english",
      name: "English",
      icon: BookOpen,
      description: "Language and literature"
    },
    {
      id: "visual-arts",
      name: "Visual Arts",
      icon: Palette,
      description: "Art, design, and creativity"
    },
    {
      id: "music",
      name: "Music",
      icon: Music,
      description: "Theory, composition, and performance"
    }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Choose Your Subject</CardTitle>
        <CardDescription>Select a subject for Grade {grade} to start your quiz</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Button
                key={subject.id}
                variant={selectedSubject === subject.id ? "subject" : "outline"}
                onClick={() => onSubjectSelect(subject.id)}
                className="h-24 flex-col p-4 space-y-2"
              >
                <Icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-semibold">{subject.name}</div>
                  <div className="text-xs opacity-75">{subject.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}