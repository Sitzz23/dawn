import { nanoid } from "@/lib/nanoId";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createRoom = mutation({
  args: {
    battleName: v.string(),
    maxPlayers: v.number(),
    roomDuration: v.number(),
    visibility: v.union(v.literal("public"), v.literal("private")),
    playerIds: v.array(v.id("user")),
  },
  handler: async (ctx, args) => {
    // const roomId = nanoid();

    if (!args.playerIds) {
      throw new Error("Unauthorised");
    }

    const room = await ctx.db.insert("room", {
      // roomId: roomId,
      name: args.battleName,
      hostId: args.playerIds[0],
      playerIds: args.playerIds,
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
  args: { roomId: v.id("room"), userId: v.id("user") },
  handler: async (ctx, args) => {
    const { userId } = args;
    const room = await ctx.db.get(args.roomId);
    if (!room) throw new Error("Room not found");
    if (!userId) throw new Error("User not found");

    const isUserInRoom = room.playerIds.includes(userId);

    if (room.playerIds.length >= room.maxPlayers && !isUserInRoom) {
      throw new Error("Room is full");
    }

    if (room.status !== "waiting") {
      throw new Error("Battle has already started!");
    }

    const updatedPlayerIds = room.playerIds.includes(userId)
      ? room.playerIds
      : [...room.playerIds, userId];

    return await ctx.db.patch(args.roomId, {
      playerIds: updatedPlayerIds,
    });
  },
});

export const removePlayerFromRoom = mutation({
  args: { roomId: v.id("room"), playerId: v.id("user") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.roomId);

    if (!room) throw new Error("Room not found");
    if (!args.playerId) throw new Error("User not found");

    const updatedPlayerIds = room.playerIds.filter(
      (id) => id !== args.playerId
    );

    return await ctx.db.patch(args.roomId, {
      playerIds: updatedPlayerIds,
    });
  },
});
