import { Button } from "@mui/material";
import { FC } from "react";

const Welcome: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        width: "100vw",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <span style={{ fontSize: "7rem" }}>🎱</span>
      <h2 style={{ marginTop: 0 }}>Ready to practice?</h2>
      <div>
        <span>Add a score or &nbsp;</span>
        <Button
          variant="outlined"
          // startIcon={<CheckRoundedIcon />}
          color="success"
          type="submit"
          // disabled={scoreInputHasError}
        >
          Load game
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
