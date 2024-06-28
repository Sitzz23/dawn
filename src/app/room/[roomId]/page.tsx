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

type Props = {};

const Lobby = (props: Props) => {
  const pathname = usePathname();
  const lobbyData = useQuery(
    api.lobby.getLobbyDetails,
    getRoomId(pathname) as any
  );

  function getRoomId(path: string | null) {
    if (path)
      if (path.startsWith("/room/")) {
        const roomId = path.slice(6);
        return { roomId };
      }
    return null;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="">
        <CardHeader>
          <CardTitle>Lobby</CardTitle>
          <CardDescription>
            Waiting area for all players to join!
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Lobby;
