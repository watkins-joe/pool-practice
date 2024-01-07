import { FC, useEffect, useState } from "react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
} from "@mui/material";
import Welcome from "../Welcome/Welcome";
import { clearInput, profilePrefix } from "../../globals";
import { calculateRating, scoreIsValid } from "../../utils/functions";
import { GameScores, Game } from "../../utils/types";
import styles from "./ScoreTable.module.scss";
import TenBall from "../../images/6099_10ball.png";
import { GameTypes } from "../../utils/constants";

const ScoreTable: FC = () => {
  const [games, setGames] = useState<GameScores[]>([]);
  const [score, setScore] = useState("");
  const [players, setPlayers] = useState<Game>({
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
  });
  const [scoreInputHasError, setScoreInputHasError] = useState(false);
  const [showRatings, updateShowRatings] = useState(false);
  const [isTenBall, updateIsTenBall] = useState(false);

  useEffect(() => {
    savePlayerData();
  }, [players]);

  useEffect(() => {
    const listOfScores = document.querySelectorAll("tr");
    const lastScore = listOfScores[listOfScores.length - 1];
    updatePlayerRatings(games);
    lastScore.scrollIntoView();
  }, [games]);

  const handleShowRatingsChanges = () => {
    updateShowRatings(!showRatings);
  };

  const handleIsTenBallChanges = () => {
    updateIsTenBall(!isTenBall);
    // Empty list of games when game is switched
    setGames(() => {
      return [];
    });
  };

  const handleScoreInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // console.log(event);
    // Convert to number for mathematic comparison
    let enteredScore = Number(event.target.value.trim());
    // console.log(`enteredScore: ${enteredScore}`);
    if (!scoreIsValid(enteredScore, isTenBall)) {
      setScoreInputHasError(true);
    } else {
      setScoreInputHasError(false);
    }

    // Convert back to string for storage
    setScore(enteredScore.toString());
  };

  const handleSubmitScore = (event: React.FormEvent<HTMLFormElement>) => {
    // console.log(score);
    // console.log(games);

    // console.log(event);
    event.preventDefault();

    if (scoreInputHasError) return;

    const newID = Math.floor(Math.random() * 1000);

    // update gamesPlayed and totalPoints for each player
    const playerOne = players.playerOne;
    const playerTwo = players.playerTwo;

    if (isTenBall) {
      playerOne.stats.TenBall.totalPoints += Number(score);
      playerTwo.stats.TenBall.totalPoints +=
        GameTypes.TenBall.maxScore - Number(score);

      playerOne.stats.TenBall.gamesPlayed += 1;
      playerTwo.stats.TenBall.gamesPlayed += 1;

      setGames((prevGames) => [
        ...prevGames,
        {
          playerOneScore: Number(score),
          playerTwoScore: GameTypes.TenBall.maxScore - Number(score),
          id: newID,
        },
      ]);

      clearInput(setScore, setScoreInputHasError);

      return;
    }

    playerOne.stats.EightBall.totalPoints += Number(score);
    playerTwo.stats.EightBall.totalPoints += 15 - Number(score);

    playerOne.stats.EightBall.gamesPlayed += 1;
    playerTwo.stats.EightBall.gamesPlayed += 1;

    // console.log(`score before adding score to game: ${score}`);
    setGames((prevGames) => [
      ...prevGames,
      {
        playerOneScore: Number(score),
        playerTwoScore: 15 - Number(score),
        id: newID,
      },
    ]);

    clearInput(setScore, setScoreInputHasError);
  };

  const updatePlayerRatings = (gamesList: GameScores[]) => {
    const mostRecentGame = gamesList[gamesList.length - 1];
    if (!mostRecentGame) return;

    setPlayers((prevState) => {
      console.log(prevState);
      if (isTenBall) {
        const playerOne = prevState.playerOne;
        playerOne.stats.TenBall.rating = calculateRating(playerOne, isTenBall);
        const playerTwo = prevState.playerTwo;
        prevState.playerTwo.stats.TenBall.rating = calculateRating(
          playerTwo,
          isTenBall
        );
        return {
          playerOne: {
            ...playerOne,
          },
          playerTwo: {
            ...playerTwo,
          },
        };
      }
      const playerOne = prevState.playerOne;
      playerOne.stats.EightBall.rating = calculateRating(playerOne, isTenBall);
      const playerTwo = prevState.playerTwo;
      prevState.playerTwo.stats.EightBall.rating = calculateRating(
        playerTwo,
        isTenBall
      );
      return {
        playerOne: {
          ...playerOne,
        },
        playerTwo: {
          ...playerTwo,
        },
      };
    });
  };

  const savePlayerData = () => {
    localStorage.setItem(
      `${profilePrefix}-${players.playerOne.name}`,
      JSON.stringify(players.playerOne)
    );

    localStorage.setItem(
      `${profilePrefix}-${players.playerTwo.name}`,
      JSON.stringify(players.playerTwo)
    );
  };

  const handleDeleteGame = (gameIndex: number) => {
    const deletedGame = games[gameIndex];

    if (isTenBall) {
      players.playerOne.stats.TenBall.totalPoints -= deletedGame.playerOneScore;
      players.playerTwo.stats.TenBall.totalPoints -= deletedGame.playerTwoScore;

      players.playerOne.stats.TenBall.gamesPlayed--;
      players.playerTwo.stats.TenBall.gamesPlayed--;

      players.playerOne.stats.TenBall.rating = calculateRating(
        players.playerOne,
        isTenBall
      );
      players.playerTwo.stats.TenBall.rating = calculateRating(
        players.playerTwo,
        isTenBall
      );
    }

    // console.log(players);

    setGames((prevGames) => {
      return prevGames.filter((_, index) => {
        return gameIndex !== index;
      });
    });
  };

  return (
    <>
      {games.length === 0 && <Welcome setPlayers={setPlayers} />}
      <table className={styles.table}>
        <thead>
          <tr>
            <td>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch onChange={handleShowRatingsChanges} />}
                    label="Show ratings?"
                    labelPlacement="top"
                  />
                </FormGroup>
                <FormGroup style={{ justifyContent: "center" }}>
                  <FormControlLabel
                    control={<Switch onChange={handleIsTenBallChanges} />}
                    label="10 Ball"
                    labelPlacement="top"
                  />
                </FormGroup>
              </div>
            </td>
            <td>Games played: {games.length}</td>
          </tr>
          <tr className={styles["player--info"]}>
            <td align="center">
              <span className={styles["player--name"]}>
                {players.playerOne.name}
              </span>
              <br />
              {showRatings && (
                <span className={styles["player--rating"]}>
                  {isTenBall
                    ? players.playerOne.stats.TenBall.rating
                    : players.playerOne.stats.EightBall.rating}
                </span>
              )}
            </td>
            <td align="center">
              <span className={styles["player--name"]}>
                {players.playerTwo.name}
              </span>
              <br />
              {showRatings && (
                <span className={styles["player--rating"]}>
                  {isTenBall
                    ? players.playerTwo.stats.TenBall.rating
                    : players.playerTwo.stats.EightBall.rating}
                </span>
              )}
            </td>
          </tr>
        </thead>
        <tbody className={styles.games}>
          {games.map((game, index) => (
            <tr key={game.id} id={String(game.id)}>
              <td align="center" style={{ position: "relative" }}>
                <IconButton
                  className={styles.delete}
                  color="error"
                  type="submit"
                  onClick={() => handleDeleteGame(index)}
                >
                  <ClearIcon />
                </IconButton>
                {game.playerOneScore}
              </td>
              <td align="center">{game.playerTwoScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.scoreForm}>
        <form
          onSubmit={handleSubmitScore}
          style={{
            padding: "1rem",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            type="tel"
            id="playerOneScore"
            name="playerOneScore"
            label={`Score for ${players.playerOne.name}`}
            onChange={(event) => handleScoreInput(event)}
            placeholder={"0"}
            value={score}
            style={{ maxWidth: "10rem" }}
            helperText={
              scoreInputHasError &&
              `Enter a score from ${GameTypes.minScore} to ${
                isTenBall
                  ? GameTypes.TenBall.maxScore
                  : GameTypes.EightBall.maxScore
              }`
            }
            error={scoreInputHasError}
            InputProps={{
              endAdornment: (
                <>
                  {score && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          clearInput(setScore, setScoreInputHasError)
                        }
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  )}
                </>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<CheckRoundedIcon />}
            color="success"
            type="submit"
            disabled={scoreInputHasError}
          >
            Add score
          </Button>
        </form>
      </div>
    </>
  );
};

export default ScoreTable;

/**
 * math of handling rating calculations over time
 * rating is an 8
 * they score a game of 7, what is their new rating?
 * 8 total starting points, plus new 7 = 15
 * 2 games played total, ew rating is 7.5
 * 8, then got a 15
 * 15 + 8 = 23 / 2 11.5
 *
 *
 * if i am rated at a 7.3 and i get 15 points
 * 7.3 plus 15 = 22.3 / 2 = 11.15
 * 7.3
 * games are based on last four games? could just do total for now.
 * game 1 = 10
 * game 2 = 8
 * game 3 = 4
 * game 4 = 8
 * total = 30 / 4 => 7.5
 * my rating is a 7.3
 *
 * a new player starts at 8
 * they get 10, 8, 4, 8 => 7.5 new rating
 * or 8 + 7.5 = 15.5 / 2 = 7.75 new rating?
 */
