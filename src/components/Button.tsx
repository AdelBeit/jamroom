import React from "react";
import icons from "../utils/icons";
import styles from "./Button.module.css";
import cs from "classnames";

const Button = ({
  variant,
  bumpedUp = true,
}: {
  variant:
    | "users"
    | "drums"
    | "keyboard"
    | "octave_up"
    | "octave_down"
    | "soundclips"
    | "back"
    | "cog"
    | "play"
    | "stop";
  bumpedUp?: boolean;
}) => {
  let icon = <img className={styles[variant]} src={icons[variant]} />;
  if (variant == "users") {
    icon = (
      <>
        <img
          className={cs(styles.users, styles.right)}
          src={icons.user_right}
        />
        <img className={cs(styles.users, styles.left)} src={icons.user_left} />
      </>
    );
  }
  if (variant == "cog") {
    icon = (
      <>
        <img className={cs(styles.outer, styles.cog)} src={icons.cog_outer} />
        <img className={cs(styles.inner, styles.cog)} src={icons.cog_inner} />
      </>
    );
  }

  return (
    <div className={cs(styles.button_container)}>
      {bumpedUp && <img className={styles.mold} src={icons.mold_bumpedUp} />}
      {icon}
    </div>
  );
};

export { Button };
