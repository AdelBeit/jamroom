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
