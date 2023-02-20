import React from "react";
import { ButtonProps } from "../types";
import Icon from "./Icon";

interface Props extends Omit<ButtonProps, "icon"> {}

export default function RoomBar({ text }: Props) {
  return (
    <button className="bar mold flex">
      <span className="content">{text}</span>
      <div className="icon">
        <Icon _icon="enter" size={20} />
      </div>
      <style jsx>{`
        button {
          font-size: inherit;
          justify-content: space-between;
          align-items: center;
          border-radius: 8px;
        }
        .icon {
          background-color: red;
        }
      `}</style>
    </button>
  );
}
