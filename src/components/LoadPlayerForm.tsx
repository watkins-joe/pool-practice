import { FC, useEffect, useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@mui/material";

interface PlayerProfile {
  name: string;
  rating: number;
  gamesPlayed: number;
}

const NewPlayerProfileForm: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PlayerProfile[]>([]);
  const [searchHasError, setSearchHasError] = useState(false);

  // reset search results when search query modified
  useEffect(() => {
    if (searchResults) setSearchResults([]);
  }, [searchQuery]);

  const handleSearchInput = (event: any) => {
    const enteredQuery = event.target.value.trim();

    if (searchHasError) setSearchHasError(false);
    setSearchQuery(enteredQuery);
  };

  const handleSubmitSearch = (event: any) => {
    event.preventDefault();
    console.log(searchQuery);
    searchForPlayers(searchQuery);
  };

  const searchForPlayers = (searchQuery: string) => {
    const profilePrefix = "poolPrac";
    let results = localStorage.getItem(`${profilePrefix}-${searchQuery}`);
    if (typeof results !== "string") {
      setSearchHasError(true);
      return;
    }
    results = JSON.parse(results);
    console.log(results);
    setSearchResults([results as unknown as PlayerProfile]);
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
          helperText={searchHasError && `No results found for "${searchQuery}"`}
          error={searchHasError}
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
          {searchResults &&
            searchResults.map((result: PlayerProfile) => {
              return (
                <FormControlLabel
                  value={result.name}
                  control={<Radio />}
                  label={
                    <>
                      <div>{result.name}</div>
                      <div>
                        Rating: <code>{result.rating}</code>
                      </div>
                      <div>
                        Games played: <code>{result.gamesPlayed}</code>
                      </div>
                    </>
                  }
                />
              );
            })}
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
