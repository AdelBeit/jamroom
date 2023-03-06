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
  const roomID = useUsers((state) => state.roomID);
  const cappedOctave = Math.max(Math.min(octave + 1, 7), 2);

  const lastNote = _note === "N" ? "C" + cappedOctave : undefined;

  const keyHandler = (e: React.MouseEvent | React.TouchEvent) => {
    const key = e.currentTarget;
    key.classList.add("pressed");
    const sample = (
      _note === "N" ? "C" + cappedOctave : _note + octave
    ) as Sample;
    playSample(sample);
    socket.emit("play-sound", sample, roomID);
  };

  const keyHandlerEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.currentTarget.classList.remove("pressed");
  };

  return (
    <button
      onTouchStart={keyHandler}
      onMouseDown={keyHandler}
      onTouchEnd={keyHandlerEnd}
      onMouseUp={keyHandlerEnd}
      onMouseLeave={keyHandlerEnd}
      id={(lastNote && lastNote) || _note + octave}
      className={cs(
        "_key mold relative",
        (lastNote && lastNote) || _note,
        (_note[1] && "black") || "white"
      )}
    >
      {_note === "C" && <span>{_note + octave}</span>}
      <style jsx>{`
        ._key {
          grid-row: 1/1;
          border-radius: 20px;

          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;

          padding: 0;
          padding-bottom: 10px;
        }

        span {
          font-family: monospace;
          font-size: 30px;
          padding-bottom: 10px;
          color: var(--black);
        }

        .white {
          z-index: 1;
          background-color: var(--amber);
          border: 2px solid var(--amber);
          width: 100%;
          height: 100%;
          border-radius: 30px;
        }
        .white.pressed {
          background-color: var(--black);
        }

        .black {
          z-index: 2;
          background-color: var(--black);
          width: 60%;
          height: 60%;
          left: -40%;
        }
        .black.pressed {
          background-color: var(--amber);
          border: 2px solid var(--black);
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
      `}</style>
    </button>
  );
}
