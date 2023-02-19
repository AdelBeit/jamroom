import React from "react";
import Icon from "./Icon";

interface Props {
  volume: number;
  setVolume: React.ChangeEventHandler<HTMLInputElement>;
  classes?: string;
}

export default function VolumeBar({ volume, setVolume, classes = "" }: Props) {
  const icon =
    "volume#" + (volume === -25 ? "mute" : volume === -10 ? "full" : "partial");
  return (
    <div className="_container flex">
      <Icon _name={icon} />
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
        ._container {
          width: 100%;
          height: 100%;
        }

        ._container input::-webkit-slider-runnable-track,
        ._container input::-moz-range-track {
          -webkit-appearance: none;
          background: transparent;
          cursor: pointer;
          width: 100%;
          background: var(--black);
          height: 100%;
          border-radius: 10px;
        }

        ._container input::-webkit-slider-thumb,
        ._container input::-moz-range-thumb {
          background-color: var(--amber);
          border: 1px solid var(--black);
          border-radius: 10px;
        }

        ._container input:focus,
        ._container input:focus::-webkit-slider-thumb,
        ._container input:focus::-moz-range-thumb {
          outline: none;
          border: 1px solid var(--black);
          outline: 3px solid var(--black);
          outline-offset: 0.125rem;
        }
      `}</style>
    </div>
  );
}
