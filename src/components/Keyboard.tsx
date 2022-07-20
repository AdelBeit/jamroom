import React from "react";
import styles from "./Keyboard.module.css";
import cs from "classnames";
import { KeyProps } from "../types";

function Key({ note, octave = 4 }: KeyProps) {
  return (
    <li
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
        <Key note={"C#"} />
        <Key note={"D#"} />
        <Key note={"D#"} />
        <Key note={"F#"} />
        <Key note={"G#"} />
        <Key note={"A#"} />
        <Key note={"A#"} />
      </ul>
    </div>
  );
}

export { Keyboard };
