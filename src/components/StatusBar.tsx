import React from "react";
import { Page } from "../types";
import SquareButton from "./SquareButton";
import JammingToast from "./JammingToast";
import { usePage } from "../utils/usePage";
import { useUsers } from "../utils/useUsers";

interface Props {
  roomID: string;
  _page: Page;
}

export default function StatusBar({ roomID, _page }: Props) {
  const [nowJamming, users] = useUsers((state) => [
    state.nowJamming,
    state.users,
  ]);
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
      <div className="now_jamming HIDE_SCROLLBAR">
        {Object.keys(nowJamming).map((userID) => {
          if (!users[userID] || users[userID].volume <= -25) return;
          return (
            <JammingToast
              key={userID}
              {...{
                username: userID,
                volume: users[userID].volume >= -10 ? "full" : "partial",
                instrument: "keyboard" || users[userID].instrument,
              }}
            />
          );
        })}
      </div>
      <div className="room_id">
        <span className="small">#{roomID}</span>
      </div>
      <style jsx>{`
        ._container,
        .buttons,
        .now_jamming {
          display: flex;
          align-items: center;
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
        .now_jamming {
          flex: 1 0;
          max-width: 75svh;
          overflow: scroll;
          padding: 0 20px;
          height: 30px;
        }
      `}</style>
    </div>
  );
}
