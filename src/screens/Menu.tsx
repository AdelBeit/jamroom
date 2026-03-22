import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import BorderedTextButton from "../components/BorderedTextButton";
import { Page } from "../types";
import { usePage } from "../hooks/usePage";
import { preventDefault } from "../utils/preventDefault";

interface Props {
  _page: Page;
}

export default function Menu({ _page }: Props) {
  const [toggleMenu, setPage, openJammersModal] = usePage((state) => [
    state.toggleMenu,
    state.setPage,
    state.openJammersModal,
  ]);

  const isConfigPage = _page === "_Config";
  const isDrumkitPage = _page === "_Drumkit";

  const menuOpen = usePage((state) => state.menuOpen);
  const tDelay = 50;

  useEffect(() => {
    if (menuOpen) {
      const menuContainer = document.querySelector(
        "#_menu ._content"
      ) as HTMLDivElement;
      const underlay = document.querySelector(
        "#_menu .dark_underlay"
      ) as HTMLDivElement;
      const timeout = setTimeout(() => {
        menuContainer.style.opacity = "1";
        underlay.style.opacity = "1";
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen]);

  const handleCloseMenu = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (menuOpen) {
      const container = document.querySelector("#_menu") as HTMLDivElement;
      const menuContainer = document.querySelector(
        "#_menu ._content"
      ) as HTMLDivElement;
      const underlay = document.querySelector(
        "#_menu .dark_underlay"
      ) as HTMLDivElement;
      menuContainer.style.opacity = "0";
      underlay.style.opacity = "0";
      const timeout = setTimeout(() => {
        container.style.display = "none";
        toggleMenu();
        clearTimeout(timeout);
      }, tDelay);
    }
  };

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <div id="_menu" className={`${_page} _container`}>
      <div
        className="dark_underlay absolute faded backdrop-blur"
        onClick={handleCloseMenu}
        onTouchEnd={preventDefault}
      ></div>
      <div
        className="_content"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <BorderedTextButton
          _icon="close"
          text="Close"
          className="menu-button"
          useClick
          iconFirst
          handler={handleCloseMenu}
        />
        <BorderedTextButton
          _icon="keyboard"
          text="Keyboard"
          active={_page === "_Keyboard"}
          className="menu-button"
          useClick
          iconFirst
          handler={(e) => {
            handleCloseMenu(e);
            setPage("_Keyboard");
          }}
        />
        <BorderedTextButton
          _icon={isDrumkitPage ? "config" : "drumkit"}
          text={isDrumkitPage ? "Config Pads" : "Drumkit"}
          className="menu-button"
          useClick
          iconFirst
          handler={(e) => {
            handleCloseMenu(e);
            setPage(isDrumkitPage ? "_Config" : "_Drumkit");
          }}
        />
        <BorderedTextButton
          _icon="jammers"
          text="Jammers"
          active={_page === "_Jammers"}
          className="menu-button"
          useClick
          iconFirst
          handler={(e) => {
            handleCloseMenu(e);
            openJammersModal();
          }}
        />
        <BorderedTextButton
          _icon="leave"
          text="Leave Room"
          className="menu-button"
          useClick
          iconFirst
          handler={() => {
            window.location.href = window.location.origin;
          }}
        />
      </div>
      <style jsx>{`
        ._container {
          position: fixed;
          width: 100%;
          height: 100%;
          inset: 0;
          display: flex;
          overflow-y: hidden;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .dark_underlay {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 10;
          opacity: 0;
          transition: opacity ${tDelay / 1000}s;
        }

        ._content {
          width: 360px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 14px;
          padding: 16px 16px;
          border: solid var(--amber) 3px;
          border-radius: 8px;
          background-color: var(--black);
          z-index: 11;
          opacity: 0;
          transition: opacity ${tDelay / 1000}s;
        }

        @media screen and (max-height: 500px) {
          ._content {
            width: min(224px, 60%);
          }
        }

        ._content :global(.menu-button) {
          width: 100%;
          justify-content: flex-start;
          padding: clamp(6px, 1.6vw, 9px) clamp(8px, 2.2vw, 12px);
          border: 2px solid var(--amber);
          border-radius: 8px;
          background-color: #1f1f1f;
        }

        ._content :global(.menu-button .medium) {
          font-size: clamp(12px, 2.2vw, 18px);
        }
      `}</style>
    </div>,
    document.body
  );
}
