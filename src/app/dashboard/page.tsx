import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const page = () => {
  return (
    <div className="flex-1 space-y-4 p-6 pt-6">
      <div className="flex justify-start gap-4">
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
                  <Select>
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
                  <Select>
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
                  <Select>
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
            <Button className="font-urban font-bold">Create Battle</Button>
          </CardFooter>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Enter the battle</CardTitle>
            <CardDescription>
              Challenge awaits! Join an existing battle.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Battle code</Label>
                  <Input id="name" placeholder="Enter the room Id" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="font-urban font-bold">
              Cancel
            </Button>
            <Button className="font-urban font-bold">Engage!</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default page;
