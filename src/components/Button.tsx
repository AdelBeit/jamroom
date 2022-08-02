import React from "react";
import icons from "../utils/data/icons";
import styles from "./Button.module.css";
import cs from "classnames";
import { useScreenStore, useSoundStore } from "../utils/stores";
import { ButtonProps } from "../types";
import { socket } from "../../pages/home";

const Users = () => (
  <>
    <img className={cs(styles.users, styles.right)} src={icons.user_right} />
    <img className={cs(styles.users, styles.left)} src={icons.user_left} />
  </>
);

const DrumSelector = () => (
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

// TEST: use button tags instead of div
const Button = ({ variant, style = "raised" }: ButtonProps) => {
  let icon;
  switch (variant) {
    case "users":
      icon = <Users />;
      break;
    case "drum_selector":
      icon = <DrumSelector />;
      break;
    default:
      icon = <img className={styles[variant]} src={icons[variant]} />;
      break;
  }

  // TODO: play and stop for loops

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
        socket.emit("change-instrument", "keys");
      };
      break;
    case "drums":
      handler = () => {
        useScreenStore.getState().setScreen(variant);
        socket.emit("change-instrument", "drums");
      };
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
    <button
      onClick={handler}
      className={cs("UNSTYLE_BUTTON", styles.button, styles[variant])}
    >
      {variant != "select" && style == "raised" && (
        <img className={styles.mold} src={icons.mold_raisedUp} />
      )}
      {icon}
    </button>
  );
};

export { Button };
