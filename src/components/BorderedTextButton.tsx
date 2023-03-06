import React from "react";
import cs from "classnames";
import Icon from "./Icon";
import { ButtonProps } from "../types";
import { preventDefault } from "../utils/utils";

export interface Props extends Omit<ButtonProps, "size"> {
  active?: boolean;
}

export default function BorderedTextButton({
  _icon,
  text,
  handler,
  active = false,
}: Props) {
  return (
    <button
      className={cs(text, active && "faded")}
      onMouseDown={handler}
      onTouchStart={handler}
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
        button:hover {
          background-color: var(--amber);
          color: var(--black);
        }
      `}</style>
    </button>
  );
}
