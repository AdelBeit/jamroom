import React from "react";
import TUTORIAL_DATA from "../../public/tutorial.data";
import { Page } from "../types";
import { usePage } from "../utils/usePage";
import { preventDefault } from "../utils/utils";

interface Props {
  _page: Page;
  closeTutorial(): void;
}

export default function Tutorial({ _page, closeTutorial }: Props) {
  const content = TUTORIAL_DATA.get(_page);

  return (
    <div id="_tutorial" className={`_container absolute`}>
      <div
        className="dark_underlay faded absolute"
        onClick={(e) => {
          closeTutorial();
        }}
        onTouchStart={(e) => {
          closeTutorial();
        }}
        onTouchEnd={preventDefault}
      ></div>
      <div className="box mold">
        <ul>
          {content &&
            content.map((textLine) => <li key={textLine}>{textLine}</li>)}
          <li>Tap/Click anywhere to dismiss.</li>
        </ul>
      </div>
      <style jsx>{`
        .dark_underlay {
          width: 100%;
          height: 100%;
          background-color: #000;
          z-index: 10;
        }
        ._container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          height: 100%;
          inset: 0;
        }
        .box {
          align-self: center;
          z-index: 11;
        }
        .box ul {
          padding-left: 25px;
          padding-right: 20px;
        }
        .dark_underlay {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
