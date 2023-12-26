import { Dispatch, SetStateAction } from "react";

export interface PlayerProfile {
  name: string;
  rating: number;
  totalPoints: number;
  gamesPlayed: number;
}

export interface LoadGameDialogProps {
  open: boolean;
  onClose: () => void;
  setPlayers: Dispatch<SetStateAction<Game>>;
}

export interface PlayerTypeRadioProps {
  selectedPlayer: string;
  setPlayers: Dispatch<SetStateAction<Game>>;
}

export interface GameScores {
  playerOneScore: number;
  playerTwoScore: number;
  id: number;
}

export interface Game {
  playerOne: PlayerProfile;
  playerTwo: PlayerProfile;
}

export interface WelcomeProps {
  setPlayers: Dispatch<SetStateAction<Game>>;
}
