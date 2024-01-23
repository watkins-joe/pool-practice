import { FC } from "react";
import styles from "./PlayerStats.module.scss";
import { PlayerStatsProps } from "../../utils/types";

const PlayerStats: FC<PlayerStatsProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.name}>{"Joe"}</div>
      <div className={styles.games}>
        <div className={styles.game}>
          <div className={styles["game--name"]}>{"8 Ball"}</div>
          <div className={styles["game--stats"]}>
            <div className={styles["game--stat"]}>
              <div className={styles["game--statName"]}>{"GP"}</div>
              <div className={styles["game--statValue"]}>{"123"}</div>
            </div>
            <div className={styles["game--stat"]}>
              <div className={styles["game--statName"]}>{"Rating"}</div>
              <div className={styles["game--statValue"]}>{"12.3"}</div>
            </div>
          </div>
        </div>
        {/* TODO: Make only one of these */}
        <div className={styles.game}>
          <div className={styles["game--name"]}>{"10 Ball"}</div>
          <div className={styles["game--stats"]}>
            <div className={styles["game--stat"]}>
              <div className={styles["game--statName"]}>{"GP"}</div>
              <div className={styles["game--statValue"]}>{"123"}</div>
            </div>
            <div className={styles["game--stat"]}>
              <div className={styles["game--statName"]}>{"Rating"}</div>
              <div className={styles["game--statValue"]}>{"12.3"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
