import { ChangeEvent, FC, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, TextField } from "@mui/material";

interface GameScores {
  playerOneScore: number;
  playerTwoScore: number;
  id: number;
}

let scoresMap: { [name: string]: { totalScore: number; rating: number } } = {};

scoresMap["Joe W"] = { totalScore: 0, rating: 0 };
scoresMap["Todd C"] = { totalScore: 0, rating: 0 };

interface ScoreTableProps {
  showRatings: boolean;
}

const ScoreTable: FC<ScoreTableProps> = ({ showRatings }) => {
  const [games, setGames] = useState<GameScores[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const listOfScores = document.querySelectorAll("tr");
    const lastScore = listOfScores[listOfScores.length - 1];
    updateRatings(games);
    lastScore.scrollIntoView();
  }, [games]);

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

  /**
   * calculating scores:
   * 1. take old score (0)
   * 2. add new score to old score (0 + 8)
   * 3. divide new score by total number of games played (games.length)
   * 4. this number is now the the rating for that given player.
   * 5. repeat this process after each game is scored.
   */

  const updateRatings = (gamesList: GameScores[]) => {
    const mostRecentGame = gamesList[gamesList.length - 1];
    if (!mostRecentGame) return;
    scoresMap["Joe W"].totalScore += mostRecentGame.playerOneScore;
    scoresMap["Joe W"].rating = scoresMap["Joe W"].totalScore / games.length;
    scoresMap["Todd C"].totalScore += mostRecentGame.playerTwoScore;
    scoresMap["Todd C"].rating = scoresMap["Todd C"].totalScore / games.length;
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
              Rating:
            </TableCell>
            <TableCell align="center" padding="none">
              Rating:
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" padding="none">
              {!showRatings
                ? Math.round(scoresMap["Joe W"].rating * 10) / 10
                : "?"}
            </TableCell>
            <TableCell align="center" padding="none">
              {!showRatings
                ? Math.round(scoresMap["Todd C"].rating * 10) / 10
                : "?"}
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
