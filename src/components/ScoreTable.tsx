import { FC, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
  const [score, setScore] = useState("");
  const [scoreInputHasError, setScoreInputHasError] = useState(false);
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
    // console.log(scoresMap);
  }, [games]);

  const handleShowRatingsChanges = () => {
    updateShowRatings(!showRatings);
  };

  const handleScoreInput = (event: any) => {
    // console.log(event);
    let enteredScore = event.target.value.trim();
    // console.log(`enteredScore: ${enteredScore}`);
    if (!enteredScore || enteredScore < 0 || enteredScore > 15) {
      setScoreInputHasError(true);
    } else {
      setScoreInputHasError(false);
    }

    setScore(enteredScore);
  };

  const handleSubmitScore = (event: any) => {
    // console.log(score);
    // console.log(games);

    // console.log(event);
    event.preventDefault();

    if (scoreInputHasError) return;

    const newID = Math.floor(Math.random() * 1000);

    scoresMap["Joe W"].totalScore += Number(score);
    scoresMap["Todd C"].totalScore += 15 - Number(score);

    // console.log(`score before adding score to game: ${score}`);
    setGames((prevGames) => [
      ...prevGames,
      {
        playerOneScore: Number(score),
        playerTwoScore: 15 - Number(score),
        id: newID,
      },
    ]);

    handleResetScore();
  };

  const handleResetScore = () => {
    setScore("");
    setScoreInputHasError(false);
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

  return (
    <>
      <Table aria-label="simple table" style={{ marginBottom: "88px" }}>
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
          {showRatings && (
            <>
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
                  {ratings.playerOneRating}
                </TableCell>
                <TableCell align="center" padding="none">
                  {ratings.playerTwoRating}
                </TableCell>
              </TableRow>
            </>
          )}
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
          position: "fixed",
          bottom: 0,
          backgroundColor: "#f2f2f2",
          width: "100%",
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
            onChange={(event) => handleScoreInput(event)}
            placeholder={"0"}
            value={score}
            style={{ maxWidth: "10rem" }}
            helperText={scoreInputHasError && "Enter a score from 0 to 15"}
            error={scoreInputHasError}
            autoFocus
            InputProps={{
              endAdornment: (
                <>
                  {score && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleResetScore()}>
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
