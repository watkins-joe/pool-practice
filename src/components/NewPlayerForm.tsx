import { FC, useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Grid,
} from "@mui/material";

interface EnteredNames {
  playerOneName: string;
  playerTwoName: string;
}

const NewPlayerForm: FC = () => {
  const [enteredNames, setEnteredNames] = useState<EnteredNames>({
    playerOneName: "",
    playerTwoName: "",
  });

  const handleNameInput = (event: any) => {
    console.log(event);
    const enteredName = event.target.value.trim();
    if (event.target.id === "playerOne") {
      setEnteredNames((prevState) => {
        return {
          ...prevState,
          playerOneName: enteredName,
        };
      });
    } else {
      setEnteredNames((prevState) => {
        return {
          ...prevState,
          playerTwoName: enteredName,
        };
      });
    }
  };

  const handleNameChange = (event: any) => {
    event.preventDefault();
    console.log(enteredNames);
  };

  return (
    <>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
        onSubmit={(event) => handleNameChange(event)}
      >
        <Grid justifyContent="center">
          <TextField
            id="playerOne"
            label="Enter player 1 name"
            variant="standard"
            size="small"
            value={enteredNames.playerOneName}
            onChange={(event) => handleNameInput(event)}
            autoFocus
          />
          <Button
            variant="outlined"
            color="success"
            type="submit"
            style={{ marginLeft: "1rem" }}
          >
            Confirm
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default NewPlayerForm;

/**
 * when new player created,
 * load GameData of player into gameState
 * name: newPlayerName,
 * rating: 8.0 or 0, whatever
 * gamesPlayed: 0,
 *
 * when player loaded into game
 * load gameData of player into game State
 * name: loadedPlayer.name
 * rating: loadedPlayer.rating
 * gamesPlayed: loadedPlayer.gamesPlayed
 *
 * on each score submission
 *
 * update playerOne and playerTwo's gameData and save it to localStorage
 * playerOne.rating
 * playerOne.gamesPlayed += 1
 * playerTwo.rating
 * playerTwo.gamesPlayed += 1
 *
 * on game delete, remove the gamePlayed from each, -= 1. undo rating calc as well.
 */
