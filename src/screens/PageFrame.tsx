import React, { ReactNode, useEffect, useRef, useState } from "react";
import StatusBar from "../components/StatusBar";
import Tutorial from "../components/Tutorial";
import { Page } from "../types";
import { usePage } from "../utils/usePage";
import { useUsers } from "../utils/useUsers";
import Menu from "./Menu";
import { CSSTransition } from "react-transition-group";

interface Props {
  _page: Page;
  children: ReactNode;
}

export default function PageFrame({ _page, children }: Props) {
  const roomID = useUsers((state) => state.roomID);
  const [menuOpen] = usePage((state) => [state.menuOpen]);
  const [isMobile, setIsMobile] = useState(true);
  const menuRef = useRef(null);

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
      {!menuOpen && !["_Lobby", "_Loading"].includes(_page) && (
        <StatusBar roomID={roomID} {...{ _page }} />
      )}

      <CSSTransition
        in={menuOpen}
        appear={menuOpen}
        nodeRef={menuRef}
        timeout={200}
        classNames="menu"
        unmountOnExit
        mountOnEnter={false}
      >
        <Menu {...{ _page, menuRef }} />
      </CSSTransition>
      {!["_Loading"].includes(_page) && !isMobile && (
        <Tutorial {...{ _page }} />
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
