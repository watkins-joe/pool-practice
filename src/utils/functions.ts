import { GameTypes } from "./constants";
import { PlayerProfile } from "./types";

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
