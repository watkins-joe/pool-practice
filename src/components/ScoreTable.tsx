import { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(playerOneScore: number, playerTwoScore: number) {
  return { playerOneScore, playerTwoScore };
}

let gameData = [
  createData(5, 10),
  createData(8, 7),
  createData(8, 7),
  createData(8, 7),
  createData(8, 7),
  createData(8, 7),
  createData(8, 7),
  createData(8, 7),
  createData(8, 7),
  createData(8, 7),
  createData(8, 7),
  createData(8, 7),
];

let playerOneRating = 0;
let playerTwoRating = 0;

let scoresMap: { [name: string]: number } = {};

scoresMap["Joe W"] = 0;
scoresMap["Todd C"] = 0;

interface ScoreTableProps {
  showRatings: boolean;
}

const ScoreTable: FC<ScoreTableProps> = ({ showRatings }) => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
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
          {gameData.map((game) => (
            <TableRow
              key={game.playerOneScore}
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
    </TableContainer>
  );
};

export default ScoreTable;
