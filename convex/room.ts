import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { v4 as uuidv4 } from "uuid";

export const createRoom = mutation({
  args: {
    battleName: v.string(),
    maxPlayers: v.number(),
    difficulty: v.union(
      v.literal("easy"),
      v.literal("medium"),
      v.literal("hard")
    ),
    roomDuration: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorised");
    }

    const room = await ctx.db.insert("room", {
      name: args.battleName,
      roomId: uuidv4(),
      hostId: identity.subject,
      playerIds: [identity.subject],
      status: "waiting",
      maxPlayers: args.maxPlayers,
      difficulty: args.difficulty,
      roomDuration: args.roomDuration,
    });

    return room;
  },
});
