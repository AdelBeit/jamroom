import React from "react";
import MenuButton, { Props as ButtonProps } from "../components/MenuButton";
import { Page } from "../types";

interface Props {
  _screen: Page;
}

export default function Menu({ _screen }: Props) {
  return (
    <div id="_menu" className={`${_screen} ._container flex`}>
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
          height: 30%;
        }
      `}</style>
    </div>
  );
}
