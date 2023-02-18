import Drums from "../src/screens/Drums";
import Keys from "../src/screens/Keys";
import Users from "../src/screens/dropdowns/Users";
import DrumSelector from "../src/screens/dropdowns/DrumSelector";
import { useScreenStore } from "../src/utils/stores";
import { NextPage } from "next";
import { usePlayers } from "../src/utils/PlayersContext";
import { getSamples } from "../src/utils/data/getSampleNames";
import { useEffect, useState } from "react";
import { Lobby } from "../src/screens/Lobby";
import PageFrame from "../src/PageFrame";

/**
 * optional:
 * TODO: implement room hosts
 * TODO: kick user functionality
 * TODO: change volume slider to be the whole info bar
 *
 *
 */

type Page = "_Lobby" | "_Jammers" | "_Drumkit" | "_Keyboard" | "_SoundClips";

const Page: NextPage = (props) => {
  const screen = useScreenStore((state) => state.selectedScreen);
  const { setSamples } = usePlayers();
  const page: Page = "_Lobby";
  let pageComponent = <Lobby />;
  // if (page === "_Jammers") pageComponent = <Jammers />;
  // if (page === "_Drumkit") pageComponent = <Drumkit />;
  // if (page === "_Keyboard") pageComponent = <Keyboard />;
  // if (page === "_SoundClips") pageComponent = <SoundClips />;

  useEffect(() => {
    // @ts-ignore
    setSamples(props.samples);
  }, []);

  return (
    <div>
      {<PageFrame _name={page}>{pageComponent}</PageFrame>}
      <style jsx>
        {`
          div {
            color: var(--amber);
            background-color: var(--black);
          }
        `}
      </style>
    </div>
  );
};

export async function getStaticProps() {
  const samples = getSamples();

  return {
    props: { samples },
  };
}

export default Page;
