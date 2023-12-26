import { PlayerProfile } from "../components/LoadPlayerForm";

export function calculateRating(player: PlayerProfile) {
  // Default rating for a player with 0 games played.
  if (!player.gamesPlayed) return 8;
  const rating =
    Math.round((player.totalPoints / player.gamesPlayed) * 10) / 10;
  return rating;
}
