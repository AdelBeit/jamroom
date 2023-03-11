import React from "react";
import Icon from "./Icon";
import { Icon as IconType } from "../icon";
import cs from "classnames";

interface Props {
  volume: number;
  setVolume: (volume: number) => void;
  classes?: string;
}

export default function VolumeBar({ volume, setVolume, classes = "" }: Props) {
  const icon = ("volume#" +
    (volume === -25
      ? "mute"
      : volume === -10
      ? "full"
      : "partial")) as IconType;

  return (
    <div>
      <Icon _icon={icon} />
      <input
        value={volume}
        type="range"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setVolume(parseInt(e.target.value));
        }}
        min={-25}
        max={-10}
        step="0.1"
        className={cs(classes, "_SLIDER_")}
      />
      <style jsx>{`
        div {
          width: fit-content;
          height: 100%;
          display: flex;
          align-items: center;
        }

        input {
          width: 100%;
        }
      `}</style>
    </div>
  );
}
