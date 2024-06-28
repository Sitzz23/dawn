import { query } from "./_generated/server";
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
