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

import { useUser } from "@clerk/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { convex } from "@/lib/convexHttpClient";
import { Button } from "@/components/ui/button";

interface UserData {
  tokenIdentifier: string;
  name: string;
  pictureUrl: string;
  wins: number;
}

const Lobby = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const roomId = getRoomId(pathname);
  const lobbyData = useQuery(api.lobby.getLobbyDetails, roomId as any);

  const [userDetails, setUserDetails] = useState<UserData[]>([]);

  // const userDetails = useQuery(api.user.getUserDetails, {
  //   userIds: lobbyData?.playerIds || [],
  // });

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     if (lobbyData?.playerIds) {
  //       try {
  //         console.log("id hai re baba", lobbyData.playerIds);
  //         const newUserDetails = await convex.query(api.user.getUserDetails, {
  //           userIds: lobbyData.playerIds,
  //         });
  //         console.log("details hai re baba", newUserDetails);
  //         setUserDetails(newUserDetails);
  //       } catch (error) {
  //         console.error("Error fetching user details:", error);
  //       }
  //     }
  //   };

  //   fetchUserDetails();
  // }, [lobbyData]);

  function getRoomId(path: string | null) {
    if (path && path.startsWith("/room/")) {
      return { roomId: path.slice(6) };
    }
    return null;
  }

  if (!lobbyData) {
    return <div>Loading...</div>;
  }

  async function getDetails() {
    if (lobbyData) {
      console.log("id hai re baba", lobbyData.playerIds);
      const newUserDetails = await convex.query(api.user.getUserDetails, {
        userIds: lobbyData.playerIds,
      });
      console.log("details hai re baba", newUserDetails);
      setUserDetails(newUserDetails);
    }
  }

  const PlayerCard: React.FC<{ player: UserData; isHost: boolean }> = ({
    player,
    isHost,
  }) => (
    <Card className="mb-2">
      <CardContent className="flex items-center p-4">
        <Avatar className="h-10 w-10 mr-4">
          <AvatarImage src={player.pictureUrl} alt={player.name} />
          <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="font-semibold">{player.name}</p>
          <p className="text-sm text-gray-500">Wins: {player.wins}</p>
        </div>
        <div className="flex flex-col items-end">
          {player.tokenIdentifier === user?.id && (
            <Badge variant="secondary" className="mb-1">
              You
            </Badge>
          )}
          {isHost && <Badge variant="default">Host</Badge>}
        </div>
      </CardContent>
    </Card>
  );

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
          {userDetails && userDetails.length > 0 ? (
            userDetails.map((player) => (
              <PlayerCard
                key={player.tokenIdentifier}
                player={player}
                isHost={player.tokenIdentifier === lobbyData.hostId}
              />
            ))
          ) : (
            <div>no data</div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              getDetails();
            }}
          >
            details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Lobby;
