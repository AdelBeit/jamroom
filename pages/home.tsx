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
import Start from "./start";
import io, { Socket } from "socket.io-client";

export let socket: Socket;

const PlayersContext = React.createContext<Players | null>(null);
export const usePlayers = () => React.useContext(PlayersContext);
const PlayersContextProvider = (props: React.PropsWithChildren<{}>) => {
  const players: MutableRefObject<null | Players> = useRef(null);

  useEffect(() => {
    players.current = new Players(soundFiles, () => {
      socketInitializer();
    }).toDestination();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("play-sound", (clipName) => {
      players.current?.player(clipName).start();
    });
  };

  return (
    <PlayersContext.Provider value={players.current}>
      {props.children}
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
      {screen == "start" && <Start />}
      {screen == "drums" && <Drums />}
      {screen == "keys" && <Keys />}
      <Users />
      <SoundClips soundClips={soundClips} />
      <DrumSelector />
    </PlayersContextProvider>
  );
};

export default Page;
