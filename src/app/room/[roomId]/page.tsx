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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Clipboard, Mail } from "lucide-react";
import { toast } from "sonner";

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

  const userDetails = useQuery(api.user.getUserDetails, {
    userIds: lobbyData?.playerIds || [],
  });

  function getRoomId(path: string | null) {
    if (path && path.startsWith("/room/")) {
      return { roomId: path.slice(6) };
    }
    return null;
  }

  const PlayerCard: React.FC<{ player: UserData; isHost: boolean }> = ({
    player,
    isHost,
  }) => (
    <Card className="mb-2 ">
      <CardContent className="flex items-center p-4">
        <Avatar className="h-10 w-10 mr-4 z-10">
          <AvatarImage src={player.pictureUrl} alt={player.name} />
          <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          {isHost ? (
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent font-semibold">
              {player.name}
            </span>
          ) : (
            <p className="font-semibold">{player.name}</p>
          )}

          <p className="text-sm text-gray-500">Wins: {player.wins}</p>
        </div>
        <div className="flex flex-col items-end">
          {player.tokenIdentifier === user?.id && (
            <Badge variant="secondary" className="mb-1">
              You
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId.roomId);
      toast.success("Room code copied to clipboard!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center w-screen">
      <Card className="w-[50%]">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <p className="font-heading">Lobby</p>
            {lobbyData ? (
              <Badge variant={"secondary"} className="text-xs">
                {lobbyData.playerIds.length} / {lobbyData.maxPlayers}
              </Badge>
            ) : (
              <Skeleton className="rounded-full w-10 h-5" />
            )}
          </CardTitle>
          <CardDescription>Waiting area for players to join</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6">
          {userDetails && userDetails.length > 0 ? (
            userDetails.map((player) => (
              <PlayerCard
                key={player.tokenIdentifier}
                player={player}
                isHost={player.tokenIdentifier === lobbyData?.hostId}
              />
            ))
          ) : (
            <div>
              <Skeleton className="" />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Battlepass</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 ">
              <DropdownMenuLabel>Invite players</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  copyRoomId();
                }}
              >
                <Clipboard className="mr-2 h-4 w-4" />
                <span>Copy room code</span>
                <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                <span>Email</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Lobby;
