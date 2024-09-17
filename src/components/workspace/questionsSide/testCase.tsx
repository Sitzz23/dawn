import EmptyTestCases from "@/components/empty/emptyTestCases";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useQuestionStore from "@/store/questionsStore";
import React from "react";

const TestCase = () => {
  const selectedQuestion = useQuestionStore((state) =>
    state.getSelectedQuestion()
  );

  if (!selectedQuestion) return <EmptyTestCases />;

  return (
    <div className="p-6 h-full overflow-y-auto bg-white/5 rounded-xl">
      <Tabs defaultValue="0" className="w-full">
        <TabsList className={`flex gap-2 justify-start`}>
          {selectedQuestion.testCases.map((_, index) => (
            <TabsTrigger
              key={index}
              value={index.toString()}
              className="px-4 py-2"
            >
              Test case {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>
        {selectedQuestion.testCases.map((testCase, index) => (
          <TabsContent key={index} value={index.toString()} className="mt-4">
            <div className="space-y-4">
              <div className="flex  justify-start items-center gap-4">
                <h3 className="font-semibold mb-2">Input:</h3>
                <pre className="text-sm pb-1.5">{testCase.input}</pre>
              </div>
              <div className="flex  justify-start items-center gap-4">
                <h3 className="font-semibold mb-2">Output:</h3>
                <pre className="text-sm pb-1.5">{testCase.output}</pre>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TestCase;
