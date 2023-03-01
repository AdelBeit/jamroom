import React, { useState } from "react";
import RoomBar from "../components/RoomBar";
import Icon from "../components/Icon";
import BorderedTextButton from "../components/BorderedTextButton";
import SquareButton from "../components/SquareButton";
import { useUsers } from "../utils/useUsers";
import { usePage } from "../utils/usePage";
import { Props as LoadingProps } from "./Loading";

type LobbyState = "initial" | "join" | "create";

export function Lobby({ title }: LoadingProps) {
  const [userID, roomID, setRoomID] = useUsers((state) => [
    state.userID,
    state.roomID,
    state.setRoomID,
  ]);
  const setPage = usePage((state) => state.setPage);
  const roomList = ["12", "48293", "128312"];
  const [lobbyState, setLobbyState] = useState<LobbyState>("initial");

  let LobbyContent = (
    <div className="lobby initial">
      <BorderedTextButton
        handler={(e) => {
          setLobbyState("create");
        }}
        _icon="add"
        text="Create Room"
      />
      <BorderedTextButton
        handler={(e) => setLobbyState("join")}
        _icon="enter"
        text="Join Room"
      />
    </div>
  );

  if (lobbyState === "join")
    LobbyContent = (
      <div className="lobby join">
        <div className="list container relative">
          {roomList.map((roomID, _index) => (
            <RoomBar
              key={roomID}
              text={"Join Room # " + roomID}
              handler={(e) => {
                setRoomID(roomID);
                setPage("_Jammers");
              }}
            />
          ))}
        </div>
        <SquareButton
          _icon="back"
          size={40}
          handler={(e) => setLobbyState("initial")}
        />
      </div>
    );

  if (lobbyState === "create")
    LobbyContent = (
      <div className="lobby create">
        <div className="input icon_frame container relative">
          <input
            className="bar mold active medium"
            type="text"
            value={roomID}
            id="roomID"
            onChange={(e) => setRoomID(e.target.value)}
            placeholder="Enter room # to create/join a room"
          />
          <Icon _icon="enter" size={20} />
        </div>
        <SquareButton
          _icon="back"
          size={40}
          handler={(e) => setLobbyState("initial")}
        />
      </div>
    );

  // useEffect(() => {
  //   const roomIDInput = document.querySelector("#roomID") as HTMLInputElement;
  //   setRoomID(roomIDInput.value || "");
  // }, [roomID]);

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
      {LobbyContent}
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
          gap: 30px;
        }
        ._page :global(.lobby.initial) {
          width: 205px;
        }
        ._page :global(.lobby.join) {
          width: 95%;
          margin: 0 5%;
        }
        ._page :global(.lobby.join .list.container) {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        ._page :global(.lobby.create) {
          width: 500px;
        }

        input {
          border-radius: 8px;
        }
        input:focus {
          outline-color: var(--black);
          outline-style: ridge;
          outline-offset: -3px;
        }
        input:focus::selection {
          background-color: var(--black);
          color: var(--amber);
        }
        input::placeholder {
          color: #885f26;
        }
      `}</style>
    </div>
  );
}
