import { Button } from "@mui/material";
import { FC, useState } from "react";
import LoadGameDialog from "./LoadGameDialog";

/**
 * a. when first game saved, generate random id, store this game with this id in localStorage. on each page load, gen new id and save game. load game lists all saved games and you can choose which one or delete them there.
 * 1. when load game clicked, search local storage
 * 2. if no games found, throw alert
 * 3. otherwise open dialog box with games to select from
 * 4. when game selected and load game clicked, close dialog box and load game data into the app
 * when
 */

const Welcome: FC = () => {
  const [showLoadGame, setShowLoadGame] = useState(false);

  const handleLoadGame = (event: any) => {
    console.log(event);
    setShowLoadGame(true);
  };

  const handleLoadGameCancel = () => {
    console.log("CANCEL");
    setShowLoadGame(false);
  };

  const handleLoadGameOk = () => {
    console.log("OK");
    setShowLoadGame(false);
  };

  return (
    <>
      {showLoadGame && (
        <LoadGameDialog
          open={showLoadGame}
          onCancel={handleLoadGameCancel}
          onOk={handleLoadGameOk}
        />
      )}
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
            onClick={(event) => handleLoadGame(event)}
          >
            Load game
          </Button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
