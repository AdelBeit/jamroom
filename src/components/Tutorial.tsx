import React from "react";
import BorderlessTextButton from "../components/BorderlessTextButton";
import { Page } from "../types";
import { usePage } from "../utils/usePage";

interface Props {
  _page: Page;
}

export default function Tutorial({ _page }: Props) {
  const toggleTutorial = usePage((state) => state.toggleTutorial);
  return (
    <div id="_tutorial" className={`_container absolute`}>
      <div className="dark_underlay faded"></div>
      <div className="box mold"></div>
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
          width: 100%;
          height: 100%;
          inset: 0;
          bottom: -100%;
          transition: bottom 1s cubic-bezier(0.075, 0.82, 0.165, 1)
            alternate-reverse;
        }
      `}</style>
    </div>
  );
}
