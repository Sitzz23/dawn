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
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const JoinRoomCard = () => {
  const [battleCode, setBattleCode] = useState("");
  const [battleCodeError, setBattleCodeError] = useState(false);

  const validateBattleCode = (code: string): boolean => {
    if (!code.trim()) {
      toast.error("Battle code is required");
      setBattleCodeError(true);
      return false;
    } else if (code.length !== 6) {
      // Assuming battle codes are 6 characters long
      toast.error("Battle code must be 6 characters long");
      setBattleCodeError(true);
      return false;
    }
    setBattleCodeError(false);
    return true;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBattleCode(value);
    validateBattleCode(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateBattleCode(battleCode)) {
      console.log("Joining battle with code:", battleCode);
      toast.success("Joining the battle!");
      // Here you would typically handle the room joining logic
    } else {
      console.log("Invalid battle code");
    }
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
        <Button variant="outline" className="font-urban font-bold">
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
