import React from "react";
import Icon from "./Icon";
import VolumeBar from "./VolumeSlider";

interface Props {
  userID: string;
  volume: number;
  setVolume: React.ChangeEventHandler<HTMLInputElement>;
  classes?: string;
}

export default function JammerBar({
  userID,
  volume,
  setVolume,
  classes = "",
}: Props) {
  return (
    <button className={`bar mold highlight ${classes}`}>
      <div className="jammer">
        <Icon _icon="keyboard" size={20} />
        <span className="user_id">{userID}</span>
      </div>
      <VolumeBar {...{ volume, setVolume }} />
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
