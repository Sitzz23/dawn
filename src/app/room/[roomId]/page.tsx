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
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Badge } from "@/components/ui/badge";
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
import { ChevronLeft, Clipboard, Mail } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlayerCard } from "@/components/room/lobby/playerCard";
import useApiMutation from "@/hooks/useApiMutation";

const Lobby = () => {
  const router = useRouter();
  const { user } = useUser();
  const pathname = usePathname();
  const roomId = getRoomId(pathname);
  const roomCode = getRoomCode(pathname);
  const lobbyData = useQuery(api.lobby.getLobbyDetails, roomId as any);
  const { mutate } = useApiMutation(api.room.removePlayerFromRoom);

  const userDetails = useQuery(api.user.getUserDetails, {
    userIds: lobbyData?.playerIds || [],
  });

  function getRoomId(path: string | null) {
    if (path && path.startsWith("/room/")) {
      return { roomId: path.slice(6) };
    }
    return null;
  }

  function getRoomCode(path: string | null) {
    if (path && path.startsWith("/room/")) {
      return path.slice(6);
    }
    return null;
  }

  const startRoom = () => {
    router.replace(`/room/${roomCode}/workspace`);
  };

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId.roomId);
      toast.success("Room code copied to clipboard!");
    }
  };

  const mailRoomId = () => {
    toast.info("Feature is in development!");
  };

  return (
    <div className="h-screen flex items-center justify-center w-screen relative">
      <Button
        variant={"outline"}
        className="absolute top-4 left-4"
        onClick={() => {
          // console.log(roomCode);
          mutate({ roomCode }).then(() => {
            router.replace("/dashboard");
          });
        }}
      >
        <ChevronLeft size={15} />
        &nbsp;Leave
      </Button>
      <Card className="w-[50%]">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <p className="font-heading">Lobby for {lobbyData?.name}</p>
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
        {userDetails && userDetails.length > 0 && lobbyData ? (
          <CardContent className="grid grid-cols-2 gap-6">
            {userDetails.map((player) => (
              <PlayerCard
                key={player.tokenIdentifier}
                player={player}
                isHost={player.tokenIdentifier === lobbyData?.hostId}
                user={user}
              />
            ))}
          </CardContent>
        ) : (
          <CardContent className="grid grid-cols-2 gap-6">
            <Card className="">
              <CardContent className="flex items-center p-4">
                <Skeleton className="h-10 w-10 mr-4 rounded-full" />
                <div className="flex-grow space-y-2">
                  <Skeleton className="h-[18px] w-[150px]" />
                  <Skeleton className="h-[18px] w-[70px]" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <Skeleton className="h-10 w-10 mr-4 rounded-full" />
                <div className="flex-grow space-y-2">
                  <Skeleton className="h-[18px] w-[150px]" />
                  <Skeleton className="h-[18px] w-[70px]" />
                </div>
              </CardContent>
            </Card>
          </CardContent>
        )}

        <CardFooter className="flex justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Battlepass</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 " align="end">
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
              <DropdownMenuItem
                onClick={() => {
                  mailRoomId();
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                <span>Email</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {user?.id === lobbyData?.hostId ? (
            <Button
              className="font-urban font-bold"
              onClick={() => startRoom()}
            >
              Start battle
            </Button>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="hover:cursor-not-allowed">
                    <Button className="font-urban font-bold" disabled>
                      Start battle
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Wait for host to start the battle
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Lobby;
