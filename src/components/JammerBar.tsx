import React from "react";
import Icon from "./Icon";
import VolumeBar from "./VolumeSlider";

interface Props {
  userID: string;
}

export default function JammerBar({ userID }: Props) {
  return (
    <button className="_container bar flex">
      <div className="jammer flex">
        <Icon _name="keyboard" size={20} />
        <span className="user_id">{userID}</span>
      </div>
      <VolumeBar volume={10} volumeHandler={() => {}} />
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
