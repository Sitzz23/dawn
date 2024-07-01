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
      s.on("join-room", async (roomId) => {
        console.log(`User joining room ${roomId}`);
        try {
          await convex.mutation(api.room.addPlayerToRoom, { roomId });
          s.join(roomId);
          // console.log(`User ${userId} successfully joined room ${roomId}`);
        } catch (error) {
          console.error("Error joining room:", error);
        }
      });

      s.on("leave-room", async (roomId) => {
        s.leave(roomId);
        await convex.mutation(api.room.removePlayerFromRoom, {
          roomId,
        } as any);
        console.log(`User successfully left room ${roomId}`);
        io.to(roomId).emit("player-left");
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
