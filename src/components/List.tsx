import React from "react";
import cs from "classnames";
import styles from "./List.module.css";
import { Button } from "./Button";
import { DropDown } from "../types";

function ListItem({ children }: { children: JSX.Element }) {
  return (
    <li className={cs(styles.listitem_container, "neumorphic_mold_raisedUp")}>
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

function SoundClipItem({ clipName }: { clipName: string }) {
  let button: "play" | "stop" = "play";

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
