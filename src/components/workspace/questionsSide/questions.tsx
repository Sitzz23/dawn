import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useQuestionStore from "@/store/questionsStore";
import { formatString } from "@/lib/utils";
import { Flag, Shuffle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const QuestionDisplay: React.FC = () => {
  const selectedQuestion = useQuestionStore((state) =>
    state.getSelectedQuestion()
  );

  if (!selectedQuestion) return <div>No question selected</div>;

  return (
    <div className="">
      <div className="mb-3 flex justify-between items-center">
        <h2 className="text-2xl font-bold pr-2 text-pretty">
          {selectedQuestion.title}
        </h2>
        <Tooltip>
          <TooltipTrigger>
            <Shuffle size={16} className="text-neutral-400" />
          </TooltipTrigger>
          <TooltipContent>Feature is under development</TooltipContent>
        </Tooltip>
      </div>

      <div className="mb-12 flex justify-between items-center">
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

      <div className=" mb-6">
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

      {selectedQuestion.examples.map((example, index) => (
        <div className="mb-6 space-y-1" key={index}>
          <h2 className="font-bold text-lg">Example {index + 1}</h2>
          <div className="mb-2 grid grid-cols-3 bg-neutral-500/10 rounded-md p-3 px-4">
            <div className="space-y-1">
              <p className="font-semibold">Input:</p>
              <p className="font-semibold">Output:</p>
              <p className="font-semibold">Explanation:</p>
            </div>
            <div className="space-y-1 col-span-2 ">
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

      {/* <div className="mb-6">
        <Tabs defaultValue="1">
          <TabsList>
            {selectedQuestion.testCases.map((_, index) => (
              <TabsTrigger key={index} value={`${index + 1}`}>
                Test Case {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          {selectedQuestion.testCases.map((testCase, index) => (
            <TabsContent key={index} value={`${index + 1}`}>
              <p>
                <strong>Input:</strong> {testCase.input}
              </p>
              <p>
                <strong>Output:</strong> {testCase.output}
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </div> */}
    </div>
  );
};

export default QuestionDisplay;
