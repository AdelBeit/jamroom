import React from "react";
import { Sample } from "../sample";
import { usePlayers } from "../utils/PlayersContext";
import { socket } from "../utils/socketClient";
import { usePage } from "../hooks/usePage";
import { useUsers } from "../hooks/useUsers";
import Icon from "./Icon";
import { useSound } from "../hooks/useSound";

interface Props {
  _id: number;
  sample: Sample;
  config?: boolean;
}

export default function DrumPad({ _id, sample, config = false }: Props) {
  const { playSample } = usePlayers();
  const roomID = useUsers((state) => state.roomID);

  const padHandler = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (config) {
      useSound.getState().setConfigPad(_id);
      usePage.getState().setPage("_Samples");
      return;
    }

    e.currentTarget.classList.add("active");
    playSample(sample);
    socket.emit("play-sound", sample, roomID);
  };

  const drumHandlerLeave = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("active");
  };

  return (
    <button
      id={`${_id}`}
      className="mold"
      onMouseDown={padHandler}
      onTouchStart={padHandler}
      onMouseUp={drumHandlerLeave}
      onTouchEnd={drumHandlerLeave}
      onMouseLeave={drumHandlerLeave}
    >
      {config && <Icon _icon="config" size={60} />}
      <style jsx>
        {`
          button {
            width: 17svw;
            height: 17svw;
            max-width: 165px;
            max-height: 165px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </button>
  );
}
