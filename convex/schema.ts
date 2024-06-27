import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    name: v.string(),
    pictureUrl: v.string(),
    playerId: v.string(),
  }),

  room: defineTable({
    name: v.string(),
    hostId: v.id("user"),
    playerIds: v.array(v.id("user")),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    status: v.union(
      v.literal("waiting"),
      v.literal("in_progress"),
      v.literal("completed")
    ),
  }),
});
