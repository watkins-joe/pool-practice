import { FC, useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const PlayerSelectRadio: FC = () => {
  const [selectedOption, setSelectedOption] = useState("");

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
          defaultValue="playerOne"
          onChange={(event) => handleOptionChange(event)}
        >
          <FormControlLabel
            value="playerOne"
            control={<Radio />}
            label="Player 1"
          />
          <FormControlLabel
            value="playerTwo"
            control={<Radio />}
            label="Player 2"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default PlayerSelectRadio;
