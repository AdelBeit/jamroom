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
    <div className={`jammer_row ${classes}`}>
      <div className="jammer_info">
        <div className="jammer">
          <Icon
            _icon={instrument === "keyboard" ? "keyboard#thin" : instrument}
            size={20}
          />
          <span className="user_id">{userID}</span>
        </div>
      </div>
      <div className="jammer_volume">
        <VolumeBar {...{ volume, setVolume: setVolume.bind(null, userID) }} />
      </div>
      <style jsx>
        {`
          .jammer_row,
          .jammer,
          .jammer_info,
          .jammer_volume {
            display: flex;
            align-items: center;
          }

          .jammer_row {
            gap: 12px;
            padding: 0;
            background: transparent;
          }

          .jammer {
            gap: 12px;
          }

          .jammer_info {
            height: 40px;
            width: 180px;
            flex: 0 0 auto;
            padding: 6px 10px;
            border: 2px solid var(--amber);
            border-radius: 8px;
            background-color: #1f1f1f;
            color: var(--amber);
            fill: var(--amber);
            stroke: var(--amber);
          }

          .jammer_volume {
            flex: 1;
            height: 40px;
          }
        `}
      </style>
    </div>
  );
}
