import { FC, useEffect, useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { clearInput } from "../globals";
import { PlayerTypeRadioProps } from "./PlayerTypeRadio";

export interface PlayerProfile {
  name: string;
  rating: number;
  gamesPlayed: number;
}

const NewPlayerProfileForm: FC<PlayerTypeRadioProps> = ({ selectedPlayer }) => {
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
    if (!searchQuery) return;
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
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(event) => handleSearchInput(event)}
          autoFocus
          helperText={
            searchHasError
              ? `No results found for "${searchQuery}"`
              : "Name is case sensitive"
          }
          error={searchHasError}
          InputProps={{
            endAdornment: (
              <>
                {searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        clearInput(setSearchQuery, setSearchHasError)
                      }
                    >
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
          disabled={searchHasError}
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
          {searchResults.map((result: PlayerProfile) => {
            return (
              <FormControlLabel
                value={result.name}
                control={<Radio />}
                label={
                  <div>
                    <div>
                      Name: <code>{result.name}</code>
                    </div>
                    <div>
                      Rating: <code>{result.rating}</code>
                    </div>
                    <div>
                      Games played: <code>{result.gamesPlayed}</code>
                    </div>
                  </div>
                }
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default NewPlayerProfileForm;