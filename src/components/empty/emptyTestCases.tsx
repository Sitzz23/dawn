import React from "react";
import { Skeleton } from "../ui/skeleton";

const EmptyTestCases = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-start gap-6">
        <Skeleton className="h-8 rounded w-24" />
        <Skeleton className="h-8 rounded w-24" />
        <Skeleton className="h-8 rounded w-24" />
      </div>
      <Skeleton className="h-8 w-[80%]" />
      <Skeleton className="h-8 w-[35%]" />
    </div>
  );
};

export default EmptyTestCases;
