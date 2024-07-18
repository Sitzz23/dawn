import React from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Bot,
  Code2,
  Crown,
  LifeBuoy,
  SquareTerminal,
  SquareUser,
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useRoomStore from "@/store/roomStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IconPhCrownSimpleFill } from "../shared/crownIcon";

const WorkspaceSidebar = () => {
  const { room } = useRoomStore();
  const playersDetails = useQuery(api.user.getPlayersDetails, {
    playersIds: room?.playerIds || [],
  });
  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <p className="text-2xl">✦</p>
        </Button>
      </div>
      {/* <nav className="grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Playground"
            >
              <SquareTerminal className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Playground
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Models"
            >
              <Bot className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Models
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="API"
            >
              <Code2 className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            API
          </TooltipContent>
        </Tooltip>
      </nav> */}
      {/* <nav className="mt-auto grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mt-auto rounded-lg"
              aria-label="Help"
            >
              <LifeBuoy className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Help
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mt-auto rounded-lg"
              aria-label="Account"
            >
              <SquareUser className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Account
          </TooltipContent>
        </Tooltip>
      </nav> */}
      <nav className="flex flex-col items-center gap-4 py-4 mx-2">
        {playersDetails?.map((player, index) => (
          <Tooltip key={index}>
            <TooltipTrigger className="relative">
              {player._id === room?.hostId && (
                <IconPhCrownSimpleFill
                  height={15}
                  className="top-[0px] left-[0px] rotate-[-20deg] "
                />
              )}
              <Avatar className="h-8 w-8">
                <AvatarImage src={player.pictureUrl} alt={player.name} />
                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              {player.name}
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </aside>
  );
};

export default WorkspaceSidebar;
