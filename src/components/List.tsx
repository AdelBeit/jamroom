import React, { useState } from "react";
import cs from "classnames";
import styles from "./List.module.css";
import buttonStyles from "./Button.module.css";
import { DropDown, User } from "../types";
import { useSoundStore, useUserStore } from "../utils/stores";
import { usePlayers } from "../../pages/home";
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
  children: JSX.Element;
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

const UserItem = ({
  userID,
  instrument,
}: {
  userID: User["id"];
  instrument: User["instrument"];
}) => {
  const primaryUser = useUserStore((state) => state.userID) == userID;
  return (
    <ListItem classes={cs(primaryUser ? styles.primary : "", styles.user)}>
      <>
        <LoadImage
          placeholder={placeholder}
          className={cs(buttonStyles.leave, buttonStyles.icon, styles.icon)}
          src={icons["leave"]}
        />
        <span className={cs(primaryUser && styles.primary, "neumorphic_text")}>
          {userID}
        </span>
        <LoadImage
          placeholder={placeholder}
          className={cs(
            buttonStyles.instrument,
            buttonStyles.icon,
            styles.icon
          )}
          src={icons[instrument]}
        />
      </>
    </ListItem>
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
  children: JSX.Element[];
}) => {
  return <div className={cs(styles["list_container"])}>{children}</div>;
};

export { List, UserItem, SoundClipItem };
