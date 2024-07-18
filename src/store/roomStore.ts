import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { Id } from "../../convex/_generated/dataModel";

type Room = {
  _id: Id<"room">;
  _creationTime: number;
  name: string;
  visibility: "public" | "private";
  hostId: Id<"user">;
  playerIds: Id<"user">[];
  startedAt?: number;
  completedAt?: number;
  status: "waiting" | "in_progress" | "completed";
  maxPlayers: number;
  roomDuration: number;
  questionIds?: Id<"questions">[];
};

type RoomStore = {
  room: Room | null;
  setRoom: (room: Room) => void;
  updateRoom: (updates: Partial<Room>) => void;
  getQuestionIds: () => Id<"questions">[] | undefined;
  getRoomDuration: () => number | undefined;
  getRoom: () => Room | null;
};

const useRoomStore = create<RoomStore>()(
  devtools(
    persist(
      (set, get) => ({
        room: null,
        setRoom: (room: Room) => set({ room }, false, "setRoom"),
        updateRoom: (updates: Partial<Room>) =>
          set(
            (state) => ({
              room: state.room ? { ...state.room, ...updates } : null,
            }),
            false,
            "updateRoom"
          ),
        getQuestionIds: () => get().room?.questionIds,
        getRoomDuration: () => get().room?.roomDuration,
        getRoom: () => get().room,
      }),
      {
        name: "room-storage",
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: "RoomStore" }
  )
);

export default useRoomStore;
