import { PlayerProfile } from "./types";

export function calculateRating(player: PlayerProfile) {
  // Default rating for a player with 0 games played.
  if (!player.gamesPlayed) return 8;
  const rating =
    Math.round((player.totalPoints / player.gamesPlayed) * 10) / 10;
  return rating;
}

export function scoreIsValid(score: number) {
  if (!score.toString().length) return false;
  if (!Number.isInteger(score)) return false;
  if (score < 0) return false;
  if (score > 15) return false;
  return true;
}
