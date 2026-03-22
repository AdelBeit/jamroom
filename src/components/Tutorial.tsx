import React, { useEffect } from "react";
import TUTORIAL_DATA from "../../public/tutorial.data";
import { Page } from "../types";

interface Props {
  _page: Page;
  closeTutorial(): void;
}

export default function Tutorial({ _page, closeTutorial }: Props) {
  const content = TUTORIAL_DATA.get(_page);

  useEffect(() => {
    if (!content) return;
  }, [content]);

  if (!content) return null;

  return (
    <div
      id="_tutorial"
      className={`_container`}
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        closeTutorial();
      }}
    >
      <div className="box mold">
        <ul>
          {content &&
            content.map((textLine) => <li key={textLine}>{textLine}</li>)}
        </ul>
        Tap/Click anywhere to dismiss.
      </div>
      <style jsx>{`
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
          z-index: 1;
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
      `}</style>
    </div>
  );
}
