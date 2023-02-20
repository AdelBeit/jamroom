import React from "react";
import { Icon } from "../icons";

export interface Props {
  _icon: Icon;
  size?: number;
}

export default function Icon({ _icon, size = 30 }: Props) {
  const path = "./svg stores/icons.svg#" + _icon;
  return (
    <div className={`icon ${_icon}`}>
      <svg className="_svg" xmlns="https://www.w3.org/2000/svg">
        <use href={path} x="0" y="0"></use>
      </svg>
      <style jsx>
        {`
          div {
            width: ${size}px;
            height: ${size}px;
          }
        `}
      </style>
    </div>
  );
}
