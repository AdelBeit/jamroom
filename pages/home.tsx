import Drums from "../src/screens/Drums";
import Keys from "../src/screens/Keys";
import Users from "../src/screens/dropdowns/Users";
import DrumSelector from "../src/screens/dropdowns/DrumSelector";
import { useScreenStore } from "../src/utils/stores";
import { NextPage } from "next";
import { usePlayers } from "../src/utils/PlayersContext";
import { getSamples } from "../src/utils/data/getSampleNames";
import { useEffect } from "react";

const Page: NextPage = (props) => {
  const screen = useScreenStore((state) => state.selectedScreen);
  const { setSamples } = usePlayers();
  const soundClips = [
    "Egyptian Drum",
    "Tuba",
    "French Horn",
    "Gothic Atmospheric",
    "Space Drum",
  ];

  useEffect(() => {
    // @ts-ignore
    setSamples(props.samples);
  }, []);

  return (
    <>
      {screen == "keys" && <Keys />}
      {screen == "drums" && <Drums />}
      <Users />
      {/* <SoundClips soundClips={soundClips} /> */}
      {/* <DrumSelector /> */}
    </>
  );
};

export async function getStaticProps() {
  const samples = getSamples();

  return {
    props: { samples },
  };
}

export default Page;
