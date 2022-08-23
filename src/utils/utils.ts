import { Player } from "tone";
import { useVolumeStore } from "./stores";

export const generateName = () => {
  const adjectives = [
    "tidy",
    "glistening",
    "ubiquitous",
    "rustic",
    "nutritious",
    "tangible",
    "competent",
    "dizzy",
    "organic",
    "tall",
    "upstanding",
    "chief",
    "nebulous",
    "quaint",
    "loquacious",
    "nervous",
  ];
  const nouns = [
    "smile",
    "plant",
    "wrench",
    "cow",
    "yam",
    "llama",
    "egg",
    "chandellier",
    "fish",
    "jello",
    "cabbage",
    "circle",
    "square",
    "shelf",
    "bucket",
  ];
  let noun = nouns[Math.floor(Math.random() * nouns.length)];
  let adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  noun = noun[0].toUpperCase() + noun.slice(1);
  adjective = adjective[0].toUpperCase() + adjective.slice(1);
  const number = Math.floor(1000 + Math.random() * 9000);
  return adjective + noun + "#" + number;
};

export const baseURL = (instrument) => {
  switch (instrument) {
    case "toms":
    case "tom":
      return "./samples/drums/toms/";
    case "snares":
    case "snare":
      return "./samples/drums/snares/";
    case "hi_hats":
    case "hi_hat":
    case "hihats":
    case "hihat":
      return "./samples/drums/hi_hats/";
    case "closed_hats":
    case "closed_hat":
    case "closedhats":
    case "closedhat":
      return "./samples/drums/closed_hats/";
    case "kicks":
    case "kick":
      return "./samples/drums/kicks/";
    case "keyboard":
    case "keys":
      return "./samples/piano/";
    case "keyboard":
    case "keys":
      return "./samples/piano/";
    default:
      return "./samples/";
      break;
  }
};

export const playWithVolume = (player: Player, volume: number) => {
  player.volume.value = volume;
  player.start();
};
