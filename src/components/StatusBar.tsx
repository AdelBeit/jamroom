import React from "react";
import { Page } from "../types";
import SquareButton from "./SquareButton";
import JammingToast from "./JammingToast";
import { usePage } from "../hooks/usePage";
import { useUsers } from "../hooks/useUsers";
import { Icon } from "../icon";

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
  let leftButton: Icon = configState ? "confirm" : "menu";
  let rightButton: Icon = "tutorial";
  if (_page === "_Jammers") {
    leftButton = "drumkit";
    rightButton = "keyboard";
  }

  const leftButtonHandler = (e: React.TouchEvent | React.MouseEvent) => {
    if (configState || _page === "_Jammers") {
      setPage("_Drumkit");
      return;
    }
    toggleMenu();
  };

  const rightButtonHandler = (e: React.TouchEvent | React.MouseEvent) => {
    setPage("_Keyboard");
  };

  return (
    <div className="_container">
      <div className="buttons">
        <SquareButton _icon={leftButton} handler={leftButtonHandler} />
        {_page === "_Jammers" ? (
          <SquareButton _icon={rightButton} handler={rightButtonHandler} />
        ) : undefined}
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
          flex: 0;
          justify-content: space-between;
          align-items: center;
        }
        .buttons,
        .now_jamming {
          gap: 15px;
        }
        .now_jamming {
          flex: 1 0;
          max-width: 75%;
          overflow: scroll;
          padding: 0 20px;
          height: 30px;
        }
      `}</style>
    </div>
  );
}
