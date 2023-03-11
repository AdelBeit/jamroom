import React from "react";

export interface Props {
  title: "Jamroom";
}

export function Loading({ title }: Props) {
  return (
    <div id="_Loading" className="_page">
      <span className="x-large title absolute _GLIMMER_">{title}</span>
    </div>
  );
}
