import React, { ReactNode } from "react";
import StatusBar from "../components/StatusBar";
import Tutorial from "../components/Tutorial";
import { Page } from "../types";
import { usePage } from "../utils/usePage";
import { useUsers } from "../utils/useUsers";
import Menu from "./Menu";

interface Props {
  _page: Page;

  children: ReactNode;
}

export default function PageFrame({ _page, children }: Props) {
  const roomID = useUsers((state) => state.roomID);
  const [menuOpen] = usePage((state) => [state.menuOpen]);

  return (
    <div id="_pageFrame" className="_container relative">
      <div className="_content">{children}</div>
      {!menuOpen && !["_Lobby", "_Loading"].includes(_page) && (
        <StatusBar roomID={roomID} {...{ _page }} />
      )}
      {menuOpen && <Menu {...{ _page }} />}
      {!["_Lobby", "_Loading"].includes(_page) && <Tutorial {...{ _page }} />}
      <style jsx>
        {`
          ._container {
            width: 900px;
            height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 20px;
            padding: 15px 20px 10px 20px;
          }
          ._content {
            flex: 1;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
}
