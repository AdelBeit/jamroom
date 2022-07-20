import React from "react";
import styles from "./Drumpad.module.css";
import cs from "classnames";
import icons from "../utils/data/icons";
import { useStore } from "../utils/useStore";
import { DrumProps } from "../types";

function Drum({ drumType }: DrumProps) {
  const editMode = useStore((state) => state.drumEditMode);

  const handler = () => {
    if (editMode) {
      useStore.getState().setDrumToEdit(drumType);
      useStore.getState().setDropDown("drum_selector");
    }
  };

  return (
    <div
      onClick={() => handler()}
      className={cs(styles.drum_container, styles[drumType])}
    >
      <img className={cs(styles[drumType])} src={icons[drumType]} />
      {editMode && (
        <>
          <img
            className={cs(styles.outer, styles.config_drum)}
            src={icons.cog_outer}
          />
          <img
            className={cs(styles.inner, styles.config_drum)}
            src={icons.cog_inner}
          />
        </>
      )}
    </div>
  );
}

function Drumpad() {
  return (
    <div className={styles.drumpad_container}>
      <Drum drumType="kick" />
      <Drum drumType="closed_hat" />
      <Drum drumType="hi_hat" />
      <Drum drumType="snare" />
      <Drum drumType="tom" />
    </div>
  );
}

export { Drumpad };
