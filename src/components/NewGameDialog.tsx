import {
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogActions,
  Button,
  FormControl,
} from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import PlayerSelectRadio from "./PlayerSelectRadio";
import PlayerTypeRadio from "./PlayerTypeRadio";
import { Game } from "./ScoreTable";

interface LoadGameDialogProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  setPlayers: Dispatch<SetStateAction<Game>>;
}

const LoadGameDialog: FC<LoadGameDialogProps> = ({
  open,
  onCancel,
  onOk,
  setPlayers,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState("playerOne");

  const handleOptionChange = (event: any) => {
    console.log(event.target.value);
    setSelectedPlayer(event.target.value);
  };
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 635 } }}
      maxWidth="xs"
      //   TransitionProps={{ onEntering: handleEntering }}
      open={open}
      //   {...other}
    >
      <DialogTitle>New Game</DialogTitle>
      <DialogContent
        dividers
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
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
        <PlayerTypeRadio
          selectedPlayer={selectedPlayer}
          setPlayers={setPlayers}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoadGameDialog;
