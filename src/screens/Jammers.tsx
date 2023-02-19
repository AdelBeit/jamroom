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
        <Icon _name="plus" size={25} />
      </button>
      <style jsx>{``}</style>
    </div>
  );
}
