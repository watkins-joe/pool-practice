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

const test: PlayerProfile = {
  name: "Joe",
  stats: {
    EightBall: {
      rating: 8,
      totalPoints: 0,
      gamesPlayed: 0,
    },
    TenBall: {
      rating: 4, // default
      totalPoints: 0,
      gamesPlayed: 0,
    },
  },
};

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
