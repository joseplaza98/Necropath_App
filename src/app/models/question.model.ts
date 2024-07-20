export interface Answer {
    text: string;
    isCorrect: boolean;
  }
  
  export interface Question {
    id: string;
    question: string;
    answers: Answer[];
  }
  