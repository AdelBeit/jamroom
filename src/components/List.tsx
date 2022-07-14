import React from "react";
import cs from "classnames";
import styles from "./List.module.css";
import { Button } from "./Button";

function ListItem({ children }: { children: JSX.Element }) {
  return (
    <li className={cs(styles.listitem_container, "neumorphic_mold_bumpedUp")}>
      {children}
    </li>
  );
}

function UserItem({
  username,
  instrument,
}: {
  username: string;
  instrument: "keyboard" | "drums";
}) {
  return (
    <ListItem>
      <div className={styles.useritem_container}>
        <span className="neumorphic_text">{username}</span>
        <Button variant={instrument} bumpedUp={false} />
      </div>
    </ListItem>
  );
}

function SoundClipItem({
  clipName,
  button,
}: {
  clipName: string;
  button: "play" | "stop";
}) {
  return (
    <ListItem>
      <div className={styles.soundclipitem_container}>
        <span className="neumorphic_text">{clipName}</span>
        <Button variant={button} />
      </div>
    </ListItem>
  );
}

function List({
  variant,
  children,
}: {
  variant: "users" | "soundclips";
  children: JSX.Element[];
}) {
  return (
    <div className={cs(styles[variant + "_container"])}>
      <ul>{children}</ul>
    </div>
  );
}

export { List, UserItem, SoundClipItem };
