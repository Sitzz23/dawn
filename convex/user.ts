import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    const user = await ctx.db
      .query("user")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();

    if (user !== null) {
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }

    return await ctx.db.insert("user", {
      name: identity.name!,
      tokenIdentifier: identity.subject,
      pictureUrl: identity.pictureUrl!,
      wins: 0,
      losses: 0,
      ties: 0,
    });
  },
});

// export const getPlayersDetails = query({
//   args: { playersIds: v.array(v.string()) },
//   handler: async (ctx, args) => {
//     console.log("Received userIds:", args.playersIds);

//     const results = await ctx.db
//       .query("user")
//       .filter((q) =>
//         args.playersIds.reduce(
//           (acc, userId) => q.or(acc, q.eq(q.field("tokenIdentifier"), userId)),
//           q.eq(q.field("tokenIdentifier"), "")
//         )
//       )
//       // .order("desc")
//       .collect();

//     console.log("Query results:", results);

//     if (results.length !== args.playersIds.length) {
//       console.warn(
//         `Mismatch: Found ${results.length} users for ${args.playersIds.length} userIds`
//       );
//     }

//     return results;
//   },
// });

export const getPlayersDetails = query({
  args: { playersIds: v.array(v.id("user")) },
  handler: async (ctx, args) => {
    const { playersIds } = args;

    if (!playersIds) {
      throw new Error("No players joined!");
    }

    const questionsPromises = playersIds.map((id) => ctx.db.get(id));
    const questions = await Promise.all(questionsPromises);

    const validQuestions = questions.filter((q) => q !== null);

    return validQuestions;
  },
});
