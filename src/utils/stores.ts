import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  Screen,
  DropDown,
  DrumType,
  ScreenStateStore,
  SoundStateStore,
  Octave,
  UserStateStore,
  User as UserType,
  Instrument,
} from "../types";

// TODO: store roomid (context or store?)

class User {
  id: UserType['id'];
  volume: UserType['volume'];
  instrument: Instrument;

  constructor(id, instrument, volume = 100) {
    this.id = id;
    this.instrument = instrument;
    this.volume = volume;
  }

  setVolume(volume) {
    this.volume = volume;
  }

  setInstrument(instrument) {
    this.instrument = instrument
  }
}

export const useUserStore = create<UserStateStore>()(
  devtools((set) => ({
    roomID: "",
    users: {},
    addUser: (id, instrument, volume = 100,) => set((state) => ({ users: { ...state.users, [id]: new User(id, instrument, volume) } })),
    removeUser: (id) => set((state) => {
      const newUsers = { ...state.users }
      delete newUsers[id];
      return ({ ...newUsers })
    }),
    setRoomID: (roomID) => set({ roomID }),
    setUserInstrument: (id, instrument) => set((state) => {
      const user = { ...state.users.id };
      user.setInstrument(instrument);
      return ({ ...state.users, [id]: user })
    })
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
    octaveUp: () =>
      set((state) => ({
        currentOctave: Math.min(state.currentOctave + 1, 7) as Octave,
      })),
    octaveDown: () =>
      set((state) => ({
        currentOctave: Math.max(state.currentOctave - 1, 1) as Octave,
      })),
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
