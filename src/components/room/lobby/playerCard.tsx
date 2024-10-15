import GradientText from "@/components/shared/layout/gradientText";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface UserData {
  tokenIdentifier: string;
  name: string;
  pictureUrl: string;
  wins: number;
}
export const PlayerCard: React.FC<{
  player: UserData;
  isHost: boolean;
  user: any;
}> = ({ player, isHost, user }) => (
  <Card>
    <CardContent className="flex items-center p-4">
      <Avatar className="h-10 w-10 mr-4">
        <AvatarImage src={player.pictureUrl} alt={player.name} />
        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        {isHost ? (
          // <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent font-semibold">
          //   {player.name}
          // </span>
          <GradientText className="font-heading pb-1" element="H2">
            {player.name}
          </GradientText>
        ) : (
          <p className="font-semibold">{player.name}</p>
        )}

        <p className="text-sm text-gray-500">Wins: {player.wins}</p>
      </div>
      <div className="flex flex-col items-end">
        {player.tokenIdentifier === user?.id && (
          <Badge variant="secondary" className="mb-1">
            You
          </Badge>
        )}
      </div>
    </CardContent>
  </Card>
);
