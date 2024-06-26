import React from "react";
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

const JoinRoomCard = () => {
  return (
    <Card className="w-[350px] flex flex-col">
      <CardHeader>
        <CardTitle>Enter the battle</CardTitle>
        <CardDescription>
          Challenge awaits! Join an existing battle.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Battle code</Label>
              <Input id="name" placeholder="Enter the room Id" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between ">
        <Button variant="outline" className="font-urban font-bold">
          Cancel
        </Button>
        <Button className="font-urban font-bold" asChild>
          <Link href={"/lobby"}>Engage!</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JoinRoomCard;
