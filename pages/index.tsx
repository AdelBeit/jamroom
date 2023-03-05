import { NextPage } from "next";
import { usePlayers } from "../src/utils/PlayersContext";
import { getSamples } from "../src/utils/data/getSampleNames";
import { useEffect, useRef } from "react";
import { Lobby } from "../src/screens/Lobby";
import PageFrame from "../src/screens/PageFrame";
import Jammers from "../src/screens/Jammers";
import Drumkit from "../src/screens/Drumkit";
import Keyboard from "../src/screens/Keyboard";
import Samples from "../src/screens/Samples";
import { usePage } from "../src/utils/usePage";
import { Loading } from "../src/screens/Loading";
import Menu from "../src/screens/Menu";
import { CSSTransition } from "react-transition-group";

/**
 * TODO: animate menu opening
 * TODO: add gestures
 * TODO: background icon shadows
 *
 * optional:
 * TODO: custom scrollbar for bar lists (jammers, samples)
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

  const menuRef = useRef(null);
  const [menuOpen] = usePage((state) => [state.menuOpen]);

  return (
    <div id="_app">
      <CSSTransition
        in={menuOpen}
        nodeRef={menuRef}
        timeout={200}
        classNames={"menu"}
        appear
      >
        <Menu {...{ _page, menuRef }} />
      </CSSTransition>
      <style jsx>
        {`
          .menu-enter {
            margin-bottom: -50%;
            opacity: 0;
          }
          .menu-enter-active {
            margin-bottom: -7%;
            opacity: 1;
            transition: margin-bottom 1s, opacity 1s;
          }
          .menu-exit {
            margin-bottom: -7%;
            opacity: 1;
          }
          .menu-exit-active {
            margin-bottom: -50%;
            opacity: 0;
            transition: margin-bottom 1s, opacity 1s;
          }
        `}
      </style>
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
