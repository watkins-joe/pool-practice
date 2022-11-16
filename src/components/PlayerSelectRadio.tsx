import { FC } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import NewPlayerProfileForm from "./NewPlayerProfileForm";

const PlayerSelectRadio: FC = () => {
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
        >
          <FormControlLabel
            value="newPlayer"
            control={<Radio />}
            label="New Profiles"
          />
          <FormControlLabel
            value="existingPlayer"
            control={<Radio />}
            label="Load Profiles"
          />
        </RadioGroup>
      </FormControl>
      <NewPlayerProfileForm />
    </>
  );
};

export default PlayerSelectRadio;
