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
      {padIDs.map((id) => (
        <DrumPad
          _id={id}
          sample={samples[id]}
          key={id}
          config={_page === "_Config"}
        />
      ))}
      <style jsx>
        {`
          ._page {
            height: max-content;
            width: 100%;

            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(2, 1fr);
            column-gap: 10px;
            row-gap: 10px;
            padding: 30px 0;
          }
        `}
      </style>
    </div>
  );
}
