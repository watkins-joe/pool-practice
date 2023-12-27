import { FC, useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const PlayerSelectRadio: FC = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          defaultValue="Player 1"
          onChange={(event) => handleOptionChange(event)}
        >
          <FormControlLabel
            value="Player 1"
            control={<Radio />}
            label="Player 1"
          />
          <FormControlLabel
            value="Player 2"
            control={<Radio />}
            label="Player 2"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default PlayerSelectRadio;
