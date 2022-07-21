import React from "react";
import icons from "../utils/data/icons";
import styles from "./Button.module.css";
import cs from "classnames";
import { useStore } from "../utils/useStore";

import { ButtonProps } from "../types";

const Button = ({ variant, style = "raised" }: ButtonProps) => {
  let icon = <img className={styles[variant]} src={icons[variant]} />;
  if (variant == "users") {
    icon = (
      <>
        <img
          className={cs(styles.users, styles.right)}
          src={icons.user_right}
        />
        <img className={cs(styles.users, styles.left)} src={icons.user_left} />
      </>
    );
  }
  if (variant == "drum_selector") {
    icon = (
      <>
        <img
          className={cs(styles.outer, styles.drum_selector)}
          src={icons.cog_outer}
        />
        <img
          className={cs(styles.inner, styles.drum_selector)}
          src={icons.cog_inner}
        />
      </>
    );
  }

  let handler: Function = () => {};
  switch (variant) {
    case "back":
      handler = () => useStore.getState().setDropDown("none");
      break;
    case "users":
    case "soundclips":
      handler = () => useStore.getState().setDropDown(variant);
      break;
    case "keys":
      handler = () => {
        useStore.setState(state => ({drumEditMode: false}));
        useStore.getState().setScreen(variant);
      };
      break;
    case "drums":
      handler = () => useStore.getState().setScreen(variant);
      break;
    case "drum_selector":
      handler = useStore.getState().toggleDrumEditMode;
      break;
    case "octave_up":
      handler = useStore.getState().octaveUp;
      break;
    case "octave_down":
      handler = useStore.getState().octaveDown;
      break;

    default:
  }

  return (
    <div onClick={() => handler()} className={cs(styles.button_container)}>
      {style == "raised" && (
        <img className={styles.mold} src={icons.mold_raisedUp} />
      )}
      {icon}
    </div>
  );
};

export { Button };
