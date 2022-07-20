import create from "zustand";
import { StateStore, Screen, DropDown, DrumType, Middleware } from "../types";

const log: Middleware<StateStore> = (config) => (set, get, api) =>
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

export const useStore = create<StateStore>(
  log((set) => ({
    selectedScreen: "keys",
    selectedDropDown: "none",
    currentOctave: 4,
    drumEditMode: false,
    selectedDrumToEdit: "tom",
    drumSounds: {
      tom: "",
      snare: "",
      kick: "",
      hi_hat: "",
      closed_hat: "",
    },
    setScreen: (selectedScreen: Screen) =>
      set((state) => ({
        selectedScreen,
      })),
    setDropDown: (selectedDropDown: DropDown) =>
      set((state) => ({ selectedDropDown })),
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
      set((state) => ({
        selectedDrumToEdit,
      })),
    setDrumSound: (drum: DrumType, soundClip: string) =>
      set((state) => ({
        drumSounds: { ...state.drumSounds, drum: soundClip },
      })),
  }))
);
