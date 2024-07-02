import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getWorkspaceDetails = query({
  args: { roomId: v.id("room") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.roomId);
    if (!room) {
      throw new Error("Room not found");
    }
    return room;
  },
});

export const endRoom = mutation({
  args: { roomId: v.id("room") },
  handler: async (ctx, { roomId }) => {
    const room = await ctx.db.get(roomId);

    if (!room) {
      throw new Error("Room not found");
    }

    if (room.status === "completed") {
      throw new Error("Room is already completed");
    }

    const now = Date.now();

    const updatedRoom = await ctx.db.patch(roomId, {
      status: "completed",
      completedAt: now,
    });

    return updatedRoom;
  },
});
