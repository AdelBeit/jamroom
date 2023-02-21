import { useScreenStore } from "../src/utils/stores";
import { NextPage } from "next";
import { usePlayers } from "../src/utils/PlayersContext";
import { getSamples } from "../src/utils/data/getSampleNames";
import { useEffect } from "react";
import { Lobby } from "../src/screens/Lobby";
import PageFrame from "../src/screens/PageFrame";
import { Page as PageType } from "../src/types";
import Jammers from "../src/screens/Jammers";

/**
 * optional:
 * TODO: implement room hosts
 * TODO: kick user functionality
 * TODO: change volume slider to be the whole info bar
 * TODO: persist configs
 *
 */

const Page: NextPage = (props) => {
  const screen = useScreenStore((state) => state.selectedScreen);
  const { setSamples } = usePlayers();
  const _page: PageType = "_Lobby";
  let pageComponent = <Lobby />;
  // if (_page === "_Jammers") pageComponent = <Jammers />;
  // if (_page === "_Drumkit" || _page === "_Config") pageComponent = <Drumkit />;
  // if (_page === "_Keyboard") pageComponent = <Keyboard />;
  // if (_page === "_Samples") pageComponent = <SoundClips />;

  useEffect(() => {
    // @ts-ignore
    setSamples(props.samples);
  }, []);

  return (
    <div>
      {<PageFrame {...{ _page }}>{pageComponent}</PageFrame>}
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
