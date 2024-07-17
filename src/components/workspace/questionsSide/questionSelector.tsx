import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Id } from "../../../../convex/_generated/dataModel";
import useQuestionStore from "@/store/questionsStore";

const QuestionSelector: React.FC = () => {
  const { questions, selectedQuestionId, setSelectedQuestionId } =
    useQuestionStore();

  useEffect(() => {
    if (questions && questions.length > 0 && !selectedQuestionId) {
      setSelectedQuestionId(questions[0]._id);
    }
  }, [questions, selectedQuestionId, setSelectedQuestionId]);

  if (!questions) {
    return <div>Loading questions...</div>;
  }

  return (
    <Select
      onValueChange={(value) => setSelectedQuestionId(value as Id<"questions">)}
      value={selectedQuestionId || ""}
    >
      <SelectTrigger className="w-1/4">
        <SelectValue placeholder="Select a question" />
      </SelectTrigger>
      <SelectContent>
        {questions.map((q) => (
          <SelectItem key={q._id} value={q._id}>
            {q.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default QuestionSelector;
