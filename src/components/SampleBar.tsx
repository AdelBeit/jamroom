import cs from "classnames";
import React from "react";
import { Sample } from "../sample";
import { usePlayers } from "../utils/PlayersContext";
import { useSound } from "../utils/useSound";
import { preventDefault } from "../utils/utils";

interface Props {
  _sample: Sample;
  handler(e: React.MouseEvent | React.TouchEvent): void;
  active?: boolean;
}

export default function SampleBar({ _sample, handler, active = false }: Props) {
  return (
    <button
      className={cs("bar mold", active && "active")}
      onClick={handler}
      onTouchStart={handler}
      onTouchEnd={preventDefault}
    >
      <span className="medium">{_sample}</span>
      <style jsx>
        {`
          button {
            display: flex;
            justify-content: flex-start;
          }
        `}
      </style>
    </button>
  );
}
