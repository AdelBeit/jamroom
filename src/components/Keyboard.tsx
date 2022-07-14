import React from "react";
import styles from "./Keyboard.module.css";
import cs from "classnames";

function Key({
  type,
  note,
  octave,
}: {
  type: "white" | "black";
  note:
    | "C"
    | "C#"
    | "D"
    | "D#"
    | "E"
    | "F"
    | "F#"
    | "G"
    | "G#"
    | "A"
    | "A#"
    | "B";
  octave: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}) {
  return (
    <li
      className={cs(
        "neumorphic_mold_bumpedUp",
        styles[type + "_key"],
        styles[note],
        styles[octave]
      )}
    ></li>
  );
}

function Keyboard() {
  return (
    <div className={styles.keyboard_container}>
      <ul>
        <Key type={"white"} note={"C"} octave={4} />
        <Key type={"black"} note={"C#"} octave={4} />
        <Key type={"white"} note={"D"} octave={4} />
        <Key type={"black"} note={"D#"} octave={4} />
        <Key type={"white"} note={"E"} octave={4} />
        <Key type={"white"} note={"F"} octave={4} />
        <Key type={"black"} note={"F#"} octave={4} />
        <Key type={"white"} note={"G"} octave={4} />
        <Key type={"black"} note={"G#"} octave={4} />
        <Key type={"white"} note={"A"} octave={4} />
        <Key type={"black"} note={"A#"} octave={4} />
        <Key type={"white"} note={"B"} octave={4} />
        <Key type={"white"} note={"C"} octave={4} />
      </ul>
    </div>
  );
}

export { Keyboard };
