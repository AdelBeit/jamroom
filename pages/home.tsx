import { NextPage } from "next";
import React, { MutableRefObject, useEffect, useRef } from "react";
import Drums from "../src/screens/Drums";
import Keys from "../src/screens/Keys";
import SoundClips from "../src/screens/dropdowns/SoundClips";
import Users from "../src/screens/dropdowns/Users";
import DrumSelector from "../src/screens/dropdowns/DrumSelector";
import { useScreenStore, useSoundStore } from "../src/utils/stores";
import { Players } from "tone";
import soundFiles from "../src/utils/data/soundFiles";
import { PlayersRef } from "../src/types";

const Page: NextPage = () => {
  const screen = useScreenStore((state) => state.selectedScreen);
  const soundClips = [
    "Egyptian Drum",
    "Tuba",
    "French Horn",
    "Gothic Atmospheric",
    "Space Drum",
  ];

  let players: PlayersRef = useRef(null);

  useEffect(() => {
    const allSoundFiles = {};

    Object.keys(soundFiles).map((instrumentType) =>
      soundFiles[instrumentType].map((sound) => {
        let name = sound[0];
        let path = sound[1];
        allSoundFiles[name] = path;
      })
    );

    players.current = new Players(allSoundFiles, () => {
      console.log("samples loaded");
      useSoundStore.setState({ players });
    }).toDestination();
  }, []);

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
