import React from "react";
import { Skeleton } from "../ui/skeleton";

const EmptySelector = () => {
  return (
    <div className=" border px-3 py-2.5 rounded-md">
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
};

export default EmptySelector;
