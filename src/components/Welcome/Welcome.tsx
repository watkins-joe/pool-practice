import { Button } from "@mui/material";
import { FC, useState } from "react";
import LoadGameDialog from "../NewGameDialog";
import { WelcomeProps } from "../../utils/types";
import styles from "./Welcome.module.scss";
/**
 * a. when first game saved, generate random id, store this game with this id in localStorage. on each page load, gen new id and save game. load game lists all saved games and you can choose which one or delete them there.
 * 1. when load game clicked, search local storage
 * 2. if no games found, throw alert
 * 3. otherwise open dialog box with games to select from
 * 4. when game selected and load game clicked, close dialog box and load game data into the app
 * when
 */

const Welcome: FC<WelcomeProps> = ({ setPlayers }) => {
  const [showLoadGame, setShowLoadGame] = useState(false);

  const handleLoadGame = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    setShowLoadGame(true);
  };

  const handleLoadGameClose = () => {
    console.log("OK");
    setShowLoadGame(false);
  };

  return (
    <>
      {showLoadGame && (
        <LoadGameDialog
          open={showLoadGame}
          onClose={handleLoadGameClose}
          setPlayers={setPlayers}
        />
      )}
      <div className={styles.Welcome}>
        <span style={{ fontSize: "7rem" }}>🎱</span>
        <h2 style={{ marginTop: 0 }}>Ready to practice?</h2>
        <div>
          <Button
            variant="outlined"
            // startIcon={<CheckRoundedIcon />}
            color="success"
            // disabled={scoreInputHasError}
            onClick={(event) => handleLoadGame(event)}
          >
            New Game
          </Button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
