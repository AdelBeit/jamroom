import React, { ReactNode, useState } from "react";
import cs from "classnames";
import styles from "./List.module.css";
import { DropDown } from "../types";
import { useSoundStore } from "../utils/stores";
import { usePlayers } from "../utils/PlayersContext";
import LoadImage, { placeholder } from "../utils/LoadImage";
import icons from "../utils/data/icons";

// CHECK: overhaul with buttons
const ListItem = ({
  style = "raised",
  handler = () => {},
  classes = "",
  children,
}: {
  style?: "raised" | "castIn";
  handler?(): void;
  classes?: string | string[];
  children: ReactNode;
}) => {
  return (
    <button
      onClick={handler}
      className={cs(
        styles.item_container,
        "UNSTYLE_BUTTON",
        style == "raised"
          ? "neumorphic_mold_raisedUp"
          : "neumorphic_mold_castIn",
        classes && classes
      )}
    >
      {children}
    </button>
  );
};

const SoundClipItem = ({
  variant = "sound_clip",
  clipName,
}: {
  variant?: "drum_sample" | "drum_selected" | "sound_clip";
  clipName: string;
}) => {
  const players = usePlayers();
  const [clipState, setClipState] = useState("stop");

  const [drums, drumType] = useSoundStore((state) => [
    state.drumSounds,
    state.selectedDrumToEdit,
  ]);

  const handler = () => {
    players?.player(clipName).start();
    // @ts-ignore
    players?.player(clipName).onstop(() => setClipState("stop"));
    setClipState("play");
    if (variant == "drum_sample") {
      useSoundStore.setState({
        drumSounds: { ...drums, [drumType]: clipName },
      });
    }
  };

  return (
    <ListItem
      handler={handler}
      style={variant == "drum_selected" ? "castIn" : "raised"}
      classes={cs(styles.soundclip, styles[variant])}
    >
      <>
        <span className="neumorphic_text">{clipName}</span>
        {variant == "sound_clip" && (
          <LoadImage
            placeholder={placeholder}
            className={cs(styles.play, styles.stop, styles.icon)}
            src={icons[clipState]}
          />
        )}
        {variant == "drum_sample" && (
          <LoadImage
            placeholder={placeholder}
            className={cs(styles.play, styles.stop, styles.icon)}
            src={icons["select"]}
          />
        )}
        {variant == "drum_selected" && (
          <LoadImage
            placeholder={placeholder}
            className={cs(styles.play, styles.stop, styles.icon)}
            src={icons["select"]}
          />
        )}
      </>
    </ListItem>
  );
};

const List = ({
  variant,
  children,
}: {
  variant: DropDown;
  children: ReactNode;
}) => {
  return <div className={cs(styles["list_container"])}>{children}</div>;
};

export { List, ListItem, SoundClipItem };
