"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { Clock } from "lucide-react";
import React, { useEffect } from "react";
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
import QuestionSide from "@/components/workspace/questionsSide/questionsSide";
import EditorSide from "@/components/workspace/codeEditor/editorSide";
import { useRoomStore } from "@/store/roomStore";

const Workspace = ({ params: { roomId } }: { params: { roomId: string } }) => {
  const lobbyData = useQuery(api.lobby.getLobbyDetails, { roomId } as any);
  const setRoom = useRoomStore((state) => state.setRoom);
  const { user } = useUser();

  useEffect(() => {
    if (lobbyData) setRoom(lobbyData);
  }, [lobbyData, setRoom]);

  return (
    <div className="max-h-screen w-full pl-[56px] flex">
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
          <ResizablePanelGroup direction="horizontal" className="max-h-screen">
            <ResizablePanel
              defaultSize={35}
              minSize={20}
              className="p-4 overflow-y-auto"
            >
              {lobbyData ? (
                <QuestionSide roomDuration={lobbyData.roomDuration} />
              ) : (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              )}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={65} className="p-4" minSize={50}>
              <EditorSide />
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </div>
  );
};

export default Workspace;
