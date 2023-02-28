import { NextPage } from "next";
import { usePlayers } from "../src/utils/PlayersContext";
import { getSamples } from "../src/utils/data/getSampleNames";
import { useEffect } from "react";
import { Lobby } from "../src/screens/Lobby";
import PageFrame from "../src/screens/PageFrame";
import Jammers from "../src/screens/Jammers";
import Drumkit from "../src/screens/Drumkit";
import Keyboard from "../src/screens/Keyboard";
import Samples from "../src/screens/Samples";
import { usePage } from "../src/utils/usePage";

/**
 * TODO: leave room bug: playerscontext, and handler
 * TODO: icons
 * TODO: click anywhere to dismiss menu
 * TODO: responsive design
 * TODO: add gestures
 *
 * optional:
 * TODO: implement room hosts
 * TODO: kick user functionality
 * TODO: change volume slider to be the whole info bar
 * TODO: persist configs
 * TODO: animate lobby button transitions
 * TODO: write all sample paths into a js object and don't redo it once it's done, will have to find a way to diff the folders
 */

const Page: NextPage = (props) => {
  const { setSamples } = usePlayers();
  const _page = usePage((state) => state.page);
  let pageComponent = <Lobby />;

  if (_page === "_Jammers") pageComponent = <Jammers />;
  if (["_Drumkit", "_Config"].includes(_page))
    pageComponent = <Drumkit {...{ _page }} />;
  if (_page === "_Keyboard") pageComponent = <Keyboard />;
  if (_page === "_Samples") pageComponent = <Samples />;

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
            display: flex;
            justify-content: center;
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
