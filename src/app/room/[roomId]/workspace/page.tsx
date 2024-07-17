"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { Clock } from "lucide-react";
import React, { useEffect } from "react";
import { api } from "../../../../../convex/_generated/api";
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
import useRoomStore from "@/store/roomStore";
import WorkspaceHeader from "@/components/workspace/header";

const Workspace = ({ params: { roomId } }: { params: { roomId: string } }) => {
  const lobbyData = useQuery(api.lobby.getLobbyDetails, { roomId } as any);
  const setRoom = useRoomStore((state) => state.setRoom);

  useEffect(() => {
    if (lobbyData) setRoom(lobbyData);
  }, [lobbyData, setRoom]);

  return (
    <div className="max-h-screen w-full pl-[56px] flex">
      <WorkspaceSidebar />
      <div className="flex-1 flex flex-col w-full h-full">
        <WorkspaceHeader questionIds={lobbyData?.questions} />
        <main className="flex-1">
          <ResizablePanelGroup direction="horizontal" className="h-screen">
            <ResizablePanel defaultSize={35} minSize={20} className="p-4">
              <QuestionSide />
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
