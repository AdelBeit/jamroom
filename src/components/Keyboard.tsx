import React from "react";
import styles from "./Keyboard.module.css";
import cs from "classnames";
import { KeyProps, Note, Octave } from "../types";
import { useSoundStore, useUserStore, useVolumeStore } from "../utils/stores";
import { usePlayers } from "../../pages/home";
import { socket } from "../utils/socketClient";
import { playWithVolume } from "../utils/utils";

const Key = ({ note, octave }: KeyProps) => {
  const currentOctave = useSoundStore((state) => state.currentOctave);
  if (!octave) {
    octave = currentOctave;
  }
  const players = usePlayers();
  const userVolumes = useVolumeStore((state) => state.userVolumes);
  const [roomID, userID] = useUserStore((state) => [
    state.roomID,
    state.userID,
  ]);

  const keyHandler = () => {
    if (players) {
      const clipName = note + octave;
      const player = players.player(clipName);
      const volume = userVolumes[userID];
      playWithVolume(player, volume);
      socket.emit("play-sound", clipName, roomID);
    }
  };

  return (
    <button
      onTouchEnd={keyHandler}
      onClick={keyHandler}
      id={note + octave}
      className={cs(
        "UNSTYLE_BUTTON",
        "neumorphic_mold_raisedUp",
        styles[note],
        styles[octave],
        note.includes("s") && styles.black,
        !note.includes("s") && styles.white,
        styles.key
      )}
    >
      {note == "C" && (
        <span className={styles.key_text}>
          {note}
          {octave}
        </span>
      )}
    </button>
  );
};

const KeyboardTemplate = ({ octave }: { octave: Octave }) => {
  const NOTES = [
    "C",
    "Cs",
    "D",
    "Ds",
    "E",
    "F",
    "Fs",
    "G",
    "Gs",
    "A",
    "As",
    "B",
  ] as Note[];

  return (
    <div className={styles.keyboard_template_container}>
      {NOTES.map((note, index) => (
        <Key key={index} note={note} octave={octave} />
      ))}
    </div>
  );
};

const Keyboard = () => {
  const currentOctave = useSoundStore((state) => state.currentOctave);
  const nextOctave = Math.min(Math.max(1, currentOctave + 1), 7) as Octave;
  // CHECK: allow swiping/dragging left and right on the keyboard to go up and down the octaves
  // TODO: make a custom scroll bar for the keyboard
  // TODO: hide elements partially overflowing in the keyboard
  // TODO: animate keys as they enter and leave viewport of parent
  return (
    <div className={styles.keyboard_container}>
      {[...Array(7)].map((v, index) => (
        <KeyboardTemplate key={index} octave={(index + 1) as Octave} />
      ))}
    </div>
  );
};

export { Keyboard };
