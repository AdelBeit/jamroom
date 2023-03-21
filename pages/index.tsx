import { NextPage } from "next";
import { usePlayers } from "../src/utils/PlayersContext";
import { getSamples } from "../src/utils/data/getSampleNames";
import { useEffect } from "react";
import { Lobby } from "../src/screens/Lobby";
import PageFrame from "../src/components/PageFrame";
import Jammers from "../src/screens/Jammers";
import Drumkit from "../src/screens/Drumkit";
import Keyboard from "../src/screens/Keyboard";
import Samples from "../src/screens/Samples";
import { usePage } from "../src/hooks/usePage";
import { Loading } from "../src/screens/Loading";

/**
 * TODO: join room needs to pull from socket
 *
 * 
 * release notes
 * 
 * 1. Improved accessibility by using a monochrome and high contrast theme
2. Optimized keyboard layout for small screens
3. Streamlined SVG icon usage and pulled all icons from the same source, resulting in better performance and consistency
4. Reworked layout and user journeys to improve user experience
5. New tutorial boxes for first-time users to highlight features
6. New features such as swipe gesture controls and join/create room
7. New real-time visual indicators for who is playing sound
8. Visual bug fixes
9. Introduction of menu feature to help navigate through the app
10. Improved leave room functionality 
11. Streamlined drum pads and pad sample configuration for better user experience
12. Codebase now follows atomic design principles to improve consistency and maintainability.
added loading screen

 *
 * optional:
 * TODO: change volume slider to be the whole info bar
 * TODO: animate lobby button transitions
 * TODO: write all sample paths into a js object and don't redo it once it's done, will have to find a way to diff the folders
 *
 * maybe:
 * TODO: persist configs
 * TODO: implement room hosts
 * TODO: kick user functionality
 */

const Page: NextPage = (props) => {
  const title = "Jamroom";
  const { setSamples } = usePlayers();
  const _page = usePage((state) => state.page);
  let pageComponent = <Loading title={title} />;

  if (_page === "_Lobby") pageComponent = <Lobby title={title} />;
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
    <div id="_app">
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
      <style jsx global>{`
        ._page .title {
          display: block;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          user-select: none;
        }
      `}</style>
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
