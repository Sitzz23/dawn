import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { Id } from "../../convex/_generated/dataModel";
import { Question } from "./questionsStore";

type UserStore = {
  currentUserId: Id<"user"> | null;
  setCurrentUserId: (id: Id<"user">) => void;
  selectedQuestionId: Id<"questions"> | undefined;
  setSelectedQuestionId: (id: Id<"questions">) => void;
  getSelectedQuestion: () => Question | null;
  questions: Question[] | null;
  addQuestion: (question: Question) => void;
};

const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set, get) => ({
        currentUserId: null,
        questions: null,
        selectedQuestionId: undefined,
        setCurrentUserId: (id: Id<"user">) =>
          set({ currentUserId: id }, false, "setCurrentUserId"),
        setSelectedQuestionId: (id: Id<"questions">) =>
          set({ selectedQuestionId: id }, false, "setSelectedQuestionId"),
        getSelectedQuestion: () => {
          const { questions, selectedQuestionId } = get();
          return questions?.find((q) => q._id === selectedQuestionId) || null;
        },
        addQuestion: (question: Question) => {
          const { questions } = get();
          set(
            { questions: questions ? [...questions, question] : [question] },
            false,
            "addQuestion"
          );
        },
      }),
      {
        name: "user-storage",
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: "UserStore" }
  )
);

export default useUserStore;
