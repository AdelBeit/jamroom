import React from "react";
import { Instrument } from "../types";
import Button from "./Button";
import JammingToast from "./JammingToast";

interface Props {
  roomID: string;
  _name: string;
}

export default function StatusBar({ roomID, _name }: Props) {
  const nowJamming = [
    ["spoonypan", "keyboard"],
    ["purplepeach23", "drumkit"],
  ];
  return (
    <div className="_container">
      <Button _name="menu" />
      <Button _name="question" />
      <div className="now_jamming">
        {nowJamming.map((user) => (
          <JammingToast
            key={user[0]}
            {...{ username: user[0], instrument: user[1] as Instrument }}
          />
        ))}
      </div>
      <div className="room_id">
        <span>#{roomID}</span>
      </div>
      <style jsx>{`
        ._container {
          width: 100%;
          height: 30px;
        }
      `}</style>
    </div>
  );
}
