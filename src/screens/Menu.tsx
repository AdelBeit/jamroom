import React, { useEffect, useRef } from "react";
import BorderlessTextButton from "../components/BorderlessTextButton";
import { Page } from "../types";
import { usePage } from "../utils/usePage";
import { useUsers } from "../utils/useUsers";

interface Props {
  _page: Page;
}

export default function Menu({ _page }: Props) {
  const [toggleMenu, setPage] = usePage((state) => [
    state.toggleMenu,
    state.setPage,
  ]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    container.classList.add("show_menu");
    return () => {
      container.classList.remove("show_menu");
    };
  }, [ref.current]);

  const isConfigPage = _page === "_Config";
  const isDrumkitPage = _page === "_Drumkit";

  return (
    <div id="_menu" ref={ref} className={`${_page} _container absolute`}>
      <div className="dark_underlay absolute faded"></div>
      <div className="_content">
        <div className="top">
          <BorderlessTextButton
            _icon="close"
            text="Close"
            handler={(e) => toggleMenu()}
          />
          <BorderlessTextButton
            _icon="jammers"
            text="Jammers"
            active={_page === "_Jammers"}
            handler={(e) => {
              setPage("_Jammers");
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
              toggleMenu();
            }}
          />
          <BorderlessTextButton
            _icon="keyboard"
            text="Keyboard"
            active={_page === "_Keyboard"}
            handler={(e) => {
              setPage("_Keyboard");
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
          height: 40%;
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
          margin-bottom: -100%;
          margin-bottom: -50px;
          transition: margin-bottom 1s cubic-bezier(0.075, 0.82, 0.165, 1)
            alternate-reverse;
          z-index: 11;
        }
        .show_menu {
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
