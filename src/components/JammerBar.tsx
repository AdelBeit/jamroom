import React from "react";
import { User } from "../types";
import { UserStateStore } from "../hooks/useUsers";
import Icon from "./Icon";
import VolumeBar from "./VolumeSlider";

interface Props {
  userID: User["id"];
  volume: number;
  instrument: User["instrument"];
  setVolume: UserStateStore["setVolume"];
  classes?: string;
}

export default function JammerBar({
  userID,
  volume,
  instrument,
  setVolume,
  classes = "",
}: Props) {
  return (
    <button className={`bar mold highlight ${classes}`}>
      <div className="jammer">
        <Icon
          _icon={instrument === "keyboard" ? "keyboard#thin" : instrument}
          size={20}
        />
        <span className="user_id">{userID}</span>
      </div>
      <VolumeBar {...{ volume, setVolume: setVolume.bind(null, userID) }} />
      <style jsx>
        {`
          .bar,
          .jammer {
            display: flex;
            align-items: center;
          }

          .bar {
            justify-content: space-between;
          }

          .jammer {
            gap: 12px;
          }
        `}
      </style>
    </button>
  );
}
