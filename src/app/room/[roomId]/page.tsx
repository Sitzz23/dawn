import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Player {
  id: string;
  name: string;
  profilePic: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  isHost: boolean;
}

interface LobbyProps {
  players: Player[];
}

const PlayerCard: React.FC<{ player: Player }> = ({ player }) => {
  const winRate =
    player.matchesPlayed > 0
      ? ((player.wins / player.matchesPlayed) * 100).toFixed(1)
      : "0.0";

  return (
    <Card
      className={`w-full ${player.isHost ? "border-2 border-yellow-500" : ""}`}
    >
      <CardContent className="flex items-center p-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={player.profilePic} alt={player.name} />
          <AvatarFallback>
            {player.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{player.name}</h3>
          <p className="text-sm text-gray-500">
            Matches: {player.matchesPlayed}
          </p>
          <p className="text-sm text-gray-500">Win Rate: {winRate}%</p>
        </div>
        {player.isHost && (
          <Badge className="ml-auto" variant="secondary">
            Host
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

const Lobby: React.FC<LobbyProps> = ({ players }) => {
  return (
    <main className="w-screen h-screen ">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Lobby</CardTitle>
          <CardDescription>Waiting area before entering room</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))} */}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Lobby;
