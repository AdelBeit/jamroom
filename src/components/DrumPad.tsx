import React from "react";
import { Sample } from "../samples";
import { usePlayers } from "../utils/PlayersContext";
import { socket } from "../utils/socketClient";
import { usePage } from "../utils/usePage";
import { useUsers } from "../utils/useUsers";
import { playWithVolume } from "../utils/utils";
import Icon from "./Icon";

interface Props {
  _id: number;
  sample: Sample;
  config?: boolean;
}

export default function DrumPad({ _id, sample, config = false }: Props) {
  const { players } = usePlayers();
  const [userID, roomID] = useUsers((state) => [state.userID, state.roomID]);

  const padHandler = (e: React.TouchEvent | React.MouseEvent) => {
    if (config) {
      e.preventDefault();
      usePage.getState().setPage("_Samples");
      return;
    }

    e.currentTarget.classList.add("active");
    if (players) {
      const player = players.player(sample);
      socket.emit("play-sound", sample, roomID);
      const volume = useUsers.getState().users[userID].volume ?? -10;
      playWithVolume(player, volume);
    }
  };

  const preventDefault = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("active");
  };

  return (
    <button
      id={`${_id}`}
      className="mold flex"
      onClick={padHandler}
      onTouchStart={padHandler}
      onMouseUp={preventDefault}
      onTouchEnd={preventDefault}
    >
      {config && <Icon _icon="config" size={60} />}
      <style jsx>
        {`
          button {
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </button>
  );
}
