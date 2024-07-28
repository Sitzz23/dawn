import React from "react";
import { Skeleton } from "../ui/skeleton";

const Empty = () => {
  return (
    <div className="p-6">
      <Skeleton className="h-6 w-[250px] mb-4" />
      <div className="flex justify-between mb-9">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-[50px] rounded-full" />
          <Skeleton className="h-5 w-[80px] rounded-full" />
        </div>
        <Skeleton className="h-5 w-[60px] rounded-full" />
      </div>

      <Skeleton className="h-5 w-[170px] mb-3" />
      <div className="space-y-2.5 mb-6">
        <Skeleton className="h-4 w-[85%] " />
        <Skeleton className="h-4 w-[90%] " />
        <Skeleton className="h-4 w-[95%] " />
        <Skeleton className="h-4 w-[80%] " />
        <Skeleton className="h-4 w-[50%] " />
      </div>

      <Skeleton className="h-5 w-[140px] mb-3" />
      <div className="space-y-2.5 mb-6">
        <Skeleton className="h-4 w-[35%] " />
        <Skeleton className="h-4 w-[60%] " />
      </div>

      <Skeleton className="h-5 w-[120px] mb-3" />
      <div className="space-y-2.5">
        <Skeleton className="h-36 w-full " />
      </div>
    </div>
  );
};

export default Empty;
