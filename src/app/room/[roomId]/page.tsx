"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useSocket } from "@/lib/socketProvider";
import { useUser } from "@clerk/nextjs";

const Lobby = () => {
  const { socket, isConnected } = useSocket();
  const { user } = useUser();
  const pathname = usePathname();
  const [error, setError] = useState<string | null>(null);

  const roomId = getRoomId(pathname);
  const lobbyData = useQuery(api.lobby.getLobbyDetails, roomId as any);

  function getRoomId(path: string | null) {
    if (path && path.startsWith("/room/")) {
      return { roomId: path.slice(6) };
    }
    return null;
  }

  useEffect(() => {
    if (socket && isConnected && user && roomId) {
      socket.emit("join-room", roomId.roomId, user.id);

      const onPlayerJoined = (userId: string) => {
        console.log("Player joined:", userId);
        // The lobby data will update automatically via Convex
      };

      const onPlayerLeft = (userId: string) => {
        console.log("Player left:", userId);
        // The lobby data will update automatically via Convex
      };

      socket.on("player-joined", onPlayerJoined);
      socket.on("player-left", onPlayerLeft);

      return () => {
        socket.emit("leave-room", roomId.roomId, user.id);
        socket.off("player-joined", onPlayerJoined);
        socket.off("player-left", onPlayerLeft);
      };
    }
  }, [socket, isConnected, user, roomId]);

  if (!lobbyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Lobby</CardTitle>
          <CardDescription>
            {isConnected ? "  connected bhia" : " not connected"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">Connected Players:</h3>
          <ul className="list-disc pl-5">
            {lobbyData.playerIds.map((playerId) => (
              <li key={playerId}>{playerId === user?.id ? "You" : playerId}</li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <p>
            {lobbyData.playerIds.length} / {lobbyData.maxPlayers} Players
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Lobby;
