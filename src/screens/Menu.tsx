import React from "react";
import BorderedTextButton from "../components/BorderedTextButton";
import { Page } from "../types";
import { usePage } from "../hooks/usePage";

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

  const handleCloseMenu = (
    e?: React.MouseEvent | React.TouchEvent | React.PointerEvent
  ) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    toggleMenu();
  };

  return (
    <div id="_menu" className={`${_page} menu_box`}>
        <BorderedTextButton
          _icon="close"
          text="Close"
          className="menu-button"
          iconFirst
          handler={handleCloseMenu}
        />
        <BorderedTextButton
          _icon="keyboard"
          text="Keyboard"
          active={_page === "_Keyboard"}
          className="menu-button"
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
          iconFirst
          handler={() => {
            window.location.href = window.location.origin;
          }}
        />
      <style jsx>{`
        .menu_box {
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
        }

        @media screen and (max-width: 950px) and (orientation: landscape) {
          .menu_box {
            width: 30vw;
          }
        }

        .menu_box :global(.menu-button) {
          width: 100%;
          justify-content: flex-start;
          padding: clamp(6px, 1.6vw, 9px) clamp(8px, 2.2vw, 12px);
          border: 2px solid var(--amber);
          border-radius: 8px;
          background-color: #1f1f1f;
        }

        .menu_box :global(.menu-button .medium) {
          font-size: clamp(12px, 2.2vw, 18px);
        }
      `}</style>
    </div>
  );
}
