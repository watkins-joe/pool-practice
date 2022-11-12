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
      <DialogTitle>Load Game</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          //   ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          //   value={value}
          //   onChange={handleChange}
        >
          {/* {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))} */}
        </RadioGroup>
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
