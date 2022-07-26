import React from "react";
import icons from "../utils/data/icons";
import styles from "./Button.module.css";
import cs from "classnames";
import { useScreenStore, useSoundStore } from "../utils/stores";

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

  // const players = useSoundStore.getState().players?.current;
  // const stopSounds = () => {
  //   if (players) {
  //     players.stopAll();
  //   }
  // };

  // const playSound = () => {
  //   if (players) {
  //     players.stopAll();
  //   }
  // };

  let handler = () => {};

  switch (variant) {
    case "back":
      handler = () => useScreenStore.getState().setDropDown("none");
    case "stop":
      // stopSounds();
      break;
    case "users":
    case "soundclips":
      handler = () => useScreenStore.getState().setDropDown(variant);
      break;
    case "keys":
      handler = () => {
        useSoundStore.setState({ drumEditMode: false });
        useScreenStore.getState().setScreen(variant);
      };
      break;
    case "drums":
      handler = () => useScreenStore.getState().setScreen(variant);
      break;
    case "drum_selector":
      handler = useSoundStore.getState().toggleDrumEditMode;
      break;
    case "octave_up":
      handler = useSoundStore.getState().octaveUp;
      break;
    case "octave_down":
      handler = useSoundStore.getState().octaveDown;
      break;

    default:
      break;
  }

  return (
    <div onClick={handler} className={cs(styles.button_container)}>
      {variant != "select" && style == "raised" && (
        <img className={styles.mold} src={icons.mold_raisedUp} />
      )}
      {icon}
    </div>
  );
};

export { Button };
