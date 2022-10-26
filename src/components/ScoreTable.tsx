import { ChangeEvent, FC, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";

interface GameScores {
  playerOneScore: number;
  playerTwoScore: number;
  id: number;
}

let scoresMap: { [name: string]: { totalScore: number; rating: number } } = {};

scoresMap["Joe W"] = { totalScore: 0, rating: 0 };
scoresMap["Todd C"] = { totalScore: 0, rating: 0 };

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
  };

  const calcRatings = (gamesList: GameScores[]) => {
    const mostRecentGame = gamesList[gamesList.length - 1];
    if (!mostRecentGame) return;
    scoresMap["Joe W"].totalScore += mostRecentGame.playerOneScore;
    scoresMap["Joe W"].rating =
      Math.round((scoresMap["Joe W"].totalScore / games.length) * 10) / 10;
    scoresMap["Todd C"].totalScore += mostRecentGame.playerTwoScore;
    scoresMap["Todd C"].rating =
      Math.round((scoresMap["Todd C"].totalScore / games.length) * 10) / 10;

    updateRatings((prevState) => {
      return {
        ...prevState,
        playerOneRating: scoresMap["Joe W"].rating,
        playerTwoRating: scoresMap["Todd C"].rating,
      };
    });
  };

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
          {games.map((game) => (
            <TableRow
              key={game.id}
              id={String(game.id)}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
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
