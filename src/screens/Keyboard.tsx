import React, { useCallback } from "react";
import Key from "../components/Key";
import { Note } from "../types";
import { useSound } from "../utils/useSound";

const setOctave = useSound((state) => [state.setOctave]);

export default function Keyboard() {
  const NOTES = [
    "C",
    "Cs",
    "D",
    "Ds",
    "E",
    "F",
    "Fs",
    "G",
    "Gs",
    "A",
    "As",
    "B",
  ] as Note[];

  const octave = useSound((state) => state.octave);

  return (
    <div id="_Keyboard" className="_page flex">
      {NOTES.map((_note) => (
        <Key key={_note + octave} {...{ _note, octave }} />
      ))}
      <style jsx>
        {`
          ._page {
            width: 100%;
            height: 100%;
            display: inline-grid;
            justify-content: center;
            grid-template-columns: repeat(7, 1fr);
            grid-template-rows: 0;
            column-gap: 10px;
          }
        `}
      </style>
    </div>
  );
}
