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
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
  battleName: string;
  maxPlayers: string;
  difficulty: string;
  roomDuration: string;
}

const BattleCreationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    battleName: "",
    maxPlayers: "2",
    difficulty: "easy",
    roomDuration: "15",
  });

  const [battleNameError, setBattleNameError] = useState<string | null>(null);

  const validateBattleName = (name: string): boolean => {
    if (!name.trim()) {
      setBattleNameError("Battle name is required");
      return false;
    } else if (name.length > 50) {
      setBattleNameError("Battle name must be 50 characters or less");
      return false;
    }
    setBattleNameError(null);
    return true;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if (id === "battleName") {
      validateBattleName(value);
    }
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
      // Here you would typically send the data to your backend
    } else {
      console.log("Form has errors. Please check the battle name.");
    }
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
              />
              {battleNameError && (
                <Alert variant="default">
                  <AlertDescription>{battleNameError}</AlertDescription>
                </Alert>
              )}
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
                  <SelectItem value="expert">Expert</SelectItem>
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
        <Button variant="outline" className="font-urban font-bold">
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
