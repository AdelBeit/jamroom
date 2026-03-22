import React from "react";
import cs from "classnames";
import Icon from "./Icon";
import { ButtonProps } from "../types";
import { preventDefault } from "../utils/preventDefault";

export interface Props extends Omit<ButtonProps, "size"> {
  active?: boolean;
  useClick?: boolean;
}

export default function BorderlessTextButton({
  _icon,
  text,
  handler,
  active = false,
  useClick = true,
}: Props) {
  return (
    <button
      className={cs(text, active && "faded")}
      onMouseDown={
        useClick
          ? undefined
          : (e) => {
              if (!active) handler(e);
            }
      }
      onTouchStart={
        useClick
          ? undefined
          : (e) => {
              if (!active) {
                e.preventDefault();
                handler(e);
              }
            }
      }
      onTouchEnd={useClick ? undefined : preventDefault}
      onMouseUp={useClick ? undefined : preventDefault}
      onClick={useClick ? handler : undefined}
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
