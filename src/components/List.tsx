import React from "react";
import cs from "classnames";
import styles from "./List.module.css";
import { Button } from "./Button";
import { DropDown } from "../types";

function ListItem({
  style = "raised",
  children,
}: {
  style?: "raised" | "castIn";
  children: JSX.Element;
}) {
  return (
    <li
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
      <div className={styles.useritem_container}>
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

  return (
    <ListItem style={variant == "drum_selected" ? "castIn" : "raised"}>
      <div
        className={cs(
          variant == "sound_clip"
            ? styles.soundclipitem_container
            : styles.drumsampleitem_container
        )}
      >
        <span className="neumorphic_text">{clipName}</span>
        {variant == "sound_clip" && (
          <Button variant={state == "playing" ? "stop" : "play"} />
        )}
        {variant == "drum_sample" && <Button variant="select" />}
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
    <div className={cs(styles[variant + "_container"])}>
      <ul>{children}</ul>
    </div>
  );
}

export { List, UserItem, SoundClipItem };
