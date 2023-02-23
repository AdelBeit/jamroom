import React from "react";
import Icon from "./Icon";
import { Icon as IconType } from "../icon";

interface Props {
  volume: number;
  setVolume: React.ChangeEventHandler<HTMLInputElement>;
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
        onChange={setVolume}
        min={-25}
        max={-10}
        step="0.1"
        className={classes}
      />
      <style jsx>{`
        div {
          width: fit-content;
          height: 100%;
          display: flex;
          align-items: center;
        }

        input::-webkit-slider-runnable-track,
        input::-moz-range-track {
          -webkit-appearance: none;
          background: transparent;
          cursor: pointer;
          width: 100%;
          background: var(--black);
          height: 100%;
          border-radius: 10px;
        }

        input::-webkit-slider-thumb,
        input::-moz-range-thumb {
          background-color: var(--amber);
          border: 1px solid var(--black);
          border-radius: 10px;
        }

        input:focus,
        input:focus::-webkit-slider-thumb,
        input:focus::-moz-range-thumb {
          outline: none;
          border: 1px solid var(--black);
          outline: 3px solid var(--black);
          outline-offset: 0.125rem;
        }
      `}</style>
    </div>
  );
}
