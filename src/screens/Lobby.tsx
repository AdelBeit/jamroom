import React, { useState } from "react";
import RoomBar from "../components/RoomBar";
import Icon from "../components/Icon";
import BorderedTextButton from "../components/BorderedTextButton";
import SquareButton from "../components/SquareButton";
import { useUsers } from "../hooks/useUsers";
import { usePage } from "../hooks/usePage";
import { Props as LoadingProps } from "./Loading";
import { preventDefault } from "../utils/preventDefault";

type LobbyState = "initial" | "join" | "create";

export function Lobby({ title }: LoadingProps) {
  const [userID, setRoomID] = useUsers((state) => [
    state.userID,
    state.setRoomID,
  ]);
  const setPage = usePage((state) => state.setPage);
  const roomList = ["1", "2", "3", "4", "5", "6"];
  const [lobbyState, setLobbyState] = useState<LobbyState>("initial");
  const [roomIDInput, setRoomIDInput] = useState<string>("");

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

  if (lobbyState === "create") {
    const createRoomHandler = () => {
      if (isNaN(parseFloat(roomIDInput))) {
        setRoomIDInput("Room # must only contain numbers!");
        const timeout = setTimeout(() => {
          setRoomIDInput("");
          clearTimeout(timeout);
        }, 2000);
        return;
      }

      setRoomID(roomIDInput);
      setPage("_Jammers");
    };
    LobbyContent = (
      <div className="lobby create">
        <div className="input icon_frame container relative">
          <input
            className="bar mold active medium"
            type="text"
            value={roomIDInput}
            id="roomID"
            onChange={(e) => setRoomIDInput(e.target.value)}
            placeholder="Enter a # to create a room"
            title="Room # must be a number"
          />

          <button
            className="absolute"
            onClick={createRoomHandler}
            onTouchStart={createRoomHandler}
            onTouchEnd={preventDefault}
          >
            <Icon _icon="enter" size={20} />
          </button>
        </div>
        <SquareButton
          _icon="back"
          size={40}
          handler={(e) => setLobbyState("initial")}
        />
      </div>
    );
  }

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
          width: 28%;
        }
        ._page :global(.lobby.join),
        ._page :global(.lobby.create) {
          width: 95%;
          margin: 0 5%;
        }
        ._page :global(.lobby.join .list.container) {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        ._page :global(.lobby.create .container) {
          display: flex;
          align-items: center;
        }
        ._page :global(.lobby.create .container :last-child) {
          margin-left: -10px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          fill: var(--black);
          stroke: var(--black);
          right: 0px;
        }

        :global(input) {
          border-radius: 8px;
        }
        :global(input:focus) {
          outline-color: var(--black);
          outline-style: none;
          outline-offset: -3px;
        }
        :global(input:focus::selection) {
          background-color: var(--black);
          color: var(--amber);
        }
        :global(input::placeholder) {
          color: #885f26;
        }
      `}</style>
    </div>
  );
}
