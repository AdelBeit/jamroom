import React from "react";
import styles from "./Drumkit.module.css";
import cs from "classnames";
import icons from "../utils/data/icons";
import { useSoundStore, useScreenStore } from "../utils/stores";
import { DrumProps } from "../types";
import { socket, usePlayers } from "../../pages/home";

function Drum({ drumType }: DrumProps) {
  const players = usePlayers();
  const editMode = useSoundStore((state) => state.drumEditMode);
  const [drumSounds] = useSoundStore((state) => [state.drumSounds]);

  const drumHandler = () => {
    if (editMode) {
      useSoundStore.getState().setDrumToEdit(drumType);
      useScreenStore.getState().setDropDown("drum_selector");
      return;
    }

    if (players) {
      const clipName = drumSounds[drumType];
      socket.emit("play-sound", clipName);
      players.player(clipName).start();
    }
  };

  return (
    <button
      onClick={drumHandler}
      className={cs(
        styles.unstyled_button,
        styles.drum_container,
        styles[drumType]
      )}
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
    </button>
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
