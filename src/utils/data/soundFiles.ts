import { baseURL } from "../utils";

const soundFiles: { [key: string]: string[][] } = {
  tom: [
    ["tom 1", baseURL("toms") + "acoustic_tom.ogg"],
    // ["accoustic_tom", baseURL("toms") + ""],
    // ["house_tom 1", baseURL("toms") + ""],
  ],
  snare: [
    ["snare 3", baseURL("snares") + "acoustic_snare.ogg"],
    // ["brushed snare", baseURL("snares") + ""],
    // ["rock snare", baseURL("snares") + ""],
  ],
  kick: [
    ["kick 2", baseURL("kicks") + "acoustic_kick.ogg"],
    // ["house kick", baseURL("kicks") + ""],
    // ["metal kick", baseURL("kicks") + ""],
  ],
  hi_hat: [
    ["house hihats", baseURL("hihats") + "House Cymbal 14.wav"],
    ["trap hi_hats", baseURL("hihats") + "House Cymbal 24.wav"],
    // ["hi hat 1", baseURL("hihats") + ""],
  ],
  closed_hat: [
    ["closed hat 2", baseURL("closedhat") + "House HiHat 18.wav"],
    ["closed_hat metal", baseURL("closedhat") + "House HiHat 23.wav"],
    ["cymbal 1", baseURL("closedhat") + "House HiHat 24.wav"],
  ],
  keys: [
    ["a", baseURL("keys") + "A4.mp3"],
    ["c", baseURL("keys") + "C4.mp3"],
    ["cs", baseURL("keys") + "Cs4.mp3"],
    ["f", baseURL("keys") + "F4.mp3"],
    ["gs", baseURL("keys") + "Gs4.mp3"],
  ],
  // loops: [
  //   ["Egyptian tune", baseURL("") + ""],
  //   ["doumbak loop", baseURL("") + ""],
  //   ["house drumkit", baseURL("") + ""],
  //   ["rock drums", baseURL("") + ""],
  //   ["spooky mix trap_keys", baseURL("") + ""],
  // ],
};

export default soundFiles;
