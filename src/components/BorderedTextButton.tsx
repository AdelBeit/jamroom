import React from "react";
import cs from "classnames";
import Icon from "./Icon";
import { ButtonProps } from "../types";
import { preventDefault } from "../utils/preventDefault";

export interface Props extends Omit<ButtonProps, "size"> {
  active?: boolean;
  className?: string;
}

export default function BorderedTextButton({
  _icon,
  text,
  handler,
  active = false,
  className,
}: Props) {
  return (
    <button
      className={cs(text, className, active && "faded")}
      onMouseDown={handler}
      onTouchStart={(e) => {
        e.preventDefault();
        handler(e);
      }}
      onTouchEnd={preventDefault}
      onMouseUp={preventDefault}
    >
      <span className="medium">{text}</span>
      <Icon {...{ _icon }} size={20} />
      <style jsx>{`
        button {
          width: 100%;
          height: fit-content;
          padding: 8px 13px 8px 10px;
          background-color: var(--black);
          color: var(--amber);
          border: 2px solid var(--amber);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        button:hover, button:active {
          background-color: var(--amber);
          color: var(--black);
          --content: var(--black);
        }
      `}</style>
    </button>
  );
}
