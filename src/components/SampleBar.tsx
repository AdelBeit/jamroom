import cs from "classnames";
import React from "react";
import { Sample } from "../sample";
import { usePlayers } from "../utils/PlayersContext";
import { useSound } from "../utils/useSound";

interface Props {
  _sample: Sample;
  setSample(sample: Sample): void;
  active?: boolean;
}

const { playSample } = usePlayers();

export default function SampleBar({
  _sample,
  setSample,
  active = false,
}: Props) {
  const handler = (e: React.MouseEvent | React.TouchEvent) => {
    setSample(_sample);
    playSample(_sample);
  };

  const preventDefault = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
  };

  return (
    <button
      className={cs("bar mold flex", active && "active")}
      onMouseDown={handler}
      onTouchStart={handler}
      onMouseUp={preventDefault}
      onTouchEnd={preventDefault}
    >
      <span className="medium">{_sample}</span>
      <style jsx>
        {`
          button {
            justify-content: flex-start;
          }
        `}
      </style>
    </button>
  );
}
