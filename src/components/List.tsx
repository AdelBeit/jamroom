import React from "react";
import cs from "classnames";
import styles from "./List.module.css";
import { Button } from "./Button";
import { DropDown } from "../types";
import { useSoundStore } from "../utils/stores";
import { usePlayers } from "../../pages/home";

function ListItem({
  style = "raised",
  handler = () => {},
  children,
}: {
  style?: "raised" | "castIn";
  handler?(): void;
  children: JSX.Element;
}) {
  return (
    <li
      onClick={handler}
      className={cs(
        styles.listitem_container,
        style == "raised"
          ? "neumorphic_mold_raisedUp"
          : "neumorphic_mold_castIn"
      )}
    >
      {children}
    </li>
  );
}

function UserItem({
  username,
  instrument,
}: {
  username: string;
  instrument: "keys" | "drums";
}) {
  return (
    <ListItem>
      <div className={cs(styles.item_container, styles.user)}>
        <span className="neumorphic_text">{username}</span>
        <Button variant={instrument} style="raised" />
      </div>
    </ListItem>
  );
}

function SoundClipItem({
  variant = "sound_clip",
  clipName,
}: {
  variant?: "drum_sample" | "drum_selected" | "sound_clip";
  clipName: string;
}) {
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
      <div className={cs(styles.item_container, styles[variant])}>
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
}

function List({
  variant,
  children,
}: {
  variant: DropDown;
  children: JSX.Element[];
}) {
  return (
    <div className={cs(styles["list_container"])}>
      <ul>{children}</ul>
    </div>
  );
}

export { List, UserItem, SoundClipItem };
