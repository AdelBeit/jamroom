import React from "react";
import { ButtonProps } from "../types";
import Icon from "./Icon";
import { preventDefault } from "../utils/preventDefault";

interface Props extends Omit<ButtonProps, "text"> {}

export default function SquareButton({ _icon, handler, size = 30 }: Props) {
  const isCoarse =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  return (
    <button
      onMouseDown={
        isCoarse
          ? undefined
          : (e) => {
              handler(e);
            }
      }
      onTouchStart={
        isCoarse
          ? (e) => {
              e.preventDefault();
              handler(e);
            }
          : undefined
      }
      onTouchEnd={isCoarse ? preventDefault : undefined}
      onMouseUp={isCoarse ? undefined : preventDefault}
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
