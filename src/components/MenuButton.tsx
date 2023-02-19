import React from "react";
import cs from "classnames";
import Icon from "./Icon";

export interface Props {
  icon: string;
  text: string;
  active?: boolean;
}
export default function MenuButton({ icon, text, active = false }: Props) {
  return (
    <div className={cs("._container button flex", text, active && "active")}>
      <Icon _name={icon} size={30} />
      <span className="large">{text}</span>
      <style jsx>{`
        ._container {
          background-color: var(--black);
          color: var(--amber);
        }
        .active {
          opacity: 0.25;
        }
      `}</style>
    </div>
  );
}
