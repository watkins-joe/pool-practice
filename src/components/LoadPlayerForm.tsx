import { FC, useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@mui/material";

const NewPlayerProfileForm: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInput = (event: any) => {
    const enteredQuery = event.target.value.trim();

    setSearchQuery(enteredQuery);
  };

  const handleSubmitSearch = (event: any) => {
    event.preventDefault();
    console.log(searchQuery);
  };

  return (
    <>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
        onSubmit={(event) => handleSubmitSearch(event)}
      >
        <TextField
          id="standard-basic"
          label="Enter player name"
          variant="standard"
          size="small"
          value={searchQuery}
          onChange={(event) => handleSearchInput(event)}
          autoFocus
        />
        <Button
          variant="outlined"
          // startIcon={<CheckRoundedIcon />}
          color="success"
          type="submit"
          // disabled={scoreInputHasError}
          style={{ marginLeft: "1rem" }}
        >
          Search
        </Button>
      </form>

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="newPlayer"
            control={<Radio />}
            label={<div>Joe W</div>}
          />
          <FormControlLabel
            value="existingPlayer"
            control={<Radio />}
            label={<div>Todd C</div>}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default NewPlayerProfileForm;
