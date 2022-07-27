import React, { useEffect, useRef, MutableRefObject } from "react";
import Drums from "../src/screens/Drums";
import Keys from "../src/screens/Keys";
import SoundClips from "../src/screens/dropdowns/SoundClips";
import Users from "../src/screens/dropdowns/Users";
import DrumSelector from "../src/screens/dropdowns/DrumSelector";
import { useScreenStore } from "../src/utils/stores";
import { Players } from "tone";
import soundFiles from "../src/utils/data/soundFiles";
import { NextPage } from "next";
import io, { Socket } from "socket.io-client";
import { useRouter } from "next/router";

export let socket: Socket;

const PlayersContext = React.createContext<Players | null>(null);
export const usePlayers = () => React.useContext(PlayersContext);
const PlayersContextProvider = (props: React.PropsWithChildren<{}>) => {
  const players: MutableRefObject<null | Players> = useRef(null);
  const router = useRouter();
  const { roomID } = router.query;
  const screen = useScreenStore((state) => state.selectedScreen);

  const handler = () => {
    useScreenStore.getState().setScreen("keys");
  };

  const startRef = useRef(null);

  // TODO: handle opening closing sockets for switching rooms
  useEffect(() => {
    // create room if it doesn't exist
    if (!roomID) {
      if (router.isReady) {
        router.replace(`/home?roomID=${Date.now()}`);
      }
      return;
    }
    // start audoContext
    // @ts-ignore
    startRef.current?.click();
    // load samples
    // TODO: persist loaded samples
    players.current = new Players(soundFiles, () => {
      // initialize socket connection
      socketInitializer();
    }).toDestination();
  }, [roomID]);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.emit("create-room", roomID);

    socket.on("connect", () => {
      console.log(socket.id, "connected");
    });

    socket.on("sound-played", (clipName) => {
      console.log("received event", clipName);
      players?.current?.player(clipName).start();
    });
  };

  return (
    <PlayersContext.Provider value={players.current}>
      {props.children}
      {screen == "start" && (
        <button
          style={{ visibility: "hidden" }}
          ref={startRef}
          onClick={handler}
        ></button>
      )}
    </PlayersContext.Provider>
  );
};

const Page: NextPage = () => {
  const screen = useScreenStore((state) => state.selectedScreen);
  const soundClips = [
    "Egyptian Drum",
    "Tuba",
    "French Horn",
    "Gothic Atmospheric",
    "Space Drum",
  ];

  return (
    <PlayersContextProvider>
      {screen == "keys" && <Keys />}
      {screen == "drums" && <Drums />}
      <Users />
      <SoundClips soundClips={soundClips} />
      <DrumSelector />
    </PlayersContextProvider>
  );
};

export default Page;
