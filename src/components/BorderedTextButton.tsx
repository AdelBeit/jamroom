import React from "react";
import cs from "classnames";
import Icon from "./Icon";
import { ButtonProps } from "../types";
import { preventDefault } from "../utils/preventDefault";

export interface Props extends Omit<ButtonProps, "size"> {
  active?: boolean;
  className?: string;
  useClick?: boolean;
  iconFirst?: boolean;
}

export default function BorderedTextButton({
  _icon,
  text,
  handler,
  active = false,
  className,
  useClick = false,
  iconFirst = false,
}: Props) {
  return (
    <button
      className={cs(text, className, active && "faded")}
      onMouseDown={useClick ? undefined : handler}
      onTouchStart={
        useClick
          ? undefined
          : (e) => {
              e.preventDefault();
              handler(e);
            }
      }
      onTouchEnd={useClick ? undefined : preventDefault}
      onMouseUp={useClick ? undefined : preventDefault}
      onClick={useClick ? handler : undefined}
    >
      {iconFirst ? (
        <>
          <Icon {...{ _icon }} size={20} />
          <span className="medium">{text}</span>
        </>
      ) : (
        <>
          <span className="medium">{text}</span>
          <Icon {...{ _icon }} size={20} />
        </>
      )}
      <style jsx>{`
        button {
          width: 100%;
          height: fit-content;
          padding: 8px 13px 8px 10px;
          background-color: var(--black);
          color: var(--amber);
          border: 2px solid var(--amber);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        button:hover, button:active {
          background-color: var(--amber);
          color: var(--black);
          --content: var(--black);
        }
      `}</style>
    </button>
  );
}
