import { ChangeEvent, FC, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";

interface GameScores {
  playerOneScore: number;
  playerTwoScore: number;
  id: number;
}

let scoresMap: { [name: string]: { totalScore: number } } = {};

scoresMap["Joe W"] = { totalScore: 0 };
scoresMap["Todd C"] = { totalScore: 0 };

const ScoreTable: FC = () => {
  const [games, setGames] = useState<GameScores[]>([]);
  const [score, setScore] = useState(0);
  const [showRatings, updateShowRatings] = useState(false);
  const [ratings, updateRatings] = useState({
    playerOneRating: 0,
    playerTwoRating: 0,
  });

  useEffect(() => {
    const listOfScores = document.querySelectorAll("tr");
    const lastScore = listOfScores[listOfScores.length - 1];
    calcRatings(games);
    lastScore.scrollIntoView();
    console.log(scoresMap);
  }, [games]);

  const handleShowRatingsChanges = () => {
    updateShowRatings(!showRatings);
  };

  const handleScoreInput = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    const enteredScore = Number(event.target.value);

    setScore(Number(enteredScore));
  };

  const handleSubmitScore = (event: any) => {
    console.log(score);
    console.log(games);

    console.log(event);

    event.preventDefault();

    const data = new FormData(event.target);

    console.log(data.get("playerOneScore"));

    const newID = Math.floor(Math.random() * 1000);

    scoresMap["Joe W"].totalScore += score;
    scoresMap["Todd C"].totalScore += 15 - score;

    setGames((prevGames) => [
      ...prevGames,
      {
        playerOneScore: score,
        playerTwoScore: 15 - score,
        id: newID,
      },
    ]);

    handleResetScore(event);
  };

  const handleResetScore = (event: any) => {
    event.target.reset();
    setScore(0);
    event.target.focus();
  };

  const calcRatings = (gamesList: GameScores[]) => {
    const mostRecentGame = gamesList[gamesList.length - 1];
    if (!mostRecentGame) {
      updateRatings((prevState) => {
        return {
          ...prevState,
          playerOneRating: 0,
          playerTwoRating: 0,
        };
      });
      return;
    }

    updateRatings((prevState) => {
      return {
        ...prevState,
        playerOneRating:
          Math.round((scoresMap["Joe W"].totalScore / games.length) * 10) / 10,
        playerTwoRating:
          Math.round((scoresMap["Todd C"].totalScore / games.length) * 10) / 10,
      };
    });
  };

  const handleDeleteGame = (gameIndex: number) => {
    const deletedGame = games[gameIndex];

    scoresMap["Joe W"].totalScore -= deletedGame.playerOneScore;
    scoresMap["Todd C"].totalScore -= deletedGame.playerTwoScore;

    setGames((prevGames) => {
      return prevGames.filter((_, index) => {
        return gameIndex !== index;
      });
    });
  };

  /**
   * 1. click on delete button
   * 2. grab GameScores to be deleted (object)
   * 3. subtract player scores from GameScores values
   * 4. update total player scores
   * 5. actually remove game from games array
   * 6. recalc player ratings based on new games array length
   */

  return (
    <>
      <Table aria-label="simple table">
        <TableHead
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
          }}
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "rgb(242, 242, 242)",
            zIndex: 1,
          }}
        >
          <TableRow>
            <TableCell align="center" padding="none">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch onChange={handleShowRatingsChanges} />}
                    label="Show ratings?"
                    labelPlacement="start"
                  />
                </FormGroup>
              </div>
            </TableCell>
            <TableCell align="center" padding="none">
              Total games played: {games.length}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" padding="none">
              Rating:
            </TableCell>
            <TableCell align="center" padding="none">
              Rating:
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" padding="none">
              {showRatings ? ratings.playerOneRating : "?"}
            </TableCell>
            <TableCell align="center" padding="none">
              {showRatings ? ratings.playerTwoRating : "?"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Joe W</TableCell>
            <TableCell align="center">Todd C</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game, index) => (
            <TableRow
              key={game.id}
              id={String(game.id)}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                align="center"
                style={{ position: "relative" }}
              >
                <IconButton
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    height: "100%",
                  }}
                  color="error"
                  type="submit"
                  onClick={() => handleDeleteGame(index)}
                >
                  <ClearIcon />
                </IconButton>
                {game.playerOneScore}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {game.playerTwoScore}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div
        style={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "#f2f2f2",
        }}
      >
        <form
          onSubmit={handleSubmitScore}
          style={{
            padding: "1rem",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            type="number"
            id="playerOneScore"
            name="playerOneScore"
            label={`Score for ${Object.keys(scoresMap)[0]}`}
            onChange={handleScoreInput}
            placeholder={"0"}
          />
          <Button
            variant="contained"
            size="large"
            color="error"
            type="reset"
            onReset={handleResetScore}
          >
            Reset
          </Button>
          <Button variant="contained" size="large" type="submit">
            Add score
          </Button>
        </form>
      </div>
    </>
  );
};

export default ScoreTable;
