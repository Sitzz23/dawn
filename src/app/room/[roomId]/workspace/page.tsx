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
import EditorSide from "@/components/workspace/codeEditor/editorSide";
import useRoomStore from "@/store/roomStore";
import WorkspaceHeader from "@/components/workspace/header";
import QuestionDisplay from "@/components/workspace/questionsSide/questions";
import TestCase from "@/components/workspace/questionsSide/testCase";

const Workspace = ({ params: { roomId } }: { params: { roomId: string } }) => {
  const lobbyData = useQuery(api.lobby.getLobbyDetails, { roomId } as any);
  const setRoom = useRoomStore((state) => state.setRoom);

  useEffect(() => {
    if (lobbyData) setRoom(lobbyData);
  }, [lobbyData, setRoom]);

  return (
    <div className="h-screen w-full pl-[56px] flex overflow-hidden pb-2">
      <WorkspaceSidebar />
      <div className="flex-1 flex flex-col w-full h-full">
        <WorkspaceHeader questionIds={lobbyData?.questions} />
        <main className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={38} minSize={30} className="pr-1 pt-1">
              <ResizablePanelGroup direction={"vertical"}>
                <ResizablePanel defaultSize={75} minSize={40} className="pb-1">
                  <QuestionDisplay />
                </ResizablePanel>
                <ResizableHandle
                  withHandle
                  className="opacity-0 hover:opacity-100 transition-opacity duration-100"
                />
                <ResizablePanel defaultSize={25} minSize={20} className="pt-1">
                  <TestCase />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle
              withHandle
              className="opacity-0 hover:opacity-100 transition-opacity duration-100"
            />
            <ResizablePanel defaultSize={62} className="pl-1 pt-1" minSize={45}>
              <EditorSide />
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </div>
  );
};

export default Workspace;
