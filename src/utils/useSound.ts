import create from "zustand";
import { devtools } from "zustand/middleware";
import { Sample } from "../samples";
import { Octave } from "../types";

export type samples = { [name: string]: string };
export interface SoundStateStore {
  octave: Octave;
  samples: Sample[];
  setPadSample(padID: number, sample: Sample): void;
  setOctave(octave: Octave): void;
}

export const useSound = create<SoundStateStore>()(
  devtools((set) => ({
    octave: 4,
    samples: [
      "House Toms",
      "House Toms",
      "House Toms",
      "House Toms",
      "House Toms",
      "House Toms",
      "House Toms",
      "House Toms",
      "House Toms",
      "House Toms",
    ],
    setPadSample: (padID, sample) =>
      set((state) => {
        const samples = state.samples;
        samples[padID] = sample;
        return { ...{ samples } };
      }),
    setOctave: (octave) => set({ octave }),
  }))
);
