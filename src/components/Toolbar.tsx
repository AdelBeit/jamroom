import React from "react";
import styles from "./Toolbar.module.css";
import cs from "classnames";
import { Button } from "./Button";
import { ButtonVariant, ToolBarProps } from "../types";

const Keyboard = () => {
  const buttons: ButtonVariant[] = ["users", "soundclips", "drums"];

  return (
    <>
      {buttons.map((variant, index) => (
        <Button key={index} variant={variant} />
      ))}
    </>
  );
};

const Drumkit = () => {
  const buttons: ButtonVariant[] = [
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
    </>
  );
};

const Users = () => {
  return (
    <>
      <Button style="plain" variant="back" />
    </>
  );
};

const Debug = () => {
  const buttons = [
    "keys",
    "drums",
    "users",
    "soundclips",
    "back",
    "play",
    "stop",
    "select",
    "leave",
    "kick_user",
    "add_user",
    "drum_selector",
  ];
  const buttonss = buttons.map((b) => <Button variant={b as ButtonVariant} />);
  return <>{buttonss}</>;
};

const Toolbar = ({ variant }: ToolBarProps) => {
  return (
    <div className={cs(styles.toolbar_container, styles[variant])}>
      {variant == "keys" && <Keyboard />}
      {variant == "drums" && <Drumkit />}
      {variant == "users" && <Users />}
      {(variant == "soundclips" || variant == "drum_selector") && (
        <Button variant="back" />
      )}
    </div>
  );
};

export { Toolbar };
