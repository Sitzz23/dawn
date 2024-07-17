import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { Id } from "../../convex/_generated/dataModel";

type UserStore = {
  currentUserId: Id<"user"> | null;
  setCurrentUserId: (id: Id<"user">) => void;
};

const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        currentUserId: null,
        setCurrentUserId: (id: Id<"user">) =>
          set({ currentUserId: id }, false, "setCurrentUserId"),
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
