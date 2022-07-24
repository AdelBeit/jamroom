import React from "react";
import styles from "./Toolbar.module.css";
import cs from "classnames";
import { Button } from "./Button";
import { ButtonVariants, ToolBarProps } from "../types";

function Toolbar({ variant }: ToolBarProps) {
  return (
    <div className={cs(styles.toolbar_container, styles[variant])}>
      {variant == "keys" && <Toolbar.Keyboard />}
      {variant == "drums" && <Toolbar.Drumkit />}
      {variant == "users" && <Toolbar.Users />}
      {(variant == "soundclips" || variant == "drum_selector") && (
        <Button variant="back" />
      )}
    </div>
  );
}

Toolbar.Keyboard = () => {
  const buttons: ButtonVariants[] = [
    "users",
    "octave_down",
    "octave_up",
    "soundclips",
    "drums",
  ];

  return (
    <>
      {buttons.map((variant, index) => (
        <Button key={index} variant={variant} />
      ))}
      {/* <Button variant="users" />
      <Button variant="octave_down" />
      <Button variant="octave_up" />
      <Button variant="soundclips" />
      <Button variant="drums" /> */}
    </>
  );
};

Toolbar.Drumkit = () => {
  const buttons: ButtonVariants[] = [
    "users",
    "soundclips",
    "keys",
    "drum_selector",
  ];

  return (
    <>
      {buttons.map((variant, index) => (
        <Button key={index} variant={variant} />
      ))}
      {/* <Button variant="users" />
      <Button variant="soundclips" />
      <Button variant="keys" />
      <Button variant="drum_selector" /> */}
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
