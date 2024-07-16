import { nanoid } from "@/lib/nanoId";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createRoom = mutation({
  args: {
    battleName: v.string(),
    maxPlayers: v.number(),
    roomDuration: v.number(),
    visibility: v.union(v.literal("public"), v.literal("private")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    // const roomId = nanoid();

    if (!identity) {
      throw new Error("Unauthorised");
    }

    const room = await ctx.db.insert("room", {
      // roomId: roomId,
      name: args.battleName,
      hostId: identity.subject,
      playerIds: [identity.subject],
      status: "waiting",
      maxPlayers: args.maxPlayers,
      roomDuration: args.roomDuration,
      visibility: args.visibility,
    });

    return room;
  },
});

export const getRoomStatus = query({
  args: { roomId: v.id("room") },
  handler: async (ctx, args) => {
    const roomStatus = await ctx.db
      .get(args.roomId)
      .then((room) => room?.status);
    if (roomStatus === undefined) {
      throw new Error("Room not found");
    }

    return roomStatus;
  },
});

export const addPlayerToRoom = mutation({
  args: { roomId: v.id("room") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const room = await ctx.db.get(args.roomId);
    if (!room) throw new Error("Room not found");
    if (!identity) throw new Error("User not found");

    const isUserInRoom = room.playerIds.includes(identity.subject);

    if (room.playerIds.length >= room.maxPlayers && !isUserInRoom) {
      throw new Error("Room is full");
    }

    if (room.status !== "waiting") {
      throw new Error("Battle has already started!");
    }

    const updatedPlayerIds = room.playerIds.includes(identity.subject)
      ? room.playerIds
      : [...room.playerIds, identity.subject];

    return await ctx.db.patch(args.roomId, {
      playerIds: updatedPlayerIds,
    });
  },
});

export const removePlayerFromRoom = mutation({
  args: { roomId: v.id("room") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const room = await ctx.db.get(args.roomId);

    if (!room) throw new Error("Room not found");
    if (!identity) throw new Error("User not found");

    const updatedPlayerIds = room.playerIds.filter(
      (id) => id !== identity.subject
    );

    return await ctx.db.patch(args.roomId, {
      playerIds: updatedPlayerIds,
    });
  },
});
