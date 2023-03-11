import React from "react";
import { Instrument } from "../types";
import Icon from "./Icon";

interface Props {
  username: string;
  instrument: Instrument;
  volume?: "mute" | "partial" | "full";
}

export default function JammingToast({
  username,
  instrument,
  volume = "partial",
}: Props) {
  return (
    <div className="icon_frame">
      <Icon
        _icon={instrument === "keyboard" ? "keyboard#thin" : instrument}
        size={15}
      />
      <Icon _icon={`volume#${volume}`} size={15} />
      <span className="small">{username}</span>
      <style jsx>
        {`
          div {
            display: flex;
            gap: 5px;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
}
