import { NextPage } from "next";
import React from "react";
import Drums from "../src/screens/Drums";
import Keys from "../src/screens/Keys";
import SoundClips from "../src/screens/dropdowns/SoundClips";
import Users from "../src/screens/dropdowns/Users";
import DrumSelector from "../src/screens/dropdowns/DrumSelector";
import { useStore } from "../src/utils/useStore";

const Page: NextPage = () => {
  const screen = useStore((state) => state.selectedScreen);
  const soundClips = [
    "Egyptian Drum",
    "Tuba",
    "French Horn",
    "Gothic Atmospheric",
    "Space Drum",
  ];
  return (
    <>
      {screen == "drums" && <Drums />}
      {screen == "keys" && <Keys />}
      <Users />
      <SoundClips soundClips={soundClips} />
      <DrumSelector />
    </>
  );
};

export default Page;
