import React, { useEffect, useState } from "react";
import JammerBar from "./JammerBar";
import { useUsers } from "../hooks/useUsers";
import { usePage } from "../hooks/usePage";
import Icon from "./Icon";

export default function JammersModal() {
  const [currentUser, users, setVolume, roomID] = useUsers((state) => [
    state.userID,
    state.users,
    state.setVolume,
    state.roomID,
  ]);
  const jammersModalOpen = usePage((state) => state.jammersModalOpen);
  const [notify, setNotify] = useState(false);
  useEffect(() => {
    if (!jammersModalOpen) return;
    // No local fade logic; handled by ModalProvider.
  }, [jammersModalOpen]);

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

  return (
    <div id="_jammers_modal" className="jammers_box HIDE_SCROLLBAR">
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
      <style jsx>{`
        .jammers_box {
          width: min(680px, 95%);
          max-height: 82vh;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 18px;
          border: solid var(--amber) 3px;
          border-radius: 8px;
          background-color: var(--black);
          overflow: scroll;
        }

        .add_jammer {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media screen and (max-height: 500px) {
          .jammers_box {
            width: min(320px, 85%);
            max-height: 75vh;
            padding: 12px;
          }
        }

        @media screen and (max-width: 950px) and (orientation: landscape) {
          .jammers_box {
            width: 90vw;
            height: 80vh;
          }
        }
      `}</style>
    </div>
  );
}
