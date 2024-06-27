"use client";
import { useSocket } from "@/lib/socketProvider";
import React from "react";

const Lobby = () => {
  const { isConnected } = useSocket();

  return (
    <div>
      {isConnected ? <p>connected hai bhai</p> : <p>not connected hai bhai</p>}
      ola, i&apos;m Lobby
    </div>
  );
};

export default Lobby;
