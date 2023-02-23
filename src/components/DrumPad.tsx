import React from "react";
import { Sample } from "../sample";
import { usePlayers } from "../utils/PlayersContext";
import { socket } from "../utils/socketClient";
import { usePage } from "../utils/usePage";
import { useUsers } from "../utils/useUsers";
import Icon from "./Icon";
import { useSound } from "../utils/useSound";

interface Props {
  _id: number;
  sample: Sample;
  config?: boolean;
}

export default function DrumPad({ _id, sample, config = false }: Props) {
  const { playSample } = usePlayers();
  const roomID = useUsers((state) => state.roomID);

  const padHandler = (e: React.TouchEvent | React.MouseEvent) => {
    if (config) {
      e.preventDefault();
      useSound.getState().setConfigPad(_id);
      usePage.getState().setPage("_Samples");
      return;
    }

    e.currentTarget.classList.add("active");
    playSample(sample);
    socket.emit("play-sound", sample, roomID);
  };

  const preventDefault = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("active");
  };

  return (
    <button
      id={`${_id}`}
      className="mold"
      onClick={padHandler}
      onTouchStart={padHandler}
      onTouchEnd={preventDefault}
    >
      {config && <Icon _icon="config" size={60} />}
      <style jsx>
        {`
          button {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </button>
  );
}
