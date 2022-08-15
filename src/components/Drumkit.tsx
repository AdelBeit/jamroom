import React from "react";
import styles from "./Drumkit.module.css";
import cs from "classnames";
import icons from "../utils/data/icons";
import { useSoundStore, useScreenStore } from "../utils/stores";
import { DrumProps } from "../types";
import { usePlayers } from "../../pages/home";
import { useRouter } from "next/router";
import { socket } from "../utils/socketClient";
import LoadImage, { placeholder } from "../utils/LoadImage";
import { DrumConfig } from "./Button";

const Drum = ({ drumType }: DrumProps) => {
  const players = usePlayers();
  const editMode = useSoundStore((state) => state.drumEditMode);
  const [drumSounds] = useSoundStore((state) => [state.drumSounds]);
  const { roomID } = useRouter().query;

  const drumHandler = () => {
    if (editMode) {
      useSoundStore.getState().setDrumToEdit(drumType);
      useScreenStore.getState().setDropDown("drum_selector");
      return;
    }

    if (players) {
      const clipName = drumSounds[drumType];
      socket.emit("play-sound", clipName, roomID);
      players.player(clipName).start();
    }
  };

  return (
    <button
      onClick={drumHandler}
      onTouchEnd={drumHandler}
      id={drumType}
      className={cs("UNSTYLE_BUTTON", styles.drum_container, styles[drumType])}
    >
      <LoadImage
        placeholder={placeholder}
        className={cs(styles.pad)}
        src={icons[drumType]}
      />{" "}
      {editMode && <DrumConfig classes={styles.config} />}
    </button>
  );
};

const Drumkit = () => {
  return (
    <div className={styles.drumkit_container}>
      <Drum drumType="kick" />
      <Drum drumType="closed_hat" />
      <Drum drumType="hi_hat" />
      <Drum drumType="snare" />
      <Drum drumType="tom" />
    </div>
  );
};

export { Drumkit };
