"use client";
import { useQuery } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../../../../convex/_generated/api";
import WorkspaceSidebar from "@/components/workspace/sidebar";

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
    <div className="h-screen w-full pl-[56px] flex">
      <WorkspaceSidebar />
      <div className="flex-1 flex flex-col w-full h-full">
        <WorkspaceHeader questionIds={lobbyData?.questions} />
        <main className="flex-1">
          <ResizablePanelGroup direction="horizontal" className="h-screen">
            <ResizablePanel defaultSize={38} minSize={30} className="p-4">
              <QuestionSide />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={62} className="p-4" minSize={55}>
              <EditorSide />
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </div>
  );
};

export default Workspace;
