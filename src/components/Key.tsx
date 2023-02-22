import cs from "classnames";
import React from "react";
import { Note, Octave } from "../types";
import { usePlayers } from "../utils/PlayersContext";
import { useUsers } from "../utils/useUsers";
import { socket } from "../utils/socketClient";
import { Sample } from "../sample";

interface Props {
  _note: Note;
  octave: Octave;
}

export default function Key({ _note, octave }: Props) {
  const { playSample } = usePlayers();
  const [roomID] = useUsers((state) => [state.roomID]);

  const keyHandler = (e: React.MouseEvent | React.TouchEvent) => {
    const sample = (_note + octave) as Sample;
    playSample(sample);
    socket.emit("play-sound", sample, roomID);
  };

  const preventDefault = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
  };

  return (
    <button
      onTouchStart={keyHandler}
      onMouseDown={keyHandler}
      onMouseUp={preventDefault}
      onTouchEnd={preventDefault}
      id={_note + octave}
      className={cs("_key", (_note[1] && "black") || "white")}
    >
      {_note === "C" && <span>{_note + octave}</span>}
      <style jsx>{`
        button {
          display: inline-flex;
          grid-row: 1/1;
          border-radius: 20px;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 10px !important;

          padding: 0;
          position: relative;
        }

        .C {
          grid-column-start: 1;
        }
        .Cs {
          grid-column-start: 2;
        }
        .D {
          grid-column-start: 2;
        }
        .Ds {
          grid-column-start: 3;
        }
        .E {
          grid-column-start: 3;
        }
        .F {
          grid-column-start: 4;
        }
        .Fs {
          grid-column-start: 5;
        }
        .G {
          grid-column-start: 5;
        }
        .Gs {
          grid-column-start: 6;
        }
        .A {
          grid-column-start: 6;
        }
        .As {
          grid-column-start: 7;
        }
        .B {
          grid-column-start: 7;
        }

        span {
          font-family: monospace;
          font-size: 30px;
          padding-bottom: 10px;
        }

        .white {
          z-index: 1;
          background-color: var(--amber);
          border: 2px solid var(--amber);
          width: 97px;
          height: 270px;
          border-radius: 30px;
        }

        .black {
          z-index: 2;
          background-color: var(--black);
          width: 54px;
          height: 155px;
          left: -30%;
        }
      `}</style>
    </button>
  );
}
