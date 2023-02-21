import DrumPad from "../components/Drumpad";
import { Page } from "../types";
import { useSound } from "../utils/useSound";

interface Props {
  _page: Page;
}

export default function Drumkit({ _page }: Props) {
  const samples = useSound((state) => state.samples);
  const padIDs = [...Array(10)].map((v, _i) => _i);

  return (
    <div id="_Drumkit" className="_page flex">
      <div className="top flex">
        {padIDs.slice(padIDs.length / 2 - 1).map((id) => (
          <DrumPad
            _id={id}
            sample={samples[id]}
            key={id}
            config={_page === "_Config"}
          />
        ))}
      </div>
      <div className="bottom flex">
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
          ._page {
            flex-direction: column;
          }
        `}
      </style>
    </div>
  );
}
