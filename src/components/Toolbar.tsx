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
      <Button variant="drumpad" />
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
  return (
    <>
      <Button variant="users" />
      <Button variant="octave_up" />
      <Button variant="soundclips" />
      <Button variant="drumpad" />
    </>
  );
};
Toolbar.soundclips = function () {
  return (
    <>
      <Button variant="users" />
      <Button variant="octave_down" />
      <Button variant="soundclips" />
      <Button variant="drumpad" />
    </>
  );
};

export { Toolbar };
