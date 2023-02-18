import React from "react";
import Icon from "./Icon";

interface Props {
  text: string;
}

export default function RoomBar({ text }: Props) {
  return (
    <button className="_container bar flex">
      <span className="content">{text}</span>
      <div className="icon">
        <Icon _name="join_room" size={20} />
      </div>
      <style jsx>{`
        ._container {
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
