import React, { useState } from "react";
import Icon from "../components/Icon";
import JammerBar from "../components/JammerBar";

export default function Jammers() {
  const users = ["pumpkinman823", "gnarlybarley442", "icebucket889"];
  const currentUser = "pumpkinman823";
  return (
    <div id="_Jammers" className="_page">
      {users.map((user) => (
        <JammerBar
          key={user}
          setVolume={() => {}}
          userID={user}
          volume={-15}
          classes={user === currentUser ? "active" : ""}
        />
      ))}
      <button className={`add_jammer bar mold`}>
        <Icon _icon="add" size={25} />
      </button>
      <div className="icon absolute faded">
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
