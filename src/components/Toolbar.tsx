import React from "react";
import styles from "./Toolbar.module.css";
import cs from "classnames";
import { Button } from "./Button";
import { ButtonVariants, ToolBarProps } from "../types";

const Keyboard = () => {
  const buttons: ButtonVariants[] = ["users", "soundclips", "drums"];

  return (
    <>
      {buttons.map((variant, index) => (
        <Button key={index} variant={variant} />
      ))}
    </>
  );
};

const Drumkit = () => {
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
    </>
  );
};

const Users = () => {
  return (
    <>
      <Button variant="back" />
    </>
  );
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
