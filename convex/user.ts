import { mutation } from "./_generated/server";

export const addUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    const user = await ctx.db
      .query("user")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (user !== null) {
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }

    return await ctx.db.insert("user", {
      name: identity.name!,
      tokenIdentifier: identity.tokenIdentifier,
      pictureUrl: identity.pictureUrl!,
      wins: 0,
      losses: 0,
      ties: 0,
    });
  },
});
