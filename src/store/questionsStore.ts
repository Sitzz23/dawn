import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Id } from "../../convex/_generated/dataModel";
import { codeLangs, langMap, langTemp } from "@/lib/utils";

export type Question = {
  _id: Id<"questions">;
  _creationTime: number;
  title: string;
  tags: string[];
  problemStatement: string;
  testCases: Array<{ input: string; output: string }>;
  constraints?: string[];
  difficulty: "easy" | "medium" | "hard";
  examples: Array<{ input: string; output: string; explanation: string }>;
};

type QuestionStore = {
  questions: Question[] | null;
  selectedQuestionId: Id<"questions"> | undefined;
  setQuestions: (questions: Question[]) => void;
  setSelectedQuestionId: (id: Id<"questions">) => void;
  getSelectedQuestion: () => Question | null;
  resetSelectedQuestion: () => void;
  resetStore: () => void;
  codeLang: { id: number; name: string };
  codeTemp: string;
  setCodeLang: (id: number) => void;
};

const initialState = {
  questions: null,
  selectedQuestionId: undefined,
  codeLang: codeLangs.find((lang) => lang.id === 71) || {
    id: 71,
    name: "defaultLang",
  },
  codeTemp:
    langTemp[
      langMap[
        codeLangs.find((lang) => lang.id === 71)?.name as keyof typeof langMap
      ]
    ] || "",
};

const useQuestionStore = create<QuestionStore>()(
  devtools((set, get) => ({
    ...initialState,
    setQuestions: (questions: Question[]) =>
      set({ questions }, false, "setQuestions"),
    setSelectedQuestionId: (id: Id<"questions">) =>
      set({ selectedQuestionId: id }, false, "setSelectedQuestionId"),
    getSelectedQuestion: () => {
      const { questions, selectedQuestionId } = get();
      return questions?.find((q) => q._id === selectedQuestionId) || null;
    },
    resetSelectedQuestion: () =>
      set({ selectedQuestionId: undefined }, false, "resetSelectedQuestion"),
    resetStore: () => set(initialState, false, "resetStore"),
    setCodeLang: (id: number) => {
      const selectedLang = codeLangs.find((lang) => lang.id === id);
      if (selectedLang) {
        const langName = selectedLang.name as keyof typeof langMap;

        set(
          {
            codeLang: selectedLang,
            codeTemp: langTemp[langMap[langName]],
          },
          false,
          "setCodeLang"
        );
      }
    },
  }))
);

export default useQuestionStore;
