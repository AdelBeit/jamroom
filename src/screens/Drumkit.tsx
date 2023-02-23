import DrumPad from "../components/DrumPad";
import { Page } from "../types";
import { useSound } from "../utils/useSound";

interface Props {
  _page: Page;
}

export default function Drumkit({ _page }: Props) {
  const padIDs = [...Array(10)].map((v, _i) => _i);
  const samples = useSound((state) => state.samples);

  return (
    <div id="_Drumkit" className="_page">
      <div className="top">
        {padIDs.slice(padIDs.length / 2 - 1).map((id) => (
          <DrumPad
            _id={id}
            sample={samples[id]}
            key={id}
            config={_page === "_Config"}
          />
        ))}
      </div>
      <div className="bottom">
        {padIDs.slice(padIDs.length / 2, padIDs.length - 1).map((id) => (
          <DrumPad
            _id={id}
            sample={samples[id]}
            key={id}
            config={_page === "_Config"}
          />
        ))}
      </div>
      <style jsx>
        {`
          div {
            display: flex;
          }
          ._page {
            flex-direction: column;
          }
        `}
      </style>
    </div>
  );
}
