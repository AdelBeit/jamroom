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
    <button className={`_container bar flex ${classes}`}>
      <div className="jammer flex">
        <Icon _name="keyboard" size={20} />
        <span className="user_id">{userID}</span>
      </div>
      <VolumeBar {...{ volume, setVolume }} />
      <style jsx>
        {`
          ._container {
            justify-content: space-between;
          }
        `}
      </style>
    </button>
  );
}
