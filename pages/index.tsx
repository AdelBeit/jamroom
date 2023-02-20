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
import PageFrame from "../src/screens/PageFrame";
import { Page as PageType } from "../src/types";

/**
 * optional:
 * TODO: implement room hosts
 * TODO: kick user functionality
 * TODO: change volume slider to be the whole info bar
 *
 *
 */

const Page: NextPage = (props) => {
  const screen = useScreenStore((state) => state.selectedScreen);
  const { setSamples } = usePlayers();
  const page: PageType = "_Lobby";
  let pageComponent = <Lobby />;
  // if (page === "_Jammers") pageComponent = <Jammers />;
  // if (page === "_Drumkit") pageComponent = <Drumkit />;
  // if (page === "_Keyboard") pageComponent = <Keyboard />;
  // if (page === "_Samples") pageComponent = <SoundClips />;

  useEffect(() => {
    // @ts-ignore
    setSamples(props.samples);
  }, []);

  return (
    <div>
      {<PageFrame _page={page}>{pageComponent}</PageFrame>}
      <style jsx>
        {`
          div {
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
