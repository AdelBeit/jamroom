import React, { ReactNode } from "react";
import Page from "../pages";
import StatusBar from "./components/StatusBar";

interface Props {
  _name: Page;
  children: ReactNode;
}

export default function PageFrame({ _name, children }: Props) {
  const roomID = "123";
  return (
    <div id="_pageFrame" className="_container flex relative">
      <div className="_content">{children}</div>
      {_name !== "_Lobby" && <StatusBar roomID={roomID} {...{ _name }} />}
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
