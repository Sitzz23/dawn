// import { SocketProvider } from "@/lib/socketProvider";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <SocketProvider> */}
      {children}
      {/* </SocketProvider> */}
    </>
  );
};

export default layout;
