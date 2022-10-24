import Drums from "../src/screens/Drums";
import Keys from "../src/screens/Keys";
import Users from "../src/screens/dropdowns/Users";
import DrumSelector from "../src/screens/dropdowns/DrumSelector";
import { useScreenStore } from "../src/utils/stores";
import { NextPage } from "next";
import { usePlayers } from "../src/utils/PlayersContext";
import { getSamples } from "../src/utils/data/getSampleNames";
import { useEffect, useState } from "react";
import { changeTheme, isItDarkOutside } from "../src/utils/utils";

const Page: NextPage = (props) => {
  const screen = useScreenStore((state) => state.selectedScreen);
  const [hour, setHour] = useState(new Date().getHours());
  const { setSamples } = usePlayers();
  const soundClips = [
    "Egyptian Drum",
    "Tuba",
    "French Horn",
    "Gothic Atmospheric",
    "Space Drum",
  ];
  const setTheme = useScreenStore((state) => state.setTheme);

  useEffect(() => {
    setTheme(isItDarkOutside() ? "dark" : "light");
    // @ts-ignore
    setSamples(props.samples);

    // keep track of hour
    const hourInterval = setInterval(
      () => setHour(new Date().getHours()),
      3600000
    );
    return () => clearInterval(hourInterval);
  }, []);

  // check time of day every hour and trigger theme change if necessary
  useEffect(() => {
    // set theme based on time of day
    changeTheme();
  }, [hour]);

  return (
    <>
      {screen == "keys" && <Keys />}
      {screen == "drums" && <Drums />}
      <Users />
      {/* <SoundClips soundClips={soundClips} /> */}
      <DrumSelector />
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
