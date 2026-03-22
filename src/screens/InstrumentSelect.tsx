import React from "react";
import SquareButton from "../components/SquareButton";
import { usePage } from "../hooks/usePage";

export default function InstrumentSelect() {
  const setPage = usePage((state) => state.setPage);

  return (
    <div id="_InstrumentSelect" className="_page">
      <div className="title-section">
        <span className="x-large">Choose your instrument</span>
      </div>
      <div className="button-row">
        <SquareButton
          _icon="drumkit"
          size={180}
          label="Drums"
          borderWidth={2}
          className="instrument-button"
          handler={() => setPage("_Drumkit")}
        />
        <SquareButton
          _icon="keyboard"
          size={180}
          label="Keys"
          borderWidth={2}
          className="instrument-button"
          handler={() => setPage("_Keyboard")}
        />
      </div>
      <style jsx>{`
        ._page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 40px;
        }

        .title-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
        }

        .button-row {
          display: flex;
          gap: 40px;
          align-items: center;
          justify-content: center;
        }

        .button-row :global(.instrument-button) {
          background-color: var(--black);
        }

        @media screen and (max-height: 500px) {
          ._page {
            gap: 20px;
          }
          .button-row {
            gap: 20px;
          }
          .button-row :global(.instrument-button) {
            width: 140px !important;
            height: 140px !important;
          }
        }
      `}</style>
    </div>
  );
}
