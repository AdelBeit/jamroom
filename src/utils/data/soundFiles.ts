import { baseURL } from "../utils";

export const toms: { [clipName: string]: string } = {
  "tom 1": baseURL("toms") + "acoustic_tom.ogg",
};
export const snares: { [clipName: string]: string } = {
  "snare 3": baseURL("snares") + "acoustic_snare.ogg",
};

export const kicks: { [clipName: string]: string } = {
  "kick 2": baseURL("kicks") + "acoustic_kick.ogg",
};

export const hihats: { [clipName: string]: string } = {
  "house hihats": baseURL("hihats") + "House Cymbal 14.wav",
  "trap hi_hats": baseURL("hihats") + "House Cymbal 24.wav",
};

export const closedhats: { [clipName: string]: string } = {
  "closed hat 2": baseURL("closedhat") + "House HiHat 18.wav",
  "closed_hat metal": baseURL("closedhat") + "House HiHat 23.wav",
  "cymbal 1": baseURL("closedhat") + "House HiHat 24.wav",
};

export const keys: { [clipName: string]: string } = {
  C1: baseURL("keys") + "C1.mp3",
  Cs1: baseURL("keys") + "Cs1.mp3",
  D1: baseURL("keys") + "D1.mp3",
  Ds1: baseURL("keys") + "Ds1.mp3",
  E1: baseURL("keys") + "E1.mp3",
  F1: baseURL("keys") + "F1.mp3",
  Fs1: baseURL("keys") + "Fs1.mp3",
  G1: baseURL("keys") + "G1.mp3",
  Gs1: baseURL("keys") + "Gs1.mp3",
  A1: baseURL("keys") + "A1.mp3",
  As1: baseURL("keys") + "As1.mp3",
  B1: baseURL("keys") + "B1.mp3",
  C2: baseURL("keys") + "C2.mp3",
  Cs2: baseURL("keys") + "Cs2.mp3",
  D2: baseURL("keys") + "D2.mp3",
  Ds2: baseURL("keys") + "Ds2.mp3",
  E2: baseURL("keys") + "E2.mp3",
  F2: baseURL("keys") + "F2.mp3",
  Fs2: baseURL("keys") + "Fs2.mp3",
  G2: baseURL("keys") + "G2.mp3",
  Gs2: baseURL("keys") + "Gs2.mp3",
  A2: baseURL("keys") + "A2.mp3",
  As2: baseURL("keys") + "As2.mp3",
  B2: baseURL("keys") + "B2.mp3",
  C3: baseURL("keys") + "C3.mp3",
  Cs3: baseURL("keys") + "Cs3.mp3",
  D3: baseURL("keys") + "D3.mp3",
  Ds3: baseURL("keys") + "Ds3.mp3",
  E3: baseURL("keys") + "E3.mp3",
  F3: baseURL("keys") + "F3.mp3",
  Fs3: baseURL("keys") + "Fs3.mp3",
  G3: baseURL("keys") + "G3.mp3",
  Gs3: baseURL("keys") + "Gs3.mp3",
  A3: baseURL("keys") + "A3.mp3",
  As3: baseURL("keys") + "As3.mp3",
  B3: baseURL("keys") + "B3.mp3",
  C4: baseURL("keys") + "C4.mp3",
  Cs4: baseURL("keys") + "Cs4.mp3",
  D4: baseURL("keys") + "D4.mp3",
  Ds4: baseURL("keys") + "Ds4.mp3",
  E4: baseURL("keys") + "E4.mp3",
  F4: baseURL("keys") + "F4.mp3",
  Fs4: baseURL("keys") + "Fs4.mp3",
  G4: baseURL("keys") + "G4.mp3",
  Gs4: baseURL("keys") + "Gs4.mp3",
  A4: baseURL("keys") + "A4.mp3",
  As4: baseURL("keys") + "As4.mp3",
  B4: baseURL("keys") + "B4.mp3",
  C5: baseURL("keys") + "C5.mp3",
  Cs5: baseURL("keys") + "Cs5.mp3",
  D5: baseURL("keys") + "D5.mp3",
  Ds5: baseURL("keys") + "Ds5.mp3",
  E5: baseURL("keys") + "E5.mp3",
  F5: baseURL("keys") + "F5.mp3",
  Fs5: baseURL("keys") + "Fs5.mp3",
  G5: baseURL("keys") + "G5.mp3",
  Gs5: baseURL("keys") + "Gs5.mp3",
  A5: baseURL("keys") + "A5.mp3",
  As5: baseURL("keys") + "As5.mp3",
  B5: baseURL("keys") + "B5.mp3",
  C6: baseURL("keys") + "C6.mp3",
  Cs6: baseURL("keys") + "Cs6.mp3",
  D6: baseURL("keys") + "D6.mp3",
  Ds6: baseURL("keys") + "Ds6.mp3",
  E6: baseURL("keys") + "E6.mp3",
  F6: baseURL("keys") + "F6.mp3",
  Fs6: baseURL("keys") + "Fs6.mp3",
  G6: baseURL("keys") + "G6.mp3",
  Gs6: baseURL("keys") + "Gs6.mp3",
  A6: baseURL("keys") + "A6.mp3",
  As6: baseURL("keys") + "As6.mp3",
  B6: baseURL("keys") + "B6.mp3",
  C7: baseURL("keys") + "C7.mp3",
  Cs7: baseURL("keys") + "Cs7.mp3",
  D7: baseURL("keys") + "D7.mp3",
  Ds7: baseURL("keys") + "Ds7.mp3",
  E7: baseURL("keys") + "E7.mp3",
  F7: baseURL("keys") + "F7.mp3",
  Fs7: baseURL("keys") + "Fs7.mp3",
  G7: baseURL("keys") + "G7.mp3",
  Gs7: baseURL("keys") + "Gs7.mp3",
  A7: baseURL("keys") + "A7.mp3",
  As7: baseURL("keys") + "As7.mp3",
  B7: baseURL("keys") + "B7.mp3",
};

export const loops: { [clipName: string]: string } = {};

const soundFiles = {
  ...toms,
  ...snares,
  ...kicks,
  ...hihats,
  ...closedhats,
  ...keys,
  ...loops,
};

export default soundFiles;
