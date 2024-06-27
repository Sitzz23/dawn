import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createRoom = mutation({
  args: { roomId: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorised");
    }

    const room = await ctx.db.insert("room", {
      name: args.name,
      roomId: args.roomId,
      hostId: identity.subject,
      playerIds: [identity.subject],
      status: "waiting",
    });

    return room;
  },
});
