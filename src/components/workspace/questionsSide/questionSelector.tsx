"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import useQuestionStore from "@/store/questionsStore";
import EmptySelector from "@/components/empty/emptySelector";
import ProblemListIcon from "@/components/iconComponents/problemList";
import { Separator } from "@/components/ui/separator";

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

  return (
    <Sheet>
      <div className="flex items-center rounded-md hover:bg-accent/70 transition-colors">
        <SheetTrigger asChild>
          <Button
            className="rounded-s-md rounded-e-none transition-colors"
            variant={"ghost"}
          >
            <ProblemListIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-base">Problem list</span>
          </Button>
        </SheetTrigger>
        <Separator orientation="vertical" className="bg-black h-6" />
        <Button
          className="rounded-none px-3  transition-colors"
          variant={"ghost"}
        >
          <ChevronLeft className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Separator orientation="vertical" className="bg-black h-6" />
        <Button
          className="rounded-none px-3  transition-colors"
          variant={"ghost"}
        >
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Separator orientation="vertical" className="bg-black h-6" />
        <Button
          className="rounded-e-md rounded-s-none px-3  transition-colors"
          variant={"ghost"}
        >
          <Shuffle className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Select a Question</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-4">
          <div className="space-y-2">
            {questions.map((q) => (
              <Button
                key={q._id}
                variant={q._id === selectedQuestionId ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedQuestionId(q._id as Id<"questions">);
                }}
              >
                {q.title}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
