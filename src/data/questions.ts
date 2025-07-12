export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  subject: string;
  grade: number;
}

export const sampleQuestions: Question[] = [
  // Mathematics Grade 10
  {
    id: "math_10_1",
    question: "What is the value of x if 2x + 5 = 15?",
    options: ["3", "5", "7", "10"],
    correctAnswer: 1,
    explanation: "To solve 2x + 5 = 15, subtract 5 from both sides: 2x = 10, then divide by 2: x = 5",
    subject: "mathematics",
    grade: 10
  },
  {
    id: "math_10_2", 
    question: "Which of the following is equivalent to (x + 3)²?",
    options: ["x² + 6x + 9", "x² + 9", "x² + 3x + 9", "x² + 6x + 6"],
    correctAnswer: 0,
    explanation: "(x + 3)² = (x + 3)(x + 3) = x² + 3x + 3x + 9 = x² + 6x + 9",
    subject: "mathematics",
    grade: 10
  },
  
  // Life Sciences Grade 10
  {
    id: "life_10_1",
    question: "What is the basic unit of life?",
    options: ["Tissue", "Organ", "Cell", "Organism"],
    correctAnswer: 2,
    explanation: "The cell is the smallest structural and functional unit of all living organisms.",
    subject: "life-sciences",
    grade: 10
  },
  {
    id: "life_10_2",
    question: "Which process do plants use to make their own food?",
    options: ["Respiration", "Photosynthesis", "Digestion", "Excretion"],
    correctAnswer: 1,
    explanation: "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen.",
    subject: "life-sciences",
    grade: 10
  },

  // Geography Grade 10  
  {
    id: "geo_10_1",
    question: "What is the largest continent by land area?",
    options: ["Africa", "Asia", "North America", "Europe"],
    correctAnswer: 1,
    explanation: "Asia is the largest continent, covering about 30% of Earth's land area.",
    subject: "geography",
    grade: 10
  },
  {
    id: "geo_10_2",
    question: "The imaginary line that divides the Earth into Northern and Southern hemispheres is called:",
    options: ["Prime Meridian", "Tropic of Cancer", "Equator", "International Date Line"],
    correctAnswer: 2,
    explanation: "The Equator is located at 0° latitude and divides Earth into Northern and Southern hemispheres.",
    subject: "geography",
    grade: 10
  },

  // English Grade 10
  {
    id: "eng_10_1",
    question: "What is a metaphor?",
    options: [
      "A comparison using 'like' or 'as'", 
      "A direct comparison without using 'like' or 'as'",
      "An exaggeration for effect",
      "A sound that imitates its meaning"
    ],
    correctAnswer: 1,
    explanation: "A metaphor is a figure of speech that directly compares two unlike things without using 'like' or 'as'.",
    subject: "english",
    grade: 10
  },

  // Mathematics Grade 11
  {
    id: "math_11_1",
    question: "What is the derivative of f(x) = x³?",
    options: ["3x²", "x⁴/4", "3x", "x²"],
    correctAnswer: 0,
    explanation: "Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹, so d/dx(x³) = 3x²",
    subject: "mathematics",
    grade: 11
  },

  // Mathematics Grade 12
  {
    id: "math_12_1",
    question: "What is ∫x² dx?",
    options: ["x³/3 + C", "2x + C", "x³ + C", "3x² + C"],
    correctAnswer: 0,
    explanation: "Using the power rule for integration: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C, so ∫x² dx = x³/3 + C",
    subject: "mathematics",
    grade: 12
  }
];

export function getQuestionsByGradeAndSubject(grade: number, subject: string): Question[] {
  return sampleQuestions.filter(q => q.grade === grade && q.subject === subject);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}