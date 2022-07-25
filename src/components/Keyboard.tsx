import React from "react";
import styles from "./Keyboard.module.css";
import cs from "classnames";
import { KeyProps } from "../types";
import { useSoundStore } from "../utils/stores";

function Key({ note }: KeyProps) {
  const [players, octave] = useSoundStore((state) => [
    state.players,
    state.currentOctave,
  ]);

  const keyHandler = () => {
    if (players) {
      const soundName = note.toLowerCase() + octave;
      players.current!.player(soundName).start();
    }
  };

  return (
    <li
      onClick={keyHandler}
      className={cs("neumorphic_mold_raisedUp", styles[note], styles[octave])}
    ></li>
  );
}

function Keyboard() {
  return (
    <div className={styles.keyboard_container}>
      <ul className={styles.white_keys}>
        <Key note={"C"} />
        <Key note={"D"} />
        <Key note={"E"} />
        <Key note={"F"} />
        <Key note={"G"} />
        <Key note={"A"} />
        <Key note={"B"} />
        <Key note={"C"} />
      </ul>
      <ul className={styles.black_keys}>
        <Key note={"Cs"} />
        <Key note={"Ds"} />
        <Key note={"Ds"} />
        <Key note={"Fs"} />
        <Key note={"Gs"} />
        <Key note={"As"} />
        <Key note={"As"} />
      </ul>
    </div>
  );
}

export { Keyboard };
