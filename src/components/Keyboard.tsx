import React from "react";
import styles from "./Keyboard.module.css";
import cs from "classnames";
import { KeyProps, Note, Octave } from "../types";
import { useSoundStore } from "../utils/stores";
import { socket, usePlayers } from "../../pages/home";
import { useRouter } from "next/router";

const Key = ({ note, octave }: KeyProps) => {
  const currentOctave = useSoundStore((state) => state.currentOctave);
  if (!octave) {
    octave = currentOctave;
  }
  const players = usePlayers();
  const { roomID } = useRouter().query;

  // TODO: multi touch support
  const keyHandler = () => {
    if (players) {
      const clipName = note + octave;
      socket.emit("play-sound", clipName, roomID);
      players.player(clipName).start();
    }
  };

  // TEST: convert li element to button element
  return (
    <button
      onClick={keyHandler}
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
  const NOTES = {
    CDE: ["C", "Cs", "D", "Ds", "E"],
    FGAB: ["F", "Fs", "G", "Gs", "A", "As", "B"],
  };
  return (
    <div className={styles.keyboard_template_container}>
      {/* <div className={styles.keys_CDE}>
        {NOTES["CDE"].map((note) => (
          <Key note={note as Note} octave={octave} />
        ))}
        </div>
        <div className={styles.keys_FGAB}>
        {NOTES["FGAB"].map((note) => (
          <Key note={note as Note} octave={octave} />
        ))} 
          </div> */}
      {["C", "Cs", "D", "Ds", "E", "F", "Fs", "G", "Gs", "A", "As", "B"].map(
        (note) => (
          <Key note={note as Note} octave={octave} />
        )
      )}
    </div>
  );
};

const Keyboard = () => {
  const currentOctave = useSoundStore((state) => state.currentOctave);
  const nextOctave = Math.min(Math.max(1, currentOctave + 1), 7) as Octave;
  // TODO: redo keyboard layout to a continuous repetition of two groups: [C CS D DS E], [F FS G GS A AS B]
  // TODO: allow swiping/dragging left and right on the keyboard to go up and down the octaves

  return (
    <div className={styles.keyboard_container}>
      {[...Array(7)].map((v, index) => (
        <KeyboardTemplate octave={(index + 1) as Octave} />
      ))}
    </div>
  );
};

export { Keyboard };
