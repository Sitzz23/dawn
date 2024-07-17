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
    playerIds: v.array(v.id("user")),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    status: v.union(
      v.literal("waiting"),
      v.literal("in_progress"),
      v.literal("completed")
    ),
    maxPlayers: v.number(),
    roomDuration: v.number(),
    questions: v.optional(v.array(v.id("questions"))),
  }),

  questions: defineTable({
    title: v.string(),
    tags: v.array(v.string()),
    problemStatement: v.string(),
    testCases: v.array(
      v.object({
        input: v.string(),
        output: v.string(),
      })
    ),
    constraints: v.optional(v.array(v.string())),
    difficulty: v.string(),
    examples: v.array(
      v.object({
        input: v.string(),
        output: v.string(),
        explanation: v.string(),
      })
    ),
    submissions: v.optional(v.array(v.id("submission"))),
    viewers: v.optional(v.array(v.id("user"))),
  }),
});
