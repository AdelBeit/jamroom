import React from "react";
import SampleBar from "../components/SampleBar";
import { Sample } from "../sample";
import { usePlayers } from "../utils/PlayersContext";
import { useSound } from "../utils/useSound";
import { flattenSamples } from "../utils/utils";

export default function Samples() {
  const [setSample, padID, selectedSamples] = useSound((state) => [
    state.setPadSample,
    state.configPad,
    state.samples,
  ]);
  let { samples: allSamples } = usePlayers();
  const { playSample } = usePlayers();

  const handler = (_sample) => {
    setSample(_sample);
    playSample(_sample);
  };

  delete allSamples["piano"];
  const drumSamples = Object.keys(flattenSamples(allSamples)) as Sample[];
  return (
    <div id="_Samples" className="_page">
      <div className="_samples HIDE_SCROLLBAR">
        {drumSamples.map((sample) => (
          <SampleBar
            key={sample}
            _sample={sample}
            active={selectedSamples[padID] === sample}
            {...{ sampleHandler: handler }}
          />
        ))}
      </div>
      <style jsx>
        {`
          ._page {
            display: flex;
            flex-direction: column;
          }
          ._samples {
            overflow: scroll;
            width: 100%;
            height: fit-content;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
        `}
      </style>
    </div>
  );
}
