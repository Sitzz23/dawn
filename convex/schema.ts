import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    name: v.string(),
    pictureUrl: v.string(),
    playerId: v.optional(v.string()),
    wins: v.number(),
    losses: v.number(),
    ties: v.number(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),

  room: defineTable({
    name: v.string(),
    // roomId: v.string(),
    visibility: v.union(v.literal("public"), v.literal("private")),
    hostId: v.string(),
    playerIds: v.array(v.string()),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    status: v.union(
      v.literal("waiting"),
      v.literal("in_progress"),
      v.literal("completed")
    ),
    maxPlayers: v.number(),
    difficulty: v.union(
      v.literal("easy"),
      v.literal("medium"),
      v.literal("hard")
    ),
    roomDuration: v.number(),
  }),
});
