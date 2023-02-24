import React from "react";
import { Instrument, Page } from "../types";
import SquareButton from "./SquareButton";
import JammingToast from "./JammingToast";
import { usePage } from "../utils/usePage";

interface Props {
  roomID: string;
  _page: Page;
}

export default function StatusBar({ roomID, _page }: Props) {
  const nowJamming = [
    ["spoonypan", "keyboard"],
    ["purplepeach23", "drumkit"],
  ];
  const [toggleMenu, setPage] = usePage((state) => [
    state.toggleMenu,
    state.setPage,
  ]);
  const configState = ["_Config", "_Samples"].includes(_page);

  const leftButtonHandler = (e: React.TouchEvent | React.MouseEvent) => {
    if (configState) {
      setPage("_Drumkit");
      return;
    }
    toggleMenu();
  };

  return (
    <div className="_container">
      <div className="buttons">
        <SquareButton
          _icon={configState ? "confirm" : "menu"}
          handler={leftButtonHandler}
        />
        <SquareButton _icon="tutorial" handler={(e) => {}} />
      </div>
      <div className="now_jamming">
        {nowJamming.map((user) => (
          <JammingToast
            key={user[0]}
            {...{ username: user[0], instrument: user[1] as Instrument }}
          />
        ))}
      </div>
      <div className="room_id">
        <span className="small">#{roomID}</span>
      </div>
      <style jsx>{`
        ._container,
        .buttons,
        .now_jamming {
          display: flex;
        }
        ._container {
          width: 100%;
          height: 30px;
          justify-content: space-between;
          align-items: center;
        }
        .buttons,
        .now_jamming {
          gap: 15px;
        }
      `}</style>
    </div>
  );
}
