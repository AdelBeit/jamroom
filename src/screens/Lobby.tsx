import React from "react";
import Icon from "../components/Icon";
import BorderedTextButton from "../components/BorderedTextButton";
import { useUsers } from "../hooks/useUsers";
import { usePage } from "../hooks/usePage";
import { Props as LoadingProps } from "./Loading";

const MAX_ROOM_ID = 1000;

export function Lobby({ title }: LoadingProps) {
  const [userID, setRoomID] = useUsers((state) => [
    state.userID,
    state.setRoomID,
  ]);
  const setPage = usePage((state) => state.setPage);
  const [roomIDInput, setRoomIDInput] = React.useState("");

  const createRoomHandler = () => {
    const roomID = Math.floor(Math.random() * MAX_ROOM_ID) + 1;
    setRoomID(String(roomID));
    setPage("_InstrumentSelect");
  };

  const joinRoomHandler = (roomID: string) => {
    setRoomID(roomID);
    setPage("_InstrumentSelect");
  };

  const joinCustomRoomHandler = () => {
    const parsed = parseInt(roomIDInput, 10);
    if (
      Number.isNaN(parsed) ||
      parsed < 1 ||
      parsed > MAX_ROOM_ID ||
      roomIDInput.trim() === ""
    ) {
      return;
    }
    joinRoomHandler(String(parsed));
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
        <div className="join_custom">
          <div className="join_input_box mold">
            <input
              className="join_input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={roomIDInput}
              onChange={(e) => {
                const next = e.target.value.replace(/\D/g, "");
                if (next.length === 0) {
                  setRoomIDInput("");
                  return;
                }
                const trimmed = next.slice(0, String(MAX_ROOM_ID).length);
                const parsed = parseInt(trimmed, 10);
                if (Number.isNaN(parsed)) {
                  setRoomIDInput("");
                  return;
                }
                setRoomIDInput(String(Math.min(parsed, MAX_ROOM_ID)));
              }}
              placeholder={`Join a room by #`}
            />
          </div>
          <button
            className="join_action mold"
            onClick={joinCustomRoomHandler}
            onTouchStart={joinCustomRoomHandler}
          >
            <Icon _icon="enter" size={20} />
          </button>
        </div>
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

        .join_custom {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .join_input_box {
          flex: 1;
          display: flex;
          align-items: center;
          height: 40px;
          padding: 2% 1%;
          border-radius: 8px;
        }

        .join_input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--amber);
          font-size: var(--font-med);
        }

        .join_input::placeholder {
          color: #885f26;
        }

        .join_input:focus {
          outline: none;
        }

        .join_action {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
