"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRoomId } from "@/hooks/useRoomId";
import { Bot, Code2, LifeBuoy, SquareTerminal, SquareUser } from "lucide-react";
import React from "react";

const Workspace = () => {
  const roomId = useRoomId();

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <p className="text-2xl">✦</p>
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
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
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
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
        </nav>
      </aside>
    </div>
  );
};

export default Workspace;
