import { TooltipProvider } from "@/components/ui/tooltip";
// import { SocketProvider } from "@/lib/socketProvider";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <SocketProvider> */}
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      {/* </SocketProvider> */}
    </>
  );
};

export default layout;
