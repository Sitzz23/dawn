import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Clock } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import RoomTimer from "./timer";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import useQuestionStore from "@/store/questionsStore";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import useRoomStore from "@/store/roomStore";

const WorkspaceHeader = ({
  questionIds,
}: {
  questionIds: Id<"questions">[] | undefined;
}) => {
  const questionData = useQuery(api.workspace.fetchQuestionsByIds, {
    questionIds,
  });
  const { room } = useRoomStore();
  const setQuestions = useQuestionStore((state) => state.setQuestions);

  useEffect(() => {
    console.log("lbdata", questionData);
    if (questionData) setQuestions(questionData);
  }, [questionData, setQuestions]);

  return (
    <header className="flex h-[57px] items-center gap-1  bg-background pl-4 pr-2 justify-between">
      {/* <h1 className="text-xl font-semibold">
            {user?.firstName}&apos;s workspace
          </h1> */}
      {room && room.startedAt ? (
        <RoomTimer
          serverTimestamp={room.startedAt}
          roomDuration={room.roomDuration}
          roomId={room._id}
        />
      ) : (
        <Button variant="outline" aria-label="Home" className="">
          <Clock size={22} className="pr-2" />
          <Skeleton className="w-10 h-6" />
        </Button>
      )}
    </header>
  );
};

export default WorkspaceHeader;