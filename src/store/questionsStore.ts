import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";
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
  questions: Question[] | null;
  selectedQuestionId: Id<"questions"> | undefined;
  setQuestions: (questions: Question[]) => void;
  setSelectedQuestionId: (id: Id<"questions">) => void;
  // getQuestions: () => Question[] | null;
  getSelectedQuestion: () => Question | null;
};

const useQuestionStore = create<QuestionStore>()(
  devtools((set, get) => ({
    questions: null,
    selectedQuestionId: undefined,
    setQuestions: (questions: Question[]) =>
      set({ questions }, false, "setQuestions"),
    setSelectedQuestionId: (id: Id<"questions">) =>
      set({ selectedQuestionId: id }, false, "setSelectedQuestionId"),
    // getQuestions: () => get().questions,
    getSelectedQuestion: () => {
      const { questions, selectedQuestionId } = get();
      return questions?.find((q) => q._id === selectedQuestionId) || null;
    },
  }))
);

export default useQuestionStore;
