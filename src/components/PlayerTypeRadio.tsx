import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import LoadPlayerForm from "./LoadPlayerForm";
import NewPlayerForm from "./NewPlayerForm";
import { Game } from "./ScoreTable";

export interface PlayerTypeRadioProps {
  selectedPlayer: string;
  setPlayers: Dispatch<SetStateAction<Game>>;
}

const PlayerTypeRadio: FC<PlayerTypeRadioProps> = ({
  selectedPlayer,
  setPlayers,
}) => {
  const [selectedOption, setSelectedOption] = useState("newPlayer");

  const handleOptionChange = (event: any) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          style={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "center",
          }}
          defaultValue="newPlayer"
          onChange={(event) => handleOptionChange(event)}
        >
          <FormControlLabel
            value="newPlayer"
            control={<Radio />}
            label="New Player"
          />
          <FormControlLabel
            value="loadPlayer"
            control={<Radio />}
            label="Load Player"
          />
        </RadioGroup>
      </FormControl>
      {selectedOption === "newPlayer" ? (
        <NewPlayerForm
          selectedPlayer={selectedPlayer}
          setPlayers={setPlayers}
        />
      ) : (
        <LoadPlayerForm
          selectedPlayer={selectedPlayer}
          setPlayers={setPlayers}
        />
      )}
    </>
  );
};

export default PlayerTypeRadio;