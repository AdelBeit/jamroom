import { useRef } from "react";
import { Players } from "tone";
import create from "zustand";
import {
  Screen,
  DropDown,
  DrumType,
  Middleware,
  ScreenStateStore,
  SoundStateStore,
  Note,
  PlayersRef,
} from "../types";

const log2: Middleware<ScreenStateStore> = (config) => (set, get, api) =>
  // @ts-ignore
  config(
    (setArgs) => {
      console.log("   applying", setArgs);
      set(setArgs);
      console.log("   new state", get());
    },
    () => {
      return get();
    },
    { ...api }
  );
const log3: Middleware<SoundStateStore> = (config) => (set, get, api) =>
  // @ts-ignore
  config(
    (setArgs) => {
      console.log("   applying", setArgs);
      set(setArgs);
      console.log("   new state", get());
    },
    () => {
      return get();
    },
    { ...api }
  );

// const log: Middleware<StateStore> = (config) => (set, get, api) =>
//   // @ts-ignore
//   config(
//     (setArgs) => {
//       console.log("   applying", setArgs);
//       set(setArgs);
//       console.log("   new state", get());
//     },
//     () => {
//       return get();
//     },
//     { ...api }
//   );

// export const useStore = create<StateStore>(
//   log((set) => ({
//     selectedScreen: "keys",
//     selectedDropDown: "none",
//     currentOctave: 4,
//     drumEditMode: false,
//     selectedDrumToEdit: "tom",
//     drumSounds: {
//       tom: "",
//       snare: "",
//       kick: "",
//       hi_hat: "",
//       closed_hat: "",
//     },
//     setScreen: (selectedScreen: Screen) =>
//       set((state) => ({
//         selectedScreen,
//       })),
//     setDropDown: (selectedDropDown: DropDown) =>
//       set((state) => ({ selectedDropDown })),
//     octaveUp: () =>
//       set((state) => ({
//         currentOctave: Math.min(state.currentOctave + 1, 7),
//       })),
//     octaveDown: () =>
//       set((state) => ({
//         currentOctave: Math.max(state.currentOctave - 1, 1),
//       })),
//     toggleDrumEditMode: () =>
//       set((state) => ({ drumEditMode: !state.drumEditMode })),
//     setDrumToEdit: (selectedDrumToEdit: DrumType) =>
//       set((state) => ({
//         selectedDrumToEdit,
//       })),
//     setDrumSound: (drum: DrumType, soundClip: string) =>
//       set((state) => ({
//         drumSounds: { ...state.drumSounds, [drum]: soundClip },
//       })),
//   }))
// );

export const useScreenStore = create<ScreenStateStore>(
  log2((set) => ({
    selectedScreen: "keys",
    selectedDropDown: "none",
    setScreen: (selectedScreen: Screen) => set({ selectedScreen }),
    setDropDown: (selectedDropDown: DropDown | "none") =>
      set({ selectedDropDown }),
  }))
);

export const useSoundStore = create<SoundStateStore>(
  log3((set) => ({
    players: null,
    currentOctave: 4,
    drumEditMode: false,
    selectedDrumToEdit: "tom",
    drumSounds: {
      tom: "tom 1",
      snare: "snare 3",
      kick: "kick 2",
      hi_hat: "house hihats",
      closed_hat: "closed hat 2",
    },
    octaveUp: () =>
      set((state) => ({
        currentOctave: Math.min(state.currentOctave + 1, 7),
      })),
    octaveDown: () =>
      set((state) => ({
        currentOctave: Math.max(state.currentOctave - 1, 1),
      })),
    toggleDrumEditMode: () =>
      set((state) => ({ drumEditMode: !state.drumEditMode })),
    setDrumToEdit: (selectedDrumToEdit: DrumType) =>
      set({ selectedDrumToEdit }),
    setDrumSound: (drum: DrumType, soundClip: string) =>
      set((state) => ({
        drumSounds: { ...state.drumSounds, [drum]: soundClip },
      })),
    soundHandler: (instrument: DrumType | Note, players: PlayersRef) => {
      players.current?.player(instrument).start();
    },
  }))
);
