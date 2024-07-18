import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useQuestionStore from "@/store/questionsStore";
import { formatString } from "@/lib/utils";

const QuestionDisplay: React.FC = () => {
  const selectedQuestion = useQuestionStore((state) =>
    state.getSelectedQuestion()
  );

  if (!selectedQuestion) return <div>No question selected</div>;

  return (
    <div className="">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-bold">{selectedQuestion.title}</h2>
        <Badge variant={selectedQuestion.difficulty} className="capitalize">
          {selectedQuestion.difficulty}
        </Badge>
      </div>

      <div className="space-x-2 mb-8">
        {selectedQuestion.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="capitalize">
            {formatString(tag)}
          </Badge>
        ))}
      </div>

      <div className="space-y-2 mb-4">
        <p>{selectedQuestion.problemStatement}</p>
      </div>

      <div className="space-y-2 mb-4">
        <h2 className="font-bold text-lg">Examples</h2>
        <p>{selectedQuestion.problemStatement}</p>
      </div>

      <Card className="border-0">
        <CardHeader>
          <CardTitle>Examples</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedQuestion.examples.map((example, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>Input:</strong> {example.input}
              </p>
              <p>
                <strong>Output:</strong> {example.output}
              </p>
              <p>
                <strong>Explanation:</strong> {example.explanation}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedQuestion.constraints &&
        selectedQuestion.constraints.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Constraints</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                {selectedQuestion.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
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
