import React from "react";
import Icon from "../components/Icon";
import JammerBar from "../components/JammerBar";
import { useUsers } from "../utils/useUsers";

export default function Jammers() {
  const [currentUser, users, setVolume] = useUsers((state) => [
    state.userID,
    state.users,
    state.setVolume,
  ]);

  return (
    <div id="_Jammers" className="_page">
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
      <button className={`add_jammer bar mold`}>
        <Icon _icon="add" size={25} />
      </button>
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
