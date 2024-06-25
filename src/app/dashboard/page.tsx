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
