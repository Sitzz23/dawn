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
import { api } from "../../../../convex/_generated/api";
import { useSocket } from "@/lib/socketProvider";
import { useUser } from "@clerk/nextjs";

const Lobby = () => {
  const { isConnected } = useSocket();
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
          <CardTitle>Lobby</CardTitle>
          <CardDescription>
            {isConnected
              ? `${user?.emailAddresses[0].emailAddress} and ${user?.id}`
              : " not connected"}
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
