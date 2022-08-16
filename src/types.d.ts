import { FunctionComponent, MutableRefObject } from "react";
import { Players, Volume } from "tone";
import { GetState, SetState, State, StateCreator, StoreApi } from "zustand";

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

export interface KeyProps {
  note: Note;
  octave?: Octave;
}

export type Instrument = "drums" | "keys";

export type Screen = Instrument | "start";

export type DropDown = "drum_selector" | "users" | "soundclips";

export type Actions =
  | "back"
  | "play"
  | "stop"
  | "select"
  | "leave"
  | "kick_user"
  | "add_user"
  | "drum_selector";

export type ButtonStyle = "raised" | "inset" | 'plain';

export type ButtonVariant = Actions | Exclude<Screen, 'start'> | DropDown;

export interface ButtonProps {
  variant: ButtonVariant;
  style?: ButtonStyle;
}

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
  setScreen: (selectedScreen: Screen) => void;
  setDropDown: (selectedDropDown: DropDown | "none") => void;
}

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
  id: string,
  volume: number,
  instrument: Instrument,
}

export interface UserStateStore {
  roomID: string,
  userID: User['id'],
  users: { [userID: User['id']]: User };
  setRoomID(roomID: UserStateStore['roomID']): void;
  setUsers(users: { [id: User['id']]: User }): void;
  setUserID(userID: User['id']): void;
}

export interface VolumeStateStore {
  userVolumes: { [userID: User['id']]: User['volume'] }
  changeVolume(userID: User['id'], volume: User['volume']): void;
  setVolumes(users: UserStateStore['users']): void;
}
