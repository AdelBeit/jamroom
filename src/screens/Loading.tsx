import React from "react";

export interface Props {
  title: "Jamroom";
}

export function Loading({ title }: Props) {
  return (
    <div id="_Loading" className="_page">
      <span className="x-large title absolute _GLIMMER_">{title}</span>
      <style jsx>{`
        ._page {
          width: 100%;
          height: 100%;
        }

        .title {
          display: block;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
