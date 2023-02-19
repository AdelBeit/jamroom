import React, { useEffect, useRef } from "react";
import MenuButton, { Props as ButtonProps } from "../components/MenuButton";
import { Page } from "../types";

interface Props {
  _screen: Page;
}

export default function Menu({ _screen }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    container.classList.add("show_menu");
    return () => {
      container.classList.remove("show_menu");
    };
  }, [ref.current]);
  return (
    <div
      id="_menu"
      ref={ref}
      className={`${_screen} ._container absolute mold flex`}
    >
      <div className="flex top">
        <MenuButton icon="close" text="Close" />
        <MenuButton
          icon="users"
          text="Jammers"
          active={_screen === "_Jammers"}
        />
        <MenuButton icon="exit" text="Leave Room" />
      </div>
      <div className="flex bottom">
        <MenuButton
          icon={_screen === "_Drumkit" ? "gear" : "drumkit"}
          text={_screen === "_Drumkit" ? "Config Pads" : "Drumkit"}
          active={_screen === "_Drumkit"}
        />
        <MenuButton
          icon="keyboard"
          text="Keyboard"
          active={_screen === "_Keyboard"}
        />
      </div>
      <style jsx>{`
        ._container {
          flex-direction: column;
          width: 100%;
          height: 40%;
          inset: 0;
          bottom: -100%;
          transition: bottom 1s cubic-bezier(0.075, 0.82, 0.165, 1)
            alternate-reverse;
        }
        .show_menu {
          bottom: -7%;
        }
        .top,
        .bottom {
          justify-content: space-between;
          width: fit-content;
          margin: auto;
        }
      `}</style>
    </div>
  );
}
