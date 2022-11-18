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
import { clearInput, profilePrefix } from "../globals";
import { PlayerTypeRadioProps } from "./PlayerTypeRadio";

export interface PlayerProfile {
  name: string;
  rating: number;
  totalPoints: number;
  gamesPlayed: number;
}

const NewPlayerProfileForm: FC<PlayerTypeRadioProps> = ({
  selectedPlayer,
  setPlayers,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PlayerProfile[]>([]);
  const [selectedPlayerProfile, setSelectedPlayerProfile] =
    useState<PlayerProfile>();
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
    let results = localStorage.getItem(`${profilePrefix}-${searchQuery}`);
    if (typeof results !== "string") {
      setSearchHasError(true);
      return;
    }
    results = JSON.parse(results);
    console.log(results);
    setSearchResults([results as unknown as PlayerProfile]);
  };

  const handleSelectPlayerProfile = (event: any) => {
    const playerProfileIndex = event.target.value;
    const playerProfile = searchResults[playerProfileIndex];
    setSelectedPlayerProfile(playerProfile);
  };

  const handleLoadPlayer = () => {
    if (selectedPlayer === "playerOne") {
      setPlayers((prevState) => {
        return {
          ...prevState,
          playerOne: {
            name: selectedPlayerProfile!.name,
            rating: selectedPlayerProfile!.rating,
            totalPoints: selectedPlayerProfile!.totalPoints,
            gamesPlayed: selectedPlayerProfile!.gamesPlayed,
          },
        };
      });
    } else if (selectedPlayer === "playerTwo") {
      setPlayers((prevState) => {
        return {
          ...prevState,
          playerTwo: {
            name: selectedPlayerProfile!.name,
            rating: selectedPlayerProfile!.rating,
            totalPoints: selectedPlayerProfile!.totalPoints,
            gamesPlayed: selectedPlayerProfile!.gamesPlayed,
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
          style={{ marginBottom: "1rem" }}
          onChange={(event) => handleSelectPlayerProfile(event)}
        >
          {searchResults.map((result: PlayerProfile, index) => {
            return (
              <FormControlLabel
                value={index}
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
        {searchResults && (
          <Button
            variant="outlined"
            color="success"
            onClick={handleLoadPlayer}
            disabled={searchHasError}
          >
            Load selected player
          </Button>
        )}
      </FormControl>
    </>
  );
};

export default NewPlayerProfileForm;
