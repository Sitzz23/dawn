"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
import {
  ChevronLeft,
  Clipboard,
  Eye,
  EyeOff,
  Mail,
  Scroll,
  Swords,
} from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlayerCard } from "@/components/room/lobby/playerCard";
import { convex } from "@/lib/convexHttpClient";
import useRoomStore from "@/store/roomStore";
import { Question } from "@/store/questionsStore";
import { Id } from "../../../../convex/_generated/dataModel";
import useUserStore from "@/store/userStore";
import GlassCard from "@/components/shared/glassCard";
import GradientText from "@/components/shared/layout/gradientText";
import BackdropGradient from "@/components/shared/backdropGradient";

const Lobby = ({ params: { roomId } }: { params: { roomId: Id<"room"> } }) => {
  const router = useRouter();
  const { user } = useUser();
  const lobbyData = useQuery(api.lobby.getLobbyDetails, { roomId });
  const mutate = useMutation(api.room.removePlayerFromRoom);
  const setRoom = useRoomStore((state) => state.setRoom);
  const { currentUserId } = useUserStore();
  const getRoomStatus = useQuery(api.room.getRoomStatus, { roomId });

  useEffect(() => {
    if (getRoomStatus === "in_progress") {
      router.replace(`/room/${roomId}/workspace`);
    }
  }, [getRoomStatus, roomId, router]);

  useEffect(() => {
    lobbyData && setRoom(lobbyData);
  }, [currentUserId, lobbyData, setRoom]);

  const playersDetails = useQuery(api.user.getPlayersDetails, {
    playersIds: lobbyData?.playerIds || [],
  });

  const startRoom = async () => {
    const questions = await convex.query(api.workspace.getRandomQuestions, {
      roomDuration: lobbyData?.roomDuration!,
    });

    if (questions && questions.length > 0) {
      // Extract only the question IDs
      const questionIds = questions.map((question: Question) => question._id);

      convex.mutation(api.lobby.startRoom, {
        roomId,
        questions: questionIds,
      });

      router.replace(`/room/${roomId}/workspace`);
    } else {
      toast.error("Error creating the requested room!");
    }
  };

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
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
          if (currentUserId) {
            console.log(roomId);
            mutate({
              roomId,
              playerId: currentUserId,
            }).then(() => {
              router.replace("/dashboard");
            });
          }
        }}
      >
        <ChevronLeft size={15} />
        &nbsp;Leave
      </Button>
      <div className="absolute p-2 px-4 text-sm rounded-md top-4 right-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground ">
        {lobbyData?.visibility == "private" ? (
          <div className="flex items-center justify-center gap-2">
            <EyeOff size={15} />
            <span>Private</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Eye size={15} />
            <span>Public</span>
          </div>
        )}
      </div>
      <BackdropGradient
        className="w-4/12 h-2/6 opacity-60"
        container="flex flex-col items-center"
      >
        <GlassCard className="w-[50%]">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <GradientText className="font-heading pb-1" element="H2">
                Lobby for {lobbyData?.name}
              </GradientText>
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
          {playersDetails && playersDetails.length > 0 && lobbyData ? (
            <CardContent className="grid grid-cols-2 gap-6">
              {playersDetails.map((player, index) => (
                <PlayerCard
                  key={index}
                  player={player}
                  isHost={player._id === lobbyData?.hostId}
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
                <Button variant="outline">
                  <Scroll className="mr-2 h-4 w-4" /> Battlepass
                </Button>
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
            {currentUserId === lobbyData?.hostId ? (
              <Button
                className="font-urban font-bold"
                onClick={() => startRoom()}
              >
                <Swords className="mr-2 h-4 w-4" />
                Start battle
              </Button>
            ) : (
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
            )}
          </CardFooter>
        </GlassCard>
      </BackdropGradient>
    </div>
  );
};

export default Lobby;
