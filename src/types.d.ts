import { GetState, SetState, State, StateCreator, StoreApi } from "zustand";

export type Octave = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Note =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";
export interface KeyProps {
  octave?: Octave;
  note: Note;
}

export type Instrument = "drums" | "keys";

export type Screen = Instrument;

export type DropDown = "drum_selector" | "users" | "soundclips";

export type Actions =
  | "octave_up"
  | "octave_down"
  | "back"
  | "play"
  | "stop"
  | "exit_room"
  | "kick_user"
  | "add_user"
  | "drum_selector";

export type ButtonStyle = "raised" | "inset";

export interface ButtonProps {
  variant: Actions | Screen | DropDown;
  style?: ButtonStyle;
}

export type DrumType = "kick" | "tom" | "snare" | "hi_hat" | "closed_hat";

export interface DrumProps {
  drumType: DrumType;
}

export interface ToolBarProps {
  variant: Screen | DropDown;
}

export type Middleware<S extends State> = (
  config: StateCreator<S>
) => (set: SetState<S>, get: GetState<S>, api: StoreApi<S>) => S;

export interface StateStore {
  selectedScreen: Screen;
  selectedDropDown: DropDown | "none";
  currentOctave: number;
  drumEditMode: boolean;
  selectedDrumToEdit: DrumType;
  drumSounds: {
    tom: string;
    snare: string;
    kick: string;
    hi_hat: string;
    closed_hat: string;
  };
  setScreen(screen: Screen): void;
  setDropDown(dropdown: DropDown | "none"): void;
  octaveUp(): void;
  octaveDown(): void;
  toggleDrumEditMode(): void;
  setDrumToEdit(drum: DrumType): void;
  setDrumSound(drum: DrumType, soundClip: string): void;
}
