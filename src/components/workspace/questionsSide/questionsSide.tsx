import { useQuery } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";

import QuestionDisplay from "./questions";
import QuestionSelector from "./questionSelector";
import useQuestionStore from "@/store/questionsStore";
import useRoomStore from "@/store/roomStore";
import { Id } from "../../../../convex/_generated/dataModel";

const QuestionSide = () => {
  return (
    <div className="flex h-full p-2 rounded-lg ">
      <QuestionSelector />
      {/* <QuestionDisplay /> */}
    </div>
  );
};

export default QuestionSide;
