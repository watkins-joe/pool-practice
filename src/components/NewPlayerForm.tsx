import { FC, useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { PlayerTypeRadioProps } from "./PlayerTypeRadio";

const NewPlayerForm: FC<PlayerTypeRadioProps> = ({
  selectedPlayer,
  setPlayers,
}) => {
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredNameError, setEnteredNameError] = useState(false);

  const handleNameInput = (event: any) => {
    console.log(event);
    const name = event.target.value.trim();
    if (!name) {
      setEnteredNameError(true);
    } else {
      setEnteredNameError(false);
    }
    setEnteredName(name);
  };

  const handleNewPlayer = (event: any) => {
    event.preventDefault();
    if (selectedPlayer === "playerOne") {
      setPlayers((prevState) => {
        return {
          ...prevState,
          playerOne: {
            ...prevState.playerOne,
            name: enteredName.trim(),
          },
        };
      });
    } else if (selectedPlayer === "playerTwo") {
      setPlayers((prevState) => {
        return {
          ...prevState,
          playerTwo: {
            ...prevState.playerTwo,
            name: enteredName.trim(),
          },
        };
      });
    }
  };

  return (
    <>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
        onSubmit={(event) => handleNewPlayer(event)}
      >
        <TextField
          id="playerOne"
          label="Enter player 1 name"
          variant="standard"
          size="small"
          value={enteredName}
          onChange={(event) => handleNameInput(event)}
          helperText={enteredNameError && "Name cannot be blank"}
          error={enteredNameError}
          autoFocus
        />
        <Button
          variant="outlined"
          color="success"
          type="submit"
          style={{ marginLeft: "1rem" }}
          disabled={enteredNameError}
        >
          Confirm
        </Button>
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
