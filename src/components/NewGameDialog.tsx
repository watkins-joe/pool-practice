import {
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogActions,
  Button,
} from "@mui/material";
import { FC } from "react";
import PlayerSelectRadio from "./PlayerSelectRadio";
import PlayerTypeRadio from "./PlayerTypeRadio";

interface LoadGameDialogProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
}

const LoadGameDialog: FC<LoadGameDialogProps> = ({ open, onCancel, onOk }) => {
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
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
        <PlayerSelectRadio />
        <PlayerTypeRadio />
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
