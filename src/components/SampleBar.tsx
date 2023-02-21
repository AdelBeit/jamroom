import cs from "classnames";
import React from "react";
import { Sample } from "../samples";

interface Props {
  _sample: Sample;
  setSample: React.MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
}

export default function SampleBar({
  _sample,
  setSample,
  active = false,
}: Props) {
  return (
    <button
      className={cs("bar mold flex", active && "active")}
      onClick={setSample.bind({ newSample: _sample })}
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
