import React from "react";
import icons from "../utils/data/icons";
import styles from "./Button.module.css";
import cs from "classnames";
import { useScreenStore, useSoundStore, useUserStore } from "../utils/stores";
import { ButtonProps } from "../types";
import { socket } from "../utils/socketClient";
import LoadImage, { placeholder } from "../utils/LoadImage";

const Users = () => {
  return (
    <div className={cs(styles.users_icon)}>
      <LoadImage
        placeholder={placeholder}
        className={cs(styles.right)}
        src={icons.user_right}
      />
      <LoadImage
        placeholder={placeholder}
        className={cs(styles.left)}
        src={icons.user_left}
      />
    </div>
  );
};

const DrumSelector = () => {
  return (
    <>
      <LoadImage
        placeholder={placeholder}
        className={cs(styles.Image, styles.outer, styles.drum_selector)}
        src={icons.cog_outer}
      />
      <LoadImage
        placeholder={placeholder}
        className={cs(styles.Image, styles.inner, styles.drum_selector)}
        src={icons.user_left}
      />
    </>
  );
};

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
      icon = (
        <LoadImage
          placeholder={placeholder}
          className={cs(styles.Image, styles[variant])}
          src={icons[variant]}
        />
      );
      break;
  }

  // TODO: play and stop for loops

  let handler = () => {};
  const roomID = useUserStore((state) => state.roomID);

  switch (variant) {
    case "leave":
      break;
    case "back":
      handler = () => useScreenStore.getState().setDropDown("none");
    case "stop":
      // stopSounds();
      break;
    case "users":
    case "soundclips":
      handler = () => {
        useScreenStore.getState().setDropDown(variant);
      };
      break;
    case "keys":
      handler = () => {
        useSoundStore.setState({ drumEditMode: false });
        useScreenStore.getState().setScreen(variant);
        socket.emit("change-instrument", "keys", roomID);
      };
      break;
    case "drums":
      handler = () => {
        useScreenStore.getState().setScreen(variant);
        socket.emit("change-instrument", "drums", roomID);
      };
      break;
    case "drum_selector":
      handler = useSoundStore.getState().toggleDrumEditMode;
      break;

    default:
      break;
  }

  return (
    <button
      onClick={handler}
      className={cs(
        styles.Image,
        "UNSTYLE_BUTTON",
        styles.button,
        styles[variant]
      )}
    >
      {variant != "select" && style == "raised" && (
        <LoadImage
          placeholder={placeholder}
          className={cs(styles.Image, styles.mold)}
          src={icons["mold_raisedUp"]}
        />
      )}
      {icon}
    </button>
  );
};

export { Button };
