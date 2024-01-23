import { Dispatch, SetStateAction } from "react";

export enum GameNames {
  EightBall = "8 Ball",
  TenBall = "10 Ball",
}

export interface Game {
  playerOne: PlayerProfile;
  playerTwo: PlayerProfile;
}

export interface GameScores {
  playerOneScore: number;
  playerTwoScore: number;
  id: number;
}

export interface NewGameDialogProps {
  open: boolean;
  onClose: () => void;
  players: Game;
  setPlayers: Dispatch<SetStateAction<Game>>;
}

export interface PlayerProfile {
  name: string;
  stats: PlayerStats;
}

export type PlayerStats = {
  [key in "EightBall" | "TenBall"]: {
    rating: number;
    totalPoints: number;
    gamesPlayed: number;
  };
};

export interface PlayerRadioProps {
  players: Game;
  selectedPlayer: string;
  setPlayers: Dispatch<SetStateAction<Game>>;
}

export interface PlayerStatsProps {
  gameName: GameNames;
  playerName: string;
  stats: PlayerStats;
}

export interface NewPlayerFormProps {
  selectedPlayer: string;
  setPlayers: Dispatch<SetStateAction<Game>>;
}

export interface LoadPlayerFormProps extends PlayerRadioProps {
  players: Game;
}

export interface WelcomeProps {
  players: Game;
  setPlayers: Dispatch<SetStateAction<Game>>;
}
