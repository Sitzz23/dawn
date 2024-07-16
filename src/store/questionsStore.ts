import { create } from "zustand";
import { Id } from "../../convex/_generated/dataModel";

export type Question = {
  _id: Id<"questions">;
  _creationTime: number;
  title: string;
  tags: string[];
  problemStatement: string;
  testCases: Array<{ input: string; output: string }>;
  constraints?: string[];
  difficulty: string;
  examples: Array<{ input: string; output: string; explanation: string }>;
  //   submissions?: Id<"submission">[];
  //   viewers?: Id<"user">[];
};

type QuestionStore = {
  questions: Question[];
  selectedQuestionId: Id<"questions"> | null;
  setQuestions: (questions: Question[]) => void;
  setSelectedQuestionId: (id: Id<"questions"> | null) => void;
  getSelectedQuestion: () => Question | undefined;
};

export const useQuestionStore = create<QuestionStore>((set, get) => ({
  questions: [],
  selectedQuestionId: null,
  setQuestions: (questions) => set({ questions }),
  setSelectedQuestionId: (id) => set({ selectedQuestionId: id }),
  getSelectedQuestion: () =>
    get().questions.find((q) => q._id === get().selectedQuestionId),
}));
