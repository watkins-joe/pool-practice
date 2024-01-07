import { PlayerStats } from "./types";

export const GameTypes = {
  minScore: 0,
  EightBall: {
    maxScore: 15,
  },
  TenBall: {
    maxScore: 10,
  },
};

export const defaultPlayers = {
  playerOne: {
    name: "Player 1",
    stats: {
      EightBall: {
        rating: 8,
        totalPoints: 0,
        gamesPlayed: 0,
      },
      TenBall: {
        rating: 4,
        totalPoints: 0,
        gamesPlayed: 0,
      },
    },
  },
  playerTwo: {
    name: "Player 2",
    stats: {
      EightBall: {
        rating: 8,
        totalPoints: 0,
        gamesPlayed: 0,
      },
      TenBall: {
        rating: 4,
        totalPoints: 0,
        gamesPlayed: 0,
      },
    },
  },
};
