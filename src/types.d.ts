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

export type User = {
  id: string;
  instrument: Instrument;
};

// NEW

export type Page =
  | "_Lobby"
  | "_Jammers"
  | "_Drumkit"
  | "_Keyboard"
  | "_Samples"
  | "_Config";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconProps["icon"];
  text: string;
}
