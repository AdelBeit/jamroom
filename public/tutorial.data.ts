import { Page } from "../src/types";

export const KEYBOARD_TUTORIAL_MOBILE =
  "Swipe left and right with 3 fingers to +/- octaves.";
export const KEYBOARD_TUTORIAL_DESKTOP = "Use N/M keys to +/- octaves.";

const TUTORIAL_DATA: Map<Page, string[]> = new Map();

TUTORIAL_DATA.set("_Lobby", [
  "For the best experience please use this app on a mobile device instead.",
]);

TUTORIAL_DATA.set("_Jammers", [
  "Use the + sign to invite more jammers to your room.",
  "Navigate to Drumkit/Keyboard using a 3 finger left/right swipe gesture.",
  "Use the volume slider to adjust the volume for each individual jammer.",
]);

TUTORIAL_DATA.set("_Drumkit", [
  "Tap on the menu to access configuration mode, allowing you to change samples attached to each drumpad.",
]);

TUTORIAL_DATA.set("_Config", [
  "Tap on any drumpad to change the sample attached to it.",
]);

TUTORIAL_DATA.set("_Samples", [
  "Tap on any sample to preview and set it as the current drumpad sample.",
]);

TUTORIAL_DATA.set("_Keyboard", [
  KEYBOARD_TUTORIAL_MOBILE,
]);

export default TUTORIAL_DATA;
