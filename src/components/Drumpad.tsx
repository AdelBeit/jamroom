import React from "react";
import styles from "./Drumpad.module.css";
import cs from "classnames";
import icons from "../utils/icons";

function Drum({
  type,
}: {
  type: "kick" | "tom" | "snare" | "hi_hat" | "closed_hat";
}) {
  return (
    <div className={cs(styles.drum_container, styles[type])}>
      <img
        className={cs(styles[type], styles.drum_outer)}
        src={icons.drum_outer}
      />
      <img
        className={cs(styles[type], styles.drum_inner)}
        src={icons.drum_inner}
      />
    </div>
  );
}

function Drumpad() {
  return (
    <div className={styles.drumpad_container}>
      <Drum type="kick" />
      <Drum type="closed_hat" />
      <Drum type="hi_hat" />
      <Drum type="snare" />
      <Drum type="tom" />
    </div>
  );
}

export { Drumpad };
