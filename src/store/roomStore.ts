import { create } from "zustand";
import { Id } from "../../convex/_generated/dataModel";

export type Room = {
  _id: Id<"room">;
  _creationTime: number;
  name: string;
  visibility: "public" | "private";
  hostId: string;
  playerIds: string[];
  startedAt?: number;
  completedAt?: number;
  status: "waiting" | "in_progress" | "completed";
  maxPlayers: number;
  roomDuration: number;
};
type RoomStore = {
  room: Room | null;
  setRoom: (room: Room | null) => void;
  updateRoom: (updates: Partial<Room>) => void;
  getRoomDuration: () => number | undefined;
};

// export const useRoomStore = create<RoomStore>((set, get) => ({
//   room: null,
//   setRoom: (room) => set({ room }),
//   updateRoom: (updates) =>
//     set((state) => ({
//       room: state.room ? { ...state.room, ...updates } : null,
//     })),
//   getRoomDuration: () => get().room?.roomDuration ?? null,
// }));

export const useRoomStore = create<RoomStore>((set, get) => ({
  room: null,
  setRoom: (room) => set({ room }),
  updateRoom: (updates) =>
    set((state) => ({
      room: state.room ? { ...state.room, ...updates } : null,
    })),
  getRoomDuration: () => get().room?.roomDuration,
}));
