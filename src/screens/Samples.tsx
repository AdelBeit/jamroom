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
  // console.log(drumSamples[);
  return (
    <div id="_Samples" className="_page">
      <div className="_samples hide-scroll-bar">
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
            width: 100%;
            height: 100%;
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
