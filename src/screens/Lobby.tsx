import React, { useEffect, useState } from "react";
import RoomBar from "../components/RoomBar";

export function Lobby() {
  const appTitle = "Jamroom";
  const username = "AppleSpice8132";
  const [roomID, setRoomID] = useState("123");
  const roomList = [roomID, "12", "48293", "128312"];

  useEffect(() => {
    const roomIDInput = document.querySelector("#roomID") as HTMLInputElement;
    setRoomID(roomIDInput.value);
  }, [roomID]);
  return (
    <div id="_Lobby" className="_page flex">
      <div className="_header large flex">
        <span className="title ">{appTitle}</span>
        <span className="username ">{username}</span>
      </div>
      <div className="_body flex">
        <input
          className="bar active medium"
          type="text"
          value={roomID}
          id="roomID"
          onChange={(e) => setRoomID(e.target.value)}
          placeholder="Enter room # to create/join a room"
        />
        <div className="room_list medium flex">
          {roomList.map((roomID, _index) => {
            const text =
              (_index === 0 ? "Create" : "Join") + " Room # " + roomID;
            return <RoomBar text={text} />;
          })}
        </div>
      </div>
      <style jsx>{`
        ._page {
          flex-direction: column;
          justify-content: space-between;
        }
        ._header {
          justify-content: space-between;
          align-items: center;
          padding: 0 2.5%;
        }
        ._body {
          flex-direction: column;
          justify-content: space-between;
          gap: 40px;
        }
        input {
          border-radius: 8px;
          color: var(--black);
        }
        input:focus {
          outline-color: var(--black);
          outline-style: ridge;
          outline-offset: -3px;
        }
        input:focus::selection {
          color: var(--amber);
          background-color: var(--black);
        }
        input::placeholder {
          color: #885f26;
        }
        .room_list {
          flex-direction: column;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}
