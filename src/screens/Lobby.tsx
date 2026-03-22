import React from "react";
import Icon from "../components/Icon";
import BorderedTextButton from "../components/BorderedTextButton";
import { useUsers } from "../hooks/useUsers";
import { usePage } from "../hooks/usePage";
import { Props as LoadingProps } from "./Loading";

export function Lobby({ title }: LoadingProps) {
  const [userID, setRoomID] = useUsers((state) => [
    state.userID,
    state.setRoomID,
  ]);
  const setPage = usePage((state) => state.setPage);

  const createRoomHandler = () => {
    const roomID = Math.floor(Math.random() * 1000) + 1;
    setRoomID(String(roomID));
    setPage("_Jammers");
  };

  const joinRoomHandler = (roomID: string) => {
    setRoomID(roomID);
    setPage("_Jammers");
  };

  return (
    <div id="_Lobby" className="_page icon_frame">
      <span className="x-large title faded absolute">{title}</span>
      <span className="large username">
        {userID.length > 0 ? (
          <>
            <Icon _icon="jammer" size={30} /> {userID}
          </>
        ) : undefined}
      </span>
      <div className="lobby initial">
        <BorderedTextButton
          handler={createRoomHandler}
          _icon="add"
          text="Create Random Room"
        />
        <BorderedTextButton
          handler={() => joinRoomHandler("1")}
          _icon="enter"
          text="Join Room #1"
        />
        <BorderedTextButton
          handler={() => joinRoomHandler("2")}
          _icon="enter"
          text="Join Room #2"
        />
      </div>
      <style jsx>{`
        ._page {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
        ._page > * {
          z-index: 2;
        }

        .username {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        ._page :global(.lobby) {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
        }
        ._page :global(.lobby.initial) {
          width: 420px;
        }
        @media screen and (max-width: 767px) {
          ._page :global(.lobby.initial) {
            width: 360px;
          }
        }
      `}</style>
    </div>
  );
}
