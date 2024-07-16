import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import QuestionDisplay from "./questions";

const QuestionSide = ({ roomDuration }: { roomDuration: number }) => {
  const data = useQuery(api.workspace.getRandomQuestions, { roomDuration });

  return (
    <div className="flex h-full p-2 rounded-lg ">
      {data ? (
        <QuestionDisplay questions={data} />
      ) : (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      )}
    </div>
  );
};

export default QuestionSide;
