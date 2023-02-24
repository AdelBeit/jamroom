import React from "react";
import Key from "../components/Key";
import { Note } from "../types";
import { useSound } from "../utils/useSound";

export default function Keyboard() {
  const setOctave = useSound((state) => [state.setOctave]);
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
    "N",
  ] as Note[];

  const octave = useSound((state) => state.octave);

  return (
    <div id="_Keyboard" className="_page">
      {NOTES.map((_note) => (
        <Key key={_note + octave} {...{ _note, octave }} />
      ))}
      <style jsx>
        {`
          ._page {
            padding-top: 30px;

            display: inline-grid;
            width: max-content;
            height: 100%;
            grid-template-columns: repeat(7, 1fr);
            grid-template-rows: 0;
            column-gap: 14px;
            position: relative;
          }
        `}
      </style>
    </div>
  );
}
