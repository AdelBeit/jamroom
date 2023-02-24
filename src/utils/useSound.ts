import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Sample } from "../sample";
import { Octave } from "../types";

export type samples = { [name: string]: string };
export interface SoundStateStore {
  octave: Octave;
  configPad: number;
  samples: Sample[];
  setPadSample(sample: Sample): void;
  setConfigPad(padID: number): void;
  setOctave(octave: Octave): void;
}

export const useSound = create<SoundStateStore>()(
  devtools((set) => ({
    octave: 4,
    configPad: 1,
    samples: [
      "Closed Hat - 808",
      "Kick - 808",
      "Snare - 1982 Drive",
      "Tom - 808",
      "Closed Hat - Stutter",
      "Hat - 808",
      "Kick - Hard",
      "Snare - Clappers Delight",
      "Tom - Accoustic 1",
      "Hat - Cymbal",
    ],
    setPadSample: (sample) =>
      set((state) => {
        const samples = [...state.samples];
        samples[state.configPad] = sample;
        return { ...{ samples } };
      }),
    setConfigPad: (padID) => set({ configPad: padID }),
    setOctave: (octave) => set({ octave }),
  }))
);
