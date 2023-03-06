import cs from "classnames";
import React from "react";
import { Sample } from "../sample";
import { preventDefault } from "../utils/utils";

interface Props {
  _sample: Sample;
  sampleHandler(sample: Sample): void;
  active?: boolean;
}

export default function SampleBar({
  _sample,
  sampleHandler,
  active = false,
}: Props) {
  const handler = (e: React.MouseEvent | React.TouchEvent) => {
    sampleHandler(_sample);
  };
  return (
    <button
      className={cs("bar mold", active && "active")}
      onMouseDown={handler}
      onTouchStart={(e) => {
        e.preventDefault();
        handler(e);
      }}
      onTouchEnd={preventDefault}
      onMouseUp={preventDefault}
    >
      <span className="medium">{_sample}</span>
      <style jsx>
        {`
          button {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
        `}
      </style>
    </button>
  );
}
