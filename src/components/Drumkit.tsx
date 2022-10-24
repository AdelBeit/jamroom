import React from "react";
import styles from "./Drumkit.module.css";
import cs from "classnames";
import {
  useSoundStore,
  useScreenStore,
  useUserStore,
  useVolumeStore,
} from "../utils/stores";
import { DrumProps } from "../types";
import { useRouter } from "next/router";
import { socket } from "../utils/socketClient";
import { DrumConfig } from "./Button";
import { playWithVolume } from "../utils/utils";
import { usePlayers } from "../utils/PlayersContext";

const Pad = ({ drumType }: DrumProps) => {
  const { players } = usePlayers();
  const [drumSounds, editMode] = useSoundStore((state) => [
    state.drumSounds,
    state.drumEditMode,
  ]);
  const userID = useUserStore((state) => state.userID);
  const { roomID } = useRouter().query;

  const drumHandler = (e) => {
    e.currentTarget.classList.add(styles.tap);
    if (editMode) {
      useSoundStore.getState().setDrumToEdit(drumType);
      useScreenStore.getState().setDropDown("drum_selector");
      return;
    }

    if (players) {
      const clipName = drumSounds[drumType];
      const player = players.player(clipName);
      socket.emit("play-sound", clipName, roomID);
      const volume = useVolumeStore.getState().userVolumes[userID] ?? -10;
      playWithVolume(player, volume);
    }
  };

  const preventDefault = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove(styles.tap);
  };

  return (
    <button
      onMouseDown={drumHandler}
      onTouchStart={drumHandler}
      onMouseUp={preventDefault}
      onTouchEnd={preventDefault}
      id={drumType}
      className={cs(
        "UNSTYLE_BUTTON",
        styles.pad_container,
        styles[drumType],
        editMode && styles.edit_mode
      )}
    >
      {editMode && <DrumConfig classes={styles.config} />}
    </button>
  );
};

const Drumkit = () => {
  return (
    <div className={styles.drumkit_viewbox}>
      <div className={styles.drumkit_container}>
        <Pad drumType="kick" />
        <Pad drumType="closed_hat" />
        <Pad drumType="hi_hat" />
        <Pad drumType="snare" />
        <Pad drumType="tom" />
        <Pad drumType="tom" />
      </div>
    </div>
  );
};

export { Drumkit };
