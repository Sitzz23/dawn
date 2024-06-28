import { NextApiResponseServerIo } from "@/lib/types";
import { NextApiRequest } from "next";
import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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

    io.on("connection", (socket) => {
      socket.on("join-room", async (roomId, userId) => {
        socket.join(roomId);
        await convex.mutation(api.room.addPlayerToRoom, { roomId });
        io.to(roomId).emit("player-joined", userId);
      });

      socket.on("leave-room", async (roomId, userId) => {
        socket.leave(roomId);
        await convex.mutation(api.room.removePlayerFromRoom, {
          roomId,
        });
        io.to(roomId).emit("player-left", userId);
      });

      // Keep your existing socket event handlers
      socket.on("create-room", (fileId) => {
        socket.join(fileId);
      });
      socket.on("send-changes", (deltas, fileId) => {
        console.log("CHANGE");
        socket.to(fileId).emit("receive-changes", deltas, fileId);
      });
      socket.on("send-cursor-move", (range, fileId, cursorId) => {
        socket.to(fileId).emit("receive-cursor-move", range, fileId, cursorId);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
