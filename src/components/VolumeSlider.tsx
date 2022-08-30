import React from "react";
import styles from "./VolumeSlider.module.css";
import cs from "classnames";

const VolumeSlider = (props) => {
  return (
    <div className={cs(styles.slider, props.classes && props.classes)}>
      <input
        value={props.value}
        type="range"
        onChange={props.volume}
        {...props}
        classes=""
      />
    </div>
  );
};

export default VolumeSlider;
