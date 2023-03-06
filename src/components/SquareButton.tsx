import React from "react";
import { ButtonProps } from "../types";
import Icon from "./Icon";
import { preventDefault } from "../utils/utils";

interface Props extends Omit<ButtonProps, "text"> {}

export default function SquareButton({ _icon, handler, size = 30 }: Props) {
  return (
    <button
      onMouseDown={handler}
      onTouchStart={(e) => {
        e.preventDefault();
        handler(e);
      }}
      onTouchEnd={preventDefault}
      onMouseUp={preventDefault}
      className={`mold ${_icon}`}
    >
      <Icon {...{ _icon }} size={17} />
      <style jsx>
        {`
          button {
            width: ${size}px;
            height: ${size}px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-width: 1px;
          }
        `}
      </style>
    </button>
  );
}
