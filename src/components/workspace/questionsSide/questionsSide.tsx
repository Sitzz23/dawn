import { useQuery } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import QuestionDisplay from "./questions";
import QuestionSelector from "./questionSelector";
import { useQuestionStore } from "@/store/questionsStore";

const QuestionSide = ({ roomDuration }: { roomDuration: number }) => {
  const questionData = useQuery(api.workspace.getRandomQuestions, {
    roomDuration,
  });
  const setQuestions = useQuestionStore((state) => state.setQuestions);

  useEffect(() => {
    if (questionData) setQuestions(questionData);
  }, [questionData, setQuestions]);

  return (
    <div className="flex h-full p-2 rounded-lg ">
      <QuestionSelector />
      <QuestionDisplay />
    </div>
  );
};

export default QuestionSide;
