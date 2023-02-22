import React from "react";
import SampleBar from "../components/SampleBar";
import { useSound } from "../utils/useSound";

const [setSample, padID] = useSound((state) => [
  state.setPadSample,
  state.configPad,
]);

export default function Samples() {
  const samples = useSound((state) => state.samples);

  return (
    <div id="_Samples" className="_page flex">
      <div className="_samples">
        {samples.map((sample) => (
          <SampleBar
            key={sample}
            _sample={sample}
            active={samples[padID] === sample}
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
