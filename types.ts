export enum ExerciseType {
  STANDARD_PROBLEM = 'STANDARD_PROBLEM', // 1 or 2 operations
  REMAINDER_INTERPRETATION = 'REMAINDER_INTERPRETATION', // What does the remainder mean?
  REFORMULATE_QUESTION = 'REFORMULATE_QUESTION', // Change the question
  GENERATE_QUESTIONS = 'GENERATE_QUESTIONS', // List possible questions from data
  CREATE_PROBLEM = 'CREATE_PROBLEM', // Create problem from ops/data
  MULTIPLES_DIVISORS = 'MULTIPLES_DIVISORS' // LCM, GCD, list multiples, etc.
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  statement: string;
  question?: string; // Optional because some tasks are "Create a problem"
  data?: string[]; // Specific data points if needed
  hasClosedSolution: boolean;
  solution: string; // The answer or an example answer
  explanation: string; // Step by step
  hint?: string;
}

export interface ExerciseResponseSchema {
  title: string;
  statement: string;
  question: string;
  solution: string;
  explanation: string;
  hint: string;
  type: string;
}
