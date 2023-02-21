import React, { useState } from "react";
import Icon from "../components/Icon";
import JammerBar from "../components/JammerBar";

export default function Jammers() {
  const users = ["pumpkinman823", "gnarlybarley442", "icebucket889"];
  const currentUser = "pumpkinman823";
  return (
    <div id="_Jammers" className="_page flex">
      {users.map((user) => (
        <JammerBar
          key={user}
          setVolume={() => {}}
          userID={user}
          volume={-15}
          classes={user === currentUser ? "active" : ""}
        />
      ))}
      <button className={`add_jammer bar mold flex`}>
        <Icon _icon="plus" size={25} />
      </button>
      <div className="icon absolute faded">
        <Icon _icon="jammers" size={65} />
      </div>
      <style jsx>{`
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
