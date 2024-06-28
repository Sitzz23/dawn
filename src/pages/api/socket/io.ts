import { NextApiResponseServerIo } from "@/lib/types";
import { NextApiRequest } from "next";
import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { api } from "../../../../convex/_generated/api";
import { convex } from "@/lib/convexHttpClient";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on("connection", (s) => {
      console.log("New client connected");
      s.on("join-room", async (roomId, userId) => {
        console.log(`User ${userId} joining room ${roomId}`);
        try {
          await convex.mutation(api.room.addPlayerToRoom, { roomId, userId });
          s.join(roomId);
          io.to(roomId).emit("player-joined", userId);
          console.log(`User ${userId} successfully joined room ${roomId}`);
        } catch (error) {
          console.error("Error joining room:", error);
          console.error("Error joining room:", error);
          // socket.emit("error", error.message);
        }
      });

      s.on("leave-room", async (roomId, userId) => {
        s.leave(roomId);
        await convex.mutation(api.room.removePlayerFromRoom, {
          roomId,
          userId,
        });
        io.to(roomId).emit("player-left", userId);
      });

      s.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export default ioHandler;
