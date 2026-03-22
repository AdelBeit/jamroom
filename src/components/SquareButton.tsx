import React from "react";
import { ButtonProps } from "../types";
import Icon from "./Icon";
interface Props extends Omit<ButtonProps, "text"> {
  label?: string;
  borderWidth?: number;
}

export default function SquareButton({
  _icon,
  handler,
  size = 30,
  label,
  className,
  borderWidth = 1,
}: Props) {
  const iconSize = Math.max(16, Math.round(size * 0.5));
  const labelSize = Math.max(10, Math.round(size * 0.12));

  return (
    <button
      onClick={handler}
      className={["mold", _icon, className].filter(Boolean).join(" ")}
    >
      <Icon {...{ _icon }} size={iconSize} />
      {label && <span className="label">{label}</span>}
      <style jsx>
        {`
          button {
            width: ${size}px;
            height: ${size}px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-width: ${borderWidth}px;
            gap: 6px;
            border-radius: 8px;
          }

          .label {
            font-size: ${labelSize}px;
          }
        `}
      </style>
    </button>
  );
}
