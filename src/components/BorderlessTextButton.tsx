import React from "react";
import cs from "classnames";
import Icon from "./Icon";
import { ButtonProps } from "../types";
import { preventDefault } from "../utils/utils";

export interface Props extends Omit<ButtonProps, "size"> {
  active?: boolean;
}

export default function BorderlessTextButton({
  _icon,
  text,
  handler,
  active = false,
}: Props) {
  return (
    <button
      className={cs(text, active && "faded")}
      onClick={(e) => {
        if (!active) handler(e);
      }}
      onTouchStart={(e) => {
        if (!active) handler(e);
      }}
      onTouchEnd={preventDefault}
    >
      <Icon {...{ _icon }} size={20} />
      <span className="medium">{text}</span>
      <style jsx>{`
        button,
        button:hover {
          background-color: var(--black);
          color: var(--amber);
          fill: var(--amber);
          stroke: var(--amber);
          display: flex;
          gap: 16px;
        }

        button.faded {
          cursor: initial;
        }
      `}</style>
    </button>
  );
}
