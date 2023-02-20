import React, { useState } from "react";
import Icon from "../components/Icon";
import JammerBar from "../components/JammerBar";

export default function Jammers() {
  const users = ["pumpkinman823", "gnarlybarley442", "icebucket889"];

  return (
    <div id="_Jammers" className="_page flex">
      {users.map((user) => {
        let classes = "";
        if (user == "pumpkinman812") classes = "active";
        return (
          <JammerBar
            setVolume={() => {}}
            userID={user}
            volume={-15}
            classes="active"
          />
        );
      })}
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
