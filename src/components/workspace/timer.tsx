import React, { useState, useEffect } from "react";

const RoomTimer = ({
  roomDuration,
  serverTimestamp,
  roomId,
}: {
  roomDuration: number;
  serverTimestamp: number;
  roomId: string;
}) => {
  // const { mutate } = useApiMutation(api.workspace.endRoom);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    const endTime = serverTimestamp + roomDuration * 60 * 1000;

    const updateRemainingTime = () => {
      const now = Date.now();
      const timeLeft = endTime - now;

      if (timeLeft <= 0) {
        setRemainingTime(0);
        // mutate({ roomId });
        return false; // Stop the interval
      }

      setRemainingTime(timeLeft);
      return true; // Continue the interval
    };

    // Initial update
    if (updateRemainingTime()) {
      const intervalId = setInterval(() => {
        if (!updateRemainingTime()) {
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [roomId, roomDuration, serverTimestamp]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center">
      <div className="text-base ">
        {remainingTime !== null ? formatTime(remainingTime) : "Calculating..."}
      </div>
    </div>
  );
};

export default RoomTimer;
