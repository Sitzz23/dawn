import type React from "react";
import { Badge } from "@/components/ui/badge";
import useQuestionStore from "@/store/questionsStore";
import { formatString } from "@/lib/utils";
import { Shuffle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Empty from "@/components/empty/emptyQuestions";

const QuestionDisplay: React.FC = () => {
  const selectedQuestion = useQuestionStore((state) =>
    state.getSelectedQuestion()
  );

  if (!selectedQuestion) return <Empty />;

  return (
    <div className="p-6 flex flex-col h-full overflow-y-scroll">
      <div className="pb-4">
        <div className="mb-3 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-pretty">
            {selectedQuestion.title}
          </h2>
          <Tooltip>
            <TooltipTrigger>
              <Shuffle size={16} className="text-neutral-400" />
            </TooltipTrigger>
            <TooltipContent>Feature is under development</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {selectedQuestion.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="capitalize">
                {formatString(tag)}
              </Badge>
            ))}
          </div>
          <Badge variant={selectedQuestion.difficulty} className="capitalize">
            {selectedQuestion.difficulty}
          </Badge>
        </div>
      </div>

      <div className=" flex-1">
        <div className="pt-4">
          <div className="mb-6">
            <h2 className="font-bold text-lg">Problem Statement</h2>
            <p>{selectedQuestion.problemStatement}</p>
          </div>

          {selectedQuestion.constraints &&
            selectedQuestion.constraints.length > 0 && (
              <div className="mb-6">
                <h2 className="font-bold text-lg">Constraints</h2>
                <ul className="list-disc pl-5">
                  {selectedQuestion.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            )}

          {selectedQuestion.examples.slice(0, 1).map((example, index) => (
            <div className="space-y-1" key={index}>
              <h2 className="font-bold text-lg">Example {index + 1}</h2>
              <div className="mb-2 grid grid-cols-6 bg-neutral-500/10 rounded-md p-2 px-3">
                <div className="space-y-1 col-span-2">
                  <p className="font-semibold">Input:</p>
                  <p className="font-semibold">Output:</p>
                  <p className="font-semibold">Explanation:</p>
                </div>
                <div className="space-y-1 col-span-4 ">
                  <p>
                    <code className="text-sm">{example.input}</code>
                  </p>
                  <p>
                    <code className="text-sm">{example.output}</code>
                  </p>
                  <p>
                    <code className="text-sm">{example.explanation}</code>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
