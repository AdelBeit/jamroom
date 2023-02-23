import React from "react";
import SampleBar from "../components/SampleBar";
import { usePlayers } from "../utils/PlayersContext";
import { useSound } from "../utils/useSound";

export default function Samples() {
  const [setSample, padID] = useSound((state) => [
    state.setPadSample,
    state.configPad,
  ]);
  const samples = useSound((state) => state.samples);
  const { playSample } = usePlayers();

  const handler = (_sample) => {
    setSample(_sample);
    playSample(_sample);
  };

  return (
    <div id="_Samples" className="_page">
      <div className="_samples">
        {samples.map((sample) => (
          <SampleBar
            key={sample}
            _sample={sample}
            active={samples[padID] === sample}
            handler={(e) => handler}
          />
        ))}
      </div>
      <style jsx>
        {`
          ._page {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        `}
      </style>
    </div>
  );
}
