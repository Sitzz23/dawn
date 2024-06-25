"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

const CreateRoomCard = () => {
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Create a battle</CardTitle>
        <CardDescription>Set the stage for an epic battle!</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="battleName">Battle Name</Label>
              <Input id="battleName" placeholder="Enter battle name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="maxPlayers">Max Players</Label>
              <Select defaultValue={"2"}>
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
              <Select defaultValue="easy">
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
              <Select defaultValue="15">
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
        <Button
          className="font-urban font-bold"
          onClick={() =>
            toast.success("Room has been created", {
              description: "Room ID: bla bla bla bla",
              action: {
                label: "Copy ID",
                onClick: () => navigator.clipboard.writeText("bla bla bla"),
              },
            })
          }
        >
          Create Battle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateRoomCard;
