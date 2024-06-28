"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { convex } from "../../../convex/convexHttpClient";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

const JoinRoomCard = () => {
  const router = useRouter();
  const [battleCode, setBattleCode] = useState("");
  const [battleCodeError, setBattleCodeError] = useState(false);

  const validateBattleCode = (code: string): boolean => {
    if (!code.trim()) {
      toast.error("Battle code is required");
      setBattleCodeError(true);
      return false;
    } else if (code.length <= 6) {
      toast.error("Battle code must be atleast 6 characters long");
      setBattleCodeError(true);
      return false;
    }
    setBattleCodeError(false);
    return true;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBattleCode(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateBattleCode(battleCode)) {
      handleRouting(battleCode);
    } else {
      console.log("Invalid battle code");
    }
  };

  const handleRouting = async (roomId: any) => {
    const roomDetails = await convex.query(api.room.getRoomDetails, { roomId });

    if (roomDetails) {
      switch (roomDetails.status) {
        case "waiting":
          router.push(`/room/${battleCode}`);
          break;
        case "in_progress":
          toast.error("Cannot join the room", {
            description: "The battle has already started.",
          });
          break;
        case "completed":
          toast.error("Cannot join the room", {
            description: "The battle has already ended.",
          });
          break;
        default:
          toast.error("Unable to join the room", {
            description: "Unknown room status.",
          });
      }
    }

    console.log(roomDetails);
  };

  const handleCancel = () => {
    setBattleCode("");
    setBattleCodeError(false);
  };

  return (
    <Card className="w-[350px] flex flex-col">
      <CardHeader>
        <CardTitle>Enter the battle</CardTitle>
        <CardDescription>
          Challenge awaits! Join an existing battle.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="battleCode">Battle code</Label>
              <Input
                id="battleCode"
                placeholder="Enter the room Id"
                value={battleCode}
                onChange={handleInputChange}
                className={cn(
                  battleCodeError && "border-red-500 focus-visible:ring-red-500"
                )}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between ">
        <Button
          variant="outline"
          className="font-urban font-bold"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button className="font-urban font-bold" onClick={handleSubmit}>
          Engage!
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JoinRoomCard;
