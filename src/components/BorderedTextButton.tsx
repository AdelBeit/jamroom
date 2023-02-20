import React from "react";
import cs from "classnames";
import Icon from "./Icon";
import { ButtonProps } from "../types";

export interface Props extends ButtonProps {
  active?: boolean;
}

export default function BorderedTextButton({
  icon,
  text,
  active = false,
}: Props) {
  return (
    <button className={cs("flex", text, active && "faded")}>
      <span className="medium">{text}</span>
      <Icon _icon={icon} size={20} />
      <style jsx>{`
        button {
          background-color: var(--black);
          color: var(--amber);
          border: 2px solid var(--amber);
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
