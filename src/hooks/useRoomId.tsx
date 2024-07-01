"use client";
import { useState, useEffect } from "react";

export const useRoomId = () => {
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    const extractRoomId = () => {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        const matches = path.match(/\/room\/([^\/]+)\/workspace/);
        return matches ? matches[1] : null;
      }
      return null;
    };

    setRoomId(extractRoomId());
  }, []);

  return roomId;
};
