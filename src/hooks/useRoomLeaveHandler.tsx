"use client";
import { useEffect, useCallback } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";

export const useRoomLeaveHandler = (roomId: string) => {
  const router = useRouter();

  const leaveRoom = useCallback(async () => {
    try {
      // Then, emit the socket event
      const socket = io("/api/socket/io", {
        path: "/api/socket/io",
        addTrailingSlash: false,
      });

      socket.emit("leave-room", roomId);
      socket.disconnect();

      // Finally, redirect the user
      await router.back(); // Redirect to home page or wherever appropriate

      console.log("Successfully left the room");
    } catch (error) {
      console.error("Error leaving room:", error);
      // Handle error (e.g., show an error message to the user)
    }
  }, [roomId, router]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      leaveRoom();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveRoom]);

  return leaveRoom;
};
