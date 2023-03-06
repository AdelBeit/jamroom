import React from "react";
import Key from "../components/Key";
import { Note } from "../types";
import { useSound } from "../utils/useSound";

export default function Keyboard() {
  const [octave, setOctave] = useSound((state) => [
    state.octave,
    state.setOctave,
  ]);
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

  return (
    <div id="_Keyboard" className="_page">
      {NOTES.map((_note) => (
        <Key key={_note + octave} {...{ _note, octave }} />
      ))}
      <style jsx>
        {`
          ._page {
            width: 100%;
            height: 33svw;

            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: 1fr;
            column-gap: clamp(10px, 2svw, 14px);
          }
        `}
      </style>
    </div>
  );
}
