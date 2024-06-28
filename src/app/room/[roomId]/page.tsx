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
import React from "react";

import { useUser } from "@clerk/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Badge } from "@/components/ui/badge";

const Lobby = () => {
  const { user } = useUser();
  const pathname = usePathname();

  const roomId = getRoomId(pathname);
  const lobbyData = useQuery(api.lobby.getLobbyDetails, roomId as any);

  function getRoomId(path: string | null) {
    if (path && path.startsWith("/room/")) {
      return { roomId: path.slice(6) };
    }
    return null;
  }

  if (!lobbyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <p>Lobby</p>
            <Badge variant={"secondary"} className="text-xs">
              {lobbyData.playerIds.length} / {lobbyData.maxPlayers}
            </Badge>
          </CardTitle>
          <CardDescription>Waiting area for players to join</CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">Connected Players:</h3>
          <ul className="list-disc pl-5">
            {lobbyData.playerIds.map((playerId) => (
              <li key={playerId}>{playerId === user?.id ? "You" : playerId}</li>
            ))}
          </ul>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default Lobby;
