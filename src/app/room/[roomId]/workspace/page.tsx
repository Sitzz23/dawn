"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";

import { Clock } from "lucide-react";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import RoomTimer from "@/components/workspace/timer";
import WorkspaceSidebar from "@/components/workspace/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Workspace = ({ params: { roomId } }: { params: { roomId: string } }) => {
  const lobbyData = useQuery(api.lobby.getLobbyDetails, { roomId } as any);
  const { user } = useUser();

  return (
    <div className="h-screen w-full pl-[56px] flex">
      <WorkspaceSidebar />
      <div className="flex-1 flex flex-col w-full h-full">
        <header className="flex h-[57px] items-center gap-1 border-b bg-background pl-4 pr-2 justify-between">
          <h1 className="text-xl font-semibold">
            {user?.firstName}&apos;s workspace
          </h1>
          {lobbyData && lobbyData.startedAt ? (
            <RoomTimer
              serverTimestamp={lobbyData.startedAt}
              roomDuration={lobbyData.roomDuration}
              roomId={roomId}
            />
          ) : (
            <Button variant="outline" aria-label="Home" className="">
              <Clock size={22} className="pr-2" />
              <Skeleton className="w-10 h-6" />
            </Button>
          )}
        </header>
        <main className="flex-1">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={25} minSize={20} className="p-4">
              <div className="flex h-full items-center justify-center p-2 rounded-lg ">
                <span className="font-semibold">Questions</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75} className="p-4">
              <div className="flex h-full items-center justify-center p-2 rounded-lg ">
                <span className="font-semibold">Code editor</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </div>
  );
};

export default Workspace;
