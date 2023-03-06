import React from "react";
import TUTORIAL_DATA from "../../public/tutorial.data";
import { Page } from "../types";

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
        onMouseDown={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          closeTutorial();
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          closeTutorial();
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      ></div>
      <div className="box mold">
        <ul>
          {content &&
            content.map((textLine) => <li key={textLine}>{textLine}</li>)}
        </ul>
        Tap/Click anywhere to dismiss.
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
          padding: 20px 0;
          text-align: center;
        }
        .box ul {
          text-align: left;
          margin-top: 0;
          padding: 0;
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
