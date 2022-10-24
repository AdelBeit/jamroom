import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  Screen,
  DropDown,
  DrumType,
  ScreenStateStore,
  SoundStateStore,
  UserStateStore,
  VolumeStateStore,
  Theme,
} from "../types";

export const useVolumeStore = create<VolumeStateStore>()(
  devtools((set) => ({
    userVolumes: {},
    changeVolume: (userID, volume) =>
      set((state) => ({
        userVolumes: { ...state.userVolumes, [userID]: volume },
      })),
    setVolumes: (users) => {
      const newVolumes = {};
      Object.keys(users).map((user) => (newVolumes[users[user][0]] = -10));
      set((state) => ({
        userVolumes: { ...newVolumes, ...state.userVolumes },
      }));
    },
  }))
);

export const useUserStore = create<UserStateStore>()(
  devtools((set) => ({
    roomID: "",
    userID: "",
    users: {},
    setRoomID: (roomID) => set({ roomID }),
    setUsers: (users) => set({ users }),
    setUserID: (userID) => set({ userID }),
  }))
);

// TODO: persist configs
export const useScreenStore = create<ScreenStateStore>()(
  devtools((set) => ({
    selectedTheme: "light",
    selectedScreen: "start",
    selectedDropDown: "none",
    setScreen: (selectedScreen: Screen) => set({ selectedScreen }),
    setDropDown: (selectedDropDown: DropDown | "none") =>
      set({ selectedDropDown }),
    setTheme: (selectedTheme: Theme) => set({ selectedTheme }),
  }))
);

// CHECK: keep track of volume, allow changing volume per soundplayer
export const useSoundStore = create<SoundStateStore>()(
  devtools((set) => ({
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
