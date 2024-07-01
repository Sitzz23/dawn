import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getLobbyDetails = query({
  args: { roomId: v.id("room") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.roomId);
    if (!room) {
      throw new Error("Room not found");
    }
    return room;
  },
});

export const startRoom = mutation({
  args: { roomId: v.id("room") },
  handler: async (ctx, { roomId }) => {
    const room = await ctx.db.get(roomId);

    if (!room) {
      throw new Error("Room not found");
    }

    if (room.status !== "waiting") {
      throw new Error("Room is not in waiting status");
    }

    const now = Date.now();

    const updatedRoom = await ctx.db.patch(roomId, {
      status: "in_progress",
      startedAt: now,
    });

    return updatedRoom;
  },
});
