import React from "react";
import { ButtonProps } from "../types";
import { preventDefault } from "../utils/preventDefault";
import Icon from "./Icon";

interface Props extends Omit<ButtonProps, "_icon" | "size"> {}

export default function RoomBar({ text, handler }: Props) {
  return (
    <button
      className="bar mold"
      onMouseDown={handler}
      onTouchStart={(e) => {
        e.preventDefault();
        handler(e);
      }}
      onTouchEnd={preventDefault}
      onMouseUp={preventDefault}
    >
      <span className="content">{text}</span>

      <Icon _icon="enter" size={20} />
      <style jsx>{`
        button {
          font-size: inherit;
          display: flex;
          flex: auto;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </button>
  );
}
