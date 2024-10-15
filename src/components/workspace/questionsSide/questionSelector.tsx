"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChevronLeft,
  ChevronRight,
  CircleDotDashed,
  Shuffle,
} from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import useQuestionStore from "@/store/questionsStore";
import EmptySelector from "@/components/empty/emptySelector";
import ProblemListIcon from "@/components/iconComponents/problemList";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { formatString } from "@/lib/utils";

export default function QuestionSelector() {
  const { questions, selectedQuestionId, setSelectedQuestionId } =
    useQuestionStore();

  useEffect(() => {
    if (questions && questions.length > 0 && !selectedQuestionId) {
      setSelectedQuestionId(questions[0]._id);
    }
  }, [questions, selectedQuestionId, setSelectedQuestionId]);

  if (!questions) {
    return <EmptySelector />;
  }

  const handleQuestionSelect = (id: Id<"questions">) => {
    setSelectedQuestionId(id);
  };

  return (
    <Sheet>
      <div className="flex flex-wrap items-center rounded-md hover:bg-accent/70 transition-colors">
        <SheetTrigger asChild>
          <Button
            className="rounded-md sm:rounded-s-md sm:rounded-e-none transition-colors flex-grow sm:flex-grow-0"
            variant="ghost"
          >
            <ProblemListIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-base">Problem list</span>
          </Button>
        </SheetTrigger>
        <div className="hidden sm:flex items-center">
          <Separator orientation="vertical" className="bg-black h-6" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="rounded-none px-3 transition-colors"
                variant="ghost"
              >
                <ChevronLeft className="h-5 w-5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Previous question</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="bg-black h-6" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="rounded-none px-3 transition-colors"
                variant="ghost"
              >
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Next question</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="bg-black h-6" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="rounded-e-md rounded-s-none px-3 transition-colors"
                variant="ghost"
              >
                <Shuffle className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Feature is under development</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <SheetContent side="left" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            <div>Select a Question</div>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-1">
          {questions.map((q) => (
            <div key={q._id} className="rounded-md flex items-center gap-2">
              <span className="text-xs">
                <CircleDotDashed
                  className={`h-4 w-4 ${q._id === selectedQuestionId ? "text-primary" : "text-transparent"}`}
                />
              </span>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="rounded-md max-w-[94%] flex items-center justify-between w-full"
                  onClick={() => handleQuestionSelect(q._id)}
                >
                  <span className="truncate text-left mr-4">{q.title}</span>
                  <Badge variant={q.difficulty} className="capitalize">
                    {q.difficulty}
                  </Badge>
                </Button>
              </SheetClose>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
