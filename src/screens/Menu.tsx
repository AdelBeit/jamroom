import React, { Ref, useEffect, useRef } from "react";
import BorderlessTextButton from "../components/BorderlessTextButton";
import { Page } from "../types";
import { usePage } from "../utils/usePage";
import { preventDefault } from "../utils/utils";
import { CSSTransition } from "react-transition-group";

interface Props {
  _page: Page;
  menuRef: Ref<HTMLDivElement>;
}

export default function Menu({ _page, menuRef }: Props) {
  const [toggleMenu, setPage] = usePage((state) => [
    state.toggleMenu,
    state.setPage,
  ]);

  const isConfigPage = _page === "_Config";
  const isDrumkitPage = _page === "_Drumkit";

  return (
    <div id="_menu" className={`${_page} _container absolute`}>
      <div
        className="dark_underlay absolute faded"
        onClick={(e) => {
          toggleMenu();
        }}
        onTouchStart={(e) => {
          toggleMenu();
        }}
        onTouchEnd={preventDefault}
      ></div>
      <div ref={menuRef} className="_content">
        <div className="top">
          <BorderlessTextButton
            _icon="close"
            text="Close"
            handler={(e) => {
              preventDefault(e);
              toggleMenu();
            }}
          />
          <BorderlessTextButton
            _icon="jammers"
            text="Jammers"
            active={_page === "_Jammers"}
            handler={(e) => {
              setPage("_Jammers");
              preventDefault(e);
              toggleMenu();
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
              setPage(isDrumkitPage ? "_Config" : "_Drumkit");
              preventDefault(e);
              toggleMenu();
            }}
          />
          <BorderlessTextButton
            _icon="keyboard"
            text="Keyboard"
            active={_page === "_Keyboard"}
            handler={(e) => {
              setPage("_Keyboard");
              preventDefault(e);
              toggleMenu();
            }}
          />
        </div>
      </div>
      <style jsx>{`
        .dark_underlay {
          width: 100%;
          height: 100%;
          background-color: #000;
          z-index: 10;
        }
        ._container {
          width: 100%;
          height: 100%;
          inset: 0;
          display: flex;
          overflow-y: hidden;
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
          margin-bottom: -7%;
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
