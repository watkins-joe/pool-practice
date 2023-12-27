import {
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { FC, useState } from "react";
import PlayerTypeRadio from "./PlayerTypeRadio";
import { LoadGameDialogProps } from "../utils/types";

const LoadGameDialog: FC<LoadGameDialogProps> = ({
  open,
  onClose,
  setPlayers,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState("Player 1");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <DialogTitle>
        New Game
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
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
        <PlayerTypeRadio
          selectedPlayer={selectedPlayer}
          setPlayers={setPlayers}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LoadGameDialog;
