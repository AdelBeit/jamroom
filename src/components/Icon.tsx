import React from "react";

interface Props {
  _name: string;
  size?: number;
}

export default function Icon({ _name, size = 30 }: Props) {
  const path = "./svg stores/icons.svg#" + _name;
  return (
    <div className={`_container icon ${_name}`}>
      <svg className="_svg" xmlns="https://www.w3.org/2000/svg">
        <use href={path} x="0" y="0"></use>
      </svg>
      <style jsx>
        {`
          ._container {
            width: ${size}px;
            height: ${size}px;
          }
        `}
      </style>
    </div>
  );
}
