import { Player } from "tone";
import { useScreenStore } from "./stores";

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
  }
};

export const playWithVolume = (player: Player, volume: number) => {
  player.volume.value = volume;
  player.start();
};

export const flattenSamples = (samples) => {
  const smallSelection = (acc, instrument) => {
    const firstSampleName = Object.keys(samples[instrument])[0];
    const firstSample = samples[instrument][firstSampleName];
    return {
      ...acc,
      [firstSampleName]: firstSample,
    };
  };
  const selectAll = (acc, instrument) => ({ ...acc, ...samples[instrument] });
  return Object.keys(samples).reduce(selectAll, {});
};

const getRoot = () => ({
  root: document.documentElement,
  rootStyles: window.getComputedStyle(document.documentElement),
});

const isItDarkOutside = () =>
  ((hour: number) => hour >= 18 && hour < 6)(new Date().getHours());

export const changeTheme = () => {
  const { root, rootStyles } = getRoot();
  const theme = useScreenStore.getState().selectedTheme;
  const setTheme = useScreenStore.getState().setTheme;
  setTheme(isItDarkOutside() ? "dark" : "light");
  let themeColor = rootStyles.getPropertyValue(
    theme == "dark" ? "--dark-theme" : "--light-theme"
  );
  let themeColorAlt = rootStyles.getPropertyValue(
    theme == "dark" ? "--light-theme" : "--dark-theme"
  );

  root.style.setProperty("--alt-color", themeColor);
  root.style.setProperty("--alt-color-2", themeColorAlt);
};
