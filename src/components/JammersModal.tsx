import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import JammerBar from "./JammerBar";
import { useUsers } from "../hooks/useUsers";
import { usePage } from "../hooks/usePage";
import { preventDefault } from "../utils/preventDefault";
import Icon from "./Icon";

export default function JammersModal() {
  const [currentUser, users, setVolume, roomID] = useUsers((state) => [
    state.userID,
    state.users,
    state.setVolume,
    state.roomID,
  ]);
  const closeJammersModal = usePage((state) => state.closeJammersModal);
  const jammersModalOpen = usePage((state) => state.jammersModalOpen);
  const [notify, setNotify] = useState(false);
  const tDelay = 50;

  useEffect(() => {
    if (jammersModalOpen) {
      const modal = document.querySelector(
        "#_jammers_modal ._content"
      ) as HTMLDivElement;
      const underlay = document.querySelector(
        "#_jammers_modal .dark_underlay"
      ) as HTMLDivElement;
      const timeout = setTimeout(() => {
        modal.style.opacity = "1";
        underlay.style.opacity = "1";
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [jammersModalOpen]);

  const handleClose = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const modal = document.querySelector(
      "#_jammers_modal ._content"
    ) as HTMLDivElement;
    const underlay = document.querySelector(
      "#_jammers_modal .dark_underlay"
    ) as HTMLDivElement;
    modal.style.opacity = "0";
    underlay.style.opacity = "0";
    const timeout = setTimeout(() => {
      closeJammersModal();
      clearTimeout(timeout);
    }, tDelay);
  };

  if (typeof window === "undefined") return null;

  const shareHandler = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("roomID", roomID);
    let isMobile = window.matchMedia("(pointer:coarse)").matches;
    if (!navigator.share || !isMobile) {
      navigator.clipboard
        .writeText(url.href)
        .then(() => {
          setNotify(true);
        })
        .catch(console.error);
      return;
    }

    navigator
      .share({
        title: document.title,
        url: url.href,
      })
      .catch(console.error);
  };

  return ReactDOM.createPortal(
    <div id="_jammers_modal" className="_container">
      <div
        className="dark_underlay absolute faded backdrop-blur"
        onClick={handleClose}
        onTouchEnd={preventDefault}
      ></div>
      <div
        className="_content HIDE_SCROLLBAR"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {Object.keys(users).map((userID) => (
          <JammerBar
            key={userID}
            {...{ setVolume }}
            userID={userID}
            volume={users[userID].volume}
            instrument={users[userID].instrument}
            classes={userID === currentUser ? "active" : ""}
          />
        ))}
        <button onClick={shareHandler} className={`add_jammer bar mold`}>
          {notify ? (
            <span
              className="notification"
              onAnimationEnd={() => setNotify(false)}
            >
              Join link copied to clipboard!
            </span>
          ) : (
            <Icon _icon="add" size={25} />
          )}
        </button>
      </div>
      <style jsx>{`
        ._container {
          position: fixed;
          width: 100%;
          height: 100%;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10001;
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
          width: min(680px, 95%);
          max-height: 82vh;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 18px;
          border: solid var(--amber) 3px;
          border-radius: 8px;
          background-color: var(--black);
          z-index: 11;
          opacity: 0;
          transition: opacity ${tDelay / 1000}s;
          overflow: scroll;
        }

        .add_jammer {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media screen and (max-height: 1000px) {
          ._content {
            width: 80vh;
            height: 80vh;
          }
        }

        @media screen and (max-height: 500px) {
          ._content {
            width: min(320px, 85%);
            max-height: 75vh;
            padding: 12px;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
