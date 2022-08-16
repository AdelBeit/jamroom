import React from "react";
import styles from "./VolumeSlider.module.css";

const VolumeSlider = (props) => {
  return (
    <div className={styles.slider}>
      <input
        value={props.value}
        type="range"
        onChange={props.volume}
        {...props}
      />
    </div>
  );
};

export default VolumeSlider;
