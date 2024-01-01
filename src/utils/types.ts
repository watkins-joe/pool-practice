import { Dispatch, SetStateAction } from "react";

export interface Game {
  playerOne: PlayerProfile;
  playerTwo: PlayerProfile;
}

export interface GameScores {
  playerOneScore: number;
  playerTwoScore: number;
  id: number;
}

export interface LoadGameDialogProps {
  open: boolean;
  onClose: () => void;
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

export interface PlayerTypeRadioProps {
  selectedPlayer: string;
  setPlayers: Dispatch<SetStateAction<Game>>;
}

export interface WelcomeProps {
  setPlayers: Dispatch<SetStateAction<Game>>;
}
