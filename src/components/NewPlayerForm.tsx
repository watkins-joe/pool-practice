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
        <Grid spacing={2} justifyContent="center">
          <Grid item xs={10}>
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
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewPlayerForm;
