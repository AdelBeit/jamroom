import React from "react";
import styles from "./Drumkit.module.css";
import cs from "classnames";
import icons from "../utils/data/icons";
import { useSoundStore, useScreenStore } from "../utils/stores";
import { DrumProps } from "../types";

function Drum({ drumType }: DrumProps) {
  const editMode = useSoundStore((state) => state.drumEditMode);
  let [players, drumSounds] = useSoundStore((state) => [
    state.players,
    state.drumSounds,
  ]);

  const drumHandler = () => {
    if (editMode) {
      useSoundStore.getState().setDrumToEdit(drumType);
      useScreenStore.getState().setDropDown("drum_selector");
      return;
    }

    if (players) {
      const soundName = drumSounds[drumType];
      players.current!.player(soundName).start();
    }
  };

  return (
    <div
      onClick={() => drumHandler()}
      className={cs(styles.drum_container, styles[drumType])}
    >
      <img className={cs(styles[drumType])} src={icons[drumType]} />
      {editMode && (
        <>
          <img
            className={cs(styles.outer, styles.config_drum)}
            src={icons.cog_outer}
          />
          <img
            className={cs(styles.inner, styles.config_drum)}
            src={icons.cog_inner}
          />
        </>
      )}
    </div>
  );
}

function Drumkit() {
  return (
    <div className={styles.drumkit_container}>
      <Drum drumType="kick" />
      <Drum drumType="closed_hat" />
      <Drum drumType="hi_hat" />
      <Drum drumType="snare" />
      <Drum drumType="tom" />
    </div>
  );
}

export { Drumkit };
