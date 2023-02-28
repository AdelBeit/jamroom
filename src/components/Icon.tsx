import React from "react";
import { Icon as IconType } from "../icon";

export interface Props {
  _icon: IconType;
  size?: number;
}

export default function Icon({ _icon, size = 30 }: Props) {
  const path = "./svgs/stores/icons.svg#" + _icon;
  return (
    <div className={`icon ${_icon}`}>
      <svg className="_svg" xmlns="https://www.w3.org/2000/svg">
        <use href={path} x="0" y="0"></use>
      </svg>
      <style jsx>
        {`
          div {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          div,
          div * {
            display: block;
            width: ${size}px;
            height: ${size}px;
            fill: inherit;
            stroke: inherit;
          }
          div.menu svg,
          div.tutorial svg {
            margin-left: -1px;
          }
        `}
      </style>
    </div>
  );
}
