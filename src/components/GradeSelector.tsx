import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

interface GradeSelectorProps {
  selectedGrade: number | null;
  onGradeSelect: (grade: number) => void;
}

export function GradeSelector({ selectedGrade, onGradeSelect }: GradeSelectorProps) {
  const grades = [10, 11, 12];

  return (
    <Card className="w-full max-w-md mx-auto shadow-card">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <GraduationCap className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-xl">Select Your Grade</CardTitle>
        <CardDescription>Choose your current grade level to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {grades.map((grade) => (
            <Button
              key={grade}
              variant={selectedGrade === grade ? "grade" : "outline"}
              onClick={() => onGradeSelect(grade)}
              className="h-16 text-lg font-semibold"
            >
              Grade {grade}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}