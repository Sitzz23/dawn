import EmptyTestCases from "@/components/empty/emptyTestCases";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useQuestionStore from "@/store/questionsStore";
import React from "react";

const TestCase = () => {
  const selectedQuestion = useQuestionStore((state) =>
    state.getSelectedQuestion()
  );

  const gridCols = selectedQuestion?.testCases.length;

  if (!selectedQuestion) return <EmptyTestCases />;

  return (
    <div className="p-6">
      <Tabs
        defaultValue="Test case 1"
        className="w-fit flex justify-start items-center gap-4"
      >
        {/* <h1 className="whitespace-nowrap  rounded-sm font-bold">Test Cases</h1> */}
        <TabsList className={`grid w-full grid-cols-${gridCols}`}>
          {selectedQuestion.testCases.map((item, index) => (
            <TabsTrigger key={index} value={`Test case ${index + 1}`}>
              {`Test case ${index + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TestCase;
