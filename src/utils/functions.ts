import { Dispatch, SetStateAction } from "react";
import { GameTypes } from "./constants";
import { Game, PlayerProfile } from "./types";

export function calculateRating(player: PlayerProfile, isTenBall: boolean) {
  let rating: number;
  if (isTenBall) {
    if (!player.stats.TenBall.gamesPlayed) return 4;
    rating =
      Math.round(
        (player.stats.TenBall.totalPoints / player.stats.TenBall.gamesPlayed) *
          10
      ) / 10;
  } else {
    if (!player.stats.EightBall.gamesPlayed) return 8;
    rating =
      Math.round(
        (player.stats.EightBall.totalPoints /
          player.stats.EightBall.gamesPlayed) *
          10
      ) / 10;
  }
  console.log(rating);
  return rating;
}

export function scoreIsValid(score: number, isTenBall: boolean) {
  const maxScore = isTenBall
    ? GameTypes.TenBall.maxScore
    : GameTypes.EightBall.maxScore;
  if (!score.toString().length) return false;
  if (!Number.isInteger(score)) return false;
  if (score < GameTypes.minScore) return false;
  if (score > maxScore) return false;
  return true;
}

export function setDefaultPlayer(
  fn: Dispatch<SetStateAction<Game>>,
  player: Game
) {}

export function checkPlayers() {
  /**
   * if the selected player is already loaded on player one or player two and we try to load it on the other player, return.
   * if the selectedPlayer is already player One or Two and we try the opposite, return an error saying you cannot load the same player in both spots.
   */
}
