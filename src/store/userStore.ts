import { create } from "zustand";
import { Id } from "../../convex/_generated/dataModel";

interface UserState {
  user: {
    _id: Id<"user">;
    name: string;
    pictureUrl: string;
    playerId?: string;
    wins: number;
    losses: number;
    ties: number;
    tokenIdentifier: string;
  } | null;
  setUser: (user: UserState["user"]) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
