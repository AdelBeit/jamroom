import React from "react";
import { Instrument, Page } from "../types";
import SquareButton from "./SquareButton";
import JammingToast from "./JammingToast";

interface Props {
  roomID: string;
  _page: Page;
}

export default function StatusBar({ roomID, _page }: Props) {
  const nowJamming = [
    ["spoonypan", "keyboard"],
    ["purplepeach23", "drumkit"],
  ];
  return (
    <div className="_container flex">
      <SquareButton icon="menu" />
      <SquareButton icon="question" />
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
