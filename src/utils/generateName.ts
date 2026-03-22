export const generateName = () => {
  const adjectives = [
    "tidy",
    "bright",
    "common",
    "rustic",
    "hearty",
    "earthy",
    "skilled",
    "dizzy",
    "nature",
    "tall",
    "honest",
    "chief",
    "cloudy",
    "quaint",
    "chatty",
    "jitter",
  ];
  const nouns = [
    "smile",
    "plant",
    "wrench",
    "cow",
    "yam",
    "llama",
    "egg",
    "candle",
    "fish",
    "jello",
    "veggie",
    "circle",
    "square",
    "shelf",
    "bucket",
  ];
  let noun = nouns[Math.floor(Math.random() * nouns.length)];
  let adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  noun = noun[0].toUpperCase() + noun.slice(1);
  adjective = adjective[0].toUpperCase() + adjective.slice(1);
  const number = Math.floor(10 + Math.random() * 90);
  return adjective + noun + "#" + number;
};
