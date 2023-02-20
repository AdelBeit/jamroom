import React, { useEffect, useRef } from "react";
import BorderlessTextButton from "../components/BorderlessTextButton";
import { Page } from "../types";

interface Props {
  _page: Page;
}

export default function Menu({ _page }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    container.classList.add("show_menu");
    return () => {
      container.classList.remove("show_menu");
    };
  }, [ref.current]);
  return (
    <div
      id="_menu"
      ref={ref}
      className={`${_page} _container absolute mold flex`}
    >
      <div className="flex top">
        <BorderlessTextButton icon="close" text="Close" />
        <BorderlessTextButton
          icon="users"
          text="Jammers"
          active={_page === "_Jammers"}
        />
        <BorderlessTextButton icon="exit" text="Leave Room" />
      </div>
      <div className="flex bottom">
        <BorderlessTextButton
          icon={_page === "_Drumkit" ? "gear" : "drumkit"}
          text={_page === "_Drumkit" ? "Config Pads" : "Drumkit"}
          active={_page === "_Drumkit"}
        />
        <BorderlessTextButton
          icon="keyboard"
          text="Keyboard"
          active={_page === "_Keyboard"}
        />
      </div>
      <style jsx>{`
        ._container {
          flex-direction: column;
          width: 100%;
          height: 40%;
          inset: 0;
          bottom: -100%;
          transition: bottom 1s cubic-bezier(0.075, 0.82, 0.165, 1)
            alternate-reverse;
        }
        .show_menu {
          bottom: -7%;
        }
        .top,
        .bottom {
          justify-content: space-between;
          width: fit-content;
          margin: auto;
        }
      `}</style>
    </div>
  );
}
