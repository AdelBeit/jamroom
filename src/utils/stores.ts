import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  Screen,
  DropDown,
  DrumType,
  ScreenStateStore,
  SoundStateStore,
  UserStateStore,
} from "../types";

export const useUserStore = create<UserStateStore>()(
  devtools((set) => ({
    roomID: "",
    userID: "",
    users: {},
    setRoomID: roomID => set({ roomID }),
    setUsers: users => set(({ users })),
    setUserID: userID => set(({ userID })),
  }))
)

// TODO: persist configs
export const useScreenStore = create<ScreenStateStore>()(
  devtools((set) => ({
    selectedScreen: "start",
    selectedDropDown: "none",
    setScreen: (selectedScreen: Screen) => set({ selectedScreen }),
    setDropDown: (selectedDropDown: DropDown | "none") =>
      set({ selectedDropDown }),
  }))
);


// TODO: keep track of volume, allow changing volume per soundplayer
export const useSoundStore = create<SoundStateStore>()(
  devtools((set) => ({
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
    toggleDrumEditMode: () =>
      set((state) => ({ drumEditMode: !state.drumEditMode })),
    setDrumToEdit: (selectedDrumToEdit: DrumType) =>
      set({ selectedDrumToEdit }),
    setDrumSound: (drum: DrumType, soundClip: string) =>
      set((state) => ({
        drumSounds: { ...state.drumSounds, [drum]: soundClip },
      })),
  }))
);