import React from "react";
import styles from "./Keyboard.module.css";
import cs from "classnames";
import { KeyProps } from "../types";
import { useSoundStore } from "../utils/stores";
import { socket, usePlayers } from "../../pages/home";
import { useRouter } from "next/router";

function Key({ note }: KeyProps) {
  const [octave] = useSoundStore((state) => [state.currentOctave]);
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
