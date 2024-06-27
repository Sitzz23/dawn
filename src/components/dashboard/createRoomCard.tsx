"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface FormData {
  battleName: string;
  maxPlayers: string;
  difficulty: "easy" | "medium" | "hard";
  roomDuration: string;
}

const BattleCreationForm: React.FC = () => {
  const createRoom = useMutation(api.room.createRoom);

  const initialFormData: FormData = {
    battleName: "",
    maxPlayers: "2",
    difficulty: "easy",
    roomDuration: "15",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [battleNameError, setBattleNameError] = useState(false);

  const validateBattleName = (name: string): boolean => {
    if (!name.trim()) {
      toast.error("Battle name is required");
      setBattleNameError(true);
      return false;
    } else if (name.length > 50) {
      toast.error("Battle name must be 10 characters or less");
      setBattleNameError(true);
      return false;
    }
    setBattleNameError(false);
    return true;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    // if (id === "battleName") {
    //   validateBattleName(value);
    // }
  };

  const handleSelectChange = (id: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateBattleName(formData.battleName)) {
      console.log("Form submitted:", formData);
      toast.success("Battle created successfully!");
      createRoom({
        maxPlayers: Number(formData.maxPlayers),
        difficulty: formData.difficulty,
        roomDuration: Number(formData.roomDuration),
        battleName: formData.battleName,
      });
    } else {
      console.log("Form has errors. Please check the battle name.");
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setBattleNameError(false);
    toast.info("Form reset");
  };

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Create a battle</CardTitle>
        <CardDescription>Set the stage for an epic battle!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="battleName">Battle Name</Label>
              <Input
                id="battleName"
                placeholder="Enter battle name"
                value={formData.battleName}
                onChange={handleInputChange}
                className={cn(
                  battleNameError && "border-red-500 focus-visible:ring-red-500"
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="maxPlayers">Max Players</Label>
              <Select
                value={formData.maxPlayers}
                onValueChange={(value) =>
                  handleSelectChange("maxPlayers", value)
                }
              >
                <SelectTrigger id="maxPlayers">
                  <SelectValue placeholder="Select players" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Players</SelectItem>
                  <SelectItem value="4">4 Players</SelectItem>
                  <SelectItem value="6">6 Players</SelectItem>
                  <SelectItem value="8">8 Players</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) =>
                  handleSelectChange("difficulty", value)
                }
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="roomDuration">Room Duration</Label>
              <Select
                value={formData.roomDuration}
                onValueChange={(value) =>
                  handleSelectChange("roomDuration", value)
                }
              >
                <SelectTrigger id="roomDuration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          className="font-urban font-bold"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button className="font-urban font-bold" onClick={handleSubmit}>
          Create Battle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BattleCreationForm;
