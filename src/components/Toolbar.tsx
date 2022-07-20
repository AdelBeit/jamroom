import React from "react";
import styles from "./Toolbar.module.css";
import cs from "classnames";
import { Button } from "./Button";
import { ToolBarProps } from "../types";

function Toolbar({ variant }: ToolBarProps) {
  return (
    <div className={cs(styles.toolbar_container, styles[variant])}>
      {variant == "keys" && <Toolbar.Keyboard />}
      {variant == "drums" && <Toolbar.Drumpad />}
      {variant == "users" && <Toolbar.Users />}
      {(variant == "soundclips" || variant == "drum_selector") && (
        <Button variant="back" />
      )}
    </div>
  );
}

Toolbar.Keyboard = () => {
  return (
    <>
      <Button variant="users" />
      <Button variant="octave_down" />
      <Button variant="octave_up" />
      <Button variant="soundclips" />
      <Button variant="drums" />
    </>
  );
};

Toolbar.Drumpad = () => {
  return (
    <>
      <Button variant="users" />
      <Button variant="soundclips" />
      <Button variant="keys" />
      <Button variant="drum_selector" />
    </>
  );
};

Toolbar.Users = () => {
  let userCount = 3;
  let roomCode = "AbC232";
  return (
    <>
      <Button variant="back" />
      <span className="neumorphic_text">{userCount}/3 Jammers</span>
      <span className="neumorphic_text">Room#{roomCode}</span>
    </>
  );
};

export { Toolbar };
