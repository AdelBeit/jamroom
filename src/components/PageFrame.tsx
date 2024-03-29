import React, { ReactNode, useEffect, useState } from "react";
import StatusBar from "./StatusBar";
import Tutorial from "./Tutorial";
import { Page } from "../types";
import { usePage } from "../hooks/usePage";
import { useUsers } from "../hooks/useUsers";
import Menu from "../screens/Menu";

interface Props {
  _page: Page;
  children: ReactNode;
}

export default function PageFrame({ _page, children }: Props) {
  const roomID = useUsers((state) => state.roomID);
  const [menuOpen] = usePage((state) => [state.menuOpen]);
  const [isMobile, setIsMobile] = useState(true);
  const [visited, setVisited] = useState(true);
  const onLoadingScreen = _page === "_Loading";
  const onDesktopLoadingScreen = onLoadingScreen && !isMobile;

  useEffect(() => {
    setVisited(!!localStorage.getItem("visited_" + _page));
  }, [_page]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let isMobile = width <= 767;
    if (height < width) isMobile = height <= 767;
    setIsMobile(isMobile);
  }, []);

  return (
    <div id="_pageFrame" className="_container relative">
      <div className="_content HIDE_SCROLLBAR">{children}</div>

      {!["_Lobby", "_Loading"].includes(_page) && (
        <StatusBar roomID={roomID} {...{ _page }} />
      )}

      {menuOpen && <Menu {...{ _page }} />}

      {!visited && (!onLoadingScreen || onDesktopLoadingScreen) && (
        <Tutorial
          {...{ _page }}
          closeTutorial={() => {
            setVisited(true);
            localStorage.setItem("visited_" + _page, new Date().toString());
          }}
        />
      )}

      <style jsx>
        {`
          ._container {
            min-width: 100%;
            min-height: 100%;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 20px;
            padding: 2% 3%;
          }

          ._content {
            flex: 1 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            overflow: scroll;
          }
        `}
      </style>
      <style jsx>
        {`
          .menu-enter {
            margin-bottom: -50%;
            opacity: 0;
          }
          .menu-enter-active {
            margin-bottom: -7%;
            opacity: 1;
            transition: margin-bottom 1s, opacity 1s;
          }
          .menu-exit {
            margin-bottom: -7%;
            opacity: 1;
          }
          .menu-exit-active {
            margin-bottom: -50%;
            opacity: 0;
            transition: margin-bottom 1s, opacity 1s;
          }
        `}
      </style>
    </div>
  );
}
