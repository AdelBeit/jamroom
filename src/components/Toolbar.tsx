import React from "react";
import styles from "./Toolbar.module.css";
import cs from "classnames";
import { Button } from "./Button";

function Toolbar({
  variant,
}: {
  variant: "keyboard" | "drumpad" | "users" | "soundclips";
}) {
  return (
    <div className={cs(styles.toolbar_container, styles[variant])}>
      {variant == "keyboard" ? <Toolbar.keyboard /> : null}
      {variant == "drumpad" ? <Toolbar.drumpad /> : null}
      {variant == "users" ? <Toolbar.users /> : null}
      {variant == "soundclips" ? <Toolbar.soundclips /> : null}
    </div>
  );
}

Toolbar.keyboard = () => {
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

Toolbar.drumpad = function () {
  return (
    <>
      <Button variant="users" />
      <Button variant="soundclips" />
      <Button variant="keyboard" />
      <Button variant="cog" />
    </>
  );
};

Toolbar.users = function () {
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

Toolbar.soundclips = function () {
  return (
    <>
      <Button variant="back" />
    </>
  );
};

export { Toolbar };
