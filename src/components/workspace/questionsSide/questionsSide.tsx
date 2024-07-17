import React, { useEffect } from "react";
import QuestionDisplay from "./questions";

const QuestionSide = () => {
  return (
    <div className="flex h-full p-2 rounded-lg ">
      <QuestionDisplay />
    </div>
  );
};

export default QuestionSide;
