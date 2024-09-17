"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChevronLeft,
  ChevronRight,
  CircleDotDashed,
  Eye,
  EyeOff,
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
  const [isOpen, setIsOpen] = useState(false);
  const [toShowTags, setToShowTags] = useState(false);

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
    setIsOpen(false);
  };

  const handleTagVisibility = () => {
    setToShowTags((prevToShowTags) => !prevToShowTags);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
        <Tooltip>
          <TooltipTrigger>
            <Button
              className="rounded-none px-3  transition-colors"
              variant={"ghost"}
            >
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Previous question</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" className="bg-black h-6" />
        <Tooltip>
          <TooltipTrigger>
            <Button
              className="rounded-none px-3  transition-colors"
              variant={"ghost"}
            >
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next question</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" className="bg-black h-6" />
        <Tooltip>
          <TooltipTrigger>
            <Button
              className="rounded-e-md rounded-s-none px-3  transition-colors"
              variant={"ghost"}
            >
              <Shuffle className="h-4 w-4 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Feature is under development</TooltipContent>
        </Tooltip>
      </div>

      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            <div>Select a Question</div>
            {/* question tags */}

            {/* {!toShowTags ? (
              <Button
                variant="badgeButtonActive"
                size={"badge"}
                onClick={handleTagVisibility}
              >
                <Eye className="h-4 w-4 mr-1.5" />
                Tags
              </Button>
            ) : (
              <Button
                variant="badgeButton"
                size={"badge"}
                onClick={handleTagVisibility}
              >
                <EyeOff className="h-4 w-4 text-muted-foreground mr-1.5" />
                Tags
              </Button>
            )} */}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-1">
          {questions.map((q, index) => (
            <div key={index} className={` rounded-md flex items-center gap-2`}>
              <span className="text-xs">
                <CircleDotDashed
                  className={`h-4 w-4 ${q._id === selectedQuestionId ? "text-primary" : "text-transparent"}`}
                />
              </span>
              <Button
                variant={"ghost"}
                className={`w-full justify-between rounded-md `}
                onClick={() => handleQuestionSelect(q._id as Id<"questions">)}
              >
                {/* <span className="font-semibold mr-2">{index + 1}.</span> */}
                {/* <div className="flex items-center justify-between"> */}
                <span className="text-left">{q.title}</span>
                <Badge variant={q.difficulty} className="capitalize">
                  {q.difficulty}
                </Badge>
                {/* </div> */}
                {/* {!toShowTags && (
                  <div className="flex items-center gap-2">
                    {q.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="capitalize"
                      >
                        {formatString(tag)}
                      </Badge>
                    ))}
                  </div>
                )} */}
              </Button>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
