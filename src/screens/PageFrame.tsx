import React, { ReactNode, useState } from "react";
import StatusBar from "../components/StatusBar";
import { Page as PageType } from "../types";
import Menu from "./Menu";

interface Props {
  _name: PageType;
  children: ReactNode;
}

export default function PageFrame({ _name, children }: Props) {
  const roomID = "123";
  const [firstTime, setFirstTime] = useState(true);
  const menuOpen = firstTime && true;
  return (
    <div id="_pageFrame" className="_container flex relative">
      <div className="_content">{children}</div>
      {!firstTime && !menuOpen && _name !== "_Lobby" && (
        <StatusBar roomID={roomID} {...{ _name }} />
      )}
      {menuOpen && <Menu _screen={_name} />}
      <style jsx>
        {`
          ._container {
            width: 100vw;
            height: 100vh;
            flex-direction: column;
            justify-content: space-between;
            gap: 20px;
            padding: 15px 20px 10px 20px;
          }
          ._content {
            flex: 1;
          }
        `}
      </style>
    </div>
  );
}
