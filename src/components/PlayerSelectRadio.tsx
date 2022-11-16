import { FC, useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import NewPlayerProfileForm from "./NewPlayerProfileForm";

const PlayerSelectRadio: FC = () => {
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
            label="New Players"
          />
          <FormControlLabel
            value="existingPlayer"
            control={<Radio />}
            label="Load Players"
          />
        </RadioGroup>
      </FormControl>
      {selectedOption === "existingPlayer" ? (
        <div>new player form</div>
      ) : (
        <NewPlayerProfileForm />
      )}
    </>
  );
};

export default PlayerSelectRadio;
