import React, { useEffect } from "react";
import BorderlessTextButton from "../components/BorderlessTextButton";
import { Page } from "../types";
import { usePage } from "../hooks/usePage";
import { preventDefault } from "../utils/preventDefault";

interface Props {
  _page: Page;
}

export default function Menu({ _page }: Props) {
  const [toggleMenu, setPage] = usePage((state) => [
    state.toggleMenu,
    state.setPage,
  ]);

  const isConfigPage = _page === "_Config";
  const isDrumkitPage = _page === "_Drumkit";

  const menuOpen = usePage((state) => state.menuOpen);
  const tDelay = 350;

  useEffect(() => {
    if (menuOpen) {
      const menuContainer = document.querySelector(
        "#_menu ._content"
      ) as HTMLDivElement;
      const timeout = setTimeout(
        () => (menuContainer.style.transform = "translateY(5%)"),
        10
      );
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
      menuContainer.style.transform = "translateY(110%)";
      const timeout = setTimeout(() => {
        container.style.display = "none";
        toggleMenu();
        clearTimeout(timeout);
      }, tDelay);
    }
  };

  return (
    <div id="_menu" className={`${_page} _container absolute`}>
      <div
        className="dark_underlay absolute faded"
        onMouseDown={handleCloseMenu}
        onTouchStart={handleCloseMenu}
        onTouchEnd={preventDefault}
        onMouseUp={preventDefault}
      ></div>
      <div className="_content">
        <div className="top">
          <BorderlessTextButton
            _icon="close"
            text="Close"
            handler={handleCloseMenu}
          />
          <BorderlessTextButton
            _icon="jammers"
            text="Jammers"
            active={_page === "_Jammers"}
            handler={(e) => {
              handleCloseMenu(e);
              setPage("_Jammers");
            }}
          />
          <BorderlessTextButton
            _icon="leave"
            text="Leave Room"
            handler={(e) => {
              window.location.href = window.location.origin;
            }}
          />
        </div>
        <div className="bottom">
          <BorderlessTextButton
            _icon={isConfigPage ? "config" : "drumkit"}
            text={isDrumkitPage ? "Config Pads" : "Drumkit"}
            handler={(e) => {
              handleCloseMenu(e);
              setPage(isDrumkitPage ? "_Config" : "_Drumkit");
            }}
          />
          <BorderlessTextButton
            _icon="keyboard"
            text="Keyboard"
            active={_page === "_Keyboard"}
            handler={(e) => {
              handleCloseMenu(e);
              setPage("_Keyboard");
            }}
          />
        </div>
      </div>
      <style jsx>{`
        ._container {
          width: 100%;
          height: 100%;
          inset: 0;
          display: flex;
          overflow-y: hidden;
        }

        .dark_underlay {
          width: 100%;
          height: 100%;
          background-color: #000;
          z-index: 10;
        }

        ._content {
          width: 100%;
          height: clamp(160px, 40%, 200px);
          align-self: flex-end;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          gap: 40px;
          padding-top: 40px;
          border: solid var(--amber) 3px;
          border-radius: 8px;
          background-color: var(--black);
          z-index: 11;
          transition: transform ${tDelay / 1000}s;
          transform: translateY(110%);
        }

        .top,
        .bottom {
          display: flex;
          justify-content: space-between;
          width: fit-content;
          gap: 100px;
        }
      `}</style>
    </div>
  );
}
