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
    <div className="_container flex">
      <Icon _name={volume} size={15} />
      <span className="small">{username}</span>
      <Icon _name={instrument} size={15} />
      <style jsx>
        {`
          ._container {
            gap: 8px;
          }
        `}
      </style>
    </div>
  );
}
