import React from "react";
import cs from "classnames";
import styles from "./List.module.css";
import { Button } from "./Button";
import { DropDown, User } from "../types";
import { useSoundStore, useUserStore } from "../utils/stores";
import { usePlayers } from "../../pages/home";

// TODO: overhaul with buttons
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
    <ListItem classes={primaryUser ? styles.primary : ""}>
      <div className={styles.user}>
        <Button variant="leave" style="raised" />
        <span className={cs(primaryUser && styles.primary, "neumorphic_text")}>
          {userID}
        </span>
        <Button variant={instrument} style="raised" />
      </div>
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
  let state: "playing" | "stopped" = "stopped";
  const players = usePlayers();

  const [drums, drumType] = useSoundStore((state) => [
    state.drumSounds,
    state.selectedDrumToEdit,
  ]);

  const handler = () => {
    players?.player(clipName).start();
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
    >
      <div className={styles[variant]}>
        <span className="neumorphic_text">{clipName}</span>
        {variant == "sound_clip" && (
          // @ts-ignore
          <Button variant={state == "playing" ? "stop" : "play"} />
        )}
        {variant == "drum_sample" && <Button variant="select" />}
        {variant == "drum_selected" && <Button variant="select" />}
      </div>
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
