import React, {
  FunctionComponent,
  MutableRefObject,
  Ref,
  RefObject,
} from "react";
import { Players } from "tone";
import { GetState, SetState, State, StateCreator, StoreApi } from "zustand";
import { Icon } from "./icons";
import { Props as IconProps } from "./components/Icon";

export type Octave = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Note =
  | "C"
  | "Cs"
  | "D"
  | "Ds"
  | "E"
  | "F"
  | "Fs"
  | "G"
  | "Gs"
  | "A"
  | "As"
  | "B";

export type classNames = String | String[];

export type Theme = "light" | "dark";

export interface KeyProps {
  note: Note;
  setChildRef: Function;
  observer: IntersectionObserver | null;
  classes?: classNames;
  octave?: Octave;
}

export interface KeyboardTemplateProps extends Omit<KeyProps, "note"> {}

export type Instrument = "drumkit" | "keyboard";

export type Screen = Instrument | "start";

export type Actions =
  | "back"
  | "start"
  | "play"
  | "stop"
  | "select"
  | "leave"
  | "kick_user"
  | "add_user"
  | "drum_selector";

export type ButtonStyle = "raised" | "inset" | "plain";

export type ButtonVariant = Actions | Exclude<Screen, "start"> | DropDown;

export type DrumType = "kick" | "tom" | "snare" | "hi_hat" | "closed_hat";

export type SoundClipType = DrumType | "loop";

export interface DrumProps {
  drumType: DrumType;
}

export interface ToolBarProps {
  variant: Screen | "dropdown";
}

export interface ScreenStateStore {
  selectedScreen: Screen;
  selectedDropDown: DropDown | "none";
  selectedTheme: Theme;
  setScreen: (selectedScreen: Screen) => void;
  setDropDown: (selectedDropDown: DropDown | "none") => void;
}

export type samples = { [name: string]: string };
export interface SoundStateStore {
  currentOctave: Octave;
  drumEditMode: boolean;
  selectedDrumToEdit: DrumType;
  drumSounds: {
    tom: string;
    snare: string;
    kick: string;
    hi_hat: string;
    closed_hat: string;
  };
  setDrumSound(drum: DrumType, soundClip: string): void;
  setDrumToEdit(drum: DrumType): void;
  toggleDrumEditMode(): void;
}

export type User = {
  id: string;
  instrument: Instrument;
};

export interface UserStateStore {
  roomID: string;
  userID: User["id"];
  users: { [userID: User["id"]]: [User["id"], User["instrument"]] };
  setRoomID(roomID: UserStateStore["roomID"]): void;
  setUsers(users: { [id: User["id"]]: [User["id"], User["instrument"]] }): void;
  setUserID(userID: User["id"]): void;
}

export interface VolumeStateStore {
  userVolumes: { [userID: User["id"]]: number };
  changeVolume(userID: User["id"], volume: number): void;
  setVolumes(users: UserStateStore["users"]): void;
}

// NEW

export type Page =
  | "_Lobby"
  | "_Jammers"
  | "_Drumkit"
  | "_Keyboard"
  | "_Samples";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconProps["icon"];
  text: string;
}
