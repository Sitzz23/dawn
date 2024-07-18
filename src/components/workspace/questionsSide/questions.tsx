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
      <div className="mb-2 flex justify-between items-baseline">
        <h2 className="text-3xl font-bold ">{selectedQuestion.title}</h2>
        <Tooltip>
          <TooltipTrigger>
            <Shuffle size={16} className="text-neutral-400" />
          </TooltipTrigger>
          <TooltipContent>Feature is under development</TooltipContent>
        </Tooltip>
      </div>

      <div className=" mb-8 flex justify-between items-center">
        <div className="space-x-2">
          {selectedQuestion.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="capitalize">
              {formatString(tag)}
            </Badge>
          ))}
        </div>
        <Badge variant={selectedQuestion.difficulty} className="capitalize">
          {selectedQuestion.difficulty}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <p>{selectedQuestion.problemStatement}</p>
      </div>

      {selectedQuestion.examples.map((example, index) => (
        <div className="mb-4 space-y-1" key={index}>
          <h2 className="font-bold text-lg">Example {index + 1}</h2>
          <div className="mb-2 grid grid-cols-3 bg-neutral-500/10 rounded-md p-3 px-4">
            <div className="space-y-2">
              <p className="font-semibold">Input:</p>
              <p className="font-semibold">Output:</p>
              <p className="font-semibold">Explanation:</p>
            </div>
            <div className="space-y-2 col-span-2 ">
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

      {selectedQuestion.constraints &&
        selectedQuestion.constraints.length > 0 && (
          <div>
            <h2 className="font-bold text-lg">Constraints</h2>

            <ul className="list-disc pl-5">
              {selectedQuestion.constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>
        )}

      {/* <Card>
        <CardHeader>
          <CardTitle>Test Cases</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card> */}
    </div>
  );
};

export default QuestionDisplay;
