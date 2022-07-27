import React from "react";
import styles from "./Keyboard.module.css";
import cs from "classnames";
import { KeyProps, Octave } from "../types";
import { useSoundStore } from "../utils/stores";
import { socket, usePlayers } from "../../pages/home";
import { useRouter } from "next/router";

function Key({ note, octave }: KeyProps) {
  const currentOctave = useSoundStore((state) => state.currentOctave);
  if (!octave) {
    octave = currentOctave;
  }
  const players = usePlayers();
  const { roomID } = useRouter().query;

  const keyHandler = () => {
    if (players) {
      const clipName = note + octave;
      socket.emit("play-sound", clipName, roomID);
      players.player(clipName).start();
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
  const currentOctave = useSoundStore((state) => state.currentOctave);
  const nextOctave = Math.min(Math.max(1, currentOctave + 1), 7) as Octave;
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
        <div className={cs(currentOctave == 7 ? "HIDE_THIS" : "")}>
          <Key note={"C"} octave={nextOctave} />
        </div>
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
