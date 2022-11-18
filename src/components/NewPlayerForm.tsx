import { FC, useEffect, useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { PlayerTypeRadioProps } from "./PlayerTypeRadio";
import { clearInput } from "../globals";

const NewPlayerForm: FC<PlayerTypeRadioProps> = ({
  selectedPlayer,
  setPlayers,
}) => {
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredNameIsEmpty, setEnteredNameIsEmpty] = useState(false);

  useEffect(() => {
    if (!enteredName) setEnteredNameIsEmpty(true);
  }, [enteredName]);

  const handleNameInput = (event: any) => {
    console.log(event);
    const name = event.target.value;
    if (!name.trim()) {
      setEnteredNameIsEmpty(true);
    } else {
      setEnteredNameIsEmpty(false);
    }
    setEnteredName(name);
  };

  const handleNewPlayer = (event: any) => {
    event.preventDefault();
    if (selectedPlayer === "Player 1") {
      setPlayers((prevState) => {
        return {
          ...prevState,
          playerOne: {
            ...prevState.playerOne,
            name: enteredName.trim(),
          },
        };
      });
    } else if (selectedPlayer === "Player 2") {
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
    alert(`"${enteredName.trim()}" loaded for ${selectedPlayer}!`);
    clearInput(setEnteredName);
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
          id="Player 1"
          label={
            selectedPlayer === "Player 1"
              ? "Enter player 1 name"
              : "Enter player 2 name"
          }
          variant="outlined"
          size="small"
          value={enteredName}
          onChange={(event) => handleNameInput(event)}
          helperText={enteredNameIsEmpty && "Name cannot be blank"}
          error={enteredNameIsEmpty}
          autoFocus
          InputProps={{
            endAdornment: (
              <>
                {enteredName && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => clearInput(setEnteredName)}>
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
          color="success"
          type="submit"
          style={{ marginLeft: "1rem" }}
          disabled={enteredNameIsEmpty}
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
