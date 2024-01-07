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
import { PlayerTypeRadioProps, PlayerProfile } from "../utils/types";

const NewPlayerProfileForm: FC<PlayerTypeRadioProps> = ({
  selectedPlayer,
  setPlayers,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PlayerProfile[]>([]);
  const [selectedPlayerProfile, setSelectedPlayerProfile] =
    useState<PlayerProfile>();
  const [searchQueryIsEmpty, setSearchQueryIsEmpty] = useState(false);
  const [noSearchResults, setNoSearchResults] = useState<any>();

  // reset search results, selected player profile when search query modified
  useEffect(() => {
    if (searchResults) setSearchResults([]);
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery) setSearchQueryIsEmpty(true);
  }, [searchQuery]);

  const handleSearchInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const enteredQuery = event.target.value;
    if (noSearchResults) setNoSearchResults(false);
    if (!enteredQuery.trim()) {
      setSearchQueryIsEmpty(true);
    } else {
      setSearchQueryIsEmpty(false);
    }
    setSearchQuery(enteredQuery);
  };

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(searchQuery.trim());
    if (searchQuery.trim().length === 0) {
      setSearchQueryIsEmpty(true);
      return;
    }
    searchForPlayers(searchQuery.trim());
  };

  const searchForPlayers = (searchQuery: string) => {
    let results = localStorage.getItem(
      `${profilePrefix}-${searchQuery.trim()}`
    );
    if (!results) {
      setNoSearchResults(true);
      return;
    }
    results = JSON.parse(results);
    console.log(results);
    setSearchResults([results as unknown as PlayerProfile]);
  };

  const handleSelectPlayerProfile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const playerName = event.target.value;
    const playerProfile: PlayerProfile | undefined = searchResults.find(
      (result) => playerName === result.name
    );
    setSelectedPlayerProfile(playerProfile);
  };

  const handleDeletePlayer = (playerName: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete player profile "${playerName}"?`
      )
    ) {
      localStorage.removeItem(`${profilePrefix}-${playerName}`);
      alert(`Player profile "${playerName}" deleted.`);
    }
    setSearchResults([]);
    setSelectedPlayerProfile(undefined);
  };

  const handleLoadPlayer = () => {
    if (selectedPlayer === "Player 1") {
      setPlayers((prevState) => {
        return {
          ...prevState,
          playerOne: {
            name: selectedPlayerProfile!.name,
            stats: selectedPlayerProfile!.stats,
          },
        };
      });
    } else if (selectedPlayer === "Player 2") {
      setPlayers((prevState) => {
        return {
          ...prevState,
          playerTwo: {
            name: selectedPlayerProfile!.name,
            stats: selectedPlayerProfile!.stats,
          },
        };
      });
    }
    alert(`"${selectedPlayerProfile!.name}" loaded for ${selectedPlayer}!`);
    clearInput(setSearchQuery);
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
          helperText={
            noSearchResults
              ? `No results found for "${searchQuery.trim()}"`
              : searchQueryIsEmpty
              ? "Search cannot be empty"
              : "Name is case sensitive"
          }
          error={noSearchResults || searchQueryIsEmpty}
          InputProps={{
            endAdornment: (
              <>
                {searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        clearInput(setSearchQuery, setNoSearchResults)
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
          disabled={searchQueryIsEmpty}
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
                      8 Ball Rating:{" "}
                      <code>{result.stats.EightBall.rating}</code>
                    </div>
                    <div>
                      8 Ball Games played:{" "}
                      <code>{result.stats.EightBall.gamesPlayed}</code>
                    </div>
                    <div>
                      10 Ball Rating: <code>{result.stats.TenBall.rating}</code>
                    </div>
                    <div>
                      10 Ball Games played:{" "}
                      <code>{result.stats.TenBall.gamesPlayed}</code>
                    </div>
                    <IconButton
                      style={{
                        position: "absolute",
                        right: "0",
                        top: "0",
                      }}
                      color="error"
                      type="submit"
                      onClick={() => handleDeletePlayer(result.name)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </div>
                }
                key={Math.random().toString().slice(2)}
              />
            );
          })}
        </RadioGroup>
        {searchResults && (
          <Button
            variant="outlined"
            color="success"
            onClick={handleLoadPlayer}
            disabled={!selectedPlayerProfile}
          >
            Load selected player
          </Button>
        )}
      </FormControl>
    </>
  );
};

export default NewPlayerProfileForm;
