import { ChangeEvent, FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Stack, TextField } from "@mui/material";

const GAME_DATA: GameScores[] = [
  {
    playerOneScore: 6,
    playerTwoScore: 9,
    id: 0,
  },
  {
    playerOneScore: 12,
    playerTwoScore: 3,
    id: 1,
  },
  {
    playerOneScore: 15,
    playerTwoScore: 0,
    id: 2,
  },
  {
    playerOneScore: 4,
    playerTwoScore: 11,
    id: 3,
  },
  {
    playerOneScore: 5,
    playerTwoScore: 10,
    id: 4,
  },
  {
    playerOneScore: 4,
    playerTwoScore: 11,
    id: 5,
  },
  {
    playerOneScore: 4,
    playerTwoScore: 11,
    id: 6,
  },
  {
    playerOneScore: 2,
    playerTwoScore: 13,
    id: 7,
  },
  {
    playerOneScore: 10,
    playerTwoScore: 5,
    id: 8,
  },
  {
    playerOneScore: 14,
    playerTwoScore: 1,
    id: 9,
  },
  {
    playerOneScore: 15,
    playerTwoScore: 0,
    id: 10,
  },
  {
    playerOneScore: 0,
    playerTwoScore: 15,
    id: 11,
  },
  {
    playerOneScore: 11,
    playerTwoScore: 4,
    id: 12,
  },
  {
    playerOneScore: 2,
    playerTwoScore: 13,
    id: 13,
  },
  {
    playerOneScore: 15,
    playerTwoScore: 0,
    id: 14,
  },
  {
    playerOneScore: 14,
    playerTwoScore: 1,
    id: 15,
  },
  {
    playerOneScore: 4,
    playerTwoScore: 11,
    id: 16,
  },
  {
    playerOneScore: 7,
    playerTwoScore: 8,
    id: 17,
  },
  {
    playerOneScore: 4,
    playerTwoScore: 11,
    id: 18,
  },
  {
    playerOneScore: 13,
    playerTwoScore: 2,
    id: 19,
  },
];

interface GameScores {
  playerOneScore: number;
  playerTwoScore: number;
  id: number;
}

let playerOneRating = 0;
let playerTwoRating = 0;

let playerOneScore, playerTwoScore;

let scoresMap: { [name: string]: number } = {};

scoresMap["Joe W"] = 0;
scoresMap["Todd C"] = 0;

interface ScoreTableProps {
  showRatings: boolean;
}

const ScoreTable: FC<ScoreTableProps> = ({ showRatings }) => {
  const handleScoreInput = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    const enteredScore = Number(event.target.value);

    // check which input the event is from, update opposite input respectively
    console.log(event.target.value);
    if (event.target.id === "playerOneScore") {
      playerTwoScore = (15 - enteredScore).toString();
    } else {
      playerOneScore = (15 - enteredScore).toString();
    }
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
              {showRatings ? playerOneRating : "?"}
            </TableCell>
            <TableCell align="center" padding="none">
              {showRatings ? playerTwoRating : "?"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Joe W</TableCell>
            <TableCell align="center">Todd C</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {GAME_DATA.map((game) => (
            <TableRow
              key={game.id}
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
        <Stack
          direction={"row"}
          spacing={2}
          style={{ padding: "1rem", justifyContent: "center" }}
        >
          <TextField
            type="number"
            id="playerTwoScore"
            label={`Score for ${Object.keys(scoresMap)[0]}`}
          />
          <Button variant="contained" size="large" color="error">
            Reset
          </Button>
          <Button variant="contained" size="large">
            Add score
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default ScoreTable;
