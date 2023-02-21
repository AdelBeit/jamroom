import React from "react";
import SampleBar from "../components/SampleBar";
import { Sample } from "../samples";

interface Props {
  currentSample: Sample;
  setSample: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Samples({ currentSample, setSample }: Props) {
  const samples: Sample[] = [
    "House Toms",
    "Rock Toms",
    "Cymbals",
    "Metal Snare",
    "Open Hats",
    "Closed Hats",
  ];

  return (
    <div id="_Samples" className="_page flex">
      <div className="_samples">
        {samples.map((sample) => (
          <SampleBar
            key={sample}
            _sample={sample}
            active={currentSample === sample}
            {...{ setSample }}
          />
        ))}
      </div>
      <style jsx>
        {`
          ._page {
            flex-direction: column;
            justify-content: space-between;
          }
        `}
      </style>
    </div>
  );
}
