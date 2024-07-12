import { create } from "zustand";
import { Id } from "../../convex/_generated/dataModel";

interface RoomState {
  room: {
    _id: Id<"room">;
    name: string;
    visibility: "public" | "private";
    hostId: string;
    playerIds: string[];
    startedAt?: number;
    completedAt?: number;
    status: "waiting" | "in_progress" | "completed";
    maxPlayers: number;
    difficulty: "easy" | "medium" | "hard";
    roomDuration: number;
  } | null;
  setRoom: (room: RoomState["room"]) => void;
}

const useRoomStore = create<RoomState>((set) => ({
  room: null,
  setRoom: (room) => set({ room }),
}));

export default useRoomStore;
