import React from "react";
import cs from "classnames";
import Icon from "./Icon";
import { ButtonProps } from "../types";

export interface Props extends ButtonProps {
  active?: boolean;
}

export default function BorderlessTextButton({
  icon,
  text,
  active = false,
}: Props) {
  return (
    <button className={cs("flex", text, active && "faded")}>
      <Icon _icon={icon} size={20} />
      <span className="medium">{text}</span>
      <style jsx>{`
        button {
          background-color: var(--black);
          color: var(--amber);
          gap: 16px;
        }
      `}</style>
    </button>
  );
}
