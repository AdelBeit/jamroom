import React from "react";
import styles from "./Toolbar.module.css";
import cs from "classnames";
import { Button } from "./Button";
import { ButtonVariant, ToolBarProps } from "../types";

const Keyboard = () => {
  const buttons: ButtonVariant[] = ["users", "drums"];

  return (
    <>
      {buttons.map((variant, index) => (
        <Button style="plain" key={index} variant={variant} />
      ))}
    </>
  );
};

const Drumkit = () => {
  const buttons: ButtonVariant[] = [
    "users",
    // "soundclips",
    "keys",
    "drum_selector",
  ];

  return (
    <>
      {buttons.map((variant, index) => (
        <Button style="plain" key={index} variant={variant} />
      ))}
    </>
  );
};

const Back = () => {
  return (
    <>
      <Button style="plain" variant="back" />
    </>
  );
};

const Toolbar = ({ variant }: ToolBarProps) => {
  return (
    <div className={cs(styles.toolbar_container, styles[variant])}>
      {variant == "keys" && <Keyboard />}
      {variant == "drums" && <Drumkit />}
      {variant == "dropdown" && <Back />}
    </div>
  );
};

export { Toolbar };
