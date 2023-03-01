import React, { useState } from "react";
import Icon from "../components/Icon";
import JammerBar from "../components/JammerBar";
import { useUsers } from "../utils/useUsers";

export default function Jammers() {
  const [currentUser, users, setVolume, roomID] = useUsers((state) => [
    state.userID,
    state.users,
    state.setVolume,
    state.roomID,
  ]);
  const [notify, setNotify] = useState(false);

  const shareHandler = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("roomID", roomID);
    let isMobile = window.matchMedia("(pointer:coarse)").matches;
    if (!navigator.share || !isMobile) {
      //fallback
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
  const userID = useUsers((state) => state.userID);
  return (
    <div id="_Jammers" className="_page">
      <div className="_jammers HIDE_SCROLLBAR">
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
      <div className="icon icon_frame absolute faded">
        <Icon _icon="jammers" size={65} />
      </div>
      <style jsx>{`
        ._page,
        .add_jammer {
          display: flex;
        }
        ._page {
          flex-direction: column;
          gap: 8px;
        }

        ._jammers {
          overflow: scroll;
          width: 100%;
          height: fit-content;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .add_jammer {
          align-items: center;
          justify-content: center;
        }

        .icon {
          width: 65px;
          height: 65px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
}
